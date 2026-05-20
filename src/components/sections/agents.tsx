"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

  // The track moves from 0 to -(n_cards * card_w - viewport_w)
  // Compute approx via percentage transform: start at 0%, end at -85%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);

  // Progress bar
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="agents"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${AGENTS.length * 60 + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="kicker">01 / Agents IA</span>
            <h2 className="h-1 mt-3">
              Tout ce qu'un humain répète,{" "}
              <span className="text-gradient-sig">un agent peut le faire.</span>
            </h2>
            <p className="body-lg mt-5 max-w-xl">
              Quelques exemples ci-dessous. Il en existe des milliers d'autres,
              et chacun se conçoit sur ton métier réel — pas un template.
            </p>
          </motion.div>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-10 flex-1">
          <motion.div
            style={{ x }}
            className="flex h-full items-center gap-6 px-6 will-change-transform"
          >
            {AGENTS.map((agent, i) => (
              <Card key={agent.id} agent={agent} index={i} />
            ))}
            {/* End spacer */}
            <div className="w-[12vw] flex-shrink-0" aria-hidden />
          </motion.div>

          {/* Edge fade masks */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-void-0 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-void-0 to-transparent"
          />
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mx-auto mb-8 mt-6 h-px w-full max-w-6xl px-6">
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
            <span>{String(1).padStart(2, "0")} / {String(AGENTS.length).padStart(2, "0")}</span>
            <span>Scrolle pour explorer →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ agent, index }: { agent: AgentCard; index: number }) {
  const Icon = (Lucide as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[agent.icon] || Lucide.Sparkles;
  const sigColor = SIG_COLORS[agent.sig - 1];
  const rgb = SIG_RGB[agent.sig];

  return (
    <motion.article
      className="relative flex h-[540px] w-[380px] flex-shrink-0 flex-col overflow-hidden rounded-3xl p-7 md:w-[420px]"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(28px) saturate(140%)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px -20px rgba(${rgb}, 0.45)`,
      }}
    >
      {/* Card glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full"
        style={{
          background: `radial-gradient(closest-side, rgba(${rgb}, 0.35), transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div
          className="grid h-12 w-12 place-items-center rounded-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(${rgb}, 0.35), rgba(${rgb}, 0.1))`,
            border: `1px solid rgba(${rgb}, 0.3)`,
            boxShadow: `0 0 30px -8px rgba(${rgb}, 0.6)`,
          }}
        >
          <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text-2"
          >
            {agent.category}
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.18em] text-text-3"
          >
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-7 font-display text-2xl font-medium leading-tight tracking-tight">
        {agent.title}
      </h3>

      {/* Hook */}
      <p
        className="mt-3 text-[17px] font-medium italic text-text-1"
        style={{ color: `rgba(255,255,255,0.92)` }}
      >
        “{agent.hook}”
      </p>

      {/* Utility */}
      <p className="body-md mt-4 text-[14.5px]">{agent.utility}</p>

      {/* Stat */}
      <div className="mt-auto pt-6">
        <div
          aria-hidden
          className="mb-4 h-px w-full"
          style={{
            background: `linear-gradient(to right, rgba(${rgb}, 0.4), transparent)`,
          }}
        />
        <div className="flex items-baseline gap-3">
          <span
            className="font-display text-3xl font-bold leading-none"
            style={{ color: sigColor }}
          >
            {agent.statValue}
          </span>
          <span className="text-[13px] text-text-2">{agent.statLabel}</span>
        </div>
      </div>
    </motion.article>
  );
}
