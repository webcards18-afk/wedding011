import { useEffect, useRef, useCallback } from "react";
import songFile from "@/assets/song.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const attemptPlay = useCallback(() => {
    // 1. Resume AudioContext if available (critical for mobile WebKit & iOS Safari)
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }

    // 2. Play audio element
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If unmuted autoplay blocked on initial zero-touch load, start muted so playback begins,
        // and automatically unmute on the very first touch/gesture.
        audio.muted = true;
        audio.play().catch(() => {});
      });
    }
  }, []);

  useEffect(() => {
    // Initialize Web Audio API context for mobile audio unlock
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    } catch {
      // AudioContext unavailable
    }

    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.8;
      audio.loop = true;
      audio.load();
    }

    // Direct autoplay attempt on load
    attemptPlay();

    // Capture-phase gesture listeners for mobile (iOS Safari & Android Chrome)
    const onMobileInteraction = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }

      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
      }
    };

    const gestureEvents = ["touchstart", "touchend", "pointerdown", "pointerup", "click"];

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, onMobileInteraction, { capture: true, passive: true });
      document.addEventListener(evt, onMobileInteraction, { capture: true, passive: true });
    });

    // Resume playback if tab/window becomes visible again
    const onVisibilityChange = () => {
      if (!document.hidden && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, onMobileInteraction, true);
        document.removeEventListener(evt, onMobileInteraction, true);
      });
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [attemptPlay]);

  // Seamless continuous replay whenever track finishes
  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return (
    <audio
      ref={audioRef}
      src={songFile || "/song.mp3"}
      autoPlay
      loop
      preload="auto"
      playsInline
      onEnded={handleEnded}
    >
      <source src={songFile} type="audio/mpeg" />
      <source src="/song.mp3" type="audio/mpeg" />
      <source src="/assets/song.mp3" type="audio/mpeg" />
    </audio>
  );
}
