"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, TrendingUp, Sparkles, ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { easings } from "@/lib/utils";

const PILLARS = [
  {
    href: "/creation-site-web",
    icon: Globe,
    kicker: "Pilier 1",
    title: "Création de sites web",
    desc: "Un site sur-mesure, rapide et moderne, pensé pour convertir vos visiteurs en clients.",
    points: ["Design premium sur-mesure", "Performance & mobile", "Optimisé conversion & SEO"],
  },
  {
    href: "/visibilite-en-ligne",
    icon: TrendingUp,
    kicker: "Pilier 2",
    title: "Visibilité en ligne",
    desc: "Être trouvé, inspirer confiance et attirer des clients là où ils cherchent.",
    points: ["SEO local & fiche Google Business", "Avis Google", "Google & Meta Ads"],
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
        <span className="kicker">Deux piliers, une seule mission</span>
        <h2 className="t-h1 mt-4 text-text-1">
          Un site qui vend, une visibilité qui dure.
        </h2>
        <p className="body-lg mt-5">
          Le site et la visibilité avancent ensemble : l&apos;un convertit, l&apos;autre amène le trafic.
        </p>
      </motion.div>

      {/* Deux piliers principaux */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
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
              <SpotlightCard glow="warm" className="h-full">
                <Link href={p.href} className="relative flex h-full flex-col p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-void-0"
                      style={{ background: "var(--grad-warm)" }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <span className="kicker text-[11px]">{p.kicker}</span>
                  </div>

                  <h3 className="t-h2 mt-7 text-text-1">{p.title}</h3>
                  <p className="body-md mt-3">{p.desc}</p>

                  <ul className="mt-6 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-sm text-text-2">
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "var(--grad-warm)" }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-warm-2">
                    Découvrir
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/sc:translate-x-0.5 group-hover/sc:-translate-y-0.5" />
                  </span>
                </Link>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      {/* Bonus — Automatisations (DA violette) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: easings.outQuart, delay: 0.15 }}
        className="mt-6"
      >
        <SpotlightCard glow="sig">
          <Link
            href="/automatisations"
            className="relative flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between md:p-9"
          >
            <div className="flex items-start gap-5">
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
                style={{ background: "var(--grad-signature)" }}
              >
                <Sparkles className="h-6 w-6" strokeWidth={2} />
              </span>
              <div>
                <span className="kicker text-[11px]">Bonus</span>
                <h3 className="t-h3 mt-1.5 text-text-1">Automatisations &amp; IA</h3>
                <p className="body-md mt-2 max-w-xl">
                  Agents IA, automatisations et outils internes sur-mesure — pour faire gagner du temps à votre activité.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-sig-3">
              Explorer
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/sc:translate-x-0.5 group-hover/sc:-translate-y-0.5" />
            </span>
          </Link>
        </SpotlightCard>
      </motion.div>
    </section>
  );
}
