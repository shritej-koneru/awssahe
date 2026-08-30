"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
}

interface ActiveProjectile {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
}

export default function TankGame404() {
  const [tankPos, setTankPos] = useState({ x: 200, y: 200 });
  const [tankAngle, setTankAngle] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [projectile, setProjectile] = useState<ActiveProjectile | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const mousePosRef = useRef({ x: -500, y: -500 });
  const tankPosRef = useRef({ x: 200, y: 200 });
  const tankAngleRef = useRef(0);
  const lastMouseMoveRef = useRef<number>(Date.now());
  const isShootingRef = useRef<boolean>(false);
  const shotCooldownRef = useRef<boolean>(false);
  const isTargetLockedRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  const STANDOFF_DIST = 190;
  const IDLE_THRESHOLD = 1400;

  const setTargetLockState = (locked: boolean) => {
    if (isTargetLockedRef.current !== locked) {
      isTargetLockedRef.current = locked;
      setIsLocked(locked);
      window.dispatchEvent(
        new CustomEvent("cursor-target-lock", { detail: { locked } })
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      tankPosRef.current = {
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2,
      };
      setTankPos(tankPosRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      lastMouseMoveRef.current = Date.now();
      setTargetLockState(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main 60fps Tank Loop (Halved speed & smooth lerp)
  useEffect(() => {
    const gameLoop = () => {
      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;

      if (targetX > 0 && targetY > 0) {
        const dx = targetX - tankPosRef.current.x;
        const dy = targetY - tankPosRef.current.y;
        const dist = Math.hypot(dx, dy);

        // Target angle (in radians)
        const targetRad = Math.atan2(dy, dx);
        let currRad = (tankAngleRef.current * Math.PI) / 180;

        // Smooth angle lerp (Halved turn rate)
        let angleDiff = targetRad - currRad;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

        currRad += angleDiff * 0.05;
        tankAngleRef.current = (currRad * 180) / Math.PI;
        setTankAngle(tankAngleRef.current);

        // Position lerp maintaining standoff distance (Halved move speed)
        if (dist > 10) {
          const desiredDistDelta = dist - STANDOFF_DIST;
          if (Math.abs(desiredDistDelta) > 15) {
            const moveSpeed = Math.sign(desiredDistDelta) * Math.min(Math.abs(desiredDistDelta) * 0.02, 3.2);
            tankPosRef.current.x += Math.cos(targetRad) * moveSpeed;
            tankPosRef.current.y += Math.sin(targetRad) * moveSpeed;
            setTankPos({ x: tankPosRef.current.x, y: tankPosRef.current.y });
          }
        }

        // Idle check
        const now = Date.now();
        const timeIdle = now - lastMouseMoveRef.current;

        if (timeIdle > IDLE_THRESHOLD && !shotCooldownRef.current && dist < 500) {
          setTargetLockState(true);

          if (timeIdle > IDLE_THRESHOLD + 450 && !isShootingRef.current) {
            isShootingRef.current = true;
            shotCooldownRef.current = true;

            // Spawn projectile
            setProjectile({
              x: tankPosRef.current.x,
              y: tankPosRef.current.y,
              startX: tankPosRef.current.x,
              startY: tankPosRef.current.y,
              targetX,
              targetY,
              progress: 0,
            });
          }
        } else if (timeIdle <= IDLE_THRESHOLD) {
          setTargetLockState(false);
        }
      }

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Projectile animation & impact handler
  useEffect(() => {
    if (!projectile) return;

    let projFrame: number;
    const speed = 0.08;

    const updateProjectile = () => {
      setProjectile((prev) => {
        if (!prev) return null;
        const nextProgress = prev.progress + speed;

        if (nextProgress >= 1) {
          const impactX = prev.targetX;
          const impactY = prev.targetY;

          setTimeout(() => {
            // 1. Webpage colored particle explosion
            triggerExplosion(impactX, impactY);

            // 2. Shatter cursor for 5 seconds
            window.dispatchEvent(
              new CustomEvent("cursor-shatter", { detail: { duration: 5000 } })
            );

            // Reset lock-on warning ring
            setTargetLockState(false);
          }, 0);

          // Reset cooldown after 5 seconds
          setTimeout(() => {
            isShootingRef.current = false;
            shotCooldownRef.current = false;
            setTargetLockState(false);
            lastMouseMoveRef.current = Date.now();
          }, 5000);

          return null;
        }

        return {
          ...prev,
          x: prev.startX + (prev.targetX - prev.startX) * nextProgress,
          y: prev.startY + (prev.targetY - prev.startY) * nextProgress,
          progress: nextProgress,
        };
      });

      projFrame = requestAnimationFrame(updateProjectile);
    };

    projFrame = requestAnimationFrame(updateProjectile);
    return () => cancelAnimationFrame(projFrame);
  }, [projectile]);

  // Particle explosion loop
  useEffect(() => {
    if (particles.length === 0) return;

    const pAnim = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.93,
            vy: p.vy * 0.93,
            rotation: p.rotation + p.vRot,
            size: Math.max(0, p.size - 0.35),
          }))
          .filter((p) => p.size > 0.5)
      );
    });

    return () => cancelAnimationFrame(pAnim);
  }, [particles]);

  const triggerExplosion = (x: number, y: number) => {
    const themeColors = ["#a855f7", "#c084fc", "#ffffff", "#e9d5ff", "#000000"];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 36; i++) {
      const angle = (Math.PI * 2 * i) / 36 + (Math.random() - 0.5);
      const speed = Math.random() * 12 + 4;
      newParticles.push({
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 10 + 4,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 15,
      });
    }

    setParticles(newParticles);
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99998] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Laser Targeting Line */}
      {isLocked && (
        <svg className="absolute inset-0 h-full w-full">
          <line
            x1={tankPos.x}
            y1={tankPos.y}
            x2={mousePosRef.current.x}
            y2={mousePosRef.current.y}
            stroke="#a855f7"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.85"
          />
          <circle
            cx={mousePosRef.current.x}
            cy={mousePosRef.current.y}
            r="20"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2"
            className="animate-ping"
          />
        </svg>
      )}

      {/* Cyber/AWS Top-View Tank */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          left: tankPos.x,
          top: tankPos.y,
          translateX: "-50%",
          translateY: "-50%",
          transformOrigin: "center center",
        }}
        animate={{ rotate: tankAngle + 90 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        <svg width="68" height="76" viewBox="0 0 68 76" fill="none">
          {/* Treads */}
          <rect x="2" y="10" width="14" height="56" rx="4" fill="#0b0b0b" stroke="#a855f7" strokeWidth="2" />
          <rect x="52" y="10" width="14" height="56" rx="4" fill="#0b0b0b" stroke="#a855f7" strokeWidth="2" />

          <line x1="4" y1="20" x2="14" y2="20" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
          <line x1="4" y1="38" x2="14" y2="38" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
          <line x1="4" y1="56" x2="14" y2="56" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />

          <line x1="54" y1="20" x2="64" y2="20" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
          <line x1="54" y1="38" x2="64" y2="38" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
          <line x1="54" y1="56" x2="64" y2="56" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />

          {/* Main Chassis Body */}
          <rect x="14" y="16" width="40" height="44" rx="6" fill="#000000" stroke="#ffffff" strokeWidth="2.5" />
          <rect x="18" y="20" width="32" height="36" rx="4" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.4" />

          {/* Front Bumper */}
          <path d="M 18 16 L 34 8 L 50 16 Z" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />

          {/* Turret Base */}
          <circle cx="34" cy="38" r="14" fill="#0b0b0b" stroke="#a855f7" strokeWidth="2.5" />
          <circle cx="34" cy="38" r="7" fill="#a855f7" />

          {/* Cannon Barrel */}
          <rect x="30" y="2" width="8" height="28" rx="2" fill="#000000" stroke="#ffffff" strokeWidth="2" />
          <rect x="28" y="0" width="12" height="6" rx="1.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />

          {/* Energy Glow */}
          {isLocked && (
            <circle cx="34" cy="38" r="10" fill="none" stroke="#f43f5e" strokeWidth="2" className="animate-pulse" />
          )}
        </svg>
      </motion.div>

      {/* Plasma Shell Projectile */}
      {projectile && (
        <div
          className="pointer-events-none absolute h-4 w-4 rounded-full bg-white shadow-[0_0_20px_#a855f7,0_0_40px_#ffffff]"
          style={{
            left: projectile.x,
            top: projectile.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Explosion Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="pointer-events-none absolute border border-black"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              boxShadow: `0 0 10px ${p.color}`,
            }}
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
