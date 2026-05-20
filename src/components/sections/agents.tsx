"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { AGENTS, type AgentCard } from "@/lib/agents";
import * as Lucide from "lucide-react";
import { SIG_COLORS } from "@/lib/utils";

const SIG_RGB: Record<1 | 2 | 3 | 4, string> = {
  1: "61, 92, 255",
  2: "91, 107, 255",
  3: "139, 92, 246",
  4: "184, 69, 232",
};

export function AgentsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [idx, setIdx] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIdx(Math.min(AGENTS.length, Math.max(1, Math.floor(v * AGENTS.length) + 1)));
  });

  return (
    <section
      id="agents"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${AGENTS.length * 19 + 70}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2"
          >
            <span className="kicker">01 / Agents IA</span>
            <h2 className="t-h1">
              Tout ce qu'un humain répète,{" "}
              <span className="text-gradient-sig">un agent peut le faire.</span>
            </h2>
            <p className="body-md mt-2 max-w-xl">
              Quelques exemples. Il en existe des milliers — chacun se conçoit
              sur ton métier réel, pas sur un template.
            </p>
          </motion.div>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-8 flex-1">
          <motion.div
            style={{ x }}
            className="flex h-full items-center gap-5 px-6 will-change-transform md:gap-6"
          >
            {AGENTS.map((agent, i) => (
              <Card key={agent.id} agent={agent} index={i} />
            ))}
            <div className="w-[10vw] flex-shrink-0" aria-hidden />
          </motion.div>

          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-void-0 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-void-0 to-transparent"
          />
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mx-auto mb-6 mt-4 w-full max-w-6xl px-6">
          <div className="relative h-px overflow-hidden bg-white/5">
            <motion.div
              style={{ width: progress }}
              className="absolute inset-y-0 left-0"
            >
              <div
                className="h-full w-full"
                style={{ background: "var(--grad-signature)" }}
              />
            </motion.div>
          </div>
          <div className="kicker mt-3 flex justify-between text-[10px]">
            <span>
              {String(idx).padStart(2, "0")} / {String(AGENTS.length).padStart(2, "0")}
            </span>
            <span>Scrolle pour explorer →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Card — minimaliste : un seul accent coloré, typographie nette.
   ============================================================ */

function Card({ agent, index }: { agent: AgentCard; index: number }) {
  const Icon =
    (Lucide as unknown as Record<
      string,
      React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>
    >)[agent.icon] || Lucide.Sparkles;
  const sigColor = SIG_COLORS[agent.sig - 1];
  const rgb = SIG_RGB[agent.sig];

  return (
    <motion.article
      className="group relative flex h-[420px] w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-[24px] p-6 md:h-[440px] md:w-[340px]"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px) saturate(130%)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -20px rgba(${rgb}, 0.32)`,
      }}
    >
      {/* Single subtle accent — corner glow only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full transition-opacity duration-500 group-hover:opacity-80"
        style={{
          background: `radial-gradient(closest-side, rgba(${rgb}, 0.35), transparent 70%)`,
          filter: "blur(30px)",
          opacity: 0.4,
        }}
      />

      {/* Top row — category + number */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="font-mono text-[10px] font-medium uppercase tracking-[0.18em]"
          style={{ color: `rgb(${rgb})` }}
        >
          {agent.category}
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-text-3">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Icon — minimal, no badge, just the symbol in sig color */}
      <div className="relative z-10 mt-8">
        <Icon
          className="h-8 w-8"
          strokeWidth={1.4}
          style={{ color: sigColor }}
        />
      </div>

      {/* Title */}
      <h3 className="relative z-10 mt-6 font-display text-[21px] font-medium leading-[1.18] tracking-[-0.015em] text-text-1">
        {agent.title}
      </h3>

      {/* Utility */}
      <p className="relative z-10 mt-3 text-[13.5px] leading-[1.55] text-text-2">
        {agent.utility}
      </p>

      {/* Stat strip — bottom */}
      <div className="relative z-10 mt-auto pt-5">
        <div className="flex items-baseline gap-2.5">
          <span
            className="font-display text-[26px] font-bold leading-none tracking-[-0.02em]"
            style={{ color: sigColor }}
          >
            {agent.statValue}
          </span>
          <span className="text-[11px] leading-tight text-text-3">
            {agent.statLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
