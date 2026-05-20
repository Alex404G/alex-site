"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PHRASE = [
  ["Construire", "des", "produits", "sur-mesure"],
  ["à", "la", "vitesse", "d'un", "SaaS,"],
  ["avec", "le", "soin", "d'un", "atelier."],
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Build a flat list of words with reveal range
  const allWords: { word: string; isLastOfLine: boolean }[] = [];
  PHRASE.forEach((line) => {
    line.forEach((w, i) => {
      allWords.push({ word: w, isLastOfLine: i === line.length - 1 });
    });
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-32"
    >
      <div className="relative mx-auto max-w-6xl">
        <p className="h-display font-display text-center leading-[1.05] tracking-[-0.04em]">
          {PHRASE.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((word, i) => {
                const flatIdx = PHRASE.slice(0, lineIdx).reduce(
                  (a, l) => a + l.length,
                  0,
                ) + i;
                return (
                  <Word
                    key={i}
                    word={word}
                    index={flatIdx}
                    total={allWords.length}
                    scrollYProgress={scrollYProgress}
                  />
                );
              })}
            </span>
          ))}
        </p>

        <motion.p
          className="kicker mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          — la méthode
        </motion.p>
      </div>
    </section>
  );
}

function Word({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
  // Each word reveals over a window of scroll progress
  const span = 0.65 / total; // total reveal happens in 65% of scroll
  const start = 0.15 + index * span;
  const end = start + span * 1.5;

  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const blur = useTransform(scrollYProgress, [start, end], [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <>
      <motion.span style={{ opacity, filter }} className="inline-block">
        {word}
      </motion.span>
      <span>&nbsp;</span>
    </>
  );
}
