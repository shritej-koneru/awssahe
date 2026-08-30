"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass, Users, Terminal, CloudOff, ArrowLeft } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-transparent text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <section
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "9rem",
          paddingBottom: "5rem",
          maxWidth: "1060px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
        className="flex-1 flex flex-col justify-center items-center text-center relative z-10"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerStagger}
          className="w-full flex flex-col items-center"
        >
          {/* Neo-brutalist Error Badge */}
          <motion.div variants={fadeIn}>
            <span
              className="font-display uppercase"
              style={{
                display: "inline-block",
                backgroundColor: "#a855f7",
                color: "#000000",
                border: "3px solid #ffffff",
                boxShadow: "6px 6px 0 0 #ffffff",
                padding: "0.45rem 1.5rem",
                transform: "rotate(-2deg)",
                fontSize: "1rem",
                letterSpacing: "0.25em",
                fontWeight: 700,
              }}
            >
              {"// ERROR 404"}
            </span>
          </motion.div>

          {/* Large Animated 404 Hero Display */}
          <motion.div
            variants={fadeIn}
            className="relative my-6 flex flex-col items-center"
          >
            <div className="relative inline-flex items-center justify-center">
              <h1
                className="font-display font-black uppercase text-white select-none"
                style={{
                  fontSize: "clamp(5rem, 22vw, 13rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  textShadow: "0 0 40px rgba(168,85,247,0.35)",
                }}
              >
                4<span className="text-[#a855f7]">0</span>4
              </h1>
              <motion.div
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-8 bg-black border border-[#a855f7] rounded-lg px-3 py-1 text-[#a855f7] font-mono text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <CloudOff size={16} />
                <span>NoSuchEntity</span>
              </motion.div>
            </div>

            <p
              className="font-display uppercase text-gray-200 mt-2"
              style={{
                fontSize: "clamp(1.25rem, 3.5vw, 2.25rem)",
                lineHeight: 1.1,
                letterSpacing: "0.04em",
              }}
            >
              Resource Not Found
            </p>
          </motion.div>

          {/* Simulated AWS CLI Error Terminal Box */}
          <motion.div
            variants={fadeIn}
            style={{
              backgroundColor: "rgba(13,8,24,0.9)",
              border: "1.5px solid rgba(168,85,247,0.4)",
              boxShadow: "10px 10px 0 0 #a855f7",
              maxWidth: "680px",
              width: "100%",
            }}
            className="rounded-xl p-5 text-left font-mono my-6 select-text overflow-x-auto"
          >
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="text-xs text-gray-400 ml-2">aws-cli // terminal</span>
              </div>
              <Terminal size={14} className="text-[#a855f7]" />
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              <span className="text-[#a855f7]">$</span> aws s3api get-object --bucket sahe-cloud --key 404.html
            </p>
            <p className="text-xs sm:text-sm text-red-400 mt-2 leading-relaxed">
              An error occurred (ResourceNotFoundException) when calling the GetObject operation: The specified cloud endpoint or page route does not exist.
            </p>
          </motion.div>

          {/* Descriptive Body Text */}
          <motion.p
            variants={fadeIn}
            className="font-body text-gray-300 max-w-[540px] text-base leading-relaxed mb-8"
          >
            The path you are trying to reach has either been moved, renamed, or terminated from our AWS cluster. Return to base or explore active pages below.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-4 w-full max-w-[600px]"
          >
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-2 font-display uppercase text-lg px-7 py-3.5 bg-[#a855f7] text-black border-2 border-black rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(168,85,247,0.5)] active:scale-95 font-bold"
            >
              <Home size={18} />
              <span>Return Home</span>
            </Link>

            <Link
              href="/events"
              className="group relative inline-flex items-center justify-center gap-2 font-display uppercase text-lg px-7 py-3.5 bg-black text-white border-2 border-[#a855f7] rounded-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#a855f7]/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95 font-bold"
            >
              <Compass size={18} className="text-[#a855f7]" />
              <span>Explore Events</span>
            </Link>

            <Link
              href="/team"
              className="group relative inline-flex items-center justify-center gap-2 font-display uppercase text-lg px-7 py-3.5 bg-black text-white border-2 border-white/30 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95 font-bold"
            >
              <Users size={18} className="text-gray-300" />
              <span>View Team</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
