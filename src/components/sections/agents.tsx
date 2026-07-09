"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { AGENTS } from "@/lib/agents";
import * as Lucide from "lucide-react";
import { SIG_COLORS } from "@/lib/utils";

const SIG_RGB: Record<1 | 2 | 3 | 4, string> = {
  1: "61, 92, 255",
  2: "91, 107, 255",
  3: "139, 92, 246",
  4: "184, 69, 232",
};

// Versions éclaircies pour le TEXTE des labels (AA sur void, les pleines
// couleurs restant pour icônes, stats et glows).
const LABEL_RGB: Record<1 | 2 | 3 | 4, string> = {
  1: "138, 155, 255",
  2: "150, 162, 255",
  3: "167, 139, 250",
  4: "212, 139, 240",
};

/**
 * Dossier d'agents — un écran épinglé, un agent à la fois.
 * Le scroll fait défiler les fiches : index géant détouré à gauche,
 * contenu qui se morphe à droite (fondu + glissement + blur), halo de
 * fond qui suit la couleur de l'agent. Pas de cartes : de l'éditorial.
 */
export function AgentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(AGENTS.length - 1, Math.max(0, Math.floor(v * AGENTS.length)));
    setIdx(i);
  });

  const agent = AGENTS[idx];
  const rgb = SIG_RGB[agent.sig];
  const color = SIG_COLORS[agent.sig - 1];
  const Icon =
    (Lucide as unknown as Record<
      string,
      React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>
    >)[agent.icon] || Lucide.Sparkles;

  return (
    <section
      id="agents"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${AGENTS.length * 32 + 110}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Halo de fond — suit la couleur de l'agent actif */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          animate={{
            background: `radial-gradient(ellipse 62% 48% at 68% 58%, rgba(${rgb}, 0.13), transparent 66%)`,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* En-tête */}
        <div className="mx-auto w-full max-w-6xl px-6 pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="kicker">Agents IA</span>
            <h2 className="t-h1 mt-3">
              Tout ce qu&apos;un humain répète,{" "}
              <span className="text-gradient-sig">un agent peut le faire.</span>
            </h2>
            <p className="body-md mt-3 max-w-xl">
              Douze exemples parmi des milliers. Aucun n&apos;existe sur étagère :
              chacun est construit pour l&apos;entreprise qui l&apos;utilise.
            </p>
          </motion.div>
        </div>

        {/* Corps : index géant + fiche morphante */}
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 md:grid-cols-[0.85fr_1.4fr]">
          {/* Gauche — numéro détouré, rail de progression */}
          <div className="hidden select-none flex-col gap-8 md:flex" aria-hidden>
            <div
              className="font-display font-black leading-none tracking-[-0.05em] text-transparent transition-all duration-500"
              style={{
                fontSize: "clamp(110px, 11vw, 168px)",
                WebkitTextStroke: `1.5px rgba(${rgb}, 0.9)`,
                filter: `drop-shadow(0 0 26px rgba(${rgb}, 0.5)) drop-shadow(0 0 70px rgba(${rgb}, 0.28))`,
              }}
            >
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div className="flex items-center gap-1.5">
              {AGENTS.map((a, i) => (
                <span
                  key={a.id}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? 30 : 10,
                    background:
                      i === idx ? `rgb(${SIG_RGB[a.sig]})` : "rgba(255,255,255,0.14)",
                  }}
                />
              ))}
            </div>
            <p className="kicker text-[10px]">
              {String(idx + 1).padStart(2, "0")} / {AGENTS.length} · Faites défiler
            </p>
          </div>

          {/* Droite — la fiche de l'agent, morphée à chaque changement */}
          <div className="relative flex min-h-[340px] flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.article
                key={agent.id}
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: `rgb(${LABEL_RGB[agent.sig]})` }}
                >
                  {agent.category}
                </span>

                <div className="mt-5 flex items-center gap-4">
                  <Icon className="h-9 w-9 shrink-0" strokeWidth={1.4} style={{ color }} />
                  <h3 className="t-h2 text-text-1">{agent.title}</h3>
                </div>

                <p className="t-h3 mt-5 font-normal italic text-text-2">
                  «&nbsp;{agent.hook}&nbsp;»
                </p>

                <p className="body-md mt-4 max-w-xl">{agent.utility}</p>

                <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-white/[0.08] pt-6">
                  <span
                    className="font-display text-4xl font-bold tracking-[-0.02em]"
                    style={{ color }}
                  >
                    {agent.statValue}
                  </span>
                  <span className="text-sm text-text-3">{agent.statLabel}</span>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Index compact (mobile) */}
            <div className="mt-8 flex items-center justify-between md:hidden">
              <div className="flex items-center gap-1">
                {AGENTS.map((a, i) => (
                  <span
                    key={a.id}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === idx ? 22 : 7,
                      background:
                        i === idx ? `rgb(${SIG_RGB[a.sig]})` : "rgba(255,255,255,0.14)",
                    }}
                  />
                ))}
              </div>
              <span className="kicker text-[10px]">
                {String(idx + 1).padStart(2, "0")} / {AGENTS.length}
              </span>
            </div>
          </div>
        </div>

        <div className="pb-10" aria-hidden />
      </div>
    </section>
  );
}
