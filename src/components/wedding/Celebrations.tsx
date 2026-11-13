import { ChevronRight, MapPin } from "lucide-react";
import { groupEventsByDate, type WeddingEvent } from "@/config/events";
import { eventIcons } from "@/config/media";
import { formatDateParts } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface DateTheme {
  cardBg: string;
  borderColor: string;
  accentBar: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  titleColor: string;
  descColor: string;
  venueColor: string;
  iconBg: string;
  dateBadgeBg: string;
  dateBadgeText: string;
  dateBadgeBorder: string;
}

const dateThemes: Record<string, DateTheme> = {
  // 07 Dec: Kirtan & Satsang — Divine Sandalwood & Sacred Ochre
  "2026-12-07": {
    cardBg: "bg-gradient-to-br from-[#fffdfa] via-[#fbf4e6] to-[#f7e8ce]",
    borderColor: "border-[#e0caa1] hover:border-[#c9ab73]",
    accentBar: "bg-[#b8860b]",
    badgeBg: "bg-[#f5e6cb]",
    badgeText: "text-[#5e410b]",
    badgeBorder: "border-[#dfc499]",
    titleColor: "text-[#22170a]",
    descColor: "text-[#3c2d18]",
    venueColor: "text-[#4a3b27]",
    iconBg: "bg-[#f7ebd2]",
    dateBadgeBg: "bg-[#fbf4e6]",
    dateBadgeText: "text-[#6b4c12]",
    dateBadgeBorder: "border-[#dfc499]",
  },
  // 09 Dec: Shagun, Haldi, Ring — Royal Marigold & Saffron
  "2026-12-09": {
    cardBg: "bg-gradient-to-br from-[#fffdf6] via-[#fef5db] to-[#fdeabf]",
    borderColor: "border-[#eed28b] hover:border-[#dcb55c]",
    accentBar: "bg-[#d9822b]",
    badgeBg: "bg-[#fde7b2]",
    badgeText: "text-[#6e3703]",
    badgeBorder: "border-[#ecc573]",
    titleColor: "text-[#261602]",
    descColor: "text-[#3f2806]",
    venueColor: "text-[#503710]",
    iconBg: "bg-[#fde9bd]",
    dateBadgeBg: "bg-[#fef5db]",
    dateBadgeText: "text-[#7a4208]",
    dateBadgeBorder: "border-[#ecc573]",
  },
  // 10 Dec: Jaggo & Sangeet — Royal Rose & Sunset Ruby
  "2026-12-10": {
    cardBg: "bg-gradient-to-br from-[#fffcfc] via-[#fdf0f0] to-[#fce2e2]",
    borderColor: "border-[#f1c2be] hover:border-[#df9b95]",
    accentBar: "bg-[#b83a4b]",
    badgeBg: "bg-[#fad6d6]",
    badgeText: "text-[#6d1723]",
    badgeBorder: "border-[#eeb3b0]",
    titleColor: "text-[#26090e]",
    descColor: "text-[#3e141a]",
    venueColor: "text-[#542129]",
    iconBg: "bg-[#fce4e4]",
    dateBadgeBg: "bg-[#fdf0f0]",
    dateBadgeText: "text-[#781f2c]",
    dateBadgeBorder: "border-[#eeb3b0]",
  },
  // 11 Dec: Mehndi — Imperial Pistachio & Henna Emerald
  "2026-12-11": {
    cardBg: "bg-gradient-to-br from-[#fbfdfa] via-[#eef6ec] to-[#deedd9]",
    borderColor: "border-[#bddcb4] hover:border-[#9ec493]",
    accentBar: "bg-[#2e7d32]",
    badgeBg: "bg-[#d8eccc]",
    badgeText: "text-[#154619]",
    badgeBorder: "border-[#b5d6a8]",
    titleColor: "text-[#0c1f10]",
    descColor: "text-[#1d3521]",
    venueColor: "text-[#2a492f]",
    iconBg: "bg-[#e2f0de]",
    dateBadgeBg: "bg-[#eef6ec]",
    dateBadgeText: "text-[#1c5320]",
    dateBadgeBorder: "border-[#b5d6a8]",
  },
  // 12 Dec: Sehra & Baraat — Regal Amber & Terracotta Grandeur
  "2026-12-12": {
    cardBg: "bg-gradient-to-br from-[#fffcf9] via-[#fdf0e6] to-[#fbdfd1]",
    borderColor: "border-[#f0c5b2] hover:border-[#dea38b]",
    accentBar: "bg-[#c85a32]",
    badgeBg: "bg-[#fbd9c8]",
    badgeText: "text-[#742b0f]",
    badgeBorder: "border-[#eeb79f]",
    titleColor: "text-[#261007]",
    descColor: "text-[#402012]",
    venueColor: "text-[#542f1d]",
    iconBg: "bg-[#fce2d6]",
    dateBadgeBg: "bg-[#fdf0e6]",
    dateBadgeText: "text-[#833314]",
    dateBadgeBorder: "border-[#eeb79f]",
  },
  // 13 Dec: Anand Karaj — Sacred Gilded Gold & Imperial Ivory
  "2026-12-13": {
    cardBg: "bg-gradient-to-br from-[#fffef8] via-[#fbf3d8] to-[#f8e7b3]",
    borderColor: "border-[#e9cc7b] hover:border-[#d4b04f]",
    accentBar: "bg-[#9b7617]",
    badgeBg: "bg-[#f6e5aa]",
    badgeText: "text-[#553c03]",
    badgeBorder: "border-[#dec066]",
    titleColor: "text-[#1e1501]",
    descColor: "text-[#382a06]",
    venueColor: "text-[#4d3d11]",
    iconBg: "bg-[#f8eabf]",
    dateBadgeBg: "bg-[#fbf3d8]",
    dateBadgeText: "text-[#624706]",
    dateBadgeBorder: "border-[#dec066]",
  },
};

const defaultDateTheme: DateTheme = {
  cardBg: "bg-gradient-to-br from-[#fffdfa] via-[#fbf4e6] to-[#f7e8ce]",
  borderColor: "border-[#e0caa1] hover:border-[#c9ab73]",
  accentBar: "bg-[#b8860b]",
  badgeBg: "bg-[#f5e6cb]",
  badgeText: "text-[#5e410b]",
  badgeBorder: "border-[#dfc499]",
  titleColor: "text-[#22170a]",
  descColor: "text-[#3c2d18]",
  venueColor: "text-[#4a3b27]",
  iconBg: "bg-[#f7ebd2]",
  dateBadgeBg: "bg-[#fbf4e6]",
  dateBadgeText: "text-[#6b4c12]",
  dateBadgeBorder: "border-[#dfc499]",
};

export function Celebrations() {
  const { t } = useLanguage();
  const rawGroups = groupEventsByDate();

  // Merge the 13 Dec Anand Karaj event into the 12 Dec celebration night
  // so there is no separate "13 December" date header or provisional banner
  const groups: { date: string; events: WeddingEvent[] }[] = [];
  for (const g of rawGroups) {
    if (g.date === "2026-12-13") {
      const prev = groups.find((grp) => grp.date === "2026-12-12");
      if (prev) {
        prev.events.push(...g.events.map((e) => ({ ...e, provisional: false })));
      } else {
        groups.push(g);
      }
    } else {
      groups.push({ ...g, events: [...g.events] });
    }
  }

  return (
    <section id="celebrations" className="section-pad relative overflow-hidden">
      {/* Warm royal ambient illumination */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,220,170,0.35)_0%,transparent_60%),radial-gradient(ellipse_at_70%_75%,rgba(247,230,210,0.35)_0%,transparent_60%)]" />
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow">{t.celebrations.eyebrow}</p>
          <h2 className="serif-xl mt-3">{t.celebrations.title}</h2>
          <p className="mt-4 font-display text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t.celebrations.subtitle[0]}
            <br />
            {t.celebrations.subtitle[1]}
          </p>
        </Reveal>

        <div className="mt-10">
          {groups.map((group) => {
            const d = formatDateParts(group.date, t);
            const provisional = group.events.some((e) => e.provisional);
            const theme = dateThemes[group.date] ?? defaultDateTheme;

            return (
              <div key={group.date} className="mt-12 first:mt-0">
                <Reveal>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-4 py-1.5 shadow-xs",
                        theme.dateBadgeBg,
                        theme.dateBadgeBorder,
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-xl font-bold leading-none md:text-2xl",
                          theme.dateBadgeText,
                        )}
                      >
                        {d.day} {d.month}
                      </span>
                    </span>
                    <span className="font-sans text-[0.82rem] font-bold uppercase tracking-wider text-stone-800">
                      {d.weekday} · {d.year}
                    </span>
                    {provisional && (
                      <span className="inline-block rounded-full border border-gold px-2.5 py-0.5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-deep">
                        {t.celebrations.provisional}
                      </span>
                    )}
                  </div>
                </Reveal>

                <ul className="mt-4 space-y-4">
                  {group.events.map((e, i) => {
                    const copy = t.events[e.id];
                    const venue = t.venues[e.venueId];
                    const venueLine =
                      copy.venueNote ??
                      [venue.name, venue.sub, venue.address].filter(Boolean).join(", ");
                    return (
                      <li
                        key={e.id}
                        className={cn(
                          "relative overflow-hidden rounded-2xl border p-4 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.18)] sm:p-5 md:p-6",
                          theme.cardBg,
                          theme.borderColor,
                        )}
                      >
                        {/* Colored accent bar on the left */}
                        <div
                          className={cn("absolute bottom-0 left-0 top-0 w-1.5", theme.accentBar)}
                        />

                        <Reveal
                          delay={Math.min(i * 40, 120)}
                          className="flex items-center gap-3.5 pl-1 sm:gap-5 md:gap-6"
                        >
                          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105 sm:h-32 sm:w-32 md:h-36 md:w-36">
                            <img
                              src={eventIcons[e.icon]}
                              alt=""
                              width={256}
                              height={256}
                              loading="lazy"
                              className="h-full w-full rounded-2xl object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={cn(
                                  "inline-flex items-center rounded-md border px-2.5 py-0.5 font-sans text-[0.72rem] font-bold uppercase tracking-wider shadow-xs",
                                  theme.badgeBg,
                                  theme.badgeText,
                                  theme.badgeBorder,
                                )}
                              >
                                {copy.time}
                              </span>
                              {copy.dress && (
                                <span
                                  className={cn(
                                    "inline-flex items-center rounded-md border px-2 py-0.5 font-sans text-[0.66rem] font-medium tracking-wide",
                                    theme.badgeBg,
                                    theme.badgeText,
                                    theme.badgeBorder,
                                  )}
                                >
                                  {t.celebrations.dress}: {copy.dress}
                                </span>
                              )}
                            </div>

                            <h4
                              className={cn(
                                "mt-2 font-display text-[1.65rem] font-semibold leading-tight md:text-[1.85rem]",
                                theme.titleColor,
                              )}
                            >
                              {copy.name}
                            </h4>

                            <p
                              className={cn(
                                "mt-1.5 font-sans text-[0.88rem] font-medium leading-relaxed",
                                theme.descColor,
                              )}
                            >
                              {copy.description}
                            </p>

                            <p
                              className={cn(
                                "mt-2.5 flex items-start gap-1.5 font-sans text-[0.78rem] font-semibold",
                                theme.venueColor,
                              )}
                            >
                              <MapPin
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80"
                                strokeWidth={2}
                              />
                              <span>
                                <span className="sr-only">{t.celebrations.venue}: </span>
                                {venueLine}
                              </span>
                            </p>
                          </div>
                        </Reveal>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-8">
          <a
            href="#venues"
            className="group flex items-center gap-3 border-y border-border py-4 font-sans text-[0.78rem] font-medium transition-colors hover:text-gold-deep"
          >
            <MapPin className="h-4 w-4 text-gold-deep" strokeWidth={1.5} />
            <span className="flex-1">{t.celebrations.venuesLink}</span>
            <ChevronRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
