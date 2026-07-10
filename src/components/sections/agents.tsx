"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AGENTS, type AgentCard } from "@/lib/agents";
import * as Lucide from "lucide-react";
import { SIG_COLORS } from "@/lib/utils";

const SIG_RGB: Record<1 | 2 | 3 | 4, string> = {
  1: "61, 92, 255",
  2: "91, 107, 255",
  3: "139, 92, 246",
  4: "184, 69, 232",
};

// Versions éclaircies pour le TEXTE des labels (AA sur void).
const LABEL_RGB: Record<1 | 2 | 3 | 4, string> = {
  1: "138, 155, 255",
  2: "150, 162, 255",
  3: "167, 139, 250",
  4: "212, 139, 240",
};

/**
 * Index d'agents — le scroll reste naturel. À gauche, la liste des douze
 * agents ; à droite, un panneau-dossier collant qui se morphe au survol ou
 * au clic (halo et numéro glow à la couleur de l'agent). Sur mobile, la
 * liste devient un accordéon.
 */
export function AgentsSection() {
  const [active, setActive] = useState(0);
  const agent = AGENTS[active];
  const rgb = SIG_RGB[agent.sig];

  return (
    <section id="agents" className="relative mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
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

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        {/* Liste-index */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col self-start border-t border-white/[0.07]"
        >
          {AGENTS.map((a, i) => {
            const isActive = i === active;
            const aRgb = SIG_RGB[a.sig];
            return (
              <li key={a.id} className="border-b border-white/[0.07]">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className={`flex w-full cursor-pointer items-center gap-4 py-3.5 text-left transition-all duration-300 ${
                    isActive ? "pl-3" : "hover:pl-1.5"
                  }`}
                >
                  <span
                    className="font-mono text-[11px] transition-colors duration-300"
                    style={{ color: isActive ? `rgb(${aRgb})` : "var(--text-3)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-[16.5px] font-bold tracking-[-0.01em] transition-colors duration-300 ${
                      isActive ? "text-text-1" : "text-text-2"
                    }`}
                  >
                    {a.title}
                  </span>
                  {/* Mobile : chevron = « ça s'ouvre ». Desktop : point d'état. */}
                  <Lucide.ChevronDown
                    aria-hidden
                    className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-300 lg:hidden ${
                      isActive ? "rotate-180" : ""
                    }`}
                    style={{ color: isActive ? `rgb(${aRgb})` : "var(--text-3)" }}
                  />
                  <span
                    aria-hidden
                    className="ml-auto hidden h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 lg:block"
                    style={{
                      background: isActive ? `rgb(${aRgb})` : "rgba(255,255,255,0.12)",
                      boxShadow: isActive ? `0 0 12px rgba(${aRgb}, 0.8)` : "none",
                    }}
                  />
                </button>

                {/* Accordéon (mobile / tablette) — fiche délimitée, sans répéter le titre */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      className="overflow-hidden lg:hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="pb-5 pt-1">
                        <FicheMobile agent={a} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </motion.ul>

        {/* Panneau-dossier — desktop, collant pendant le parcours de la liste */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:block"
        >
          <div className="sticky top-24">
            <div
              className="glass relative overflow-hidden rounded-3xl p-9 transition-shadow duration-500"
              style={{
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px -30px rgba(${rgb}, 0.35)`,
              }}
            >
              {/* Halo à la couleur de l'agent */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                animate={{
                  background: `radial-gradient(ellipse 70% 55% at 80% 12%, rgba(${rgb}, 0.14), transparent 65%)`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Numéro détouré glow, décoratif */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-7 top-5 select-none font-display text-[92px] font-black leading-none tracking-[-0.05em] text-transparent transition-all duration-500"
                style={{
                  WebkitTextStroke: `1.5px rgba(${rgb}, 0.9)`,
                  filter: `drop-shadow(0 0 10px rgba(${rgb}, 0.7)) drop-shadow(0 0 32px rgba(${rgb}, 0.4))`,
                }}
              >
                {String(active + 1).padStart(2, "0")}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <Fiche agent={agent} large />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Fiche({ agent, large = false }: { agent: AgentCard; large?: boolean }) {
  const rgb = SIG_RGB[agent.sig];
  const color = SIG_COLORS[agent.sig - 1];
  const Icon =
    (Lucide as unknown as Record<
      string,
      React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>
    >)[agent.icon] || Lucide.Sparkles;

  return (
    <div>
      <span
        className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
        style={{ color: `rgb(${LABEL_RGB[agent.sig]})` }}
      >
        {agent.category}
      </span>

      <div className={`flex items-center gap-3.5 ${large ? "mt-5 max-w-[75%]" : "mt-4"}`}>
        <Icon
          className={large ? "h-8 w-8 shrink-0" : "h-6 w-6 shrink-0"}
          strokeWidth={1.4}
          style={{ color }}
        />
        <h3 className={`${large ? "t-h2" : "t-h3"} text-text-1`}>{agent.title}</h3>
      </div>

      <p className={`italic text-text-2 ${large ? "t-h3 mt-5 font-normal" : "mt-3 text-[15px]"}`}>
        «&nbsp;{agent.hook}&nbsp;»
      </p>

      <p className={`body-md mt-3 ${large ? "mt-4 max-w-xl" : "text-[14.5px]"}`}>{agent.utility}</p>

      <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-white/[0.08] ${large ? "mt-7 pt-6" : "mt-5 pt-4"}`}>
        <span
          className={`font-display font-bold tracking-[-0.02em] ${large ? "text-4xl" : "text-2xl"}`}
          style={{ color }}
        >
          {agent.statValue}
        </span>
        <span className="text-sm text-text-3">{agent.statLabel}</span>
      </div>
    </div>
  );
}

/**
 * Fiche mobile : le titre de l'agent est déjà dans la ligne au-dessus, donc
 * on ne le répète pas. Un encadré délimité (filet coloré à gauche + surface
 * légère) range clairement la catégorie, la phrase, l'utilité et la stat.
 */
function FicheMobile({ agent }: { agent: AgentCard }) {
  const rgb = SIG_RGB[agent.sig];
  const color = SIG_COLORS[agent.sig - 1];
  return (
    <div
      className="ml-8 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
      style={{ borderLeftWidth: 2, borderLeftColor: `rgb(${rgb})` }}
    >
      <span
        className="font-mono text-[10px] font-medium uppercase tracking-[0.16em]"
        style={{ color: `rgb(${LABEL_RGB[agent.sig]})` }}
      >
        {agent.category}
      </span>
      <p className="mt-2 text-[13.5px] italic leading-snug text-text-2">
        «&nbsp;{agent.hook}&nbsp;»
      </p>
      <p className="mt-2.5 text-[13px] leading-relaxed text-text-2">{agent.utility}</p>
      <div className="mt-3.5 flex items-baseline gap-2 border-t border-white/[0.08] pt-3">
        <span
          className="font-display text-xl font-bold tracking-[-0.02em]"
          style={{ color }}
        >
          {agent.statValue}
        </span>
        <span className="text-[12px] text-text-3">{agent.statLabel}</span>
      </div>
    </div>
  );
}
