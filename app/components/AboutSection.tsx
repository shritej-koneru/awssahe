"use client";

import { motion } from "framer-motion";
import {
  WorkshopIllustration,
  ProjectIllustration,
  CertificationIllustration,
} from "./AboutIllustrations";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const departments = [
  { title: "Technical & Cloud", desc: "AWS architecture, serverless, containers, and cloud-native deployments." },
  { title: "Web Designing", desc: "Modern, responsive interfaces with a focus on user experience and performance." },
  { title: "Marketing", desc: "Campaigns, social media, and community outreach that amplifies our reach." },
  { title: "Content Creation", desc: "Technical blogs, tutorials, and visual content that educates and inspires." },
];

const reasons = [
  "Hands-on AWS workshops that go beyond theory.",
  "Hackathons where you ship real products under pressure.",
  "Team projects from concept to deployed application.",
  "Mentorship and connections with industry professionals.",
  "Leadership opportunities to run initiatives and shape the club.",
  "A portfolio of shipped work by the time you graduate.",
];

const activities = [
  {
    title: "Workshops",
    Icon: WorkshopIllustration,
    desc: "Hands-on AWS workshops where members learn by building real cloud infrastructure, not just listening.",
  },
  {
    title: "Projects",
    Icon: ProjectIllustration,
    desc: "Team projects that take you from concept to a deployed, live application you can show the world.",
  },
  {
    title: "Certifications",
    Icon: CertificationIllustration,
    desc: "Study groups, practice labs, and mentorship to help members earn AWS certifications.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black text-white overflow-hidden">
      <div
        className="relative z-10"
        style={{
          maxWidth: "1060px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "9rem",
          paddingBottom: "9rem",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ textAlign: "left" }}
        >
          <motion.div variants={fadeIn}>
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
              {"// About"}
            </span>
          </motion.div>

          <motion.h2
            className="font-display uppercase text-white"
            style={{
              maxWidth: "900px",
              marginTop: "2.5rem",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
            }}
            variants={fadeIn}
          >
            A student-led cloud computing community at Siddhartha Academy of Higher Education,{" "}
            <span style={{ color: "#a855f7", textShadow: "4px 4px 0 rgba(255,255,255,0.35)" }}>
              Vijayawada.
            </span>
          </motion.h2>

          <motion.div style={{ marginTop: "2.5rem", maxWidth: "680px" }} variants={fadeIn}>
            <p
              style={{ marginBottom: "1.25rem" }}
              className="font-body text-[1rem] leading-[1.8] text-gray-300"
            >
              We are the AWS Student Builders Group — a group of students who build with cloud technologies.
              Through workshops, projects, and hackathons, we learn by doing. Every member ships code, deploys
              applications, and grows alongside peers who share the same curiosity.
            </p>
            <p className="font-body text-[1rem] leading-[1.8] text-gray-300">
              We are not a large organization. We are a focused team of builders who believe the best way to
              learn cloud computing is to open a terminal and start.
            </p>
          </motion.div>

          <motion.div
            style={{
              marginTop: "4.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2.5rem",
            }}
            variants={fadeIn}
          >
            <motion.div
              initial={{ rotate: -1, y: 0 }}
              whileHover={{ rotate: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{
                backgroundColor: "#f5f5f5",
                color: "#000000",
                border: "3px solid #000000",
                boxShadow: "10px 10px 0 0 #a855f7",
                padding: "2rem",
              }}
            >
              <h3
                className="font-display uppercase"
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                }}
              >
                Four teams
              </h3>
              <div
                style={{
                  height: "6px",
                  backgroundColor: "#a855f7",
                  border: "2px solid #000000",
                  marginBottom: "1.5rem",
                }}
              />
              {departments.map((dept) => (
                <div key={dept.title} style={{ marginBottom: "1rem" }}>
                  <span
                    className="font-display uppercase"
                    style={{ fontSize: "1.05rem", letterSpacing: "0.03em", fontWeight: 600 }}
                  >
                    {dept.title}
                  </span>
                  <span className="font-body" style={{ fontSize: "1rem", color: "#333333", lineHeight: 1.7 }}>
                    {" — "}{dept.desc}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ rotate: 1.5, y: 0 }}
              whileHover={{ rotate: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{
                backgroundColor: "#a855f7",
                color: "#000000",
                border: "3px solid #000000",
                boxShadow: "10px 10px 0 0 #ffffff",
                padding: "2rem",
              }}
            >
              <h3
                className="font-display uppercase"
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                }}
              >
                Why us
              </h3>
              <div
                style={{
                  height: "6px",
                  backgroundColor: "#ffffff",
                  border: "2px solid #000000",
                  marginBottom: "1.5rem",
                }}
              />
              {reasons.map((r) => (
                <div
                  key={r}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    marginBottom: "0.85rem",
                  }}
                >
                  <span
                    style={{
                      marginTop: "0.3em",
                      width: "16px",
                      height: "16px",
                      backgroundColor: "#000000",
                      flexShrink: 0,
                      transform: "rotate(45deg)",
                    }}
                  />
                  <span className="font-body" style={{ fontSize: "1rem", lineHeight: 1.6, fontWeight: 600 }}>
                    {r}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{
              marginTop: "4.5rem",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: "1rem",
            }}
            variants={fadeIn}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#a855f7",
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ height: "8px", backgroundColor: "#ffffff", boxShadow: "5px 5px 0 0 rgba(168,85,247,0.6)" }} />
            <span
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#ffffff",
                transform: "rotate(45deg)",
              }}
            />
          </motion.div>

          <motion.div style={{ marginTop: "4.5rem" }} variants={fadeIn}>
            <h3
              className="font-display uppercase text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                lineHeight: 1,
                letterSpacing: "0.02em",
                marginBottom: "2.5rem",
              }}
            >
              What we do
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
              }}
            >
              {activities.map(({ title, Icon, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ rotate: i === 1 ? 1 : -1, y: 0 }}
                  whileHover={{ rotate: 0, y: -12 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{
                    backgroundColor: "#f5f5f5",
                    color: "#000000",
                    border: "3px solid #000000",
                    boxShadow: `10px 10px 0 0 ${i % 2 === 0 ? "#a855f7" : "#ffffff"}`,
                    padding: "1.75rem",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "72px",
                      height: "72px",
                      border: "3px solid #000000",
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      boxShadow: "4px 4px 0 0 #a855f7",
                    }}
                  >
                    <Icon />
                  </div>
                  <h4
                    className="font-display uppercase"
                    style={{
                      fontSize: "1.5rem",
                      letterSpacing: "0.05em",
                      marginBottom: "0.85rem",
                    }}
                  >
                    {title}
                  </h4>
                  <div
                    style={{
                      height: "5px",
                      backgroundColor: "#a855f7",
                      border: "2px solid #000000",
                      marginBottom: "0.85rem",
                    }}
                  />
                  <p className="font-body" style={{ fontSize: "1rem", color: "#333333", lineHeight: 1.7 }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
