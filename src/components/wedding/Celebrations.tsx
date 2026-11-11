import { ChevronRight, MapPin } from "lucide-react";
import { groupEventsByDate } from "@/config/events";
import { eventIcons } from "@/config/media";
import { formatDateParts } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function Celebrations() {
  const { t } = useLanguage();
  const groups = groupEventsByDate();

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
            return (
              <div key={group.date} className="mt-10 first:mt-0">
                <Reveal>
                  <h3 className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="font-display text-[1.75rem] leading-none">
                      {d.day} {d.month}
                    </span>
                    <span className="font-sans text-[0.68rem] text-muted-foreground">
                      {d.weekday} · {d.year}
                    </span>
                  </h3>
                  {provisional && (
                    <p className="mt-2 inline-block border border-gold px-2 py-1 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-gold-deep">
                      {t.celebrations.provisional}
                    </p>
                  )}
                </Reveal>

                <ul className="mt-4">
                  {group.events.map((e, i) => {
                    const copy = t.events[e.id];
                    const venue = t.venues[e.venueId];
                    const venueLine =
                      copy.venueNote ??
                      [venue.name, venue.sub, venue.address].filter(Boolean).join(", ");
                    return (
                      <li
                        key={e.id}
                        className="my-3 rounded-2xl border border-gold-soft/50 bg-cream-soft/65 p-4 shadow-[0_8px_30px_-15px_rgba(148,100,32,0.08)] backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:bg-cream-soft/95 hover:shadow-[0_12px_35px_-12px_rgba(148,100,32,0.18)] md:p-6"
                      >
                        <Reveal delay={i * 90} className="flex gap-4 md:gap-6">
                          <img
                            src={eventIcons[e.icon]}
                            alt=""
                            width={192}
                            height={192}
                            loading="lazy"
                            className="mt-4 h-11 w-11 shrink-0 mix-blend-multiply md:h-12 md:w-12"
                          />
                          <div className="min-w-0">
                            <p className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.06em] text-gold-deep">
                              {copy.time}
                            </p>
                            <h4 className="mt-1 font-display text-[1.6rem] leading-tight">
                              {copy.name}
                            </h4>
                            <p className="detail mt-1">{copy.description}</p>
                            <p className="mt-2 flex items-start gap-1.5 font-sans text-[0.72rem] text-muted-foreground">
                              <MapPin
                                className="mt-[3px] h-3 w-3 shrink-0 text-gold-deep"
                                strokeWidth={1.5}
                              />
                              <span>
                                <span className="sr-only">{t.celebrations.venue}: </span>
                                {venueLine}
                              </span>
                            </p>
                            {copy.dress && (
                              <p className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.12em] text-gold-deep">
                                {t.celebrations.dress} · {copy.dress}
                              </p>
                            )}
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

        <Reveal className="mt-6">
          <a
            href="#venues"
            className="group flex items-center gap-3 border-y border-border py-3.5 font-sans text-[0.75rem] transition-colors hover:text-gold-deep"
          >
            <MapPin className="h-4 w-4 text-gold-deep" strokeWidth={1.3} />
            <span className="flex-1">{t.celebrations.venuesLink}</span>
            <ChevronRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.3}
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
