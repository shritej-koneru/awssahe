"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Award, ExternalLink } from "lucide-react";
import type { ClubEvent, SpeakerLinkIcon } from "../lib/events";
import Navbar from "./Navbar";
import Footer from "./Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const statusLabel: Record<ClubEvent["status"], string> = {
  upcoming: "UPCOMING",
  ongoing: "ONGOING",
  completed: "COMPLETED",
};

function DetailHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      className="font-display uppercase text-white"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "1.6rem",
        letterSpacing: "0.02em",
        marginBottom: "1.75rem",
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: "#a855f7",
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      {children}
    </motion.h2>
  );
}

function VocalMicIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 410.414 410.414"
      fill="#a855f7"
      stroke="#a855f7"
      strokeWidth="10"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M323.14,148.583c-5.523,0-10,4.477-10,10v53.789c0,63.615-55.755,86.282-107.934,86.282S97.273,275.987,97.273,212.372
        v-53.789c0-5.523-4.477-10-10-10s-10,4.477-10,10v53.789c0,33.888,13.334,61.751,38.561,80.58
        c20.407,15.231,47.703,23.932,79.373,25.441v72.022h-61.52c-5.523,0-10,4.477-10,10s4.477,10,10,10h143.039c5.523,0,10-4.477,10-10
        s-4.477-10-10-10h-61.52v-72.022c31.67-1.508,58.966-10.21,79.373-25.441c25.227-18.828,38.561-46.692,38.561-80.58v-53.789
        C333.14,153.06,328.663,148.583,323.14,148.583z" />
      <path d="M138.642,267.736c16.35,10.689,38.746,16.109,66.565,16.109s50.215-5.42,66.565-16.109
        c19.517-12.76,29.833-33.036,29.833-58.637V85.573C301.606,35.189,261.965,0,205.207,0c-56.758,0-96.398,35.189-96.398,85.573
        v123.526C108.808,234.7,119.125,254.976,138.642,267.736z M205.207,20c38.028,0,76.399,20.276,76.399,65.573v9.207h-40.312
        c-5.523,0-10,4.477-10,10s4.477,10,10,10h40.312v23.305h-40.312c-5.523,0-10,4.477-10,10s4.477,10,10,10h40.312v23.305h-40.312
        c-5.523,0-10,4.477-10,10s4.477,10,10,10h40.312v7.71c0,19.052-6.796,32.756-20.778,41.897
        c-12.857,8.406-32.091,12.849-55.621,12.849s-42.763-4.443-55.621-12.849c-13.981-9.141-20.777-22.845-20.777-41.897v-7.71h40.312
        c5.523,0,10-4.477,10-10s-4.477-10-10-10h-40.312v-23.305h40.312c5.523,0,10-4.477,10-10s-4.477-10-10-10h-40.312V114.78h40.312
        c5.523,0,10-4.477,10-10s-4.477-10-10-10h-40.312v-9.207C128.808,40.276,167.179,20,205.207,20z" />
    </svg>
  );
}

function SpeakerLinkIcon({ icon }: { icon: SpeakerLinkIcon }) {
  if (icon === "linkedin") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    );
  }

  return <Globe size={15} />;
}

export default function EventDetail({ event }: { event: ClubEvent }) {
  const isUpcoming = event.status === "upcoming" || event.status === "ongoing";

  const meta = [
    { label: "Date", value: event.date },
    { label: "Time", value: event.time },
    { label: "Venue", value: event.venue },
    { label: "Mode", value: event.mode },
    { label: "Registration closes", value: event.registrationDeadline },
    { label: "Seats", value: event.seats },
    { label: "Fee", value: event.fee },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <Navbar />

      <section
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "8rem",
          paddingBottom: "4rem",
          maxWidth: "1060px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      >
        <div>
          <motion.div initial="hidden" animate="visible" variants={containerStagger}>
            <motion.div variants={fadeUp}>
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 font-display uppercase"
                style={{ fontSize: "0.85rem", letterSpacing: "0.18em", color: "#a855f7" }}
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
                  ←
                </span>
                Events
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2.25rem" }}
            >
              <span
                className="font-display uppercase"
                style={{
                  border: "1.5px solid #a855f7",
                  color: "#a855f7",
                  padding: "0.25rem 0.8rem",
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                }}
              >
                {event.category}
              </span>
              <span
                className="font-display uppercase"
                style={{
                  backgroundColor: isUpcoming ? "#a855f7" : "transparent",
                  color: isUpcoming ? "#000000" : "rgba(255,255,255,0.6)",
                  border: "1.5px solid #a855f7",
                  padding: "0.25rem 0.8rem",
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  fontWeight: isUpcoming ? 700 : 400,
                }}
              >
                {statusLabel[event.status]}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display uppercase text-white"
              style={{
                marginTop: "1.5rem",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 0.95,
                letterSpacing: "0.01em",
                maxWidth: "900px",
              }}
            >
              {event.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{
                marginTop: "1.25rem",
                maxWidth: "620px",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {event.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{
                marginTop: "2.5rem",
                borderTop: "1px solid rgba(168,85,247,0.35)",
                borderBottom: "1px solid rgba(168,85,247,0.35)",
                padding: "1.5rem 0",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {meta.map((item) => (
                  <div key={item.label}>
                    <div
                      className="font-display uppercase"
                      style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: "#a855f7", marginBottom: "0.4rem" }}
                    >
                      {item.label}
                    </div>
                    <div className="font-display uppercase" style={{ fontSize: "0.95rem", letterSpacing: "0.03em", lineHeight: 1.3 }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingBottom: "6rem",
          maxWidth: "1060px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      >
        <div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={containerStagger}>
            <DetailHeading>About this event</DetailHeading>
            {event.description.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                variants={fadeUp}
                className="font-body"
                style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(255,255,255,0.8)", marginBottom: "1.25rem" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {event.speaker && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerStagger}
              style={{ marginTop: "3.5rem" }}
            >
              <DetailHeading>Meet the Speaker</DetailHeading>
              <motion.div
                variants={fadeUp}
                style={{
                  border: "1px solid rgba(168,85,247,0.4)",
                  backgroundColor: "rgba(168,85,247,0.05)",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <span
                    aria-hidden
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "1.5px solid #a855f7",
                      backgroundColor: "rgba(168,85,247,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <VocalMicIcon size={26} />
                  </span>
                  <div>
                    <h3
                      className="font-display uppercase text-white"
                      style={{ fontSize: "1.35rem", letterSpacing: "0.03em", lineHeight: 1.1 }}
                    >
                      {event.speaker.name}
                    </h3>
                    <p
                      className="font-body"
                      style={{ fontSize: "0.85rem", color: "#a855f7", marginTop: "0.25rem" }}
                    >
                      {event.speaker.tagline}
                    </p>
                  </div>
                </div>

                {event.speaker.bio.map((paragraph) => (
                  <motion.p
                    key={paragraph.slice(0, 24)}
                    variants={fadeUp}
                    className="font-body"
                    style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "1.25rem" }}
                  >
                    {paragraph}
                  </motion.p>
                ))}

                <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <Award size={14} color="#a855f7" />
                  <span
                    className="font-display uppercase"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: "#a855f7" }}
                  >
                    Credentials &amp; certifications
                  </span>
                </motion.div>
                <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {event.speaker.credentials.map((credential) => (
                    <span
                      key={credential}
                      className="font-body"
                      style={{
                        border: "1px solid rgba(168,85,247,0.5)",
                        color: "#a855f7",
                        padding: "0.3rem 0.8rem",
                        fontSize: "0.8rem",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {credential}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                  {event.speaker.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-display uppercase transition-colors duration-300 hover:text-white"
                      style={{
                        border: "1px solid rgba(168,85,247,0.5)",
                        color: "#a855f7",
                        padding: "0.4rem 0.9rem",
                        fontSize: "0.75rem",
                        letterSpacing: "0.12em",
                      }}
                    >
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        <SpeakerLinkIcon icon={link.icon} />
                      </span>
                      {link.label}
                      <ExternalLink size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {event.sessions && event.sessions.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerStagger}
              style={{ marginTop: "3.5rem" }}
            >
              <DetailHeading>Schedule</DetailHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "1rem",
                }}
              >
                {event.sessions.map((session, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    style={{
                      border: "1px solid rgba(168,85,247,0.35)",
                      backgroundColor: "rgba(168,85,247,0.05)",
                      padding: "1.25rem",
                    }}
                  >
                    <div
                      className="font-display uppercase"
                      style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: "#a855f7", marginBottom: "0.6rem" }}
                    >
                      Session {i + 1}
                    </div>
                    <div className="font-display uppercase" style={{ fontSize: "0.95rem", letterSpacing: "0.03em", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                      {session.date}
                    </div>
                    <div className="font-body" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                      <span style={{ color: "#a855f7" }}>Time:</span> {session.time}
                    </div>
                    <div className="font-body" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                      <span style={{ color: "#a855f7" }}>Venue:</span> {session.venue}
                    </div>
                    <div className="font-body" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                      <span style={{ color: "#a855f7" }}>Classes:</span> {session.classes}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}



          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerStagger}
            style={{ marginTop: "4.5rem" }}
          >
            <DetailHeading>Agenda</DetailHeading>

            <div style={{ position: "relative", borderLeft: "1px solid rgba(168,85,247,0.5)", paddingLeft: "1.75rem", marginLeft: "0.25rem" }}>
              {event.agenda.map((item, i) => (
                <motion.div
                  key={`${item.time}-${i}`}
                  variants={fadeUp}
                  style={{ position: "relative", marginBottom: "2rem" }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "calc(-1.75rem - 6px)",
                      top: "7px",
                      width: "11px",
                      height: "11px",
                      backgroundColor: "#a855f7",
                      transform: "rotate(45deg)",
                    }}
                  />
                  <span
                    className="font-display uppercase"
                    style={{
                      display: "inline-block",
                      border: "1px solid #a855f7",
                      color: "#a855f7",
                      padding: "0.15rem 0.6rem",
                      fontSize: "0.72rem",
                      letterSpacing: "0.15em",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {item.time}
                  </span>
                  <h3
                    className="font-display uppercase text-white"
                    style={{ fontSize: "1.15rem", letterSpacing: "0.03em", marginBottom: "0.3rem" }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div
            style={{
              marginTop: "4.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerStagger}
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "rgba(255,255,255,0.02)",
                padding: "1.75rem",
              }}
            >
              <motion.h3
                variants={fadeUp}
                className="font-display uppercase"
                style={{ fontSize: "1.15rem", letterSpacing: "0.05em", marginBottom: "1.25rem", color: "#a855f7" }}
              >
                Eligibility
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="font-body"
                style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "1.25rem" }}
              >
                {event.eligibility}
              </motion.p>
              {event.prerequisites.map((prereq) => (
                <motion.div
                  key={prereq}
                  variants={fadeUp}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", marginBottom: "0.7rem" }}
                >
                  <span
                    style={{
                      marginTop: "0.3em",
                      width: "11px",
                      height: "11px",
                      backgroundColor: "#a855f7",
                      flexShrink: 0,
                      transform: "rotate(45deg)",
                    }}
                  />
                  <span className="font-body" style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
                    {prereq}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerStagger}
              style={{
                border: "1px solid rgba(168,85,247,0.4)",
                backgroundColor: "rgba(168,85,247,0.05)",
                padding: "1.75rem",
              }}
            >
              <motion.h3
                variants={fadeUp}
                className="font-display uppercase"
                style={{ fontSize: "1.15rem", letterSpacing: "0.05em", marginBottom: "1.25rem", color: "#a855f7" }}
              >
                What you&apos;ll take away
              </motion.h3>
              {event.takeaways.map((takeaway) => (
                <motion.div
                  key={takeaway}
                  variants={fadeUp}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", marginBottom: "0.7rem" }}
                >
                  <span
                    style={{
                      marginTop: "0.3em",
                      width: "11px",
                      height: "11px",
                      backgroundColor: "#a855f7",
                      flexShrink: 0,
                      transform: "rotate(45deg)",
                    }}
                  />
                  <span className="font-body" style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
                    {takeaway}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerStagger}
            style={{ marginTop: "4.5rem" }}
          >
            <DetailHeading>Skills you&apos;ll touch</DetailHeading>
            <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {event.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-body"
                  style={{
                    border: "1px solid rgba(168,85,247,0.5)",
                    color: "#a855f7",
                    padding: "0.3rem 0.8rem",
                    fontSize: "0.8rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {isUpcoming && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ marginTop: "4.5rem", textAlign: "center" }}
            >
              <p
                className="font-body"
                style={{ fontSize: "0.8rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)" }}
              >
                Organized by {event.organizer}
              </p>
            </motion.div>
          )}

          {!isUpcoming && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-body"
              style={{
                marginTop: "4.5rem",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.45)",
                textAlign: "center",
              }}
            >
              Organized by {event.organizer} — this event has concluded.
            </motion.p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
