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
      className="relative flex h-[100dvh] min-h-[100dvh] w-full items-center justify-center overflow-hidden m-0 p-0 md:h-auto md:min-h-0 md:px-[3vw] md:pb-6 md:pt-16"
      aria-label={t.hero.invited}
    >
      <div className="@container relative flex h-full w-full items-center justify-center overflow-hidden max-w-[1440px] mx-auto md:aspect-auto">
        {/* Full-screen cover on mobile, maintains palace arch proportions */}
        <div className="relative flex aspect-[1088/1600] h-full w-auto min-h-full min-w-full items-center justify-center overflow-hidden md:aspect-[1920/1312] md:h-auto md:w-full">
          <picture className="absolute inset-0 h-full w-full">
            <source
              media="(min-width: 768px)"
              srcSet={media.heroFrame.desktop}
              width={1920}
              height={1312}
            />
            <img
              src={media.heroFrame.mobile}
              alt=""
              width={1025}
              height={1535}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </picture>

          {/* Shri Ganesh */}
          <img
            src={media.ganesh.src}
            alt="Shri Ganesh"
            width={media.ganesh.width}
            height={media.ganesh.height}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute left-1/2 top-[12%] w-[11.5cqw] -translate-x-1/2 md:top-[4.5%] md:w-[4.6cqw]"
          />

          {/* Invitation text */}
          <div className="on-photo absolute inset-x-0 top-[19%] flex flex-col items-center text-center md:top-[14.5%]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[150%] w-[70cqw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ink)_42%,transparent),transparent_68%)] md:w-[34cqw]" />
            <p className="relative font-sans text-[max(0.55rem,2.2cqw)] font-medium uppercase tracking-[0.3em] md:text-[max(0.6rem,0.72cqw)]">
              {t.hero.invited}
            </p>
            <p className="relative mt-[0.8cqw] font-display text-[4.3cqw] italic md:mt-[0.5cqw] md:text-[1.7cqw]">
              {t.hero.toTheWedding}
            </p>
            <h1 className="relative mt-[0.4cqw] whitespace-nowrap font-display text-[7.5cqw] font-medium leading-none md:mt-[0.2cqw] md:text-[3.7cqw]">
              {t.couple.groom}
              <span className="mx-[1.2cqw] italic text-gold-soft md:mx-[0.6cqw]">
                {t.couple.amp}
              </span>
              {t.couple.bride}
            </h1>
          </div>

          {/* Dates, place and countdown over the photo */}
          <div className="on-photo absolute inset-x-0 bottom-[20.5%] flex flex-col items-center text-center md:bottom-[20.5%]">
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
