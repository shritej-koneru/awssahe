"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

type Member = {
  name: string;
};

type Department = {
  title: string;
  lead: Member;
  coLeads: Member[];
};

const coordinator: Member & { dept: string } = {
  name: "John Doe",
  dept: "Dept. of Computer Science & Engineering",
};

const departments: Department[] = [
  {
    title: "Technical & Cloud",
    lead: { name: "John Doe" },
    coLeads: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
  },
  {
    title: "Web Designing",
    lead: { name: "John Doe" },
    coLeads: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
  },
  {
    title: "Marketing",
    lead: { name: "John Doe" },
    coLeads: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
  },
  {
    title: "Content Creation",
    lead: { name: "John Doe" },
    coLeads: [{ name: "John Doe" }, { name: "John Doe" }, { name: "John Doe" }],
  },
];

function dummyAvatar(variant: "coordinator" | "lead" | "colead") {
  const palette = {
    coordinator: { bg: "#ff9900", fg: "#000000" },
    lead: { bg: "#f5f5f5", fg: "#000000" },
    colead: { bg: "#1a1a1a", fg: "#ff9900" },
  }[variant];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="${palette.bg}"/><rect x="22" y="22" width="256" height="256" fill="none" stroke="${palette.fg}" stroke-width="2" opacity="0.35"/><rect x="238" y="42" width="20" height="20" fill="${palette.fg}" opacity="0.45" transform="rotate(45 248 52)"/><text x="150" y="162" font-family="Arial, Helvetica, sans-serif" font-size="110" font-weight="bold" fill="${palette.fg}" text-anchor="middle" dominant-baseline="middle">JD</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

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

function MemberCard({
  member,
  role,
  variant,
}: {
  member: Member;
  role: string;
  variant: "coordinator" | "lead" | "colead";
}) {
  const cardStyle =
    variant === "coordinator"
      ? {
          backgroundColor: "#ff9900",
          color: "#000000",
          border: "2px solid #ffffff",
          boxShadow: "10px 10px 0 0 #000000",
        }
      : variant === "lead"
        ? {
            backgroundColor: "#f5f5f5",
            color: "#000000",
            border: "2px solid #000000",
            boxShadow: "6px 6px 0 0 #ff9900",
          }
        : {
            backgroundColor: "#111111",
            color: "#ffffff",
            border: "1px solid rgba(255,153,0,0.4)",
            boxShadow: "4px 4px 0 0 rgba(255,153,0,0.25)",
          };

  const roleChip =
    variant === "lead"
      ? { backgroundColor: "#ff9900", color: "#000000" }
      : variant === "coordinator"
        ? { backgroundColor: "#000000", color: "#ff9900" }
        : { backgroundColor: "#ff9900", color: "#000000" };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={cardStyle}
      className="h-full"
    >
      <div style={{ borderBottom: "2px solid #000000" }}>
        <img
          src={dummyAvatar(variant)}
          alt={member.name}
          style={{
            display: "block",
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            border: "3px solid #000000",
          }}
        />
      </div>
      <div style={{ padding: "1.25rem" }}>
        <span
          className="font-display uppercase"
          style={{
            ...roleChip,
            display: "inline-block",
            border: "1.5px solid #000000",
            padding: "0.2rem 0.6rem",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            marginBottom: "0.75rem",
          }}
        >
          {role}
        </span>
        <h3
          className="font-display uppercase"
          style={{ fontSize: "1.3rem", letterSpacing: "0.02em", lineHeight: 1.05 }}
        >
          {member.name}
        </h3>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Navbar />

      <section
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "8.5rem",
          paddingBottom: "3rem",
          maxWidth: "1060px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      >
        <motion.div initial="hidden" animate="visible" variants={containerStagger}>
          <motion.div variants={fadeUp}>
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
            People behind <span style={{ color: "#ff9900" }}>the builds.</span>
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
            Four departments, one shared obsession — shipping real cloud. Led by a faculty
            coordinator and run by student leads and co-leads across the club.
          </motion.p>
        </motion.div>
      </section>

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
            variant="coordinator"
          />
          <motion.p
            variants={fadeUp}
            className="font-body"
            style={{
              marginTop: "1.25rem",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {coordinator.dept}
          </motion.p>
        </motion.div>
      </section>

      {departments.map((dept) => (
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
              gap: "1.5rem",
            }}
          >
            <MemberCard member={dept.lead} role="Lead" variant="lead" />
            {dept.coLeads.map((member, i) => (
              <MemberCard key={`${dept.title}-${i}`} member={member} role="Co-Lead" variant="colead" />
            ))}
          </motion.div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
