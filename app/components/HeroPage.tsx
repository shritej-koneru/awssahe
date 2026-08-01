"use client";

import { useRef, useState } from "react";
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
import Footer from "./Footer";
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

function SlideButton({
  label,
  arrow,
  fill,
  idleText,
  hoverText,
  className = "",
  style,
  onClick,
}: {
  label: string;
  arrow?: string;
  fill: string;
  idleText: string;
  hoverText: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      style={style}
      onClick={onClick}
      className={`relative inline-flex cursor-pointer items-center justify-center overflow-hidden font-display text-lg uppercase leading-none outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      variants={ctaButton}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, boxShadow: "0 0 20px rgba(255,153,0,0.35)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: fill }}
        initial={false}
        animate={{ x: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      <span
        className="relative z-10"
        style={{
          color: hovered ? hoverText : idleText,
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </span>
      {arrow && (
        <motion.span
          className="relative z-10 ml-1 inline-block"
          style={{
            color: hovered ? hoverText : idleText,
            transition: "color 0.3s ease",
          }}
          animate={{ x: hovered ? 6 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {arrow}
        </motion.span>
      )}
    </motion.button>
  );
}

export default function HeroPage() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const titleScrollY = useTransform(scrollY, [0, 500], [0, -30]);
  const titleOpacity = useTransform(scrollY, [0, 500], [1, 0.6]);

  const xIconX = useMotionValue(0);
  const xIconY = useMotionValue(0);
  const xIconSmoothX = useSpring(xIconX, { damping: 30, stiffness: 200 });
  const xIconSmoothY = useSpring(xIconY, { damping: 30, stiffness: 200 });

  const tiltX = useTransform(xIconSmoothX, [-8, 8], [6, -6]);
  const tiltY = useTransform(xIconSmoothY, [-8, 8], [6, -6]);

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
      <Navbar />
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-black text-white overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-[url('/bg-hero.png')] bg-cover bg-center bg-no-repeat" />

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,153,0,0.10), transparent 45%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute h-[50vh] w-[50vh] rounded-full"
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            filter: "blur(100px)",
            background: "radial-gradient(circle, rgba(255,153,0,0.14), transparent 70%)",
          }}
          animate={{ x: [0, 80, -60, 0], y: [0, -40, 50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          <BackgroundGraphics />

          <div
            className="hero-top-pad flex min-h-screen max-w-[1536px] flex-col items-center justify-center"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "clamp(16px, 4vw, 30px)",
              paddingRight: "clamp(16px, 4vw, 30px)",
            }}
          >
            <div
              className="hero-inner-top-pad max-w-[900px] text-center flex flex-col gap-4 md:gap-0"
            >
              <motion.div
                className="relative inline-block"
                style={{
                  rotateX: tiltY,
                  rotateY: tiltX,
                  transformPerspective: 1000,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-end justify-center gap-4 sm:gap-6">
                    <motion.div
                      className="overflow-hidden flex"
                      style={{ y: titleScrollY, opacity: titleOpacity }}
                      variants={staggerLetters}
                      initial="hidden"
                      animate="visible"
                    >
                      {buildLetters.map((letter, i) => (
                        <div key={i} className="overflow-hidden" style={i > 0 ? { marginLeft: "-0.04em" } : undefined}>
                          <motion.span className="inline-block font-display text-[clamp(3.25rem,25vw,10.5rem)] font-black uppercase leading-none tracking-[-0.04em]" variants={letterUp}>
                            {letter}
                          </motion.span>
                        </div>
                      ))}
                    </motion.div>

                    <motion.button
                      style={{ marginBottom: "clamp(8px, 3vw, 20px)", x: xIconSmoothX, y: xIconSmoothY }}
                      className="flex h-10 w-10 items-center justify-center border border-[#ff9900] text-[#ff9900] outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-14 sm:w-14"
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
                          className="h-5 w-5 sm:h-6 sm:w-6"
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
                    className="overflow-hidden flex justify-center"
                    style={{ y: titleScrollY, opacity: titleOpacity }}
                    variants={staggerLettersBeyond}
                    initial="hidden"
                    animate="visible"
                  >
                    {beyondLetters.map((letter, i) => (
                      <div key={i} className="overflow-hidden" style={i > 0 ? { marginLeft: "-0.04em" } : undefined}>
                        <motion.span
                          style={{ marginTop: "clamp(-12px, -3vw, -20px)" }}
                          className="inline-block font-display text-[clamp(3.25rem,25vw,10.5rem)] font-black uppercase leading-none tracking-[-0.04em] text-[#ff9900]"
                          variants={letterUpBeyond}
                        >
                          {letter}
                        </motion.span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="hero-caption-pad max-w-[650px]"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                variants={paragraph}
                initial="hidden"
                animate="visible"
              >
                <p
                  className="font-body uppercase text-gray-200"
                  style={{
                    fontSize: "clamp(0.875rem, 3.4vw, 1.125rem)",
                    lineHeight: 1.9,
                    letterSpacing: "0.14em",
                  }}
                >
                  Empowering peers to build, deploy and scale the future with AWS.
                </p>
              </motion.div>

              <motion.div
                className="hero-cta-pad flex items-center justify-center gap-3 sm:flex-row sm:gap-6"
                variants={ctaContainer}
                initial="hidden"
                animate="visible"
              >
                <SlideButton
                  label="Explore"
                  arrow="→"
                  fill="#000000"
                  idleText="#000000"
                  hoverText="#ff9900"
                  className="rounded-lg bg-[#ff9900]"
                  style={{ padding: "14px clamp(20px, 5vw, 44px)" }}
                  onClick={() => {
                    window.location.href = "/events";
                  }}
                />

                <SlideButton
                  label="Join Us"
                  arrow="→"
                  fill="#ff9900"
                  idleText="#ff9900"
                  hoverText="#000000"
                  className="border border-[#ff9900]"
                  style={{ padding: "14px clamp(20px, 5vw, 44px)" }}
                  onClick={() => {
                    window.location.href = "/join";
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <Footer />
    </>
  );
}
