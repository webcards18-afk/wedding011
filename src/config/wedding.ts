/**
 * Central wedding settings. Change dates, the countdown target and hashtags here.
 * All times are Indian Standard Time (UTC+05:30).
 */
export const wedding = {
  hostFamily: "Saidha",
  celebrationStart: "2026-12-07",
  celebrationEnd: "2026-12-12",

  /**
   * Anand Karaj and Wedding Celebration on 12 December 2026.
   */
  anandKarajDate: "2026-12-12",
  anandKarajConfirmed: true,

  /** The live countdown counts down to the wedding celebration on 12 Dec at 7:00 PM IST. */
  countdownTarget: "2026-12-12T19:00:00+05:30",

  hashtags: [
    "#AbhimanyuKiAashi",
    "#AashiKaAbhimanyu",
    "#AbhimanyuWedsAashi",
    "#SaidhaFamily",
    "#AAbKiShaadi",
  ],
} as const;
