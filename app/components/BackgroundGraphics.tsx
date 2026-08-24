"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const nodes = [
  { x: "12%", y: "18%", delay: 0 },
  { x: "78%", y: "14%", delay: 1.5 },
  { x: "22%", y: "72%", delay: 3 },
  { x: "82%", y: "68%", delay: 0.8 },
  { x: "50%", y: "88%", delay: 2.2 },
];

const lines = [
  { x1: "12%", y1: "18%", x2: "78%", y2: "14%", delay: 0 },
  { x1: "12%", y1: "18%", x2: "22%", y2: "72%", delay: 0.6 },
  { x1: "78%", y1: "14%", x2: "82%", y2: "68%", delay: 1.2 },
  { x1: "22%", y1: "72%", x2: "50%", y2: "88%", delay: 1.8 },
  { x1: "82%", y1: "68%", x2: "50%", y2: "88%", delay: 2.4 },
];

export default function BackgroundGraphics() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Ambient Mouse Purple Spotlight Glow */}
      <div
        className="pointer-events-none fixed z-[2] h-[500px] w-[500px] rounded-full opacity-35 transition-transform duration-75 ease-out"
        style={{
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <svg className="h-full w-full">
        <defs>
          {/* Clean AWS Grid Pattern with purple AWS typography */}
          <pattern id="aws-clean-grid" width="120" height="90" patternUnits="userSpaceOnUse">
            {/* Fine Grid Lines */}
            <path
              d="M 120 0 L 0 0 0 90"
              fill="none"
              stroke="#a855f7"
              strokeWidth="0.75"
              strokeOpacity="0.14"
            />
            
            {/* AWS Typography Watermark in Purple */}
            <text
              x="60"
              y="52"
              textAnchor="middle"
              fill="#a855f7"
              fillOpacity="0.12"
              fontFamily="Oswald, sans-serif"
              fontSize="20"
              fontWeight="700"
              letterSpacing="0.2em"
            >
              AWS
            </text>
          </pattern>
        </defs>

        {/* Paint repeating clean AWS grid background */}
        <rect width="100%" height="100%" fill="url(#aws-clean-grid)" />

        {/* Glowing Purple Lines */}
        {lines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#a855f7"
            strokeWidth={0.8}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{
              duration: 2.5,
              delay: line.delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 4,
            }}
          />
        ))}

        {/* Floating Glowing Purple Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill="#a855f7"
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: [0.3, 0.95, 0.3], scale: [0.8, 1.35, 0.8] }}
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
