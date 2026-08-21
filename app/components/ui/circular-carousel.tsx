"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  initials?: string;
  image?: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;
const RADIUS_X = 420;
const RADIUS_Y = 150;

function getItemPosition(index: number, activeIndex: number, total: number) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * RADIUS_X;
  const y = -Math.cos(angle) * RADIUS_Y;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0.3, 1 - (distance / maxDistance) * 0.22);
  const opacity = Math.max(0.45, 1 - (distance / maxDistance) * 0.55);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 900, // Super fast rotation speed (0.9s per card)
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      aria-roledescription="carousel"
      className={cn(
        "relative flex flex-col items-center justify-center gap-12 outline-none w-full max-w-6xl",
        className,
      )}
    >
      {/* Circular track */}
      <div className="relative h-[440px] w-full max-w-3xl">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total);
            if (!pos) return null;

            const isActive = i === activeIndex;

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.35, // Fast snappy motion glide
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => goTo(i)}
                onContextMenu={(e) => e.preventDefault()}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start justify-between rounded-3xl border border-purple-500/40 bg-gradient-to-b from-[#160d30]/95 to-[#0b0518]/95 p-5 backdrop-blur-lg transition-all duration-200 overflow-hidden select-none",
                  isActive
                    ? "shadow-[0_0_50px_rgba(168,85,247,0.65)] border-[#a855f7] bg-[#1a0f38]"
                    : "shadow-[0_12px_35px_-4px_rgba(0,0,0,0.7)] hover:shadow-[0_16px_45px_-4px_rgba(168,85,247,0.35)]",
                )}
                style={{ transformOrigin: "center center" }}
              >
                {/* Photo / Graphic Avatar Box */}
                <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-[#0d071b] border border-purple-500/30 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      draggable={false}
                      className="object-cover pointer-events-none select-none"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 w-full h-full bg-gradient-to-b from-purple-950/60 to-purple-900/30">
                      <span className="font-display text-4xl font-black text-[#a855f7] tracking-wider">
                        {item.initials || "AWS"}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300/60">
                        AWS BUILDER
                      </span>
                    </div>
                  )}

                  {item.tag && (
                    <span className="absolute top-2.5 right-2.5 rounded-full bg-purple-950/80 border border-purple-500/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-200 backdrop-blur-md">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="w-full text-left mt-2">
                  <h3
                    className={cn(
                      "font-display uppercase font-bold leading-tight transition-colors duration-300",
                      isActive
                        ? "text-white text-xl"
                        : "text-white/85 text-base",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 line-clamp-2 text-xs leading-relaxed transition-colors duration-300 font-body",
                      isActive ? "text-purple-200/90" : "text-white/45",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Center content */}
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
      >
        <span className="text-7xl font-display font-extrabold tracking-tight text-[#a855f7]/30">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="mt-1 text-xs font-mono text-purple-300/40">
          of {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-6 z-10">
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Previous item"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/50 bg-purple-950/70 text-purple-200 backdrop-blur-md transition-colors hover:bg-purple-900 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-500/50 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                i === activeIndex
                  ? "w-9 bg-[#a855f7] shadow-[0_0_16px_rgba(168,85,247,0.9)]"
                  : "w-2.5 bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Next item"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/50 bg-purple-950/70 text-purple-200 backdrop-blur-md transition-colors hover:bg-purple-900 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-500/50 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;
