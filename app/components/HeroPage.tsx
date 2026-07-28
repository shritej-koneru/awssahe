"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";

/* ─── Easing ─── */
const E = [0.22, 1, 0.36, 1] as const;
const STIFF = [0.16, 1, 0.3, 1] as const;

/* ─── Nav links ─── */
const NAV = ["About", "Events", "Team", "Projects", "Join"];

/* ─────────────────────────────────────────────
   Stagger container
───────────────────────────────────────────── */
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: E } },
};

/* ─────────────────────────────────────────────
   Decorative: left measurement marks
───────────────────────────────────────────── */
function MeasureMarks() {
  return (
    <motion.div
      className="absolute left-6 bottom-20 flex flex-col-reverse gap-0"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: E, delay: 1.6 }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-1"
          style={{ marginBottom: 6 }}
        >
          <div
            style={{
              width: i % 4 === 0 ? 16 : 8,
              height: 1,
              background: "rgba(255,153,0,0.6)",
            }}
          />
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Decorative: network node diagram
───────────────────────────────────────────── */
function NetworkDiagram() {
  const nodes = [
    { cx: 60, cy: 20 },
    { cx: 110, cy: 70 },
    { cx: 40, cy: 100 },
    { cx: 160, cy: 110 },
    { cx: 90, cy: 150 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ];

  return (
    <motion.svg
      viewBox="0 0 200 170"
      className="absolute"
      style={{ width: 160, height: 140, right: 240, bottom: 100 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.8 }}
    >
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#FF9900"
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.9 + i * 0.1, ease: E }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={5}
          fill="none"
          stroke="#FF9900"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.0 + i * 0.08, ease: E }}
        />
      ))}
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────
   Decorative: orange diamond / geometric shapes
───────────────────────────────────────────── */
function OrangeGeometry() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 180 }}>
      {/* Left diamond */}
      <motion.div
        style={{
          position: "absolute",
          left: "12%",
          bottom: 0,
          width: 180,
          height: 160,
          background: "#FF9900",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          opacity: 0.85,
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.85 }}
        transition={{ duration: 1, ease: STIFF, delay: 1.4 }}
      />
      {/* Second smaller left diamond */}
      <motion.div
        style={{
          position: "absolute",
          left: "20%",
          bottom: 20,
          width: 100,
          height: 90,
          background: "#FF9900",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          opacity: 0.6,
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.6 }}
        transition={{ duration: 1, ease: STIFF, delay: 1.5 }}
      />
      {/* Right outlines */}
      <motion.div
        style={{
          position: "absolute",
          right: "14%",
          bottom: 40,
          width: 120,
          height: 110,
          border: "1.5px solid #FF9900",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          opacity: 0.4,
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.4 }}
        transition={{ duration: 1, ease: STIFF, delay: 1.6 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function HeroPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0B0B0B", fontFamily: "'Inter Tight', system-ui, sans-serif" }}
    >
      {/* ── Background architectural image ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.35, mixBlendMode: "luminosity" }}
          priority
        />
        {/* Dark gradient overlay to keep text readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.85) 70%)",
          }}
        />
      </motion.div>

      {/* ── Grain texture ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.04,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Everything else sits above grain ── */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ════════════════════════
            NAVBAR
        ════════════════════════ */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: E }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
            height: 64,
            borderBottom: "1px solid rgba(255,153,0,0.2)",
            position: "relative",
          }}
        >
          {/* Left: logo + site name */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              style={{
                width: 36,
                height: 36,
                flexShrink: 0,
                border: "1px solid rgba(255,153,0,0.4)",
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,153,0,0.06)",
              }}
            >
              <Image
                src="/sahe-logo.png"
                alt="SAHE Logo"
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
              />
            </motion.div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
              <span
                style={{
                  color: "#FF9900",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                AWS
              </span>
              <span
                style={{
                  color: "#f5f5f5",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Students Builder Group
              </span>
            </div>
          </div>

          {/* Center: nav links */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{ display: "flex", gap: "2.5rem", listStyle: "none", padding: 0, margin: 0 }}
          >
            {NAV.map((item) => (
              <motion.li key={item} variants={fadeUp}>
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: "rgba(245,245,245,0.65)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                  whileHover={{ color: "#FF9900" }}
                  transition={{ duration: 0.15 }}
                >
                  {item}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right: arrow CTA */}
          <motion.a
            href="#join"
            whileHover={{ scale: 1.08, backgroundColor: "#FF9900" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              width: 40,
              height: 40,
              border: "1.5px solid #FF9900",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              color: "#FF9900",
              textDecoration: "none",
            }}
          >
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              whileHover={{ x: 2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M3 13L13 3M13 3H5M13 3V11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.a>
        </motion.nav>

        {/* ════════════════════════
            HERO SECTION
        ════════════════════════ */}
        <section
          style={{
            position: "relative",
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingBottom: "2rem",
          }}
        >
          {/* BUILD row */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {/* BUILD word — letters stagger in */}
            <div style={{ display: "flex" }}>
              {"BUILD".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, skewY: 6 }}
                  animate={{ opacity: 1, y: 0, skewY: 0 }}
                  transition={{
                    duration: 0.75,
                    ease: STIFF,
                    delay: 0.3 + i * 0.07,
                  }}
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(5rem, 14vw, 10.5rem)",
                    fontWeight: 900,
                    lineHeight: 0.88,
                    color: "#F5F5F5",
                    letterSpacing: "-0.03em",
                    fontFamily: "'Inter Tight', system-ui, sans-serif",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* × Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.55, ease: STIFF, delay: 0.85 }}
              style={{
                width: "clamp(36px, 5vw, 56px)",
                height: "clamp(36px, 5vw, 56px)",
                border: "1.5px solid #FF9900",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                alignSelf: "center",
              }}
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                style={{ width: "40%", height: "40%" }}
              >
                <line x1="4" y1="4" x2="16" y2="16" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="16" y1="4" x2="4" y2="16" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          {/* BEYOND word */}
          <div style={{ display: "flex", lineHeight: 0.85, marginTop: "0.1em" }}>
            {"BEYOND".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, skewY: 8 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{
                  duration: 0.8,
                  ease: STIFF,
                  delay: 0.45 + i * 0.07,
                }}
                style={{
                  display: "inline-block",
                  fontSize: "clamp(5rem, 14vw, 10.5rem)",
                  fontWeight: 900,
                  lineHeight: 0.88,
                  color: "#FF9900",
                  letterSpacing: "-0.03em",
                  fontFamily: "'Inter Tight', system-ui, sans-serif",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Thin divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: E, delay: 1.1 }}
            style={{
              width: "clamp(200px, 40vw, 400px)",
              height: 1,
              background: "rgba(245,245,245,0.15)",
              marginTop: "1.5rem",
              transformOrigin: "left",
            }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: E, delay: 1.25 }}
            style={{
              fontFamily: "'Inter Tight', system-ui, sans-serif",
              fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)",
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "rgba(245,245,245,0.6)",
              textTransform: "uppercase",
              maxWidth: "36ch",
              lineHeight: 1.8,
              marginTop: "1.25rem",
            }}
          >
            Empowering students to build, deploy
            <br />
            and scale the future with{" "}
            <span style={{ color: "#FF9900" }}>AWS.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: E, delay: 1.45 }}
            style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}
          >
            {/* Explore */}
            <motion.a
              href="#about"
              whileHover={{ scale: 1.04, backgroundColor: "#e68a00" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#FF9900",
                color: "#0B0B0B",
                fontFamily: "'Inter Tight', system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.85rem 2rem",
                borderRadius: 2,
              }}
            >
              Explore
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>

            {/* Join Us */}
            <motion.a
              href="#join"
              whileHover={{ scale: 1.04, borderColor: "#FF9900", color: "#FF9900" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "rgba(245,245,245,0.05)",
                color: "#F5F5F5",
                fontFamily: "'Inter Tight', system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.85rem 2rem",
                border: "1.5px solid rgba(245,245,245,0.25)",
                borderRadius: 2,
              }}
            >
              Join Us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── AWS Badge (bottom right) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, ease: STIFF, delay: 1.7 }}
            style={{
              position: "absolute",
              right: "4rem",
              bottom: "3rem",
              background: "#16181c",
              border: "1px solid rgba(255,153,0,0.25)",
              borderRadius: 4,
              padding: "0.75rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Image
              src="/aws-logo-white.png"
              alt="AWS"
              width={52}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </motion.div>

          {/* ── Network diagram ── */}
          <NetworkDiagram />

          {/* ── Orange geometry ── */}
          <OrangeGeometry />

          {/* ── Left measure marks ── */}
          <MeasureMarks />
        </section>
      </div>
    </div>
  );
}
