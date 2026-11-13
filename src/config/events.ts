import { wedding } from "./wedding";
import type { VenueId } from "./venues";

export type EventIcon =
  | "kirtan"
  | "shagun"
  | "haldi"
  | "ring"
  | "jaggo"
  | "mehndi"
  | "sehra"
  | "baraat"
  | "celebration"
  | "anand";

export type EventId =
  | "kirtan"
  | "shagun"
  | "haldi"
  | "ring"
  | "jaggo"
  | "mehndi"
  | "sehra"
  | "baraat"
  | "celebration"
  | "anand";

export interface WeddingEvent {
  id: EventId;
  /** Local date in IST, YYYY-MM-DD. */
  date: string;
  /** 24h start time in IST, used for ordering. */
  start: string;
  venueId: VenueId;
  icon: EventIcon;
  /** Set true for an event whose date still needs family confirmation. */
  provisional?: boolean;
}

/** Keep in chronological order. Names, timings and descriptions live in src/i18n/translations.ts. */
export const events: WeddingEvent[] = [
  { id: "kirtan", date: "2026-12-07", start: "15:00", venueId: "residence", icon: "kirtan" },
  { id: "shagun", date: "2026-12-09", start: "11:00", venueId: "martini", icon: "shagun" },
  { id: "haldi", date: "2026-12-09", start: "14:00", venueId: "martini", icon: "haldi" },
  { id: "ring", date: "2026-12-09", start: "20:00", venueId: "regency", icon: "ring" },
  { id: "jaggo", date: "2026-12-10", start: "19:00", venueId: "residence", icon: "jaggo" },
  { id: "mehndi", date: "2026-12-11", start: "12:00", venueId: "residence", icon: "mehndi" },
  { id: "sehra", date: "2026-12-12", start: "16:00", venueId: "residence", icon: "sehra" },
  { id: "baraat", date: "2026-12-12", start: "18:00", venueId: "residence", icon: "baraat" },
  { id: "celebration", date: "2026-12-12", start: "19:00", venueId: "taj", icon: "celebration" },
  {
    id: "anand",
    date: wedding.anandKarajDate,
    start: "19:30",
    venueId: "taj",
    icon: "anand",
    provisional: !wedding.anandKarajConfirmed,
  },
];

export function eventTimestamp(e: WeddingEvent) {
  return new Date(`${e.date}T${e.start}:00+05:30`).getTime();
}

/** Group events by date, preserving chronological order. */
export function groupEventsByDate(list: WeddingEvent[] = events) {
  const sorted = [...list].sort((a, b) => eventTimestamp(a) - eventTimestamp(b));
  const groups: { date: string; events: WeddingEvent[] }[] = [];
  for (const e of sorted) {
    const last = groups.at(-1);
    if (last && last.date === e.date) last.events.push(e);
    else groups.push({ date: e.date, events: [e] });
  }
  return groups;
}

/** Which events happen at a venue, in order. */
export function eventsAtVenue(venueId: VenueId) {
  return events.filter((e) => e.venueId === venueId);
}
