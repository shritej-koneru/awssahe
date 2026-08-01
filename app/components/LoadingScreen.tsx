"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SNAP: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
const STAGGER = 0.12;
const LETTER_DURATION = 0.55;

const PHASES = [
  "initial",
  "lines",
  "logo",
  "letters",
  "cross",
  "aws",
  "snap",
  "done",
] as const;

type Phase = (typeof PHASES)[number];

const LETTERS = ["S", "A", "H", "E"] as const;

const LETTER_CLIP: Record<string, string> = {
  S: "inset(100% 0 0 0)",
  A: "inset(0 100% 0 0)",
  H: "inset(0 0 0 100%)",
  E: "inset(0 0 100% 0)",
};

const LETTER_OFFSET: Record<string, { x: number; y: number }> = {
  S: { x: 0, y: -100 },
  A: { x: -100, y: 0 },
  H: { x: 100, y: 0 },
  E: { x: 0, y: 100 },
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>("initial");

  const phaseIndex = PHASES.indexOf(phase);
  const atLeast = (p: Phase) => phaseIndex >= PHASES.indexOf(p);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setPhase("lines"), 200),
      setTimeout(() => setPhase("logo"), 400),
      setTimeout(() => setPhase("letters"), 700),
      setTimeout(() => setPhase("cross"), 1300),
      setTimeout(() => setPhase("aws"), 1550),
      setTimeout(() => setPhase("snap"), 2300),
      setTimeout(() => {
        setPhase("done");
        onComplete?.();
      }, 2650),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
      animate={phase === "snap" ? { scale: [1, 1.008, 1] } : { scale: 1 }}
      exit={{
        scale: 0.97,
        filter: "blur(6px)",
        transition: { duration: 0.4, ease: EASE },
      }}
      transition={{
        duration: phase === "snap" ? 0.35 : 0,
        ease: phase === "snap" ? SNAP : EASE,
      }}
    >
      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.012,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Construction lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <motion.div
          className="absolute h-px bg-white/25"
          style={{ top: "22%", left: 0, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={atLeast("lines") ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <motion.div
          className="absolute w-px bg-white/25"
          style={{ left: "28%", top: 0, transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={atLeast("lines") ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        />
      </div>

      {/* Main row: [College Logo] S A H E × [AWS Logo] */}
      <div
        className="loader-row absolute left-0 right-0 z-[3] top-1/2 md:top-[36%] -translate-y-1/2 md:translate-y-0"
      >
        {/* College Logo + SAHE letters (same row) */}
        <div
          className="loader-brand"
          style={{ display: "flex", alignItems: "center", gap: "clamp(0.5rem, 2vw, 1.25rem)" }}
        >
          {/* College Logo */}
          <motion.div
            className="loader-logo flex items-center justify-center overflow-hidden"
            style={{}}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={
              atLeast("logo")
                ? { clipPath: "inset(0 0% 0 0)" }
                : { clipPath: "inset(0 100% 0 0)" }
            }
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Image
              src="/sahe-logo.png"
              alt="SAHE College"
              width={72}
              height={72}
              className="object-contain w-full h-full"
              priority
            />
          </motion.div>

          {/* SAHE letters */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter}
                className="loader-letter"
                style={{
                  fontFamily: "var(--font-display)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  display: "inline-block",
                  willChange: "transform, clip-path, filter",
                }}
                initial={{
                  clipPath: LETTER_CLIP[letter],
                  x: LETTER_OFFSET[letter].x,
                  y: LETTER_OFFSET[letter].y,
                  filter: "blur(8px)",
                }}
                animate={
                  atLeast("letters")
                    ? {
                        clipPath: "inset(0 0% 0 0)",
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                      }
                    : {}
                }
                transition={{
                  duration: LETTER_DURATION,
                  ease: EASE,
                  delay: i * STAGGER,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* × symbol */}
        <motion.div
          className="loader-cross"
          initial={{ scale: 0 }}
          animate={atLeast("cross") ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            <motion.line
              x1="6"
              y1="6"
              x2="42"
              y2="42"
              stroke="#ffffff"
              strokeWidth={2.5}
              strokeLinecap="square"
              initial={{ pathLength: 0 }}
              animate={atLeast("cross") ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <motion.line
              x1="42"
              y1="6"
              x2="6"
              y2="42"
              stroke="#ffffff"
              strokeWidth={2.5}
              strokeLinecap="square"
              initial={{ pathLength: 0 }}
              animate={atLeast("cross") ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.3, ease: EASE, delay: 0.18 }}
            />
          </svg>
        </motion.div>

        {/* AWS Logo */}
        <motion.div
          className="loader-logo flex items-center justify-center overflow-hidden"
          style={{}}
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={
            atLeast("aws")
              ? { clipPath: "inset(0 0 0 0%)" }
              : { clipPath: "inset(0 0 0 100%)" }
          }
          transition={{ duration: 0.55, ease: EASE }}
        >
          <Image
            src="/aws-logo-white.png"
            alt="AWS"
            width={640}
            height={640}
            className="object-contain w-full h-full"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
