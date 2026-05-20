"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { Clock, Coins, Users } from "lucide-react";

type Pillar = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  sig: "1" | "3" | "4";
  rgb: string;
  big: { prefix?: string; end: number; suffix?: string; decimals?: number; raw?: string };
  bigLabel: string;
  bigSource: string;
  stats: { value: string; label: string; source: string }[];
  narration: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Clock,
    label: "Temps",
    sig: "1",
    rgb: "61, 92, 255",
    big: { end: 87, suffix: "%" },
    bigLabel: "des tâches admin répétitives sont automatisables",
    bigSource: "McKinsey · Future of Work, 2023",
    stats: [
      {
        value: "~2 h/jour",
        label: "perdues à chercher de l'info par worker",
        source: "IDC, 2022",
      },
      {
        value: "30–40 %",
        label: "de temps gagné sur les tâches éligibles avec une IA bien intégrée",
        source: "MIT × BCG, 2023",
      },
    ],
    narration:
      "Trier 80 mails. Ranger 20 PJ. Sortir un récap mensuel. Tout ça se fait pendant que tu prends ton café.",
  },
  {
    icon: Coins,
    label: "Argent",
    sig: "3",
    rgb: "139, 92, 246",
    big: { prefix: "−", end: 25, suffix: " %" , raw: "−15 à −25 %"},
    bigLabel: "de coûts admin après déploiement IA opérationnelle",
    bigSource: "McKinsey · State of AI, 2024",
    stats: [
      {
        value: "14 mois",
        label: "ROI moyen positif sur un projet IA en PME",
        source: "Deloitte, 2024",
      },
      {
        value: "+5 à +9 %",
        label: "de CA pour un commerce local gagnant 1 étoile Google",
        source: "Harvard · Michael Luca, 2016",
      },
    ],
    narration:
      "Un outil sur-mesure n'est pas une dépense. C'est un employé qui ne dort jamais, ne tombe pas malade, et coûte moins qu'un mois de salaire à l'année.",
  },
  {
    icon: Users,
    label: "Clients",
    sig: "4",
    rgb: "184, 69, 232",
    big: { end: 88, suffix: " %" },
    bigLabel: "des consommateurs lisent les avis avant d'acheter",
    bigSource: "BrightLocal · Local Consumer Review Survey, 2024",
    stats: [
      {
        value: "5 à 25×",
        label: "moins cher de retenir un client que d'en gagner un nouveau",
        source: "Harvard Business Review, 2014",
      },
      {
        value: "×3",
        label: "de conversions pour les sites qui chargent en < 1 s",
        source: "Google · web.dev",
      },
    ],
    narration:
      "Un client servi vite, bien, reconnu — se transforme en avis 5★. Et un avis 5★ se transforme en client suivant.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefices" className="relative w-full py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="kicker">02 / Bénéfices</span>
          <h2 className="t-h1 mt-3">
            Du temps. De l'argent.{" "}
            <span className="text-gradient-sig">Des clients.</span>
          </h2>
          <p className="body-lg mt-5 max-w-xl">
            Trois bénéfices, des chiffres sourcés, et une promesse simple :
            chaque outil livré doit cocher au moins l'un des trois — sinon on
            ne le construit pas.
          </p>
        </motion.div>

        <div className="mt-20 flex flex-col gap-10">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.label} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const Icon = pillar.icon;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="glass relative overflow-hidden rounded-3xl p-8 md:p-12"
      style={{
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px -30px rgba(${pillar.rgb}, 0.4)`,
      }}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full opacity-50"
        style={{
          background: `radial-gradient(closest-side, rgba(${pillar.rgb}, 0.35), transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      <div className="relative grid gap-10 md:grid-cols-[1.05fr_1fr]">
        {/* Left — big stat */}
        <div>
          <div className="flex items-center gap-4">
            <div
              className="grid h-12 w-12 place-items-center rounded-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(${pillar.rgb}, 0.35), rgba(${pillar.rgb}, 0.1))`,
                border: `1px solid rgba(${pillar.rgb}, 0.3)`,
              }}
            >
              <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
            </div>
            <span className="kicker">{String(index + 1).padStart(2, "0")} · {pillar.label}</span>
          </div>

          <div
            className="mt-8 font-display text-[clamp(72px,12vw,180px)] font-black leading-[0.85] tracking-[-0.05em]"
            style={{ color: `rgb(${pillar.rgb})` }}
          >
            {pillar.big.raw ? (
              <span>{pillar.big.raw}</span>
            ) : (
              <>
                {pillar.big.prefix}
                {inView ? (
                  <CountUp
                    end={pillar.big.end}
                    duration={1.8}
                    decimals={pillar.big.decimals ?? 0}
                  />
                ) : (
                  "0"
                )}
                {pillar.big.suffix}
              </>
            )}
          </div>

          <p className="mt-6 max-w-md text-lg leading-snug text-text-1">
            {pillar.bigLabel}
          </p>
          <p className="kicker mt-3 text-[10px]">{pillar.bigSource}</p>
        </div>

        {/* Right — supporting stats + narration */}
        <div className="flex flex-col gap-7">
          {pillar.stats.map((s) => (
            <div
              key={s.label}
              className="border-l-2 pl-5"
              style={{ borderColor: `rgba(${pillar.rgb}, 0.7)` }}
            >
              <div
                className="font-display text-3xl font-bold leading-tight tracking-tight"
                style={{ color: `rgb(${pillar.rgb})` }}
              >
                {s.value}
              </div>
              <p className="mt-1 text-[15px] leading-snug text-text-1">{s.label}</p>
              <p className="kicker mt-1.5 text-[10px]">{s.source}</p>
            </div>
          ))}

          <p className="body-md mt-2 italic">"{pillar.narration}"</p>
        </div>
      </div>
    </motion.article>
  );
}
