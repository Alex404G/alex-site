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
      style={{ height: `${AGENTS.length * 28 + 80}vh` }}
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
   Card — 4 layout variants cycling, each with a unique
   decorative pattern in its signature color.
   ============================================================ */

function Card({ agent, index }: { agent: AgentCard; index: number }) {
  const Icon =
    (Lucide as unknown as Record<
      string,
      React.ComponentType<{ className?: string; strokeWidth?: number }>
    >)[agent.icon] || Lucide.Sparkles;
  const sigColor = SIG_COLORS[agent.sig - 1];
  const rgb = SIG_RGB[agent.sig];
  const variant = index % 4;

  return (
    <motion.article
      className="group relative flex h-[440px] w-[320px] flex-shrink-0 flex-col overflow-hidden rounded-[28px] p-6 md:h-[460px] md:w-[360px]"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      style={{
        background:
          "linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 60%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(28px) saturate(140%)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -20px rgba(${rgb}, 0.42)`,
      }}
    >
      <Decoration variant={variant} rgb={rgb} />

      {/* Inner glow corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background: `radial-gradient(closest-side, rgba(${rgb}, 0.45), transparent 70%)`,
          filter: "blur(24px)",
          opacity: 0.55,
        }}
      />

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em]"
          style={{
            borderColor: `rgba(${rgb}, 0.4)`,
            background: `rgba(${rgb}, 0.12)`,
            color: `rgb(${rgb})`,
          }}
        >
          {agent.category}
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-text-3">
          {String(index + 1).padStart(2, "0")} / {String(AGENTS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Icon */}
      <div className="relative z-10 mt-7">
        <div
          className="relative grid h-14 w-14 place-items-center rounded-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(${rgb}, 0.4), rgba(${rgb}, 0.08))`,
            border: `1px solid rgba(${rgb}, 0.35)`,
            boxShadow: `0 0 40px -8px rgba(${rgb}, 0.7), inset 0 1px 0 rgba(255,255,255,0.18)`,
          }}
        >
          <Icon className="h-6 w-6 text-white" strokeWidth={1.6} />
          <span
            aria-hidden
            className="absolute -right-1 -top-1 h-2 w-2 rounded-full"
            style={{
              background: sigColor,
              boxShadow: `0 0 12px ${sigColor}`,
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 mt-5 font-display text-[22px] font-medium leading-[1.15] tracking-[-0.015em] text-text-1">
        {agent.title}
      </h3>

      {/* Hook */}
      <p
        className="relative z-10 mt-2.5 font-display text-[15px] font-medium italic leading-snug"
        style={{ color: `rgba(${rgb}, 0.95)` }}
      >
        “{agent.hook}”
      </p>

      {/* Utility */}
      <p className="relative z-10 mt-3 text-[13.5px] leading-[1.5] text-text-2">
        {agent.utility}
      </p>

      {/* Stat strip */}
      <div className="relative z-10 mt-auto">
        <div
          aria-hidden
          className="mb-3 h-px w-full"
          style={{
            background: `linear-gradient(to right, rgba(${rgb}, 0.5), transparent)`,
          }}
        />
        <div className="flex items-baseline gap-3">
          <span
            className="font-display text-[28px] font-bold leading-none tracking-[-0.02em]"
            style={{ color: sigColor, textShadow: `0 0 24px rgba(${rgb}, 0.5)` }}
          >
            {agent.statValue}
          </span>
          <span className="text-[11px] leading-tight text-text-2">
            {agent.statLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   Decoration — 4 patterns
   ============================================================ */

function Decoration({ variant, rgb }: { variant: number; rgb: string }) {
  if (variant === 0) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(rgba(${rgb}, 0.55) 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(ellipse at 100% 0%, black 0%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 100% 0%, black 0%, transparent 60%)",
        }}
      />
    );
  }
  if (variant === 1) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, rgba(${rgb}, 0.3) 0px, rgba(${rgb}, 0.3) 1px, transparent 1px, transparent 14px)`,
          maskImage: "linear-gradient(180deg, transparent 30%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 30%, black 100%)",
        }}
      />
    );
  }
  if (variant === 2) {
    return (
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 opacity-55"
        viewBox="0 0 200 200"
      >
        {[40, 65, 90, 115, 140].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={`rgba(${rgb}, ${0.55 - i * 0.08})`}
            strokeWidth="1"
          />
        ))}
      </svg>
    );
  }
  // variant 3 — waveform bars
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-2 left-6 right-6 h-24 opacity-55"
      viewBox="0 0 220 100"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 32 }).map((_, i) => {
        const h = 18 + Math.sin(i * 0.7) * 28 + (i % 3 === 0 ? 18 : 0);
        return (
          <rect
            key={i}
            x={i * 7}
            y={100 - h}
            width="2"
            height={h}
            fill={`rgba(${rgb}, ${0.32 + (i % 4) * 0.12})`}
            rx="1"
          />
        );
      })}
    </svg>
  );
}
