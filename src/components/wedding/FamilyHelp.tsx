import { contacts, whatsappLink, type FamilyContact } from "@/config/contacts";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export function FamilyHelp() {
  const { t } = useLanguage();
  const sides: [string, FamilyContact[]][] = [
    [t.contactsSection.bridesSide, contacts.bride],
    [t.contactsSection.groomsSide, contacts.groom],
  ];

  return (
    <section id="family-help" className="px-[clamp(1.25rem,4vw,3.5rem)] pb-20 md:pb-24">
      <div className="hairline mx-auto max-w-2xl" />
      <Reveal className="mx-auto max-w-2xl pt-14 text-center">
        <p className="eyebrow">{t.contactsSection.eyebrow}</p>
        <p className="font-display text-base sm:text-lg italic text-stone-700 mx-auto mt-3 max-w-md">
          {t.contactsSection.intro}
        </p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        {sides.map(([title, list], i) => (
          <Reveal key={title} delay={i * 120}>
            <div className="h-full rounded-2xl border border-gold-soft/70 bg-gradient-to-b from-white/90 via-cream-soft/70 to-amber-50/40 p-5 sm:p-6 shadow-[0_8px_30px_-12px_rgba(148,100,32,0.14)] backdrop-blur-sm text-center">
              <h3 className="font-display text-2xl font-semibold text-stone-900 border-b border-gold-soft/50 pb-3">
                {title}
              </h3>
              <ul className="mt-5 space-y-4">
                {list.map((c) => {
                  const href = whatsappLink(c.whatsapp, t.contactsSection.message);
                  return (
                    <li
                      key={c.id}
                      className="rounded-xl border border-gold-soft/40 bg-white/70 p-3.5 shadow-xs transition-all hover:bg-white/90"
                    >
                      <p className="font-display text-base sm:text-lg font-semibold text-stone-900">
                        {t.people[c.person]}
                      </p>
                      <p className="font-display text-xs sm:text-sm italic text-amber-900/80 mt-0.5">
                        {t.relations[c.relation]}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 font-sans text-xs font-semibold text-emerald-800 shadow-xs transition-colors hover:bg-emerald-100"
                        >
                          {t.contactsSection.whatsapp}
                        </a>
                      ) : (
                        <span
                          aria-disabled="true"
                          className="mt-2.5 inline-block rounded-full border border-stone-200/80 bg-stone-100/90 px-3 py-0.5 font-sans text-xs text-stone-600"
                        >
                          {t.contactsSection.whatsapp} · {t.contactsSection.pending}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
