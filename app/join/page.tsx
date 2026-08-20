"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const branches = ["CSE", "AIDS", "AIML", "IT"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const teams = ["Technical & Cloud", "Web Designing", "Marketing", "Content Creation"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#0d1322",
  color: "#ffffff",
  border: "1px solid rgba(168,85,247,0.4)",
  padding: "0.85rem 1rem",
  fontSize: "0.95rem",
  fontFamily: "var(--font-body)",
  outline: "none",
  borderRadius: "8px",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const fieldPlaceholders: Record<string, string> = {
  name: "e.g. Gopi Durga Mahesh",
  rollNo: "e.g. 218A1A0501",
  email: "e.g. student@sahe.ac.in",
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
};

export default function JoinPage() {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    branch: "CSE",
    year: "1st Year",
    github: "",
    linkedin: "",
    team: "Technical & Cloud",
    resume: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setField = (key: string, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const field = (label: string, name: string) => (
    <div>
      <label
        htmlFor={name}
        className="font-display uppercase"
        style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#a855f7", marginBottom: "0.5rem" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={name === "email" ? "email" : name === "github" || name === "linkedin" ? "url" : "text"}
        required
        value={form[name as keyof typeof form]}
        onChange={handleChange}
        placeholder={fieldPlaceholders[name] || ""}
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#a855f7";
          e.currentTarget.style.boxShadow = "0 0 14px rgba(168,85,247,0.3)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
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
              {"// Join"}
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
            Become a <span style={{ color: "#a855f7" }}>builder.</span>
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
            Drop your details and we&apos;ll add you to the club roster. Workshops, hackathons,
            and build sessions — all the way through your degree.
          </motion.p>
        </motion.div>
      </section>

      <section
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerStagger}
          style={{ maxWidth: "520px", width: "100%" }}
        >
          {!submitted ? (
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}
            >
              {field("Name", "name")}
              {field("Roll No", "rollNo")}
              {field("Email", "email")}

              {/* Branch Pill Selector */}
              <div>
                <label className="font-display uppercase" style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#a855f7", marginBottom: "0.5rem" }}>
                  Branch
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {branches.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setField("branch", b)}
                      style={{
                        padding: "0.4rem 1rem",
                        fontSize: "0.85rem",
                        borderRadius: "6px",
                        border: form.branch === b ? "1.5px solid #a855f7" : "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: form.branch === b ? "#a855f7" : "rgba(255,255,255,0.05)",
                        color: form.branch === b ? "#000000" : "#ffffff",
                        fontWeight: form.branch === b ? 700 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Pill Selector */}
              <div>
                <label className="font-display uppercase" style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#a855f7", marginBottom: "0.5rem" }}>
                  Year
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {years.map((y) => (
                    <button
                      type="button"
                      key={y}
                      onClick={() => setField("year", y)}
                      style={{
                        padding: "0.4rem 1rem",
                        fontSize: "0.85rem",
                        borderRadius: "6px",
                        border: form.year === y ? "1.5px solid #a855f7" : "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: form.year === y ? "#a855f7" : "rgba(255,255,255,0.05)",
                        color: form.year === y ? "#000000" : "#ffffff",
                        fontWeight: form.year === y ? 700 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Pill Selector */}
              <div>
                <label className="font-display uppercase" style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#a855f7", marginBottom: "0.5rem" }}>
                  Team to Join
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {teams.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setField("team", t)}
                      style={{
                        padding: "0.5rem 0.8rem",
                        fontSize: "0.8rem",
                        borderRadius: "6px",
                        border: form.team === t ? "1.5px solid #a855f7" : "1px solid rgba(255,255,255,0.2)",
                        backgroundColor: form.team === t ? "#a855f7" : "rgba(255,255,255,0.05)",
                        color: form.team === t ? "#000000" : "#ffffff",
                        fontWeight: form.team === t ? 700 : 400,
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {field("GitHub Link", "github")}
              {field("LinkedIn", "linkedin")}

              <div>
                <label
                  htmlFor="resume"
                  className="font-display uppercase"
                  style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#a855f7", marginBottom: "0.5rem" }}
                >
                  Resume
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="font-body"
                  style={{ ...inputStyle, cursor: "pointer", colorScheme: "dark" }}
                />
              </div>

              <motion.button
                type="submit"
                className="relative inline-flex cursor-pointer items-center justify-center overflow-hidden font-display uppercase leading-none outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                style={{ padding: "16px 40px", fontSize: "1.1rem", backgroundColor: "#a855f7", color: "#000000", fontWeight: 800, borderRadius: "8px", marginTop: "0.5rem" }}
                whileHover={{ y: -3, boxShadow: "0 0 24px rgba(168,85,247,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Submit Application
                <span className="ml-2 inline-block">→</span>
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                border: "2px solid #a855f7",
                backgroundColor: "#0d1322",
                padding: "2rem",
                borderRadius: "16px",
                boxShadow: "0 20px 40px rgba(168,85,247,0.25)",
              }}
            >
              {/* Digital Member Badge Preview */}
              <div
                style={{
                  border: "1px solid rgba(168,85,247,0.4)",
                  backgroundColor: "rgba(168,85,247,0.08)",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#a855f7",
                    color: "#000",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  ☁
                </div>
                <div>
                  <div className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                    {form.name || "AWS Builder Member"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#a855f7", letterSpacing: "0.1em" }}>
                    OFFICIAL MEMBER • {form.team}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>
                    {form.branch} · {form.year}
                  </div>
                </div>
              </div>

              <span
                className="font-display uppercase"
                style={{ fontSize: "1.4rem", letterSpacing: "0.03em", lineHeight: 1.1, color: "#a855f7" }}
              >
                You&apos;re on the list!
              </span>
              <p
                className="font-body"
                style={{ marginTop: "0.75rem", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.8)" }}
              >
                Welcome to the AWS Student Builders Group, {form.name || "builder"}. We&apos;ll
                reach out with the next workshop details on your email.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
