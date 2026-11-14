import { useEffect, useRef, useState } from "react";
import { Music, VolumeX, Volume2 } from "lucide-react";
import songFile from "@/assets/song.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.8;
    audio.loop = true;

    // Attempt direct autoplay on load
    const startPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy (expected on mobile without gesture)
          setIsPlaying(false);
        });
    };

    startPlay();

    // Unlock audio on the first user interaction anywhere on the screen (Android & iOS Safari)
    const unlock = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {});

      // Cleanup unlock listeners once triggered
      events.forEach((evt) => {
        window.removeEventListener(evt, unlock);
        document.removeEventListener(evt, unlock);
      });
    };

    const events = ["touchstart", "touchend", "pointerdown", "click", "scroll"];
    events.forEach((evt) => {
      window.addEventListener(evt, unlock, { once: true, passive: true });
      document.addEventListener(evt, unlock, { once: true, passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, unlock);
        document.removeEventListener(evt, unlock);
      });
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {});
    }
  };

  // Ensure repeat if audio ends
  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={songFile || "/song.mp3"}
        loop
        preload="auto"
        playsInline
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Royal Music Control */}
      <aside
        aria-label="Background music"
        className="fixed bottom-5 right-5 z-50 flex items-center sm:bottom-6 sm:right-6 pointer-events-auto"
      >
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
          className={`group flex items-center gap-2 rounded-full border px-3.5 py-2 shadow-[0_8px_25px_-6px_rgba(148,100,32,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
            isPlaying
              ? "border-gold-soft/80 bg-white/95 text-stone-900"
              : "border-gold-soft/90 bg-amber-50/95 text-amber-950 animate-pulse"
          }`}
        >
          {isPlaying ? (
            <>
              <div className="relative flex h-5 w-5 items-center justify-center">
                <Music className="h-4 w-4 text-amber-800 animate-spin [animation-duration:5s]" />
              </div>
              {/* Animated wave bars */}
              <div className="flex h-3 items-end gap-0.5" aria-hidden="true">
                <span className="w-0.5 bg-amber-800 rounded-full animate-pulse h-2" />
                <span className="w-0.5 bg-amber-800 rounded-full animate-pulse h-3.5 [animation-delay:150ms]" />
                <span className="w-0.5 bg-amber-800 rounded-full animate-pulse h-2 [animation-delay:300ms]" />
              </div>
              <span className="font-sans text-xs font-semibold text-stone-800 tracking-wide">
                Music
              </span>
            </>
          ) : (
            <>
              <div className="flex h-5 w-5 items-center justify-center">
                <VolumeX className="h-4 w-4 text-stone-600" />
              </div>
              <span className="font-sans text-xs font-semibold text-amber-950 tracking-wide">
                Play Music 🎵
              </span>
            </>
          )}
        </button>
      </aside>
    </>
  );
}
