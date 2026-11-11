import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { getTimeLeft, type TimeLeft } from "@/lib/countdown";
import { useLanguage } from "@/i18n/LanguageContext";

export function Countdown() {
  const { t } = useLanguage();
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setLeft(getTimeLeft(wedding.countdownTarget));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (left?.done) {
    return (
      <p className="font-display text-[max(1rem,4.5cqw)] md:text-[1.6cqw]">{t.countdown.done}</p>
    );
  }

  const units: [number | undefined, string][] = [
    [left?.days, t.countdown.days],
    [left?.hours, t.countdown.hours],
    [left?.minutes, t.countdown.minutes],
    [left?.seconds, t.countdown.seconds],
  ];

  return (
    <div className="flex items-start justify-center gap-[5cqw] md:gap-[1.8cqw]" aria-live="off">
      {units.map(([value, label]) => (
        <div key={label} className="flex min-w-[9cqw] flex-col items-center md:min-w-[3.2cqw]">
          <span
            key={value}
            className="animate-tick font-sans text-[max(1.1rem,6.4cqw)] font-medium leading-none tabular-nums md:text-[2.2cqw]"
          >
            {value === undefined ? "––" : String(value).padStart(2, "0")}
          </span>
          <span className="mt-1.5 font-sans text-[max(0.55rem,2.3cqw)] opacity-85 md:text-[max(0.6rem,0.72cqw)]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
