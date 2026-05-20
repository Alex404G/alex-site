"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Each line: [{ text, accent? }] — accent flag marks the highlighted (gradient) words
type Token = { text: string; accent?: boolean };
const LINES: Token[][] = [
  [
    { text: "Construire" },
    { text: "des" },
    { text: "produits" },
    { text: "sur-mesure", accent: true },
  ],
  [
    { text: "à" },
    { text: "la" },
    { text: "vitesse" },
    { text: "d'un" },
    { text: "SaaS,", accent: true },
  ],
  [
    { text: "avec" },
    { text: "le" },
    { text: "soin" },
    { text: "d'un" },
    { text: "atelier.", accent: true },
  ],
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
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
      {/* Travelling bloom */}
      <motion.div
        aria-hidden
        style={{ x: bloomX, scale: bloomScale, opacity: bloomOpacity }}
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[900px]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.32) 0%, rgba(91,107,255,0.18) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Sparkles / accents */}
      <Sparkle x="18%" y="22%" delay={0.2} />
      <Sparkle x="82%" y="34%" delay={0.6} />
      <Sparkle x="12%" y="72%" delay={1.0} />
      <Sparkle x="86%" y="78%" delay={1.4} />

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
            style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.7))" }}
          />
          <span className="kicker">la méthode</span>
          <span
            aria-hidden
            className="block h-px w-10"
            style={{ background: "linear-gradient(to left, transparent, rgba(139,92,246,0.7))" }}
          />
        </motion.div>

        {/* Phrase */}
        <p className="font-display font-bold leading-[1.08] tracking-[-0.035em] text-[clamp(28px,4.2vw,60px)]">
          {LINES.map((line, lineIdx) => {
            // Compute flat word index range for this line
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
            style={{ width: tracerWidth, background: "var(--grad-signature)" }}
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
}: {
  token: Token;
  flatIdx: number;
  total: number;
  scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
  // Stagger window — each word reveals in 0.05 progress span, overlapping
  const span = 0.7 / total;
  const start = 0.05 + flatIdx * span;
  const end = start + span * 2.4;

  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const blur = useTransform(scrollYProgress, [start, end], [10, 0]);
  const y = useTransform(scrollYProgress, [start, end], [16, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <>
      <motion.span
        style={{ opacity, filter, y }}
        className={`inline-block ${token.accent ? "text-gradient-sig" : "text-text-1"}`}
      >
        {token.text}
      </motion.span>
      <span>&nbsp;</span>
    </>
  );
}

function Sparkle({
  x,
  y,
  delay = 0,
}: {
  x: string;
  y: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
      style={{
        left: x,
        top: y,
        background: "white",
        boxShadow: "0 0 12px 2px rgba(255,255,255,0.6), 0 0 24px 6px rgba(139,92,246,0.5)",
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.4, 0.8],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}
