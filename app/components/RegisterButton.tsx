"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterButton({
  eventTitle,
  compact = false,
}: {
  eventTitle: string;
  compact?: boolean;
}) {
  const [registered, setRegistered] = useState(false);

  return (
    <div>
      <motion.button
        onClick={() => setRegistered(true)}
        aria-pressed={registered}
        className="relative inline-flex cursor-pointer items-center justify-center overflow-hidden border border-[#ff9900] bg-black font-display uppercase leading-none text-[#ff9900] outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{ padding: compact ? "12px 24px" : "18px 40px", fontSize: compact ? "1rem" : "1.25rem" }}
        whileHover={{
          y: -3,
          boxShadow: "0 0 24px rgba(255,153,0,0.35)",
        }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-[#ff9900]"
          initial={false}
          animate={{ x: registered ? "0%" : "100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
        <span
          className="relative z-10"
          style={{ color: registered ? "#000000" : "#ff9900", transition: "color 0.3s ease" }}
        >
          {registered ? "Registered" : "Register Now"}
        </span>
        <motion.span
          className="relative z-10 ml-1 inline-block"
          style={{ color: registered ? "#000000" : "#ff9900", transition: "color 0.3s ease" }}
          animate={{ x: registered ? 6 : 0 }}
        >
          →
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {registered && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-body"
            style={{ marginTop: "1rem", fontSize: "0.95rem", color: "rgba(255,255,255,0.7)" }}
          >
            You&apos;re on the list for {eventTitle}. We&apos;ll share the calendar invite and joining
            details on our Instagram & LinkedIn.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
