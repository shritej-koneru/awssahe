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
    // Check for purple hue (#a855f7 = 168, 85, 247 where R & B are dominant over G)
    return r >= 110 && b >= 170 && g <= 155 && b > g + 40;
  }
  return false;
}

function checkIsPurpleElement(target: HTMLElement | null): boolean {
  let curr: HTMLElement | null = target;

  while (curr && curr !== document.body && curr !== document.documentElement) {
    const className = typeof curr.className === "string" ? curr.className : "";
    const styleAttr = (curr.getAttribute("style") || "").toLowerCase();

    // Check direct class names or inline styles for explicit purple text, background, or accent
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

      // Check text color (e.g. BEYOND heading, purple tags)
      if (isPurpleColor(computed.color)) {
        return true;
      }

      // Check background color (e.g. purple buttons, cards)
      if (isPurpleColor(computed.backgroundColor)) {
        return true;
      }

      // Check border color if element has border
      if (computed.borderWidth !== "0px" && isPurpleColor(computed.borderColor)) {
        return true;
      }
    } catch {
      // Ignore SVG / cross-domain compute errors
    }

    curr = curr.parentElement;
  }

  return false;
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPurpleTarget, setIsPurpleTarget] = useState(false);
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
    // Detect touch-only / coarse pointer devices (smartphones, tablets)
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

    // Event delegation for interactive elements (links, buttons, inputs, cards)
    const handleElementOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveTarget = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='pointer'], .group"
      );

      setIsHovered(Boolean(interactiveTarget));
      setIsPurpleTarget(checkIsPurpleElement(target));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleElementOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Dynamic colors: White on purple elements, Electric Purple everywhere else
  const ringBorderColor = isPurpleTarget
    ? "#ffffff"
    : isHovered
    ? "#c084fc"
    : "#a855f7";

  const ringBgColor = isPurpleTarget
    ? "rgba(255, 255, 255, 0.25)"
    : isHovered
    ? "rgba(168, 85, 247, 0.12)"
    : "rgba(168, 85, 247, 0.04)";

  const ringShadow = isPurpleTarget
    ? "0 0 24px rgba(255, 255, 255, 0.9), inset 0 0 12px rgba(255, 255, 255, 0.5)"
    : isHovered
    ? "0 0 24px rgba(168, 85, 247, 0.6), inset 0 0 12px rgba(168, 85, 247, 0.3)"
    : "0 0 12px rgba(168, 85, 247, 0.25)";

  const coreDotColor = isPurpleTarget || isHovered ? "#ffffff" : "#a855f7";

  const coreDotShadow = isPurpleTarget
    ? "0 0 16px #ffffff, 0 0 24px rgba(255, 255, 255, 0.9)"
    : isHovered
    ? "0 0 14px #ffffff, 0 0 20px #a855f7"
    : "0 0 8px #a855f7";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Trailing Glow Ring */}
      <motion.div
        className="pointer-events-none absolute rounded-full border transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: ringBgColor,
        }}
        animate={{
          width: isHovered || isPurpleTarget ? 56 : isClicked ? 28 : 36,
          height: isHovered || isPurpleTarget ? 56 : isClicked ? 28 : 36,
          borderColor: ringBorderColor,
          boxShadow: ringShadow,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />

      {/* 2. Central 45° Rotated Diamond Core Dot */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="h-2.5 w-2.5 transition-colors duration-200"
          style={{
            transformOrigin: "center center",
          }}
          animate={{
            rotate: 45,
            scale: isHovered || isPurpleTarget ? 1.6 : isClicked ? 0.75 : 1,
            backgroundColor: coreDotColor,
            boxShadow: coreDotShadow,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
      </motion.div>
    </div>
  );
}
