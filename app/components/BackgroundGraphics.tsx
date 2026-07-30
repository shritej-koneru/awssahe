"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: "15%", y: "20%", delay: 0 },
  { x: "75%", y: "15%", delay: 1.5 },
  { x: "20%", y: "70%", delay: 3 },
  { x: "80%", y: "65%", delay: 0.8 },
  { x: "50%", y: "85%", delay: 2.2 },
];

const lines = [
  { x1: "15%", y1: "20%", x2: "75%", y2: "15%", delay: 0 },
  { x1: "15%", y1: "20%", x2: "20%", y2: "70%", delay: 0.6 },
  { x1: "75%", y1: "15%", x2: "80%", y2: "65%", delay: 1.2 },
  { x1: "20%", y1: "70%", x2: "50%", y2: "85%", delay: 1.8 },
  { x1: "80%", y1: "65%", x2: "50%", y2: "85%", delay: 2.4 },
];

export default function BackgroundGraphics() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="h-full w-full opacity-20">
        {lines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#ff9900"
            strokeWidth="0.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: line.delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 4,
            }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r="2"
            fill="#ff9900"
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 3,
              delay: node.delay,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
