import { media } from "@/config/media";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function Families() {
  const { t } = useLanguage();
  const columns = [
    {
      name: t.couple.groom,
      relation: t.families.sonOf,
      parents: [t.people.vaishali, t.people.deepak],
    },
    {
      name: t.couple.bride,
      relation: t.families.daughterOf,
      parents: [t.people.sanya, t.people.sanjeev],
    },
  ];

  return (
    <section id="families" className="section-pad relative overflow-hidden text-center">
      {/* Warm royal ambient illumination */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(247,235,215,0.45)_0%,transparent_70%)]" />

      <Reveal>
        <p className="eyebrow">{t.families.eyebrow}</p>
        <h2 className="serif-title mt-3">{t.families.title}</h2>
      </Reveal>

      <Reveal image delay={150} className="mx-auto mt-10 w-full max-w-[280px] md:max-w-[300px]">
        <div className="overflow-hidden rounded-2xl border border-gold-soft/50 bg-cream-soft/50 p-2 shadow-[0_12px_40px_-15px_rgba(148,100,32,0.15)]">
          <img
            src={media.familyIllustration.src}
            alt={`${t.couple.groom} ${t.couple.amp} ${t.couple.bride}`}
            width={media.familyIllustration.width}
            height={media.familyIllustration.height}
            loading="lazy"
            className="block aspect-square w-full rounded-xl object-cover"
          />
        </div>
      </Reveal>

      <Reveal
        delay={250}
        className="mx-auto mt-10 grid max-w-lg grid-cols-2 rounded-2xl border border-gold-soft/60 bg-cream-soft/70 p-6 shadow-[0_10px_35px_-15px_rgba(148,100,32,0.12)] backdrop-blur-sm"
      >
        {columns.map((c, i) => (
          <div key={c.name} className={i === 0 ? "border-r border-gold-soft pr-4" : "pl-4"}>
            <h3 className="font-display text-2xl">{c.name}</h3>
            <p className="mt-1 font-display text-xs italic text-muted-foreground">{c.relation}</p>
            <div className="mt-3 space-y-0.5 font-display text-[0.95rem] leading-snug">
              <p>{c.parents[0]}</p>
              <p>{c.parents[1]}</p>
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal delay={350}>
        <p className="mx-auto mt-10 max-w-xs font-display text-lg leading-relaxed text-foreground/85">
          {t.families.closing}
        </p>
        <p className="eyebrow mt-6">
          {t.families.hostedBy} · {t.families.host}
        </p>
      </Reveal>
    </section>
  );
}
