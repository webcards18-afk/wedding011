import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";

export function DateScratchCard() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const checkThrottleRef = useRef<number>(0);

  // Initialize or re-draw the gold foil canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = "source-over";

    // 1. Royal gold metallic gradient
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#C99A3E");
    grad.addColorStop(0.2, "#EED88F");
    grad.addColorStop(0.45, "#DFC15D");
    grad.addColorStop(0.7, "#FAF1C8");
    grad.addColorStop(0.85, "#C59635");
    grad.addColorStop(1, "#DFB757");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // 2. Decorative gold foil texture & sparkle speckles
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 40; i++) {
      const rx = (Math.sin(i * 99) * 0.5 + 0.5) * rect.width;
      const ry = (Math.cos(i * 77) * 0.5 + 0.5) * rect.height;
      const size = (i % 3) + 1;
      ctx.fillRect(rx, ry, size, size);
    }

    // 3. Elegant border inside foil
    ctx.strokeStyle = "rgba(180, 130, 40, 0.45)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, rect.width - 20, rect.height - 20);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, rect.width - 28, rect.height - 28);

    // 4. Center invitation text on the scratch foil
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Sparkle icon
    ctx.font = '22px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = "#6B440A";
    ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
    ctx.shadowBlur = 4;
    ctx.fillText("✨", rect.width / 2, rect.height / 2 - 28);

    // Main instruction
    ctx.font = '600 17px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = "#4A2F05";
    ctx.fillText(t.scratchCard.instruction, rect.width / 2, rect.height / 2);

    // Sub-instruction
    ctx.font = '500 11px "Montserrat", -apple-system, sans-serif';
    ctx.fillStyle = "#6B440A";
    ctx.shadowBlur = 0;
    ctx.fillText(t.scratchCard.subInstruction, rect.width / 2, rect.height / 2 + 24);

    ctx.restore();
    setIsRevealed(false);
  }, [t.scratchCard.instruction, t.scratchCard.subInstruction]);

  // Redraw when language changes or window resizes
  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) initCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas, isRevealed]);

  // Check how much percentage of the foil has been scratched away
  const checkRevealPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    // Sample every 16th pixel for high performance
    const sampleStep = 16;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let transparentCount = 0;
    let totalSampled = 0;

    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        if (alpha < 64) {
          transparentCount++;
        }
        totalSampled++;
      }
    }

    const percentage = transparentCount / totalSampled;
    // Auto-reveal completely if scratched past 35%
    if (percentage > 0.35) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  // Scratch action using Pointer Events
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 21, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPointRef.current = { x, y };

    // Throttle reveal check to every 120ms
    const now = Date.now();
    if (now - checkThrottleRef.current > 120) {
      checkThrottleRef.current = now;
      checkRevealPercentage();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    setIsScratching(true);
    lastPointRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching || isRevealed) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    lastPointRef.current = null;
    checkRevealPercentage();
  };

  const revealDirectly = () => {
    setIsRevealed(true);
  };

  const resetCard = () => {
    initCanvas();
  };

  return (
    <section
      id="dates-scratch-card"
      className="relative mx-auto my-12 w-full max-w-lg px-4 sm:my-16"
    >
      <Reveal className="text-center">
        <p className="eyebrow">{t.scratchCard.title}</p>
      </Reveal>

      <div className="relative mt-6">
        {/* The Scratch Card Box */}
        <div
          ref={containerRef}
          className="relative min-h-[260px] overflow-hidden rounded-3xl border-2 border-gold-soft/80 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F5EAD4] p-6 text-center shadow-[0_16px_45px_-12px_rgba(180,120,40,0.22)] sm:min-h-[280px] sm:p-7"
        >
          {/* Subtle ornamental watermarks inside */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold-soft/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-amber-500/10 blur-2xl" />

          {/* REVEALED CONTENT UNDERNEATH */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            {/* Auspicious Dates */}
            <p className="font-display text-2xl font-semibold tracking-wide text-stone-900 sm:text-3xl">
              {t.hero.dates}
            </p>
            <p className="mt-1 font-display text-sm font-medium italic text-amber-900/90 sm:text-base">
              {t.hero.place}
            </p>

            {/* Decorative gold divider */}
            <div className="my-4 flex items-center justify-center gap-2">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-soft" />
              <span className="text-xs text-gold-deep">✦</span>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-soft" />
            </div>

            {/* Countdown subtitle */}
            <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.25em] text-gold-deep sm:text-xs">
              {t.countdown.eyebrow}
            </p>

            {/* High-contrast Countdown Clock */}
            <div className="mt-3.5">
              <Countdown dark />
            </div>
          </div>

          {/* SCRATCH CANVAS OVERLAY */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`absolute inset-0 z-20 h-full w-full cursor-pointer select-none transition-opacity duration-700 ${
              isRevealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            style={{ touchAction: "none" }}
            aria-label={t.scratchCard.instruction}
          />
        </div>

        {/* Action button below card */}
        <div className="mt-4 flex items-center justify-center gap-3">
          {!isRevealed ? (
            <button
              type="button"
              onClick={revealDirectly}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-soft/70 bg-white/90 px-4 py-1.5 font-sans text-xs font-semibold text-stone-700 shadow-xs backdrop-blur-sm transition-all hover:border-gold-deep hover:bg-gold-deep hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
              {t.scratchCard.revealButton}
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="inline-flex items-center gap-1 font-display text-sm font-semibold text-stone-800">
                {t.scratchCard.scratchedBadge}
              </span>
              <button
                type="button"
                onClick={resetCard}
                className="inline-flex items-center gap-1 rounded-full border border-gold-soft/60 bg-white/80 px-3.5 py-1 font-sans text-[0.75rem] font-medium text-stone-600 transition-colors hover:border-gold hover:text-stone-900"
              >
                <RotateCcw className="h-3 w-3" />
                {t.scratchCard.resetButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
