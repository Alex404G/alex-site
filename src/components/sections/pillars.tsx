"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, TrendingUp, Sparkles, ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { easings } from "@/lib/utils";

// Trois expertises, trois thèmes : chaud (sites), émeraude (visibilité),
// violet (automatisations). Cartes égales — aucune n'est un « bonus ».
const PILLARS = [
  {
    href: "/creation-site-web",
    icon: Globe,
    num: "01",
    title: "Création de sites web",
    desc: "Un site sur-mesure, rapide et moderne, pensé pour convertir vos visiteurs en clients.",
    points: ["Design premium sur-mesure", "Performance & mobile", "Optimisé conversion & SEO"],
    glow: "warm" as const,
    grad: "var(--grad-warm)",
    link: "text-warm-2",
    ink: "text-void-0",
  },
  {
    href: "/visibilite-en-ligne",
    icon: TrendingUp,
    num: "02",
    title: "Visibilité en ligne",
    desc: "Être trouvé, inspirer confiance et attirer des clients là où ils cherchent.",
    points: ["SEO local & fiche Google Business", "Avis Google", "Google & Meta Ads"],
    glow: "visi" as const,
    grad: "var(--grad-visi)",
    link: "text-visi-2",
    ink: "text-void-0",
  },
  {
    href: "/automatisations",
    icon: Sparkles,
    num: "03",
    title: "Automatisations & IA",
    desc: "Des agents IA et outils internes conçus sur votre métier, pour déléguer ce qui vous prend du temps.",
    points: ["Assistant IA sur vos outils", "Tri de mails, factures, documents", "Veille & reporting automatiques"],
    glow: "sig" as const,
    grad: "var(--grad-signature)",
    link: "text-sig-3",
    ink: "text-white",
  },
];

export function Pillars() {
  return (
    <section id="offres" className="relative mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: easings.outQuart }}
        className="max-w-2xl"
      >
        <span className="kicker">Trois expertises</span>
        <h2 className="t-h1 mt-4 text-text-1">
          Attirer des visiteurs, les convertir en clients.
        </h2>
        <p className="body-lg mt-5">
          Le site convertit, la visibilité amène le trafic. Et les automatisations
          vous rendent du temps.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PILLARS.map((p, idx) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easings.outQuart, delay: idx * 0.1 }}
            >
              <SpotlightCard glow={p.glow} className="h-full">
                <Link href={p.href} className="relative flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${p.ink}`}
                      style={{ background: p.grad }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <span className="kicker text-[11px]">{p.num}</span>
                  </div>

                  <h3 className="t-h3 mt-7 !text-[22px] font-bold text-text-1">{p.title}</h3>
                  <p className="body-md mt-3 text-[15px]">{p.desc}</p>

                  <ul className="mt-6 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-sm text-text-2">
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: p.grad }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <span className={`mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium ${p.link}`}>
                    Découvrir
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/sc:translate-x-0.5 group-hover/sc:-translate-y-0.5" />
                  </span>
                </Link>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
