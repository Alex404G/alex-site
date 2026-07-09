"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type OrbProps = {
  color: string;
  size: number;       // in vw
  x: string;          // CSS pos
  y: string;
  blur?: number;      // px
  opacity?: number;
  parallax?: number;  // 0..1, how much it moves with scroll
};

function Orb({ color, size, x, y, blur = 120, opacity = 0.55, parallax = 0.5 }: OrbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const tyRaw = useTransform(scrollYProgress, [0, 1], [0, 400 * parallax]);
  const ty = reduce ? 0 : tyRaw;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{
        width: `${size}vw`,
        height: `${size}vw`,
        left: x,
        top: y,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        y: ty,
        mixBlendMode: "screen",
      }}
    />
  );
}

/**
 * Layered orbs across the whole document — single bloom feel per area.
 */
export function BackgroundOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      {/* Section 1 / Hero — top */}
      <Orb color="#3D5CFF" size={60} x="-10%" y="-20%" blur={140} opacity={0.55} parallax={0.15} />
      <Orb color="#8B5CF6" size={50} x="60%" y="10%"  blur={130} opacity={0.5}  parallax={0.25} />

      {/* Section 2 / Manifesto */}
      <Orb color="#B845E8" size={45} x="70%" y="80%"  blur={150} opacity={0.45} parallax={0.4} />

      {/* Section 3 / Agents */}
      <Orb color="#5B6BFF" size={55} x="-15%" y="160%" blur={140} opacity={0.5}  parallax={0.6} />

      {/* Section 5 / Bénéfices */}
      <Orb color="#8B5CF6" size={50} x="55%"  y="260%" blur={140} opacity={0.5}  parallax={0.7} />

      {/* Section 8 / Final CTA */}
      <Orb color="#B845E8" size={70} x="-10%" y="430%" blur={170} opacity={0.5}  parallax={0.85} />
      <Orb color="#3D5CFF" size={55} x="60%"  y="450%" blur={150} opacity={0.5}  parallax={0.95} />
    </div>
  );
}
