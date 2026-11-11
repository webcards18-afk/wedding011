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
        <p className="detail mx-auto mt-3 max-w-md">{t.contactsSection.intro}</p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-12 text-center sm:grid-cols-2 sm:gap-6">
        {sides.map(([title, list], i) => (
          <Reveal key={title} delay={i * 120}>
            <h3 className="serif-title !text-[1.75rem]">{title}</h3>
            <ul className="mt-4 space-y-4">
              {list.map((c) => {
                const href = whatsappLink(c.whatsapp, t.contactsSection.message);
                return (
                  <li key={c.id}>
                    <p className="font-sans text-[0.75rem] text-muted-foreground">
                      {t.people[c.person]} · {t.relations[c.relation]}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block font-sans text-[0.8rem] font-medium text-gold-deep underline-offset-4 hover:underline"
                      >
                        {t.contactsSection.whatsapp}
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="mt-1 inline-block font-sans text-[0.72rem] italic text-muted-foreground/80"
                      >
                        {t.contactsSection.whatsapp} · {t.contactsSection.pending}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
