import { LanguageSwitcher } from "./LanguageSwitcher";
import { Monogram } from "./Monogram";

/** Thin bar above the hero with the monogram and language choice. */
export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-gold-soft/40 bg-ivory/80 px-[3vw] shadow-[0_4px_20px_-12px_rgba(148,100,32,0.15)] backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between md:h-16">
        <a
          href="#top"
          aria-label="Abhimanyu & Aashi"
          className="transition-opacity hover:opacity-80"
        >
          <Monogram className="w-10 md:w-11" />
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
