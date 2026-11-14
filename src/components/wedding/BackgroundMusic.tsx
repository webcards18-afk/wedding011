import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import songFile from "@/assets/song.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const attemptPlay = useCallback(() => {
    // 1. Resume AudioContext if available (critical for mobile WebKit & iOS Safari)
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }

    // 2. Play HTML5 Audio element
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // If unmuted autoplay blocked on initial zero-touch load, start muted so playback starts
          // immediately, and auto-unmute on first touch.
          audio.muted = true;
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {});
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
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {});
      }
    };

    const gestureEvents = ["touchstart", "touchend", "pointerdown", "pointerup", "click"];

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, onMobileInteraction, { capture: true, passive: true });
      document.addEventListener(evt, onMobileInteraction, { capture: true, passive: true });
    });

    return () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, onMobileInteraction, true);
        document.removeEventListener(evt, onMobileInteraction, true);
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [attemptPlay]);

  // Seamless replay if track reaches end
  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {});
    } else if (audio.muted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={songFile || "/song.mp3"}
        autoPlay
        loop
        preload="auto"
        playsInline
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={songFile} type="audio/mpeg" />
        <source src="/song.mp3" type="audio/mpeg" />
        <source src="/assets/song.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Sound Control (Discreet Speaker Ripple) */}
      <aside
        aria-label="Sound control"
        className="fixed bottom-5 right-5 z-50 pointer-events-auto sm:bottom-6 sm:right-6"
      >
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted || !isPlaying ? "Unmute sound" : "Mute sound"}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/80 bg-white/95 shadow-[0_8px_25px_-6px_rgba(148,100,32,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {isMuted || !isPlaying ? (
            <VolumeX className="h-5 w-5 text-stone-500 transition-colors group-hover:text-stone-700" />
          ) : (
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-1 rounded-full bg-amber-400/25 animate-ping" />
              <Volume2 className="h-5 w-5 text-amber-800 transition-colors group-hover:text-amber-900" />
            </div>
          )}
        </button>
      </aside>
    </>
  );
}
