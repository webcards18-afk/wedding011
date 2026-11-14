import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import songFile from "@/assets/song.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.8;
    audio.loop = true;

    // Direct automatic playback on page load
    const attemptPlay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // If browser policy blocks unmuted autoplay without a prior gesture,
          // start playing muted so it is already running and buffered,
          // then unmute on the very first touch/scroll/pointer interaction.
          audio.muted = true;
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(true);
            })
            .catch(() => {});
        });
    };

    attemptPlay();

    // Unmute and start audio automatically on ANY user movement / touch / scroll
    const autoStartAudio = () => {
      if (!audioRef.current) return;
      const el = audioRef.current;
      el.muted = false;
      el.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {});

      // Remove once active
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, autoStartAudio);
        document.removeEventListener(evt, autoStartAudio);
      });
    };

    const gestureEvents = [
      "touchstart",
      "touchend",
      "touchmove",
      "pointerdown",
      "pointermove",
      "scroll",
      "wheel",
      "click",
      "keydown",
      "pageshow",
      "visibilitychange",
    ];

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, autoStartAudio, { passive: true });
      document.addEventListener(evt, autoStartAudio, { passive: true });
    });

    return () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, autoStartAudio);
        document.removeEventListener(evt, autoStartAudio);
      });
    };
  }, []);

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

  // Seamless replay if finished
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
        autoPlay
        loop
        preload="auto"
        playsInline
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Floating Royal Sound Pill (Volume Indicator & Mute/Unmute) */}
      <aside
        aria-label="Sound control"
        className="fixed bottom-5 right-5 z-50 pointer-events-auto sm:bottom-6 sm:right-6"
      >
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
