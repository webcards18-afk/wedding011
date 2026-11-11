import { useId } from "react";
import { cn } from "@/lib/utils";

/** Gold script A&A monogram. */
export function Monogram({ className }: { className?: string }) {
  const id = `mono${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 220 140" role="img" aria-label="A & A" className={cn("h-auto", className)}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--gold-deep)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--gold)" }} />
          <stop offset="0.6" style={{ stopColor: "var(--gold-soft)" }} />
          <stop offset="1" style={{ stopColor: "var(--gold-deep)" }} />
        </linearGradient>
      </defs>
      <g
        fill={`url(#${id})`}
        style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 500 }}
      >
        <text x="66" y="102" fontSize="112" textAnchor="middle">
          A
        </text>
        <text x="112" y="80" fontSize="38" fontWeight="400" textAnchor="middle">
          &amp;
        </text>
        <text x="158" y="102" fontSize="112" textAnchor="middle">
          A
        </text>
      </g>
      <path
        d="M24 120 C 80 106, 146 130, 202 112"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
