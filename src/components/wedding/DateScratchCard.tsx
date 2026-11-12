import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";

export function DateScratchCard() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);
  const checkThrottleRef = useRef<number>(0);

  // Trigger full reveal with smooth dissolve
  const triggerReveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  // Draw the initial royal gold foil onto canvas
  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    // Set internal resolution and CSS display size
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Reset transform & state
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // 1. Royal metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#C99A3E");
    grad.addColorStop(0.18, "#EED88F");
    grad.addColorStop(0.42, "#DFC15D");
    grad.addColorStop(0.68, "#FAF1C8");
    grad.addColorStop(0.85, "#C59635");
    grad.addColorStop(1, "#DFB757");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. Subtle gold shimmer flecks
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    for (let i = 0; i < 50; i++) {
      const rx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
      const ry = (Math.cos(i * 77) * 0.5 + 0.5) * h;
      const size = ((i % 3) + 1) * dpr;
      ctx.fillRect(rx, ry, size, size);
    }

    // 3. Elegant borders
    ctx.strokeStyle = "rgba(180, 130, 40, 0.4)";
    ctx.lineWidth = 2 * dpr;
    ctx.strokeRect(10 * dpr, 10 * dpr, w - 20 * dpr, h - 20 * dpr);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 1 * dpr;
    ctx.strokeRect(14 * dpr, 14 * dpr, w - 28 * dpr, h - 28 * dpr);

    // 4. Center text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Sparkle icon
    ctx.font = `${Math.round(24 * dpr)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = "#5C3806";
    ctx.fillText("✨", w / 2, h / 2 - 30 * dpr);

    // Main instruction
    ctx.font = `600 ${Math.round(18 * dpr)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = "#3D2403";
    ctx.fillText(t.scratchCard.instruction, w / 2, h / 2);

    // Sub-instruction
    ctx.font = `500 ${Math.round(11 * dpr)}px "Montserrat", -apple-system, sans-serif`;
    ctx.fillStyle = "#5C3806";
    ctx.fillText(t.scratchCard.subInstruction, w / 2, h / 2 + 25 * dpr);

    strokeCountRef.current = 0;
    setIsRevealed(false);
  }, [t.scratchCard.instruction, t.scratchCard.subInstruction]);

  // Initial draw & resize handler
  useEffect(() => {
    drawFoil();
    const handleResize = () => {
      if (!isRevealed) drawFoil();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFoil, isRevealed]);

  // Check how much percentage of the foil has been scratched away
  const checkRevealPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    // If user has made at least 4 stroke segments, auto-reveal!
    if (strokeCountRef.current >= 4) {
      triggerReveal();
      return;
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const sampleStep = 16;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let transparentCount = 0;
    let totalSampled = 0;

    for (let y = 0; y < h; y += sampleStep) {
      for (let x = 0; x < w; x += sampleStep) {
        const index = (y * w + x) * 4;
        if (data[index + 3] < 64) {
          transparentCount++;
        }
        totalSampled++;
      }
    }

    const percentage = transparentCount / totalSampled;
    // Auto-reveal as soon as even 4% of the card is scratched
    if (percentage > 0.04) {
      triggerReveal();
    }
  }, [isRevealed, triggerReveal]);

  // Scratch action directly in canvas pixel coordinate space
  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealed) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const currX = ((clientX - rect.left) / rect.width) * canvas.width;
      const currY = ((clientY - rect.top) / rect.height) * canvas.height;

      const brushRadius = Math.max(30, rect.width * 0.09 * (canvas.width / rect.width));

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushRadius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (lastPointRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(currX, currY);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(currX, currY, brushRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      lastPointRef.current = { x: currX, y: currY };
      strokeCountRef.current += 1;

      // Throttle reveal check
      const now = Date.now();
      if (now - checkThrottleRef.current > 80) {
        checkThrottleRef.current = now;
        checkRevealPercentage();
      }
    },
    [checkRevealPercentage, isRevealed],
  );

  // Native touch & mouse event listeners for 100% reliable mobile touch scratching
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mobile touch handlers
    const onTouchStart = (e: TouchEvent) => {
      if (isRevealed) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        isScratchingRef.current = true;
        lastPointRef.current = null;
        scratch(touch.clientX, touch.clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isScratchingRef.current || isRevealed) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        scratch(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = () => {
      if (strokeCountRef.current > 0) {
        // Once finger lifts after scratching, immediately dissolve and reveal all!
        triggerReveal();
      }
      isScratchingRef.current = false;
      lastPointRef.current = null;
    };

    // Desktop mouse handlers
    const onMouseDown = (e: MouseEvent) => {
      if (isRevealed) return;
      e.preventDefault();
      isScratchingRef.current = true;
      lastPointRef.current = null;
      scratch(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isScratchingRef.current || isRevealed) return;
      e.preventDefault();
      scratch(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      if (strokeCountRef.current > 0) {
        triggerReveal();
      }
      isScratchingRef.current = false;
      lastPointRef.current = null;
    };

    // Click / Tap directly reveals as fallback
    const onClick = () => {
      triggerReveal();
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);

      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isRevealed, scratch, triggerReveal]);

  const resetCard = () => {
    drawFoil();
  };

  return (
    <section
      id="dates-scratch-card"
      className="relative mx-auto my-10 w-full max-w-lg px-4 sm:my-14"
    >
      <Reveal className="text-center">
        <p className="eyebrow">{t.scratchCard.title}</p>
      </Reveal>

      <div className="relative mt-5">
        {/* The Scratch Card Box */}
        <div
          ref={containerRef}
          className="relative min-h-[260px] overflow-hidden rounded-3xl border-2 border-gold-soft/80 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F5EAD4] p-5 text-center shadow-[0_16px_45px_-12px_rgba(180,120,40,0.22)] sm:min-h-[280px] sm:p-7"
        >
          {/* Subtle ornamental glow inside */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold-soft/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-amber-500/15 blur-2xl" />

          {/* REVEALED CONTENT UNDERNEATH */}
          <div className="relative z-10 flex h-full min-h-[250px] flex-col items-center justify-center py-2 sm:py-3">
            {/* Auspicious Dates */}
            <h3 className="font-display text-2xl font-bold tracking-wide text-stone-900 sm:text-3xl">
              {t.hero.dates}
            </h3>
            <p className="mt-1 font-display text-sm font-medium italic text-amber-900/90 sm:text-base">
              {t.hero.place}
            </p>

            {/* Decorative gold divider */}
            <div className="my-3 flex items-center justify-center gap-2">
              <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-gold-soft" />
              <span className="text-xs text-gold-deep">✦</span>
              <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-gold-soft" />
            </div>

            {/* Countdown subtitle */}
            <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.25em] text-gold-deep sm:text-xs">
              {t.countdown.eyebrow}
            </p>

            {/* High-contrast Countdown Clock */}
            <div className="mt-3">
              <Countdown dark />
            </div>
          </div>

          {/* SCRATCH CANVAS OVERLAY */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-20 h-full w-full cursor-pointer select-none transition-opacity duration-700 ${
              isRevealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            style={{ touchAction: "none" }}
            aria-label={t.scratchCard.instruction}
          />
        </div>

        {/* Status / Replay option (only when revealed) */}
        {isRevealed && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-1 font-display text-sm font-semibold text-stone-800">
              {t.scratchCard.scratchedBadge}
            </span>
            <button
              type="button"
              onClick={resetCard}
              className="inline-flex items-center gap-1 rounded-full border border-gold-soft/60 bg-white/80 px-3.5 py-1 font-sans text-[0.75rem] font-medium text-stone-600 shadow-xs transition-colors hover:border-gold hover:text-stone-900"
            >
              <RotateCcw className="h-3 w-3" />
              {t.scratchCard.resetButton}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
