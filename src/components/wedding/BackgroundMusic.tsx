import { useEffect, useRef } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;
    audio.loop = true;
    audio.muted = false;

    // Helper to attempt playback and keep it playing continuously
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
            // Autoplay waiting for gesture
          });
        }
      }
    };

    // 1. Immediate trigger on component mount (for desktop / allowed browsers)
    startPlayback();

    // 2. Comprehensive scroll & interaction triggers (especially for mobile scrolling)
    // As soon as the user starts scrolling (touch, swipe, wheel, drag, or scroll event),
    // music starts playing continuously.
    const scrollAndInteractionEvents = [
      "scroll",
      "touchmove",
      "touchstart",
      "touchend",
      "wheel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "mousedown",
      "mouseup",
      "click",
      "keydown",
    ];

    const onScrollOrInteract = () => {
      startPlayback();
    };

    scrollAndInteractionEvents.forEach((evt) => {
      window.addEventListener(evt, onScrollOrInteract, { capture: true, passive: true });
      document.addEventListener(evt, onScrollOrInteract, { capture: true, passive: true });
      document.body?.addEventListener(evt, onScrollOrInteract, { capture: true, passive: true });
      document.documentElement.addEventListener(evt, onScrollOrInteract, {
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

    // 4. If audio pauses unexpectedly while visible, auto-resume to ensure continuous playback
    const handlePause = () => {
      if (!document.hidden) {
        setTimeout(startPlayback, 100);
      }
    };
    audio.addEventListener("pause", handlePause);

    // 5. Ensure seamless continuous looping
    const handleEnded = () => {
      const el = audioRef.current;
      if (!el) return;
      el.currentTime = 0;
      startPlayback();
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      scrollAndInteractionEvents.forEach((evt) => {
        window.removeEventListener(evt, onScrollOrInteract, true);
        document.removeEventListener(evt, onScrollOrInteract, true);
        document.body?.removeEventListener(evt, onScrollOrInteract, true);
        document.documentElement.removeEventListener(evt, onScrollOrInteract, true);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", startPlayback);
      window.removeEventListener("focus", startPlayback);
      audio.removeEventListener("pause", handlePause);
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
