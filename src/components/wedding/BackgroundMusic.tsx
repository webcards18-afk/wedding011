import { useEffect, useRef } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;
    audio.loop = true;

    // Helper to attempt unmuted playback
    const startPlayback = () => {
      const el = audioRef.current;
      if (!el) return;

      // Unlock Web Audio API context for iOS Safari
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const w = window as unknown as { __sharedAudioCtx?: AudioContext };
          if (!w.__sharedAudioCtx) {
            w.__sharedAudioCtx = new AudioContextClass();
          }
          if (w.__sharedAudioCtx.state === "suspended") {
            w.__sharedAudioCtx.resume().catch(() => {});
          }
        }
      } catch {
        // Ignore AudioContext errors
      }

      el.muted = false;
      if (el.paused) {
        const promise = el.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay waiting for user gesture
          });
        }
      }
    };

    // 1. Immediate trigger on component mount (works on desktop / permitted environments)
    startPlayback();

    // 2. High-priority user interaction listeners for Mobile (iOS Safari & Android Chrome)
    // Any touch, tap, or interaction triggers instant playback
    const interactionEvents = [
      "touchstart",
      "touchend",
      "pointerdown",
      "pointerup",
      "mousedown",
      "mouseup",
      "click",
      "scroll",
    ];

    const onUserInteraction = () => {
      startPlayback();
    };

    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
      document.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
      document.documentElement.addEventListener(evt, onUserInteraction, {
        capture: true,
        passive: true,
      });
    });

    // 3. Keep audio playing / resume when user returns to page/tab
    const handleVisibility = () => {
      if (!document.hidden) {
        startPlayback();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", startPlayback);
    window.addEventListener("focus", startPlayback);

    // 4. Ensure seamless continuous looping
    const handleEnded = () => {
      const el = audioRef.current;
      if (!el) return;
      el.currentTime = 0;
      startPlayback();
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserInteraction, true);
        document.removeEventListener(evt, onUserInteraction, true);
        document.documentElement.removeEventListener(evt, onUserInteraction, true);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", startPlayback);
      window.removeEventListener("focus", startPlayback);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/song.mp3"
      preload="auto"
      autoPlay
      loop
      playsInline
      style={{
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: "1px",
        height: "1px",
        opacity: 0.001,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <source src="/song.mp3" type="audio/mpeg" />
      <source src="/assets/song.mp3" type="audio/mpeg" />
    </audio>
  );
}
