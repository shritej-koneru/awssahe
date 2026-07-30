"use client";

import { motion } from "framer-motion";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const maskWord = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 14, mass: 1 } },
};

const cardContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const cardUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function CloudIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 18C5.79086 18 4 16.2091 4 14C4 11.7909 5.79086 10 8 10C8.35096 10 8.68939 10.0486 9.00977 10.1402" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.00977 10.1402C9.32176 8.32692 10.9045 7 12.8372 7C14.9241 7 16.6087 8.54269 16.7604 10.5877" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.7604 10.5877C16.8402 10.571 16.9217 10.5625 17.0049 10.5625C18.9429 10.5625 20.5141 12.1337 20.5141 14.0717C20.5141 14.1492 20.5066 14.2251 20.4921 14.299" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20.4921 14.299C21.3801 14.5685 22.0166 15.3877 22.0166 16.3521C22.0166 17.5448 21.0473 18.5141 19.8546 18.5141H8.14538" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.14538 18.5141C7.62285 18.5141 7.12739 18.4027 6.68066 18.2016" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="5.5" width="21" height="15" rx="1.5" stroke="#ff9900" strokeWidth="1.5" />
      <path d="M3.5 10.5H24.5" stroke="#ff9900" strokeWidth="1.5" />
      <circle cx="6.5" cy="8.5" r="0.5" fill="#ff9900" />
      <circle cx="8.5" cy="8.5" r="0.5" fill="#ff9900" />
      <circle cx="10.5" cy="8.5" r="0.5" fill="#ff9900" />
      <line x1="9" y1="18" x2="15" y2="18" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="15" x2="19" y2="15" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MarketingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 18V11.5C5 9.01472 7.01472 7 9.5 7H18.5C20.9853 7 23 9.01472 23 11.5V13" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 18.5L23 13V20L18 18.5Z" stroke="#ff9900" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="9.5" cy="15.5" r="1.5" stroke="#ff9900" strokeWidth="1.5" />
      <circle cx="14" cy="16" r="1.5" stroke="#ff9900" strokeWidth="1.5" />
      <path d="M7 20.5H12" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 22.5H11" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ContentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 21.5V6.5C5.5 5.94772 5.94772 5.5 6.5 5.5H17L22.5 11V21.5C22.5 22.0523 22.0523 22.5 21.5 22.5H6.5C5.94772 22.5 5.5 22.0523 5.5 21.5Z" stroke="#ff9900" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M17 5.5V11H22.5" stroke="#ff9900" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="8.5" y1="14" x2="15.5" y2="14" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.5" y1="17" x2="13.5" y2="17" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.5" y1="20" x2="11.5" y2="20" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const departments = [
  { icon: CloudIcon, title: "Technical & Cloud", desc: "Deep-dive workshops on AWS architecture, serverless, containers, and cloud-native deployments." },
  { icon: WebIcon, title: "Web Designing", desc: "Build modern, responsive interfaces with a focus on user experience and performance." },
  { icon: MarketingIcon, title: "Marketing", desc: "Amplify our reach through campaigns, social media, and community outreach." },
  { icon: ContentIcon, title: "Content Creation", desc: "Produce technical blogs, tutorials, and visual content that educates and inspires." },
];

const benefits = [
  { title: "AWS Workshops", desc: "Hands-on sessions covering EC2, Lambda, S3, DynamoDB, and beyond." },
  { title: "Hackathons", desc: "Build and ship real products under time pressure with your team." },
  { title: "Team Projects", desc: "Collaborate on production-grade applications from concept to deployment." },
  { title: "Networking", desc: "Connect with industry mentors, AWS ambassadors, and fellow builders." },
  { title: "Leadership", desc: "Run initiatives, lead teams, and shape the direction of the club." },
  { title: "Portfolio Building", desc: "Walk away with shipped projects and real-world cloud experience." },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black text-white py-32 md:py-48 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 h-full w-px bg-white/10" />
        <div className="absolute top-0 right-0 h-full w-px bg-white/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

        <svg className="absolute top-0 right-0 h-full w-1/2 opacity-[0.04]">
          <motion.line
            x1="100%" y1="0" x2="40%" y2="100%"
            stroke="#ff9900" strokeWidth="1.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <motion.line
            x1="80%" y1="0" x2="20%" y2="100%"
            stroke="#ff9900" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-white/[0.04]"
            style={{ top: `${8 + i * 16}%`, left: "0", right: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-[30px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.span
            className="font-display text-xs uppercase tracking-[0.25em] text-[#ff9900] flex items-center gap-4"
            variants={fadeUp}
          >
            <span className="inline-block w-12 h-[2px] bg-[#ff9900]" />
            About Us
          </motion.span>

          <div className="mt-12 grid gap-16 md:grid-cols-2 md:gap-20">
            <div>
              <div className="overflow-hidden">
                <motion.h2
                  className="font-display text-[5.5rem] md:text-[8rem] font-black uppercase leading-[0.8] tracking-[-0.04em]"
                  variants={container}
                >
                  {"BUILD.".split("").map((l, i) => (
                    <motion.span key={i} className="inline-block overflow-hidden align-bottom" variants={container}>
                      <motion.span className="inline-block" variants={maskWord}>{l}</motion.span>
                    </motion.span>
                  ))}
                  <br />
                  {"DEPLOY.".split("").map((l, i) => (
                    <motion.span key={i} className="inline-block overflow-hidden align-bottom" variants={container}>
                      <motion.span className="inline-block text-[#ff9900]" variants={maskWord}>{l}</motion.span>
                    </motion.span>
                  ))}
                  <br />
                  {"SCALE.".split("").map((l, i) => (
                    <motion.span key={i} className="inline-block overflow-hidden align-bottom" variants={container}>
                      <motion.span className="inline-block" variants={maskWord}>{l}</motion.span>
                    </motion.span>
                  ))}
                </motion.h2>
              </div>

              <motion.div
                className="mt-10 border-l-[3px] border-[#ff9900] pl-6"
                variants={fadeUp}
              >
                <p className="text-base leading-8 text-gray-300 font-body">
                  We are the <span className="text-white font-semibold">AWS Student Builders Group</span>{" "}
                  at Siddhartha Academy of Higher Education, Vijayawada — a{" "}
                  <span className="text-white">student-led community</span> united by a passion for cloud
                  computing. Through hands-on workshops, real-world projects, and hackathons, we learn by building.
                  Our members collaborate across disciplines to deploy applications, explore AWS services, and grow
                  into the next generation of cloud architects and developers.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={cardContainer}
        >
          <motion.span
            className="font-display text-xs uppercase tracking-[0.25em] text-[#ff9900] flex items-center gap-4"
            variants={fadeUp}
          >
            <span className="inline-block w-8 h-[2px] bg-[#ff9900]" />
            Our Departments
          </motion.span>

          <div className="mt-12 grid border border-white/20 md:grid-cols-2">
            {departments.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.title}
                  className="group relative bg-black p-8 md:p-12 transition-colors duration-300 hover:bg-white/[0.02] border-b border-white/20 md:border-b-0 md:border-r last:border-b-0 last:md:border-r-0 even:md:border-r-0"
                  variants={cardUp}
                >
                  <span className="font-display text-[2.5rem] font-black text-white/[0.04] absolute top-4 right-6 leading-none select-none">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>

                  <motion.div
                    className="mb-6"
                    whileHover={{ rotate: -12 }}
                    transition={{ type: "spring", stiffness: 250, damping: 12 }}
                  >
                    <Icon />
                  </motion.div>

                  <h3 className="font-display text-lg uppercase tracking-[0.06em] relative z-10">
                    {dept.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400 font-body max-w-xs relative z-10">
                    {dept.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.span
            className="font-display text-xs uppercase tracking-[0.25em] text-[#ff9900] flex items-center gap-4"
            variants={fadeUp}
          >
            <span className="inline-block w-8 h-[2px] bg-[#ff9900]" />
            Why Join
          </motion.span>

          <div className="mt-12 grid gap-[1px] md:grid-cols-3 bg-white/20">
            {benefits.map((item) => (
              <motion.div
                key={item.title}
                className="bg-black p-8 transition-colors duration-300 hover:bg-white/[0.02]"
                variants={cardUp}
              >
                <div className="mb-5 w-8 h-[3px] bg-[#ff9900]" />
                <h3 className="font-display text-base uppercase tracking-[0.06em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-500 font-body">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
