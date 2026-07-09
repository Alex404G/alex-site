"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { TrendingUp, MousePointerClick, Star } from "lucide-react";

type Pillar = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  rgb: string;
  big: { prefix?: string; end: number; suffix?: string; decimals?: number; raw?: string };
  bigLabel: string;
  bigSource: string;
  stats: { value: string; label: string; source: string }[];
  narration: string;
};

const PILLARS: Pillar[] = [
  {
    icon: TrendingUp,
    label: "Visibilité",
    rgb: "255, 154, 77",
    big: { end: 75, suffix: " %" },
    bigLabel: "des internautes ne vont jamais au-delà de la 1re page de Google",
    bigSource: "Backlinko, 2023",
    stats: [
      {
        value: "46 %",
        label: "des recherches Google ont une intention locale",
        source: "Google",
      },
      {
        value: "+5 à +9 %",
        label: "de chiffre d'affaires pour un commerce qui gagne une étoile sur Google",
        source: "Harvard · M. Luca, 2016",
      },
    ],
    narration:
      "Si vos clients ne vous trouvent pas, le reste ne compte pas. On vous place là où ils cherchent déjà.",
  },
  {
    icon: MousePointerClick,
    label: "Conversion",
    rgb: "255, 111, 97",
    big: { end: 3, prefix: "×", raw: "×3" },
    bigLabel: "de conversions pour un site qui s'affiche en moins d'une seconde",
    bigSource: "Google · web.dev",
    stats: [
      {
        value: "53 %",
        label: "des visiteurs mobiles quittent un site qui met plus de 3 s à charger",
        source: "Google, 2018",
      },
      {
        value: "75 %",
        label: "jugent la crédibilité d'une entreprise au design de son site",
        source: "Stanford · B. J. Fogg",
      },
    ],
    narration:
      "Un beau site qui ne convertit pas, c'est une vitrine sans porte. On dessine le chemin jusqu'au contact.",
  },
  {
    icon: Star,
    label: "Confiance",
    rgb: "240, 71, 107",
    big: { end: 88, suffix: " %" },
    bigLabel: "des consommateurs consultent les avis avant de choisir un commerce",
    bigSource: "BrightLocal, 2024",
    stats: [
      {
        value: "9 sur 10",
        label: "font autant confiance aux avis en ligne qu'à la recommandation d'un proche",
        source: "BrightLocal, 2024",
      },
      {
        value: "× 2,7",
        label: "de chances qu'un client choisisse une entreprise à la fiche Google complète",
        source: "Google",
      },
    ],
    narration:
      "Un client satisfait laisse un avis 5★. Cet avis convainc le suivant. On installe la boucle.",
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
          <span className="kicker">Bénéfices</span>
          <h2 className="t-h1 mt-3">
            Ce que ça vous{" "}
            <span className="text-gradient-warm">rapporte.</span>
          </h2>
          <p className="body-lg mt-5 max-w-xl">
            Trois leviers, des chiffres sourcés. Un site et une visibilité ne sont
            pas une dépense : ce sont des clients qui vous trouvent et vous choisissent.
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
            className={`mt-8 font-display font-black leading-[0.88] tracking-[-0.045em] whitespace-nowrap ${
              pillar.big.raw
                ? "text-[clamp(48px,7.2vw,108px)]"
                : "text-[clamp(72px,11vw,168px)]"
            }`}
            style={{
              color: `rgb(${pillar.rgb})`,
              textShadow: `0 0 80px rgba(${pillar.rgb}, 0.35)`,
            }}
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

          <p className="body-md mt-2 italic">&laquo;&nbsp;{pillar.narration}&nbsp;&raquo;</p>
        </div>
      </div>
    </motion.article>
  );
}
