"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { getUpcomingEvents, getCompletedEvents } from "../lib/events";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function SectionHeading({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: "#ff9900",
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <span
        className="font-display uppercase text-white"
        style={{ fontSize: "1.6rem", lineHeight: 1, letterSpacing: "0.02em" }}
      >
        {title}
      </span>
    </motion.div>
  );
}

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const previous = getCompletedEvents();

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Navbar />

      <section
        className="relative"
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
        <div>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span
              className="font-display uppercase"
              style={{
                display: "inline-block",
                backgroundColor: "#ff9900",
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
              {"// Events"}
            </span>
          </motion.div>
        </div>
      </section>

      <section
        className="relative"
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
        <div>
          <SectionHeading title="Upcoming Events" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {upcoming.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          {upcoming.length === 0 && (
            <p className="font-body" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>
              Nothing scheduled right now — check back soon.
            </p>
          )}
        </div>
      </section>

      <section
        className="relative"
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingBottom: "8rem",
          maxWidth: "1060px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      >
        <div>
          <SectionHeading title="Previous Events" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {previous.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
