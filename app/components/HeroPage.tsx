"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import Navbar from "./Navbar";
import BackgroundGraphics from "./BackgroundGraphics";
import AboutSection from "./AboutSection";
import {
  staggerLetters,
  letterUp,
  staggerLettersBeyond,
  letterUpBeyond,
  xButton,
  paragraph,
  ctaContainer,
  ctaButton,
} from "../lib/motion-variants";

const buildLetters = "BUILD".split("");
const beyondLetters = "BEYOND".split("");

export default function HeroPage() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const titleScrollY = useTransform(scrollY, [0, 500], [0, -30]);
  const titleOpacity = useTransform(scrollY, [0, 500], [1, 0.6]);
  const bgScrollY = useTransform(scrollY, [0, 500], [0, 15]);

  const xIconX = useMotionValue(0);
  const xIconY = useMotionValue(0);
  const xIconSmoothX = useSpring(xIconX, { damping: 30, stiffness: 200 });
  const xIconSmoothY = useSpring(xIconY, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    xIconX.set(x * 16);
    xIconY.set(y * 16);
  };

  const handleMouseLeave = () => {
    xIconX.set(0);
    xIconY.set(0);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-black text-white overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="absolute inset-0 bg-[url('/bg-hero.png')] bg-cover bg-center bg-no-repeat"
          style={{ y: bgScrollY }}
        />

        <div className="relative z-10">
          <Navbar />
          <BackgroundGraphics />

          <div className="mx-auto flex min-h-screen max-w-[1536px] flex-col items-center justify-center px-[30px] pt-20">
            <div
              style={{ paddingTop: "30px" }}
              className="max-w-[900px] text-center flex flex-col gap-4"
            >
              <div className="relative inline-block">
                <div className="flex flex-col">
                  <div className="flex items-end justify-center gap-6">
                    <motion.div
                      className="overflow-hidden flex"
                      style={{ y: titleScrollY, opacity: titleOpacity }}
                      variants={staggerLetters}
                      initial="hidden"
                      animate="visible"
                    >
                      {buildLetters.map((letter, i) => (
                        <div key={i} className="overflow-hidden" style={i > 0 ? { marginLeft: "-0.04em" } : undefined}>
                          <motion.span className="inline-block font-display text-[11rem] font-black uppercase leading-none tracking-[-0.04em]" variants={letterUp}>
                            {letter}
                          </motion.span>
                        </div>
                      ))}
                    </motion.div>

                    <motion.button
                      style={{ marginBottom: "20px", x: xIconSmoothX, y: xIconSmoothY }}
                      className="flex h-14 w-14 items-center justify-center border border-[#ff9900] text-[#ff9900] outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      variants={xButton}
                      initial="hidden"
                      animate="visible"
                      whileHover={{
                        rotate: 90,
                        scale: 1.1,
                        borderWidth: 2,
                        boxShadow: "0 0 20px rgba(255,153,0,0.4)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <motion.div
                        animate={{ y: [0, -2, 0, 2, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6l12 12M18 6L6 18"
                          />
                        </svg>
                      </motion.div>
                    </motion.button>
                  </div>

                  <motion.div
                    className="overflow-hidden flex"
                    style={{ y: titleScrollY, opacity: titleOpacity }}
                    variants={staggerLettersBeyond}
                    initial="hidden"
                    animate="visible"
                  >
                    {beyondLetters.map((letter, i) => (
                      <div key={i} className="overflow-hidden" style={i > 0 ? { marginLeft: "-0.04em" } : undefined}>
                        <motion.span
                          style={{ marginTop: "-20px" }}
                          className="inline-block font-display text-[11rem] font-black uppercase leading-none tracking-[-0.04em] text-[#ff9900]"
                          variants={letterUpBeyond}
                        >
                          {letter}
                        </motion.span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="mx-auto mt-20 max-w-[650px]"
                variants={paragraph}
                initial="hidden"
                animate="visible"
              >
                <p className="text-lg uppercase leading-9 tracking-[0.18em] text-gray-200">
                  Empowering peers to build, deploy and scale the future with AWS.
                </p>
              </motion.div>

              <motion.div
                className="mt-15 flex justify-center gap-6"
                variants={ctaContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  style={{ padding: "15px 40px" }}
                  className="inline-flex rounded-lg items-center justify-center bg-[#ff9900] px-24 py-10 font-display text-lg uppercase leading-none text-black outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  variants={ctaButton}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                    filter: "brightness(1.1)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <span>Explore</span>
                  <motion.span
                    className="inline-block ml-1"
                    whileHover={{ x: 6, scaleX: 1.3 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <motion.button
                  style={{ padding: "15px 40px" }}
                  className="relative inline-flex overflow-hidden items-center justify-center border border-[#ff9900] px-10 py-4 font-display text-lg uppercase leading-none outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  variants={ctaButton}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 0 20px rgba(255,153,0,0.3)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-[#ff9900]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <span className="relative z-10">Join Us</span>
                  <motion.span
                    className="relative z-10 inline-block ml-1"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
    </>
  );
}
