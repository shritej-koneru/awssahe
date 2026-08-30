"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TankGame404 from "./components/TankGame404";
import {
  staggerLetters,
  letterUp,
  staggerLettersBeyond,
  letterUpBeyond,
  xButton,
  paragraph,
  ctaContainer,
  ctaButton,
} from "./lib/motion-variants";

const errorLetters = "ERROR".split("");
const code404Letters = "404".split("");

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
      className={`relative inline-flex cursor-pointer items-center justify-center overflow-hidden font-display text-lg uppercase leading-none outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      variants={ctaButton}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, boxShadow: "0 0 24px rgba(168,85,247,0.4)" }}
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

export default function NotFound() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

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
    <main className="relative min-h-screen bg-transparent text-white overflow-hidden flex flex-col justify-between">
      <TankGame404 />
      <Navbar />

      <section
        ref={sectionRef}
        className="relative min-h-screen bg-transparent text-white overflow-hidden flex-1 flex flex-col justify-center items-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image Matching Home Page */}
        <div className="absolute inset-0 bg-[url('/bg-hero.png')] bg-cover bg-center bg-no-repeat opacity-25" />

        {/* Ambient Radial Spotlights */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.18), transparent 45%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.10), transparent 50%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 w-full">
          <div
            className="hero-top-pad flex min-h-screen max-w-[1536px] flex-col items-center justify-center"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "clamp(16px, 4vw, 30px)",
              paddingRight: "clamp(16px, 4vw, 30px)",
            }}
          >
            <div className="hero-inner-top-pad max-w-[950px] text-center flex flex-col items-center gap-4 md:gap-0">
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
                      variants={staggerLetters}
                      initial="hidden"
                      animate="visible"
                    >
                      {errorLetters.map((letter, i) => (
                        <div
                          key={i}
                          className="overflow-hidden"
                          style={i > 0 ? { marginLeft: "-0.04em" } : undefined}
                        >
                          <motion.span
                            className="inline-block font-display text-[clamp(3.5rem,25vw,11rem)] font-black uppercase leading-none tracking-[-0.04em]"
                            variants={letterUp}
                          >
                            {letter}
                          </motion.span>
                        </div>
                      ))}
                    </motion.div>

                    <motion.button
                      style={{
                        marginBottom: "clamp(8px, 3vw, 20px)",
                        x: xIconSmoothX,
                        y: xIconSmoothY,
                      }}
                      className="flex h-10 w-10 items-center justify-center border border-[#a855f7] text-[#a855f7] outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-14 sm:w-14"
                      variants={xButton}
                      initial="hidden"
                      animate="visible"
                      whileHover={{
                        rotate: 90,
                        scale: 1.1,
                        borderWidth: 2,
                        boxShadow: "0 0 20px rgba(168,85,247,0.4)",
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
                    variants={staggerLettersBeyond}
                    initial="hidden"
                    animate="visible"
                  >
                    {code404Letters.map((letter, i) => (
                      <div
                        key={i}
                        className="overflow-hidden"
                        style={i > 0 ? { marginLeft: "-0.04em" } : undefined}
                      >
                        <motion.span
                          style={{ marginTop: "clamp(-12px, -3vw, -20px)" }}
                          className="inline-block font-display text-[clamp(3.5rem,25vw,11rem)] font-black uppercase leading-none tracking-[-0.04em] text-[#a855f7]"
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
                  Resource Not Found // NoSuchEntityException — The cloud route you are searching for does not exist.
                </p>
              </motion.div>

              <motion.div
                className="hero-cta-pad flex items-center justify-center gap-3 sm:flex-row sm:gap-6"
                variants={ctaContainer}
                initial="hidden"
                animate="visible"
              >
                <SlideButton
                  label="Return Home"
                  arrow="→"
                  fill="#000000"
                  idleText="#000000"
                  hoverText="#a855f7"
                  className="rounded-lg bg-[#a855f7]"
                  style={{ padding: "14px clamp(20px, 5vw, 44px)" }}
                  onClick={() => {
                    router.push("/");
                  }}
                />

                <SlideButton
                  label="Explore Events"
                  arrow="→"
                  fill="#a855f7"
                  idleText="#ffffff"
                  hoverText="#000000"
                  className="rounded-lg border border-[#a855f7] bg-transparent"
                  style={{ padding: "14px clamp(20px, 5vw, 44px)" }}
                  onClick={() => {
                    router.push("/events");
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
