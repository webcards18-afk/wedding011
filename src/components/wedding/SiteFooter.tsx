import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Monogram } from "./Monogram";

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="px-[clamp(1.25rem,5vw,4rem)] pb-14 pt-24 md:pb-20 md:pt-40">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Monogram className="w-16" />
          <p className="font-sans text-[0.68rem] text-muted-foreground">{t.footer.withLove}</p>
          <p className="font-sans text-[0.68rem] text-muted-foreground/80">{t.footer.address}</p>
        </div>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
