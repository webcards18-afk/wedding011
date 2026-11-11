import { ArrowUpRight } from "lucide-react";
import { eventsAtVenue } from "@/config/events";
import { mapsUrl, venues } from "@/config/venues";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function Venues() {
  const { t } = useLanguage();
  return (
    <section id="venues" className="px-[clamp(1.25rem,4vw,3.5rem)] pb-20 pt-20 md:pt-24">
      <Reveal className="text-center">
        <p className="eyebrow">{t.venuesSection.eyebrow}</p>
        <h2 className="serif-xl mt-3">{t.venuesSection.title}</h2>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-6xl gap-x-12 gap-y-20 md:grid-cols-2">
        {venues.map((v, i) => {
          const copy = t.venues[v.id];
          const here = eventsAtVenue(v.id).map((e) => t.events[e.id].name);
          return (
            <article
              key={v.id}
              className="rounded-3xl border border-gold-soft/50 bg-cream-soft/60 p-6 text-center shadow-[0_12px_40px_-15px_rgba(148,100,32,0.1)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_16px_45px_-12px_rgba(148,100,32,0.2)]"
            >
              <Reveal
                image
                delay={60}
                className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold-soft/40 shadow-md"
              >
                <img
                  src={v.image}
                  alt={copy.name}
                  width={1400}
                  height={966}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </Reveal>
              <Reveal delay={100} className="mx-auto max-w-sm pt-8">
                <p className="eyebrow">{here.join(" · ")}</p>
                <h3 className="serif-title mt-3">{copy.name}</h3>
                {copy.sub && (
                  <p className="mt-2 font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em] text-gold-deep">
                    {copy.sub}
                  </p>
                )}
                <p className="detail mt-3">{copy.address}</p>
                <a
                  href={mapsUrl(v.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet mt-5"
                >
                  {t.venuesSection.directions}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.3} />
                </a>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
