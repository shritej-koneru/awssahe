"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  logo,
  navItemContainer,
  navItem,
  navArrowBtn,
} from "../lib/motion-variants";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Join", href: "/join" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 140 && !menuOpen);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          backgroundColor: "rgba(11,11,11,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#ff9900]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <div className="mx-auto flex h-20 max-w-[1536px] items-center justify-between">
          <motion.div variants={logo} initial="hidden" animate="visible">
            <Link href="/" className="group flex items-center gap-3 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border-[#ff9900] text-[#ff9900] transition-transform duration-300 group-hover:rotate-[360deg]">
                <img src={"/club-logo.jpg"} className="rounded-md" />
              </div>
              <span className="font-display text-[1rem] uppercase tracking-[0.06em]">
                <span className="text-[#ff9900]">AWS</span>{" "}
                <span className="text-white">STUDENT BUILDERS GROUP</span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center gap-10"
            variants={navItemContainer}
            initial="hidden"
            animate="visible"
          >
            <nav className="hidden md:block">
              <ul className="flex items-center gap-10">
                {navItems.map((item) => (
                  <motion.li key={item.name} variants={navItem}>
                    <Link
                      href={item.href}
                      className="group relative inline-block font-display text-[1rem] uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:text-[#ff9900]"
                    >
                      {item.name}

                      <span className="absolute -bottom-2 left-0 right-0 h-px origin-left scale-x-0 bg-[#ff9900] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#ff9900] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              variants={navArrowBtn}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255,153,0,0.25)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#ff9900]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArrowUpRight size={20} className="text-[#ff9900]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#0b0b0b] px-[30px] md:px-16"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col gap-5">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.07 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-4 font-display text-4xl uppercase tracking-tight text-white transition-colors duration-300 hover:text-[#ff9900] md:text-6xl"
                  >
                    <span className="text-[0.9rem] text-[#ff9900] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      0{i + 1}
                    </span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="mt-14 font-body text-[0.75rem] uppercase tracking-[0.35em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              Siddhartha Academy of Higher Education — Vijayawada
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
