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
              "border-b px-3 py-2 font-sans text-xs transition-colors duration-300",
              active
                ? "border-gold text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {l.code === "en" ? "EN" : l.label}
          </button>
        );
      })}
    </div>
  );
}
