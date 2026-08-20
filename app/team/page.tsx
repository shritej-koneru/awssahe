"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export type Member = {
  name: string;
  image?: string;
  position?: string; // Custom face alignment (e.g. "center top", "center 10%", "center bottom")
  scale?: number;    // Custom zoom scale to make small distant faces match close-up portraits
};

type Department = {
  title: string;
  lead: Member;
  coLeads: Member[];
};

/* =========================================================================
   1. FACULTY COORDINATOR & LEADERSHIP
   ========================================================================= */
const coordinator: Member & { dept: string } = {
  name: "Dr. Y.V Nandini",
  dept: "Assistant Professor CSE",
  image: "/team/Nandini Mam.png",
};

const captain: Member = {
  name: "G. Gopi Durga Mahesh",
  image: "/team/Captain.png",
  position: "center top",
  scale: 1.05,
};

const viceCaptain: Member = {
  name: "S. Dhruvin Sai",
  image: "/team/dhruvin.png",
  position: "center 10%",
  scale: 1.0,
};

/* =========================================================================
   2. DEPARTMENTS & TEAMS
   ========================================================================= */
const departments: Department[] = [
  {
    title: "Technical & Cloud",
    lead: {
      name: "B. Naga Pujith Prasad",
      image: "/team/pujith.png",
      position: "center 15%",
      scale: 1.0,
    },
    coLeads: [
      { name: "N. Hasini Singh", image: "/team/hasini-r.png", position: "center 15%", scale: 1.0 },
      { name: "T. Keerthana Sai", image: "/team/Keer.png", position: "center 15%", scale: 1.0 },
      { name: "Y. Vedavathi", image: "/team/Vedavathi.png", position: "center 15%", scale: 1.0 },
    ],
  },
  {
    title: "Marketing",
    lead: {
      name: "M. Joshitha Pragnya",
      image: "/team/joshitha.png",
      position: "center 15%",
      scale: 1.0,
    },
    coLeads: [
      { name: "K. Sai Sreeja", image: "/team/sreeja.png", position: "center 15%", scale: 1.0 },
      { name: "P. Ananya", image: "/team/ananya.png", position: "center 15%", scale: 1.0 },
      { name: "D. Dharani", image: "/team/dharani.png", position: "center 15%", scale: 1.0 },
    ],
  },
  {
    title: "Web Designing",
    lead: {
      name: "K. Shritej",
      image: "/team/Shritej.png",
      position: "center 15%",
      scale: 1.0,
    },
    coLeads: [
      { name: "C. Lakshmi Chaitanya", image: "/team/Chaitanya.png", position: "center 15%", scale: 1.0 },
      { name: "A. Kiranmayi", image: "/team/Kiranmayi.png", position: "center 15%", scale: 1.0 },
      { name: "C. Srivalli Lakshmi Krishna Satwika", image: "/team/Satwika.png", position: "center 15%", scale: 1.0 },
    ],
  },
  {
    title: "Content Creation",
    lead: {
      name: "P. Hitesh",
      image: "/team/hitesh.png",
      position: "center 15%",
      scale: 1.0,
    },
    coLeads: [
      { name: "M. Hema Varshini", image: "/team/Hema.png", position: "center 15%", scale: 1.0 },
      { name: "Ch. Deeshma Durga", image: "/team/Deeshma.png", position: "center 15%", scale: 1.0 },
      { name: "Ayman Saleem", image: "/team/ayman.png", position: "center 15%", scale: 1.0 },
      { name: "N. Hasini", image: "/team/hasini.png", scale: 1.0 },
    ],
  },
];

function getInitials(name: string): string {
  const parts = name.replace(/Dr\.|Mr\.|Ms\./g, "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  const first = parts[0].replace(/[^a-zA-Z]/g, "")[0] || "";
  const last = parts[parts.length - 1].replace(/[^a-zA-Z]/g, "")[0] || "";
  return (first + last).toUpperCase() || "SB";
}

function purpleAvatarSVG(name: string) {
  const initials = getInitials(name);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
    <rect width="300" height="300" fill="#0f091c"/>
    <circle cx="150" cy="150" r="120" fill="none" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.35"/>
    <rect x="24" y="24" width="252" height="252" rx="12" fill="none" stroke="#a855f7" stroke-width="1.5" opacity="0.25"/>
    <circle cx="240" cy="50" r="14" fill="#a855f7" opacity="0.4"/>
    <text x="150" y="165" font-family="Oswald, sans-serif" font-size="95" font-weight="bold" fill="#a855f7" text-anchor="middle" dominant-baseline="middle" letter-spacing="4">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function SectionHeading({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "2rem",
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: "#a855f7",
          transform: "rotate(45deg)",
          flexShrink: 0,
          boxShadow: "0 0 10px rgba(168,85,247,0.8)",
        }}
      />
      <span
        className="font-display uppercase text-white"
        style={{ fontSize: "1.65rem", lineHeight: 1, letterSpacing: "0.04em" }}
      >
        {title}
      </span>
    </motion.div>
  );
}

function MemberCard({
  member,
  role,
  index = 0,
}: {
  member: Member;
  role: string;
  index?: number;
}) {
  const rotateTilt = index % 2 === 0 ? 1 : -1;
  const hasRealImage = Boolean(member.image && member.image.trim() !== "");

  // Format clean relative path with leading slash if missing
  let avatarSrc = purpleAvatarSVG(member.name);
  if (hasRealImage) {
    avatarSrc = member.image!.startsWith("/") ? member.image! : `/${member.image!}`;
  }

  const imagePos = member.position || "center 15%";
  const imageScale = member.scale ?? 1.0;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -10,
        scale: 1.03,
        rotateZ: rotateTilt,
        boxShadow: "0 20px 40px rgba(168,85,247,0.35)",
        borderColor: "#a855f7",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      style={{
        backgroundColor: "rgba(13,8,24,0.85)",
        backdropFilter: "blur(12px)",
        color: "#ffffff",
        border: "1.5px solid rgba(168,85,247,0.35)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        borderRadius: "14px",
      }}
      className="h-full overflow-hidden transition-all duration-300 relative group flex flex-col justify-between"
    >
      {/* Top Card Glow Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-700" />

      <div
        style={{
          borderBottom: "1px solid rgba(168,85,247,0.2)",
          position: "relative",
          overflow: "hidden",
          height: "260px",
          width: "100%",
          backgroundColor: "#0d071b",
        }}
      >
        <Image
          src={avatarSrc}
          alt={member.name}
          fill
          style={{
            display: "block",
            objectFit: "cover",
            objectPosition: imagePos,
            transform: `scale(${imageScale})`,
            transformOrigin: "center center",
          }}
          sizes="260px"
        />
        {/* Subtle Floating Sparkle */}
        <div className="absolute top-3 right-3 text-[10px] bg-purple-900/70 text-purple-200 border border-purple-500/40 px-2 py-0.5 rounded-full font-mono backdrop-blur-md z-10">
          AWS
        </div>
      </div>

      <div style={{ padding: "1.25rem" }}>
        <span
          className="font-display uppercase"
          style={{
            backgroundColor: "rgba(168,85,247,0.18)",
            color: "#a855f7",
            border: "1px solid rgba(168,85,247,0.5)",
            display: "inline-block",
            borderRadius: "6px",
            padding: "0.25rem 0.65rem",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            marginBottom: "0.75rem",
            fontWeight: 700,
          }}
        >
          {role}
        </span>
        <h3
          className="font-display uppercase text-white"
          style={{
            fontSize: "1.3rem",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}
        >
          {member.name}
        </h3>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const [selectedDept, setSelectedDept] = useState("ALL");

  const deptFilters = ["ALL", "FACULTY", "LEADERSHIP", "TECHNICAL & CLOUD", "MARKETING", "WEB DESIGNING", "CONTENT CREATION"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <Navbar />

      <section
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "8.5rem",
          paddingBottom: "2rem",
          maxWidth: "1060px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerStagger}
        >
          <motion.div variants={fadeUp}>
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
              {"// Team"}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display uppercase text-white"
            style={{
              marginTop: "2rem",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              maxWidth: "900px",
            }}
          >
            People behind <span style={{ color: "#a855f7" }}>the builds.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body"
            style={{
              marginTop: "1.25rem",
              maxWidth: "620px",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Four departments, one shared obsession — shipping real cloud. Led by
            a faculty coordinator and run by student leads and co-leads across
            the club.
          </motion.p>

          {/* Department Filter Tabs */}
          <motion.div
            variants={fadeUp}
            style={{
              marginTop: "2.5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
            }}
          >
            {deptFilters.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className="font-display uppercase transition-all duration-200 cursor-pointer"
                style={{
                  padding: "0.45rem 1.2rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  borderRadius: "8px",
                  border: selectedDept === dept ? "1.5px solid #a855f7" : "1px solid rgba(255,255,255,0.18)",
                  backgroundColor: selectedDept === dept ? "#a855f7" : "rgba(168,85,247,0.06)",
                  color: selectedDept === dept ? "#000000" : "#ffffff",
                  fontWeight: selectedDept === dept ? 800 : 500,
                  boxShadow: selectedDept === dept ? "0 0 16px rgba(168,85,247,0.4)" : "none",
                }}
              >
                {dept}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDept}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
        >
          {/* 1. Faculty Coordinator Section (FIRST) */}
          {(selectedDept === "ALL" || selectedDept === "FACULTY") && (
            <section
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingBottom: "4rem",
                maxWidth: "1060px",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
              }}
            >
              <SectionHeading title="Faculty Coordinator" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerStagger}
                style={{ maxWidth: "360px" }}
              >
                <MemberCard
                  member={coordinator}
                  role="Faculty Coordinator"
                  index={0}
                />
                <motion.p
                  variants={fadeUp}
                  className="font-body"
                  style={{
                    marginTop: "1.25rem",
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    color: "#a855f7",
                    fontWeight: 600,
                  }}
                >
                  {coordinator.dept}
                </motion.p>
              </motion.div>
            </section>
          )}

          {/* 2. Leadership Section (SECOND) */}
          {(selectedDept === "ALL" || selectedDept === "LEADERSHIP") && (
            <section
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingBottom: "4rem",
                maxWidth: "1060px",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
              }}
            >
              <SectionHeading title="Leadership" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerStagger}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "1.75rem",
                  maxWidth: "860px",
                }}
              >
                <MemberCard member={captain} role="Captain" index={1} />
                <MemberCard member={viceCaptain} role="Vice Captain" index={2} />
              </motion.div>
            </section>
          )}

          {/* 3. Departments Section (THIRD) */}
          {departments
            .filter((dept) => selectedDept === "ALL" || selectedDept === dept.title.toUpperCase())
            .map((dept, deptIdx) => (
              <section
                key={dept.title}
                style={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  paddingBottom: "5rem",
                  maxWidth: "1060px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                }}
              >
                <SectionHeading title={dept.title} />

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={containerStagger}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1.75rem",
                  }}
                >
                  <MemberCard member={dept.lead} role="Lead" index={deptIdx * 5} />
                  {dept.coLeads.map((member, i) => (
                    <MemberCard
                      key={`${dept.title}-${i}`}
                      member={member}
                      role="Co-Lead"
                      index={deptIdx * 5 + i + 1}
                    />
                  ))}
                </motion.div>
              </section>
            ))}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}
