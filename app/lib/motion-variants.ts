import type { Variants } from "framer-motion";

export const spring = { type: "spring" as const, stiffness: 300, damping: 20 };
export const softSpring = { type: "spring" as const, stiffness: 200, damping: 25 };
export const gentleSpring = { type: "spring" as const, stiffness: 150, damping: 20 };
export const elasticSpring = { type: "spring" as const, stiffness: 400, damping: 15 };

export const navbar: Variants = {
  hidden: { opacity: 0, y: -30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const logo: Variants = {
  hidden: { opacity: 0, x: -30, rotate: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { ...spring, duration: 0.6 },
  },
};

export const navItemContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

export const navItem: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const navArrowBtn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...spring, delay: 0.3 },
  },
};

export const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

export const headingBuild: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, mass: 1 },
  },
};

export const staggerLetters: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

export const letterUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, mass: 1 },
  },
};

export const staggerLettersBeyond: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.08 } },
};

export const letterUpBeyond: Variants = {
  hidden: { y: "120%" },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      mass: 1.1,
    },
  },
};

export const headingBeyond: Variants = {
  hidden: { y: "120%" },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      mass: 1.1,
      delay: 0.08,
    },
  },
};

export const xButton: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -45 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { ...spring, delay: 0.5 },
  },
};

export const paragraph: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.6 },
  },
};

export const ctaContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } },
};

export const ctaButton: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring },
  },
};
