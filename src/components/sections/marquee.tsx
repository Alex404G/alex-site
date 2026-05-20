"use client";

import { MARQUEE_TAGS } from "@/lib/agents";
import { motion } from "framer-motion";

// Slice the tags into 3 rows of different sizes for visual rhythm
const ROW_A = MARQUEE_TAGS.slice(0, 18);
const ROW_B = MARQUEE_TAGS.slice(18, 35);
const ROW_C = MARQUEE_TAGS.slice(35);

export function MarqueeSection() {
  return (
    <section className="relative w-full overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="h-2 max-w-3xl mx-auto"
        >
          Et <span className="text-gradient-sig">des milliers d'autres</span> possibilités —
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="body-md mt-4 max-w-xl mx-auto"
        >
          Si tu peux le décrire en une phrase, on peut probablement le faire.
        </motion.p>
      </div>

      <div className="relative mt-14 space-y-4">
        <Row tags={ROW_A} dir="left"  duration={48} />
        <Row tags={ROW_B} dir="right" duration={56} />
        <Row tags={ROW_C} dir="left"  duration={64} />

        {/* Edge masks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void-0 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void-0 to-transparent"
        />
      </div>
    </section>
  );
}

function Row({
  tags,
  dir,
  duration,
}: {
  tags: string[];
  dir: "left" | "right";
  duration: number;
}) {
  const doubled = [...tags, ...tags];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`marquee-track ${dir === "left" ? "marquee-left" : "marquee-right"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="mr-3 flex-shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-text-1 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.06]"
          >
            <span className="font-mono text-[10px] text-text-3 mr-2">·</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
