"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function isPurpleColor(colorStr: string): boolean {
  if (!colorStr || colorStr === "transparent" || colorStr === "rgba(0, 0, 0, 0)") {
    return false;
  }
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    return r >= 110 && b >= 170 && g <= 155 && b > g + 40;
  }
  return false;
}

function checkIsPurpleElement(target: HTMLElement | null): boolean {
  let curr: HTMLElement | null = target;

  while (curr && curr !== document.body && curr !== document.documentElement) {
    const className = typeof curr.className === "string" ? curr.className : "";
    const styleAttr = (curr.getAttribute("style") || "").toLowerCase();

    if (
      className.includes("text-[#a855f7]") ||
      className.includes("bg-[#a855f7]") ||
      className.includes("border-[#a855f7]") ||
      className.includes("text-purple") ||
      className.includes("bg-purple") ||
      styleAttr.includes("color: #a855f7") ||
      styleAttr.includes("color:#a855f7") ||
      styleAttr.includes("background-color: #a855f7") ||
      styleAttr.includes("background: #a855f7") ||
      styleAttr.includes("#a855f7")
    ) {
      return true;
    }

    try {
      const computed = window.getComputedStyle(curr);
      if (isPurpleColor(computed.color)) return true;
      if (isPurpleColor(computed.backgroundColor)) return true;
      if (computed.borderWidth !== "0px" && isPurpleColor(computed.borderColor)) return true;
    } catch {
      // ignore
    }

    curr = curr.parentElement;
  }

  return false;
}

const BURNT_SHAPES = [
  "25% 75% 35% 65% / 65% 35% 75% 25%",
  "65% 35% 70% 30% / 30% 70% 35% 65%",
  "40% 60% 25% 75% / 75% 25% 60% 40%",
  "70% 30% 60% 40% / 40% 60% 30% 70%",
  "35% 65% 60% 40% / 50% 30% 70% 50%",
  "55% 45% 30% 70% / 45% 55% 70% 30%",
];

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPurpleTarget, setIsPurpleTarget] = useState(false);
  const [isTargetLocked, setIsTargetLocked] = useState(false);
  const [isShattered, setIsShattered] = useState(false);
  const [impactPos, setImpactPos] = useState({ x: -500, y: -500 });
  const [shatterStyle, setShatterStyle] = useState({
    rotation: 45,
    borderRadius: BURNT_SHAPES[0],
    scale: 1,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for trailing outer ring
  const springConfig = { damping: 22, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      setIsPurpleTarget(checkIsPurpleElement(target));
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveTarget = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='pointer'], .group"
      );

      setIsHovered(Boolean(interactiveTarget));
      setIsPurpleTarget(checkIsPurpleElement(target));
    };

    // Target Lock Warning Event
    const handleLockOn = (e: Event) => {
      const customEv = e as CustomEvent<{ locked?: boolean }>;
      setIsTargetLocked(Boolean(customEv.detail?.locked));
    };

    // Tank Shatter Event Listener (5-second duration with randomized burn rotation & shape)
    const handleShatter = (e: Event) => {
      const customEv = e as CustomEvent<{ duration?: number }>;
      const duration = customEv.detail?.duration || 5000;

      // Randomize rotation angle, shape variant, and scale for unique organic scorch marks
      const randomRot = Math.floor(Math.random() * 360);
      const randomRadius = BURNT_SHAPES[Math.floor(Math.random() * BURNT_SHAPES.length)];
      const randomScale = 0.95 + Math.random() * 0.3; // 0.95x to 1.25x

      setShatterStyle({
        rotation: randomRot,
        borderRadius: randomRadius,
        scale: randomScale,
      });

      // Lock current impact position where shot hit
      setImpactPos({ x: cursorX.get(), y: cursorY.get() });
      setIsShattered(true);
      setIsTargetLocked(false);

      setTimeout(() => {
        setIsShattered(false);
      }, duration);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleElementOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("cursor-target-lock", handleLockOn);
    window.addEventListener("cursor-shatter", handleShatter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("cursor-target-lock", handleLockOn);
      window.removeEventListener("cursor-shatter", handleShatter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Dynamic ring styling
  const ringBorderColor = isShattered
    ? "#f43f5e"
    : isTargetLocked
    ? "#f43f5e"
    : isPurpleTarget
    ? "#ffffff"
    : isHovered
    ? "#c084fc"
    : "#a855f7";

  const ringBgColor = isShattered
    ? "rgba(244, 63, 94, 0.25)"
    : isTargetLocked
    ? "rgba(244, 63, 94, 0.15)"
    : isPurpleTarget
    ? "rgba(255, 255, 255, 0.25)"
    : isHovered
    ? "rgba(168, 85, 247, 0.12)"
    : "rgba(168, 85, 247, 0.04)";

  const ringShadow = isShattered
    ? "0 0 30px #f43f5e, 0 0 50px #a855f7"
    : isTargetLocked
    ? "0 0 35px #f43f5e, inset 0 0 15px #f43f5e"
    : isPurpleTarget
    ? "0 0 24px rgba(255, 255, 255, 0.9), inset 0 0 12px rgba(255, 255, 255, 0.5)"
    : isHovered
    ? "0 0 24px rgba(168, 85, 247, 0.6), inset 0 0 12px rgba(168, 85, 247, 0.3)"
    : "0 0 12px rgba(168, 85, 247, 0.25)";

  const coreDotColor = isShattered
    ? "#f43f5e"
    : isTargetLocked
    ? "#f43f5e"
    : isPurpleTarget || isHovered
    ? "#ffffff"
    : "#a855f7";

  const coreDotShadow = isShattered
    ? "0 0 20px #f43f5e"
    : isTargetLocked
    ? "0 0 22px #f43f5e"
    : isPurpleTarget
    ? "0 0 16px #ffffff, 0 0 24px rgba(255, 255, 255, 0.9)"
    : isHovered
    ? "0 0 14px #ffffff, 0 0 20px #a855f7"
    : "0 0 8px #a855f7";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Trailing Outer Ring (Stationary at impact point with randomized shape/rotation on shatter) */}
      <motion.div
        className="pointer-events-none absolute border transition-colors duration-200"
        style={{
          x: isShattered ? impactPos.x : smoothX,
          y: isShattered ? impactPos.y : smoothY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: ringBgColor,
          borderRadius: isShattered ? shatterStyle.borderRadius : "50%",
        }}
        animate={{
          width: isTargetLocked ? 88 : isShattered ? 76 : isHovered || isPurpleTarget ? 56 : isClicked ? 28 : 36,
          height: isTargetLocked ? 88 : isShattered ? 76 : isHovered || isPurpleTarget ? 56 : isClicked ? 28 : 36,
          borderColor: ringBorderColor,
          boxShadow: ringShadow,
          rotate: isShattered ? shatterStyle.rotation : 0,
          scale: isShattered ? shatterStyle.scale : 1,
        }}
        transition={{
          type: isShattered ? "keyframes" : "spring",
          stiffness: 350,
          damping: 25,
        }}
      >
        {/* Stationary Burnt Status Badge attached to the stationary burnt ring */}
        {isShattered && (
          <div className="absolute top-16 -left-8 bg-red-600/90 text-white font-mono text-[9px] px-2 py-0.5 rounded border border-white/40 tracking-wider whitespace-nowrap shadow-[0_0_12px_#f43f5e]">
            STATUS: BROKEN (5s)
          </div>
        )}
      </motion.div>

      {/* 2. Core Pointer / Shattered Core Fragments (Follows mouse cursor) */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {!isShattered ? (
          /* Pristine Central 45° Rotated Diamond */
          <motion.div
            className="h-2.5 w-2.5 transition-colors duration-200"
            style={{ transformOrigin: "center center" }}
            animate={{
              rotate: 45,
              scale: isTargetLocked ? 2 : isHovered || isPurpleTarget ? 1.6 : isClicked ? 0.75 : 1,
              backgroundColor: coreDotColor,
              boxShadow: coreDotShadow,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        ) : (
          /* Shattered Glitch Core Fragments (4 Broken Shards moving with cursor) */
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            {/* Shard 1 (Top-Left) */}
            <motion.div
              className="absolute h-2.5 w-2.5 bg-red-500 shadow-[0_0_12px_#f43f5e]"
              animate={{ x: [-4, -20, -16], y: [-4, -20, -16], rotate: [0, 180, 360] }}
              transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Shard 2 (Top-Right) */}
            <motion.div
              className="absolute h-3 w-3 bg-[#a855f7] shadow-[0_0_12px_#a855f7]"
              animate={{ x: [4, 22, 18], y: [-4, -18, -14], rotate: [45, 225, 405] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Shard 3 (Bottom-Left) */}
            <motion.div
              className="absolute h-3 w-3 bg-white shadow-[0_0_12px_#ffffff]"
              animate={{ x: [-4, -18, -14], y: [4, 22, 18], rotate: [15, 195, 375] }}
              transition={{ duration: 0.45, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Shard 4 (Bottom-Right) */}
            <motion.div
              className="absolute h-2.5 w-2.5 bg-purple-400 shadow-[0_0_12px_#c084fc]"
              animate={{ x: [4, 20, 16], y: [4, 20, 16], rotate: [60, 240, 420] }}
              transition={{ duration: 0.35, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
