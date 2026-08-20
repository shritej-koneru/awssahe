"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ctaButton } from "../lib/motion-variants";

export default function RegisterButton() {
  const [hovered, setHovered] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    setRegistered(true);
  };

  return (
    <motion.button
      onClick={handleRegister}
      disabled={registered}
      className="relative inline-flex cursor-pointer items-center justify-center overflow-hidden border border-[#a855f7] bg-black font-display uppercase leading-none text-[#a855f7] outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{ padding: "14px 36px", fontSize: "1.05rem" }}
      variants={ctaButton}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3, boxShadow: "0 0 20px rgba(168,85,247,0.35)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-[#a855f7]"
        initial={false}
        animate={{ x: hovered || registered ? "0%" : "100%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      <span
        className="relative z-10 flex items-center gap-2"
        style={{ color: registered ? "#000000" : (hovered ? "#000000" : "#a855f7"), transition: "color 0.3s ease" }}
      >
        {registered ? "Registered ✓" : "Register Now"}
        {!registered && (
          <motion.span
            className="inline-block"
            style={{ color: hovered ? "#000000" : "#a855f7", transition: "color 0.3s ease" }}
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            →
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}
