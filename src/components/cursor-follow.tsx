"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Soft radial glow that follows cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[55] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(91,107,255,0.06) 40%, rgba(0,0,0,0) 70%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Tiny dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[58] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
        style={{ x, y }}
      />
    </>
  );
}
