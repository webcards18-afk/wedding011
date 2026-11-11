import { LanguageSwitcher } from "./LanguageSwitcher";
import { Monogram } from "./Monogram";

/** Thin bar above the hero with the monogram and language choice. */
export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 pointer-events-none px-4 pt-3 transition-all md:pointer-events-auto md:border-b md:border-gold-soft/40 md:bg-ivory/80 md:px-[3vw] md:pt-0 md:shadow-[0_4px_20px_-12px_rgba(148,100,32,0.15)] md:backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between rounded-full border border-gold-soft/50 bg-cream-soft/80 px-4 shadow-[0_4px_15px_-4px_rgba(148,100,32,0.2)] backdrop-blur-md pointer-events-auto md:h-16 md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none">
        <a
          href="#top"
          aria-label="Abhimanyu & Aashi"
          className="transition-opacity hover:opacity-80"
        >
          <Monogram className="w-8 md:w-11" />
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
