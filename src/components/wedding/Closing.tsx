import { ArrowUp } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage } from "@/i18n/LanguageContext";
import { Monogram } from "./Monogram";
import { Reveal } from "./Reveal";

export function Closing() {
  const { t } = useLanguage();
  return (
    <section id="closing" className="section-pad relative overflow-hidden text-center">
      {/* Warm royal candlelight ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,rgba(245,218,165,0.4)_0%,rgba(250,246,238,0.7)_60%,transparent_85%)]" />

      <Reveal>
        <p className="eyebrow">{t.closing.eyebrow}</p>
        <h2 className="serif-xl mt-4 text-muted-foreground">{t.closing.title}</h2>
      </Reveal>
      <Reveal delay={150}>
        <Monogram className="animate-float-soft mx-auto mt-8 w-36 md:w-44" />
        <p className="mt-4 font-display text-xl uppercase tracking-[0.25em]">
          {t.couple.groom} {t.couple.amp} {t.couple.bride}
        </p>
      </Reveal>
      <Reveal delay={250}>
        <p className="sr-only">{t.closing.hashtags}</p>
        <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-3 gap-y-2">
          {wedding.hashtags.map((h) => (
            <li
              key={h}
              className="rounded-full border border-gold-soft/60 bg-cream-soft/70 px-3.5 py-1 font-sans text-[0.75rem] text-gold-deep shadow-sm backdrop-blur-sm transition-colors hover:border-gold hover:text-ink"
            >
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-14 font-sans text-[0.72rem] text-muted-foreground">{t.closing.dates}</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group mt-6 inline-flex items-center gap-2 rounded-full border border-gold-soft/70 bg-cream-soft/80 px-4 py-2 font-sans text-[0.75rem] text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:border-gold hover:text-foreground hover:shadow-md"
        >
          {t.closing.backToTop}
          <ArrowUp
            className="h-3 w-3 text-gold transition-transform duration-500 group-hover:-translate-y-1"
            strokeWidth={1.5}
          />
        </button>
      </Reveal>
    </section>
  );
}
