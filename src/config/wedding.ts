/**
 * Central wedding settings. Change dates, the countdown target and hashtags here.
 * All times are Indian Standard Time (UTC+05:30).
 */
export const wedding = {
  hostFamily: "Saidha",
  celebrationStart: "2026-12-07",
  celebrationEnd: "2026-12-13",

  /**
   * Anand Karaj — PROVISIONAL. The family listed 12 Dec as the wedding date but the
   * Anand Karaj is at 4:00 AM, after the 6:00 PM Baraat, so it is placed on 13 Dec.
   * Set `anandKarajConfirmed: true` once the family confirms the date.
   */
  anandKarajDate: "2026-12-13",
  anandKarajConfirmed: false,

  /** The live countdown counts down to this moment. */
  countdownTarget: "2026-12-13T04:00:00+05:30",

  hashtags: [
    "#AbhimanyuKiAashi",
    "#AashiKaAbhimanyu",
    "#AbhimanyuWedsAashi",
    "#SaidhaFamily",
    "#AAbKiShaadi",
  ],
} as const;
