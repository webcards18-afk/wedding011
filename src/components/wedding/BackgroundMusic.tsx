import { useEffect, useRef } from "react";
import songFile from "@/assets/song.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;
    audio.loop = true;
    audio.muted = false;

    // 1. Immediate play attempt on load (works on desktop and browsers where permitted)
    audio.play().catch(() => {});

    // 2. Play immediately on ANY user touch or interaction on mobile (iOS Safari & Android Chrome)
    const playAudio = () => {
      const el = audioRef.current;
      if (!el) return;
      el.muted = false;
      if (el.paused) {
        el.play().catch(() => {});
      }
    };

    const events = ["touchstart", "touchend", "pointerdown", "click", "scroll"];
    events.forEach((evt) => {
      window.addEventListener(evt, playAudio, { capture: true, passive: true });
      document.addEventListener(evt, playAudio, { capture: true, passive: true });
      document.body?.addEventListener(evt, playAudio, { capture: true, passive: true });
    });

    // 3. Auto-resume if tab becomes active
    const handleVisibility = () => {
      if (!document.hidden && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, playAudio, true);
        document.removeEventListener(evt, playAudio, true);
        document.body?.removeEventListener(evt, playAudio, true);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Seamless replay whenever song finishes
  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      playsInline
      onEnded={handleEnded}
      className="sr-only"
      aria-hidden="true"
    >
      <source src={songFile} type="audio/mpeg" />
      <source src="/song.mp3" type="audio/mpeg" />
      <source src="/assets/song.mp3" type="audio/mpeg" />
    </audio>
  );
}
