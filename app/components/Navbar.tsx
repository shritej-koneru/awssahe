"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  navbar,
  logo,
  navItemContainer,
  navItem,
  navArrowBtn,
} from "../lib/motion-variants";

const navItems = [
  { name: "ABOUT", href: "#about" },
  { name: "EVENTS", href: "#events" },
  { name: "TEAM", href: "#team" },
  { name: "PROJECTS", href: "#projects" },
  { name: "JOIN", href: "#join" },
];

export default function Navbar() {
  return (
    <motion.header
      style={{ paddingLeft: "30px", paddingRight: "30px" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#ff9900] bg-transparent"
      variants={navbar}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto flex h-20 max-w-[1536px] items-center justify-between">
        <motion.div variants={logo} initial="hidden" animate="visible">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border-[#ff9900] text-[#ff9900]">
              <img src={"/club-logo.jpg"} />
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

                    <span className="absolute -bottom-2 left-0 h-px bg-[#ff9900] right-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.button
            aria-label="Open menu"
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
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <ArrowUpRight
                size={20}
                className="text-[#ff9900]"
              />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
}
