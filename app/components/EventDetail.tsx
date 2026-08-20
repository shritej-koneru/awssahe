"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ClubEvent } from "../lib/events";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RegisterButton from "./RegisterButton";

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

          {isUpcoming && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                marginTop: "3.5rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                border: "2px solid #a855f7",
                backgroundColor: "rgba(168,85,247,0.08)",
                padding: "1.75rem",
              }}
            >
              <div>
                <div
                  className="font-display uppercase"
                  style={{ fontSize: "1.35rem", lineHeight: 1.1, letterSpacing: "0.02em" }}
                >
                  Mandatory attendance.
                </div>
                <div className="font-body" style={{ marginTop: "0.4rem", fontSize: "0.85rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)" }}>
                  Students who remain absent will be fined. Bring your laptop.
                </div>
              </div>
              <RegisterButton />
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ marginTop: "4.5rem", textAlign: "center" }}
            >
              <RegisterButton />
              <p
                className="font-body"
                style={{ marginTop: "1rem", fontSize: "0.8rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)" }}
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
