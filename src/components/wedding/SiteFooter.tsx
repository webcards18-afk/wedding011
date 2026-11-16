import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Monogram } from "./Monogram";

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="px-[clamp(1.25rem,5vw,4rem)] pb-14 pt-24 md:pb-20 md:pt-40">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 md:grid md:grid-cols-3 md:items-end">
        <div className="order-1 flex flex-col items-center gap-3 md:items-start">
          <Monogram className="w-16" />
          <p className="font-display text-sm font-medium text-stone-800">{t.footer.withLove}</p>
          <p className="font-sans text-xs text-stone-600">{t.footer.address}</p>
        </div>
        <div className="order-3 flex justify-center text-center md:order-2">
          <p className="font-sans text-xs tracking-wider text-stone-500">
            created by <span className="font-medium text-stone-700">@prashantharts</span>
          </p>
        </div>
        <div className="order-2 flex justify-center md:order-3 md:justify-end">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
