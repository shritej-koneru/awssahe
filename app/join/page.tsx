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
  backgroundColor: "#0f0f0f",
  color: "#ffffff",
  border: "1px solid rgba(255,153,0,0.4)",
  padding: "0.85rem 1rem",
  fontSize: "0.95rem",
  fontFamily: "var(--font-body)",
  outline: "none",
  borderRadius: 0,
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

export default function JoinPage() {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    branch: "",
    year: "",
    github: "",
    linkedin: "",
    team: "",
    resume: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#ff9900", marginBottom: "0.5rem" }}
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
        placeholder=""
        style={inputStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#ff9900")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,153,0,0.4)")}
      />
    </div>
  );

  const select = (label: string, name: string, options: string[], placeholder: string) => (
    <div>
      <label
        htmlFor={name}
        className="font-display uppercase"
        style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#ff9900", marginBottom: "0.5rem" }}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        required
        value={form[name as keyof typeof form]}
        onChange={handleChange}
        style={{ ...inputStyle, colorScheme: "dark", cursor: "pointer" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#ff9900")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,153,0,0.4)")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

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
            Become a <span style={{ color: "#ff9900" }}>builder.</span>
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
          style={{ maxWidth: "480px", width: "100%" }}
        >
          {!submitted ? (
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {field("Name", "name")}
              {field("Roll No", "rollNo")}
              {field("Email", "email")}
              {select("Branch", "branch", branches, "Select your branch")}
              {select("Year", "year", years, "Select your year")}
              {select("Team to Join", "team", teams, "Select your team")}
              {field("GitHub Link", "github")}
              {field("LinkedIn", "linkedin")}

              <div>
                <label
                  htmlFor="resume"
                  className="font-display uppercase"
                  style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#ff9900", marginBottom: "0.5rem" }}
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
                className="relative inline-flex cursor-pointer items-center justify-center overflow-hidden font-display uppercase leading-none outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                style={{ padding: "16px 40px", fontSize: "1.1rem", backgroundColor: "#ff9900", color: "#000000" }}
                whileHover={{ y: -3, boxShadow: "0 0 24px rgba(255,153,0,0.35)" }}
                whileTap={{ scale: 0.97 }}
              >
                Submit
                <span className="ml-2 inline-block">→</span>
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                border: "2px solid #ff9900",
                backgroundColor: "rgba(255,153,0,0.05)",
                padding: "2rem",
              }}
            >
              <span
                className="font-display uppercase"
                style={{ fontSize: "1.4rem", letterSpacing: "0.03em", lineHeight: 1.1, color: "#ff9900" }}
              >
                You&apos;re on the list.
              </span>
              <p
                className="font-body"
                style={{ marginTop: "0.75rem", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}
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
