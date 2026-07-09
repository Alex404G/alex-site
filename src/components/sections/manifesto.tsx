"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Each line: [{ text, accent? }] — accent flag marks the highlighted (gradient) words
type Token = { text: string; accent?: boolean };
const LINES: Token[][] = [
  [
    { text: "Un" },
    { text: "site" },
    { text: "qui" },
    { text: "vous" },
    { text: "ressemble.", accent: true },
  ],
  [
    { text: "Une" },
    { text: "visibilité" },
    { text: "qui" },
    { text: "travaille.", accent: true },
  ],
  [
    { text: "Le" },
    { text: "soin" },
    { text: "d'un" },
    { text: "artisan.", accent: true },
  ],
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });

  // Background bloom that travels with scroll
  const bloomX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bloomScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const bloomOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.7, 0.4]);

  // Tracer line that fills as scroll progresses
  const tracerWidth = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  // Total words for stagger ranges
  const totalWords = LINES.reduce((a, l) => a + l.length, 0);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85svh] w-full items-center justify-center px-6 py-24"
    >
      {/* Travelling bloom (statique en reduced-motion) */}
      <motion.div
        aria-hidden
        style={reduce ? { opacity: 0.35 } : { x: bloomX, scale: bloomScale, opacity: bloomOpacity }}
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[900px]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,122,77,0.32) 0%, rgba(255,154,77,0.18) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 inline-flex items-center gap-3"
        >
          <span
            aria-hidden
            className="block h-px w-10"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,122,77,0.7))" }}
          />
          <span className="kicker">la méthode</span>
          <span
            aria-hidden
            className="block h-px w-10"
            style={{ background: "linear-gradient(to left, transparent, rgba(255,122,77,0.7))" }}
          />
        </motion.div>

        {/* Phrase */}
        <p className="font-display font-bold leading-[1.08] tracking-[-0.035em] text-[clamp(28px,4.2vw,60px)]">
          {LINES.map((line, lineIdx) => {
            const offset = LINES.slice(0, lineIdx).reduce((a, l) => a + l.length, 0);
            return (
              <span key={lineIdx} className="block">
                {line.map((tok, wIdx) => {
                  const flatIdx = offset + wIdx;
                  return (
                    <Word
                      key={wIdx}
                      token={tok}
                      flatIdx={flatIdx}
                      total={totalWords}
                      scrollYProgress={scrollYProgress}
                      reduce={!!reduce}
                    />
                  );
                })}
              </span>
            );
          })}
        </p>

        {/* Tracer line under the phrase */}
        <div className="relative mx-auto mt-12 h-px w-[60%] max-w-md overflow-hidden bg-white/8">
          <motion.div
            style={{ width: reduce ? "100%" : tracerWidth, background: "var(--grad-warm)" }}
            className="absolute inset-y-0 left-0"
          />
        </div>
      </div>
    </section>
  );
}

function Word({
  token,
  flatIdx,
  total,
  scrollYProgress,
  reduce,
}: {
  token: Token;
  flatIdx: number;
  total: number;
  scrollYProgress: import("framer-motion").MotionValue<number>;
  reduce: boolean;
}) {
  const span = 0.7 / total;
  const start = 0.05 + flatIdx * span;
  const end = start + span * 2.4;

  // opacity + y uniquement : le blur par mot était un travail de paint coûteux
  // recalculé à chaque frame de scroll (13 filtres simultanés) pour un gain minime.
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const y = useTransform(scrollYProgress, [start, end], [16, 0]);

  return (
    <>
      <motion.span
        style={reduce ? undefined : { opacity, y }}
        className={`inline-block ${token.accent ? "text-gradient-warm" : "text-text-1"}`}
      >
        {token.text}
      </motion.span>
      <span>&nbsp;</span>
    </>
  );
}
