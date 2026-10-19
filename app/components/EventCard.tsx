"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ClubEvent } from "../lib/events";

const statusLabel: Record<ClubEvent["status"], string> = {
  upcoming: "UPCOMING",
  ongoing: "ONGOING",
  completed: "COMPLETED",
};

export default function EventCard({
  event,
  index = 0,
}: {
  event: ClubEvent;
  index?: number;
}) {
  const rotate = index % 2 === 0 ? -0.8 : 1;

  const cardStyle = {
    backgroundColor: (event.status === "upcoming" || event.status === "ongoing") ? "#a855f7" : "rgba(13,8,24,0.85)",
    color: (event.status === "upcoming" || event.status === "ongoing") ? "#000000" : "#ffffff",
    border: (event.status === "upcoming" || event.status === "ongoing") ? "2px solid #ffffff" : "1.5px solid rgba(168,85,247,0.4)",
    boxShadow: (event.status === "upcoming" || event.status === "ongoing") ? "6px 6px 0 0 #000000" : "6px 6px 0 0 rgba(168,85,247,0.15)",
  };

  const onDark = event.status === "upcoming" || event.status === "ongoing";

  const chipStyle = {
    border: onDark ? "1.5px solid #000000" : "1px solid rgba(168,85,247,0.45)",
    backgroundColor: onDark ? "#000000" : "rgba(168,85,247,0.1)",
    color: "#a855f7",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: rotate * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
        delay: (index % 3) * 0.08,
      }}
      whileHover={{ y: -5, rotate: 0 }}
      style={cardStyle}
      className="h-full"
    >
      <Link
        href={`/events/${event.id}`}
        className="group flex h-full flex-col justify-between"
        style={{ padding: "1.25rem" }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "0.9rem",
            }}
          >
            <span
              className="font-display uppercase"
              style={{
                ...chipStyle,
                padding: "0.2rem 0.6rem",
                fontSize: "0.68rem",
                letterSpacing: "0.16em",
              }}
            >
              {event.category}
            </span>
            <span
              className="font-display uppercase"
              style={{
                ...chipStyle,
                padding: "0.2rem 0.6rem",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
              }}
            >
              {statusLabel[event.status]}
            </span>
          </div>

          <h3
            className="font-display uppercase"
            style={{
              fontSize: "1.35rem",
              letterSpacing: "0.02em",
              lineHeight: 1.02,
              marginBottom: "0.75rem",
            }}
          >
            {event.title}
          </h3>

          <div
            className="uppercase"
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              color: onDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              marginBottom: "0.9rem",
              fontWeight: onDark ? 600 : 400,
            }}
          >
            <span>{event.date}</span>
            <br />
            <span>{event.time} · {event.mode}</span>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.35rem",
              marginBottom: "1rem",
            }}
          >
            {event.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="font-body"
                style={{
                  ...chipStyle,
                  padding: "0.15rem 0.5rem",
                  fontSize: "0.68rem",
                  letterSpacing: "0.05em",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <span
            className="font-display uppercase"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              color: onDark ? "#000000" : "#a855f7",
              fontWeight: 700,
            }}
          >
            View details{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
