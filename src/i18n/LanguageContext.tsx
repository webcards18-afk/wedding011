import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { languages, translations, type Dictionary, type Lang } from "./translations";

const STORAGE_KEY = "aa-wedding-lang";

interface LanguageState {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageState | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && saved in translations) setLangState(saved);
  }, []);

  useEffect(() => {
    const html = languages.find((l) => l.code === lang)?.htmlLang ?? "en";
    document.documentElement.lang = html;
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
