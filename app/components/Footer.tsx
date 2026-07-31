"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const paths = {
  instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

const socials = [
  { label: "Instagram", d: paths.instagram },
  { label: "LinkedIn", d: paths.linkedin },
];

function SocialIcon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const parallaxX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden text-white"
      style={{
        minHeight: "330px",
        backgroundColor: "#000000",
        borderTop: "1px solid rgba(255,153,0,0.25)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,153,0,0.08), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -24,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <motion.span
          style={{
            fontSize: "clamp(9rem, 22vw, 16rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: "#ff9900",
            opacity: 0.05,
            whiteSpace: "nowrap",
            x: parallaxX,
          }}
          aria-hidden="true"
        >
          #AWSSTUDENTBUILDERS
        </motion.span>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto flex h-full w-full flex-col justify-between"
        style={{
          minHeight: "330px",
          paddingLeft: "clamp(48px, 6vw, 64px)",
          paddingRight: "clamp(48px, 6vw, 64px)",
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(32px, 4vw, 48px)",
        }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          <motion.div variants={fadeUp}>
            <h2
              style={{
                fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "0.02em",
              }}
              className="uppercase"
            >
              <span style={{ color: "#ff9900" }}>AWS</span> Student
              <br />
              Builders Group
            </h2>
            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "0.95rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.65)",
              }}
              className="font-body uppercase"
            >
              Siddhartha Academy of Higher Education — Vijayawada
            </p>
          </motion.div>

          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            variants={fadeUp}
          >
            {socials.map(({ label, d }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  border: "1px solid #ff9900",
                  backgroundColor: "rgba(255,153,0,0.06)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  color: "#ff9900",
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "rgba(255,153,0,0.18)",
                  borderColor: "#ff9900",
                  boxShadow: "0 0 24px rgba(255,153,0,0.35)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <SocialIcon d={d} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ marginTop: "3rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
        >
          <div
            style={{
              height: "1px",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          />
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "0.9rem",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.45)",
            }}
            className="font-body uppercase"
          >
            © 2026 AWS Student Builders Group. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
