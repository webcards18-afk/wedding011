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
        <h2 className="serif-xl mt-4 text-stone-900 font-normal drop-shadow-xs">
          {t.closing.title}
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <Monogram className="animate-float-soft mx-auto mt-8 w-36 md:w-44" />
        <p className="mt-5 font-display text-2xl sm:text-3xl font-semibold uppercase tracking-[0.22em] text-gold-deep">
          {t.couple.groom} {t.couple.amp} {t.couple.bride}
        </p>
      </Reveal>
      <Reveal delay={250}>
        <p className="sr-only">{t.closing.hashtags}</p>
        <ul className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2.5 sm:gap-3">
          {wedding.hashtags.map((h) => (
            <li
              key={h}
              className="rounded-full border border-gold-soft/80 bg-white/90 px-4 py-1.5 font-sans text-xs sm:text-sm font-semibold text-stone-800 shadow-xs backdrop-blur-sm transition-all hover:border-gold-deep hover:bg-gold-deep hover:text-white hover:shadow-md"
            >
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-12 font-display text-base sm:text-lg font-medium tracking-wide text-stone-800">
          {t.closing.dates}
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group mt-6 inline-flex items-center gap-2 rounded-full border border-gold-soft/90 bg-white/95 px-6 py-2.5 font-sans text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-sm transition-all hover:border-gold-deep hover:bg-gold-deep hover:text-white hover:shadow-md"
        >
          {t.closing.backToTop}
          <ArrowUp
            className="h-3.5 w-3.5 text-gold-deep transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-white"
            strokeWidth={2}
          />
        </button>
      </Reveal>
    </section>
  );
}
