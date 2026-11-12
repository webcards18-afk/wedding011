import { LanguageSwitcher } from "./LanguageSwitcher";
import { Monogram } from "./Monogram";

/** Thin bar above the hero with the monogram and language choice. */
export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 pointer-events-none px-4 pt-3 transition-all md:pointer-events-auto md:border-b md:border-gold-soft/60 md:bg-white/95 md:px-[3vw] md:pt-0 md:shadow-[0_4px_25px_-10px_rgba(0,0,0,0.12)] md:backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between rounded-full border border-gold-soft/80 bg-white/95 px-4 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.22)] backdrop-blur-md pointer-events-auto md:h-16 md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none">
        <a
          href="#top"
          aria-label="Abhimanyu & Aashi"
          className="transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <Monogram className="w-10 md:w-12 drop-shadow-xs" />
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
