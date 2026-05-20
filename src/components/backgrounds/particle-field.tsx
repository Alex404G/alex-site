"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle drifting particles — tiny white specks with a slow upward float.
 * ~180 particles, low opacity. Pauses if offscreen via IntersectionObserver in parent.
 */
export function ParticleField({ count = 180 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth * window.devicePixelRatio);
    let h = (canvas.height = window.innerHeight * window.devicePixelRatio);

    const onResize = () => {
      w = canvas.width = window.innerWidth * window.devicePixelRatio;
      h = canvas.height = window.innerHeight * window.devicePixelRatio;
    };
    window.addEventListener("resize", onResize);

    type P = { x: number; y: number; r: number; vy: number; a: number };
    const particles: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.2 + 0.3) * window.devicePixelRatio,
      vy: (Math.random() * 0.12 + 0.02) * window.devicePixelRatio,
      a: Math.random() * 0.5 + 0.15,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.vy;
        if (p.y < -2) {
          p.y = h + 2;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-40 h-full w-full"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
