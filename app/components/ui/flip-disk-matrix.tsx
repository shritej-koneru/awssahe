"use client";

import React, { useCallback, useEffect, useState, memo } from "react";

// Minimal 5x7 Font Definition
function glyphBitmap(ch: string, cols: number, rows: number): boolean[][] {
  const glyphs: Record<string, number[]> = {
    "0": [0b01110, 0b10001, 0b10011, 0b10101, 0b11001, 0b10001, 0b01110],
    "1": [0b00100, 0b01100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
    "2": [0b01110, 0b10001, 0b00001, 0b00110, 0b01000, 0b10000, 0b11111],
    "3": [0b01110, 0b10001, 0b00001, 0b00110, 0b00001, 0b10001, 0b01110],
    "4": [0b00010, 0b00110, 0b01010, 0b10010, 0b11111, 0b00010, 0b00010],
    "5": [0b11111, 0b10000, 0b11110, 0b00001, 0b00001, 0b10001, 0b01110],
    "6": [0b00110, 0b01000, 0b10000, 0b11110, 0b10001, 0b10001, 0b01110],
    "7": [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b01000, 0b01000],
    "8": [0b01110, 0b10001, 0b10001, 0b01110, 0b10001, 0b10001, 0b01110],
    "9": [0b01110, 0b10001, 0b10001, 0b01111, 0b00001, 0b00010, 0b01100],
    ":": [0b00000, 0b00100, 0b00000, 0b00000, 0b00000, 0b00100, 0b00000],
    " ": [0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000],
    "A": [0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
    "B": [0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110],
    "C": [0b01110, 0b10001, 0b10000, 0b10000, 0b10000, 0b10001, 0b01110],
    "D": [0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110],
    "E": [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111],
    "F": [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b10000],
    "G": [0b01110, 0b10001, 0b10000, 0b10111, 0b10001, 0b10001, 0b01110],
    "H": [0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
    "I": [0b01110, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
    "J": [0b00011, 0b00001, 0b00001, 0b00001, 0b10001, 0b10001, 0b01110],
    "K": [0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001],
    "L": [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111],
    "M": [0b10001, 0b11011, 0b10101, 0b10001, 0b10001, 0b10001, 0b10001],
    "N": [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
    "O": [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
    "P": [0b11110, 0b10001, 0b10001, 0b11110, 0b10000, 0b10000, 0b10000],
    "Q": [0b01110, 0b10001, 0b10001, 0b10001, 0b10101, 0b01110, 0b00001],
    "R": [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
    "S": [0b01110, 0b10001, 0b10000, 0b01110, 0b00001, 0b10001, 0b01110],
    "T": [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
    "U": [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
    "V": [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01010, 0b00100],
    "W": [0b10001, 0b10001, 0b10001, 0b10101, 0b10101, 0b11011, 0b10001],
    "X": [0b10001, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b10001],
    "Y": [0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100, 0b00100],
    "Z": [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0b11111],
  };

  const grid = Array.from({ length: rows }, () => Array(cols).fill(false));
  const chars = ch.toUpperCase().split("");
  const gw = 5;
  const gh = 7;
  const totalW = chars.length * (gw + 1) - 1;

  let ox = Math.max(0, Math.floor((cols - totalW) / 2));
  const oy = Math.max(0, Math.floor((rows - gh) / 2));

  for (const c of chars) {
    const rowsBits = glyphs[c] || glyphs[" "];
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        if (oy + y < rows && ox + x < cols) {
          grid[oy + y][ox + x] = !!(rowsBits[y] & (1 << (gw - 1 - x)));
        }
      }
    }
    ox += gw + 1;
  }
  return grid;
}

// Memoized Disk component with purple AWS accent
const Disk = memo(({ on }: { on: boolean }) => {
  return (
    <div
      className="relative w-full aspect-square cursor-crosshair"
      style={{ perspective: "400px" }}
    >
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-[600ms] hover:duration-100 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:rotate-x-[90deg]"
        style={{
          transformStyle: "preserve-3d",
          transform: on ? "rotateX(180deg)" : "rotateX(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full bg-neutral-900 border border-neutral-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          style={{ backfaceVisibility: "hidden" }}
        />
        <div
          className="absolute inset-0 rounded-full bg-[#a855f7] border border-[#c084fc] shadow-[0_0_12px_rgba(168,85,247,0.8),_inset_0_-2px_6px_rgba(0,0,0,0.4)]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        />
      </div>
    </div>
  );
});
Disk.displayName = "Disk";

export function FlipDiskMatrix({ defaultText = "AWS" }: { defaultText?: string }) {
  const cols = 31;
  const rows = 11;
  const [mode, setMode] = useState<"text" | "time" | "wave" | "noise">("text");
  const [text, setText] = useState<string>(defaultText);

  const [bits, setBits] = useState(() =>
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );

  const computeTarget = useCallback(
    (t: number): boolean[][] => {
      if (mode === "text" || mode === "time") {
        const display =
          mode === "time"
            ? new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            : text;
        return glyphBitmap(display, cols, rows);
      }
      if (mode === "wave") {
        return Array.from({ length: rows }, (_, y) =>
          Array.from({ length: cols }, (_, x) => {
            const v = Math.sin(x * 0.2 + t * 3) * Math.cos(y * 0.3 + t * 2);
            return v > 0.2;
          })
        );
      }
      // Noise pattern
      return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() > 0.6)
      );
    },
    [mode, text, cols, rows]
  );

  useEffect(() => {
    let raf = 0;
    let last = 0;

    const getInterval = () => {
      if (mode === "wave") return 150;
      if (mode === "noise") return 250;
      return 1000;
    };

    const loop = (now: number) => {
      if (now - last > getInterval()) {
        last = now;
        const t = now / 1000;
        const next = computeTarget(t);

        setBits((prev) => {
          let changed = false;
          const newBits = prev.map((row, y) =>
            row.map((cell, x) => {
              if (cell !== next[y][x]) changed = true;
              return next[y][x];
            })
          );
          return changed ? newBits : prev;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [computeTarget, mode]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Internal Mode Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-purple-900/50">
        {(["text", "time", "wave", "noise"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 text-xs font-mono uppercase rounded-md transition-all ${mode === m
                ? "bg-[#a855f7] text-black font-semibold shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                : "text-neutral-400 hover:text-neutral-200"
              }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Dynamic Text Input Box (Only shows when 'text' mode is selected) */}
      {mode === "text" && (
        <div className="flex flex-col items-center gap-1 animate-fadeIn">
          <input
            type="text"
            value={text}
            maxLength={4}
            onChange={(e) => {
              const filtered = e.target.value.toUpperCase().replace(/[^A-Z0-9: ]/g, "");
              setText(filtered);
            }}
            placeholder="AWS"
            className="px-4 py-1.5 text-xs font-mono uppercase bg-neutral-900 border border-purple-800/60 rounded-lg text-center tracking-[0.3em] text-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
          />
        </div>
      )}

      <div className="relative w-full max-w-3xl p-3 md:p-5 rounded-2xl bg-[#0b0814] border border-purple-900/40 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),_0_20px_40px_rgba(168,85,247,0.25)]">
        {/* Inner Screen Bezel */}
        <div className="relative bg-black rounded-lg p-2 md:p-4 shadow-[inset_0_2px_10px_rgba(0,0,0,1)]">
          <div
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gap: "min(0.4vw, 3px)",
            }}
          >
            {bits.map((row, y) =>
              row.map((on, x) => (
                <Disk key={`${x}-${y}`} on={on} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
