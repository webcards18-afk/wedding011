import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages } from "@/i18n/translations";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.meta.languageLabel}
      className={cn("flex items-center gap-1", className)}
    >
      {languages.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.htmlLang}
            aria-pressed={active}
            onClick={() => setLang(l.code)}
            className={cn(
              "rounded-full px-2.5 py-1 font-sans text-xs font-semibold transition-all duration-200",
              active
                ? "bg-gold-deep text-white shadow-xs font-bold"
                : "text-stone-800 hover:bg-gold-soft/30 hover:text-stone-950",
            )}
          >
            {l.code === "en" ? "EN" : l.label}
          </button>
        );
      })}
    </div>
  );
}
