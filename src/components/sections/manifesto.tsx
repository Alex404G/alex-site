"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PHRASE = [
  "Construire des produits sur-mesure",
  "à la vitesse d'un SaaS,",
  "avec le soin d'un atelier.",
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 60%"],
  });

  // Reveal in 3 wide chunks (line by line), not word by word — much snappier
  return (
    <section
      ref={ref}
      className="relative flex min-h-[80svh] w-full items-center justify-center px-6 py-24"
    >
      <div className="relative mx-auto max-w-5xl">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="kicker mb-8 block text-center"
        >
          — la méthode
        </motion.span>

        <p className="font-display text-center font-bold leading-[1.08] tracking-[-0.035em] text-[clamp(28px,4.2vw,60px)]">
          {PHRASE.map((line, i) => (
            <Line key={i} text={line} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}

function Line({
  text,
  index,
  scrollYProgress,
}: {
  text: string;
  index: number;
  scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
  const start = 0.1 + index * 0.25;
  const end = start + 0.32;

  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const blur = useTransform(scrollYProgress, [start, end], [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const y = useTransform(scrollYProgress, [start, end], [12, 0]);

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className="block text-text-1"
    >
      {text}
    </motion.span>
  );
}
