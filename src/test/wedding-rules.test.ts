import { describe, expect, it } from "vitest";
import { wedding } from "@/config/wedding";
import { events, eventTimestamp, groupEventsByDate } from "@/config/events";
import { whatsappLink } from "@/config/contacts";
import { getTimeLeft } from "@/lib/countdown";
import { translations, formatDateParts } from "@/i18n/translations";

describe("countdown", () => {
  it("targets 12 December 2026, 7:00 PM IST (Wedding Celebration)", () => {
    expect(new Date(wedding.countdownTarget).toISOString()).toBe("2026-12-12T13:30:00.000Z");
  });

  it("splits the remaining time into days, hours, minutes and seconds", () => {
    const now = new Date("2026-11-11T20:30:00+05:30").getTime();
    expect(getTimeLeft(wedding.countdownTarget, now)).toEqual({
      days: 30,
      hours: 22,
      minutes: 30,
      seconds: 0,
      done: false,
    });
  });

  it("stops at zero once the moment has passed", () => {
    const after = new Date("2026-12-12T20:00:00+05:30").getTime();
    expect(getTimeLeft(wedding.countdownTarget, after).done).toBe(true);
  });
});

describe("events", () => {
  it("are listed in chronological order", () => {
    const times = events.map(eventTimestamp);
    expect([...times].sort((a, b) => a - b)).toEqual(times);
  });

  it("Anand Karaj is on 12 Dec, after the 6:00 PM Baraat and 7:00 PM Wedding Celebration", () => {
    const anand = events.find((e) => e.id === "anand")!;
    const baraat = events.find((e) => e.id === "baraat")!;
    expect(anand.date).toBe("2026-12-12");
    expect(eventTimestamp(anand)).toBeGreaterThan(eventTimestamp(baraat));
  });

  it("group into the celebration days", () => {
    expect(groupEventsByDate().map((g) => g.date)).toEqual([
      "2026-12-07",
      "2026-12-09",
      "2026-12-10",
      "2026-12-11",
      "2026-12-12",
    ]);
  });

  it("weekday headings match the brief", () => {
    const d = (iso: string) => formatDateParts(iso, translations.en).weekday;
    expect(d("2026-12-07")).toBe("Monday");
    expect(d("2026-12-09")).toBe("Wednesday");
    expect(d("2026-12-12")).toBe("Saturday");
  });
});

describe("whatsapp", () => {
  it("builds a wa.me link from a formatted number", () => {
    expect(whatsappLink("+91 98765 43210")).toBe("https://wa.me/919876543210");
  });
  it("has no link until a number is added", () => {
    expect(whatsappLink("")).toBeNull();
  });
});

describe("translations", () => {
  const shape = (o: unknown): unknown =>
    o && typeof o === "object" && !Array.isArray(o)
      ? Object.fromEntries(
          Object.entries(o)
            .map(([k, v]) => [k, shape(v)])
            .sort(),
        )
      : Array.isArray(o)
        ? o.length
        : typeof o;

  it("Hindi and Hinglish cover every English text", () => {
    expect(shape(translations.hi)).toEqual(shape(translations.en));
    expect(shape(translations.hinglish)).toEqual(shape(translations.en));
  });
});
