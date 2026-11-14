import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import songFile from "@/assets/song.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTapNotice, setShowTapNotice] = useState(false);

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setShowTapNotice(false);
        })
        .catch(() => {
          // If browser policy blocks unmuted autoplay on initial load without a gesture
          setIsPlaying(false);
          setShowTapNotice(true);
        });
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.8;
    audio.loop = true;

    // 1. Attempt immediate autoplay on load
    startPlayback();

    // 2. Setup capture-phase user gesture unlocking for mobile (iOS Safari & Android Chrome)
    // ONLY trusted gesture events: touchstart, touchend, pointerdown, click
    const unlockOnGesture = () => {
      const el = audioRef.current;
      if (!el) return;

      el.muted = false;
      const promise = el.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
            setShowTapNotice(false);
            // Only clean up after successful playback starts
            cleanupGestureListeners();
          })
          .catch(() => {
            // Keep listeners alive if still awaiting full gesture activation
          });
      }
    };

    const gestureEvents = ["touchstart", "touchend", "pointerdown", "pointerup", "click"];

    const cleanupGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, unlockOnGesture, true);
        document.removeEventListener(evt, unlockOnGesture, true);
      });
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, unlockOnGesture, { capture: true, passive: true });
      document.addEventListener(evt, unlockOnGesture, { capture: true, passive: true });
    });

    return () => {
      cleanupGestureListeners();
    };
  }, [startPlayback]);

  // Seamless replay if finished
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
          setShowTapNotice(false);
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
        onPlay={() => {
          setIsPlaying(true);
          setShowTapNotice(false);
        }}
        onPause={() => setIsPlaying(false)}
      >
        <source src={songFile} type="audio/mpeg" />
        <source src="/song.mp3" type="audio/mpeg" />
        <source src="/assets/song.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Sound Toggle */}
      <aside
        aria-label="Sound control"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 pointer-events-auto sm:bottom-6 sm:right-6"
      >
        {showTapNotice && !isPlaying && (
          <button
            type="button"
            onClick={startPlayback}
            className="animate-bounce rounded-full border border-gold-soft/90 bg-amber-50/95 px-3 py-1.5 shadow-[0_4px_20px_rgba(148,100,32,0.25)] backdrop-blur-md"
          >
            <p className="font-sans text-[0.72rem] font-bold text-amber-950 flex items-center gap-1.5">
              <span>🎵</span>
              <span>Tap to play music</span>
            </p>
          </button>
        )}

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted || !isPlaying ? "Unmute background music" : "Mute background music"}
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
