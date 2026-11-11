import { media } from "@/config/media";
import { useLanguage } from "@/i18n/LanguageContext";
import { Countdown } from "./Countdown";

/**
 * Illustrated palace arch with the couple photograph framed inside it,
 * invitation text above and dates + live countdown over the photo.
 */
export function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-0 pb-3 pt-14 md:min-h-0 md:px-[3vw] md:pb-6 md:pt-16"
      aria-label={t.hero.invited}
    >
      {/* Warm royal ambient illumination behind the arch */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(245,220,170,0.5)_0%,rgba(250,246,238,0.85)_55%,transparent_85%)]" />

      <div className="@container relative mx-auto flex w-full max-w-[1440px] items-center justify-center">
        <div className="relative w-full overflow-hidden bg-cream shadow-[0_20px_50px_-15px_rgba(148,100,32,0.3)] max-md:aspect-[1088/1600] max-md:max-h-[calc(100dvh-4.75rem)] max-md:w-auto max-md:max-w-[calc(100vw-1rem)] max-md:rounded-xl md:rounded-none md:shadow-none">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={media.heroFrame.desktop}
              width={1920}
              height={1312}
            />
            <img
              src={media.heroFrame.mobile}
              alt=""
              width={1088}
              height={1600}
              fetchPriority="high"
              className="animate-hero-reveal block h-full w-full object-contain md:h-auto md:w-full md:object-cover"
            />
          </picture>

          {/* Couple photograph inside the arch */}
          <div className="animate-rise absolute left-[23%] top-[42.5%] h-[39%] w-[54%] overflow-hidden shadow-[var(--shadow-soft)] [animation-delay:700ms] md:left-[36.5%] md:top-[28.5%] md:h-[53.5%] md:w-[27%]">
            <img
              src={media.heroCouple.src}
              alt={`${t.couple.groom} ${t.couple.amp} ${t.couple.bride}`}
              width={media.heroCouple.width}
              height={media.heroCouple.height}
              className="h-full w-full object-cover object-[50%_18%]"
            />
            <div className="veil-bottom absolute inset-0" />
          </div>

          {/* Shri Ganesh */}
          <img
            src={media.ganesh.src}
            alt="Shri Ganesh"
            width={media.ganesh.width}
            height={media.ganesh.height}
            className="animate-rise absolute left-1/2 top-[19.5%] w-[12cqw] -translate-x-1/2 [animation-delay:300ms] md:top-[4.5%] md:w-[4.6cqw]"
          />

          {/* Invitation text */}
          <div className="on-photo animate-rise absolute inset-x-0 top-[28.5%] flex flex-col items-center text-center [animation-delay:500ms] md:top-[14.5%]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[150%] w-[70cqw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ink)_42%,transparent),transparent_68%)] md:w-[34cqw]" />
            <p className="relative font-sans text-[max(0.55rem,2.4cqw)] font-medium uppercase tracking-[0.3em] md:text-[max(0.6rem,0.72cqw)]">
              {t.hero.invited}
            </p>
            <p className="relative mt-[1.2cqw] font-display text-[4.8cqw] italic md:mt-[0.5cqw] md:text-[1.7cqw]">
              {t.hero.toTheWedding}
            </p>
            <h1 className="relative mt-[0.6cqw] whitespace-nowrap font-display text-[8cqw] font-medium leading-none md:mt-[0.2cqw] md:text-[3.7cqw]">
              {t.couple.groom}
              <span className="mx-[1.5cqw] italic text-gold-soft md:mx-[0.6cqw]">
                {t.couple.amp}
              </span>
              {t.couple.bride}
            </h1>
          </div>

          {/* Dates, place and countdown over the photo */}
          <div className="on-photo animate-rise absolute inset-x-0 bottom-[20.5%] flex flex-col items-center text-center [animation-delay:1100ms] md:bottom-[20.5%]">
            <p className="font-sans text-[max(0.8rem,4cqw)] font-medium md:text-[1.3cqw]">
              {t.hero.dates}
            </p>
            <p className="mt-[0.5cqw] font-sans text-[max(0.6rem,2.7cqw)] opacity-90 md:mt-[0.2cqw] md:text-[0.85cqw]">
              {t.hero.place}
            </p>
            <p className="mb-[1.6cqw] mt-[2.6cqw] font-sans text-[max(0.5rem,2.1cqw)] uppercase tracking-[0.3em] opacity-85 md:mb-[0.6cqw] md:mt-[1.1cqw] md:text-[max(0.55rem,0.62cqw)]">
              {t.countdown.eyebrow}
            </p>
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  );
}
