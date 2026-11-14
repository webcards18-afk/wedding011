import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Support HTTP 206 Partial Content / Range requests for audio streaming
// (strictly required by iOS Safari on iPhone to play audio files)
async function handleAudioRangeResponse(request: Request, response: Response): Promise<Response> {
  const url = new URL(request.url);
  const isAudio =
    url.pathname.endsWith(".mp3") || (response.headers.get("content-type") ?? "").includes("audio");

  if (!isAudio) {
    return response;
  }

  const rangeHeader = request.headers.get("range");
  if (!rangeHeader) {
    const headers = new Headers(response.headers);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Content-Type", "audio/mpeg");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  try {
    const arrayBuffer = await response.arrayBuffer();
    const total = arrayBuffer.byteLength;
    if (total === 0) return response;

    const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
    if (!match) {
      return new Response(null, {
        status: 416,
        statusText: "Range Not Satisfiable",
        headers: {
          "Content-Range": `bytes */${total}`,
        },
      });
    }

    let start = match[1] ? parseInt(match[1], 10) : 0;
    let end = match[2] ? parseInt(match[2], 10) : total - 1;

    if (isNaN(start)) start = 0;
    if (isNaN(end) || end >= total) end = total - 1;
    if (start > end || start >= total) {
      return new Response(null, {
        status: 416,
        statusText: "Range Not Satisfiable",
        headers: {
          "Content-Range": `bytes */${total}`,
        },
      });
    }

    const chunk = arrayBuffer.slice(start, end + 1);
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "audio/mpeg");
    headers.set("Content-Range", `bytes ${start}-${end}/${total}`);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Content-Length", String(chunk.byteLength));
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(chunk, {
      status: 206,
      statusText: "Partial Content",
      headers,
    });
  } catch (err) {
    console.error("Failed to process audio range request:", err);
    return response;
  }
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Hosting compresses every response at the edge. Never compress a body (gzip, brotli,
// CompressionStream) or set content-encoding here or in a server route: the body gets encoded
// twice and renders garbled.
export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const audioResponse = await handleAudioRangeResponse(request, response);
      return await normalizeCatastrophicSsrResponse(audioResponse);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
