"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Gauge,
  MousePointerClick,
  Search,
  Smartphone,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
} from "lucide-react";
import { useContactModal } from "@/components/contact-modal";
import { SpotlightCard } from "@/components/spotlight-card";
import { PageHero } from "@/components/page-hero";
import { SectionGlow } from "@/components/section-glow";
import { easings } from "@/lib/utils";

// Bento : 2 arguments vedettes (avec tuile), 4 compacts (icône inline) —
// une hiérarchie, pas 6 cartes identiques.
const FEATURED = [
  { icon: Sparkles, title: "Design premium sur-mesure", desc: "Une identité unique, dessinée pour votre activité : couleurs, typographies et mise en page dérivées de votre métier, pas d'un template recyclé." },
  { icon: MousePointerClick, title: "Optimisé conversion", desc: "Parcours clairs, appels à l'action au bon endroit, formulaire réduit à l'essentiel : des visiteurs qui deviennent des clients." },
];

const FEATURES = [
  { icon: Gauge, title: "Performance & rapidité", desc: "Un site léger qui charge vite, pour le confort et le référencement." },
  { icon: Smartphone, title: "Mobile irréprochable", desc: "Pensé mobile d'abord : la majorité de vos visiteurs vient du téléphone." },
  { icon: Search, title: "SEO intégré dès le départ", desc: "Structure et contenus propres pour être bien placé sur Google." },
  { icon: Wrench, title: "Évolutif & maintenu", desc: "Un site qui grandit avec vous, simple à faire évoluer." },
];

const COMPARE = [
  ["Un design vu sur des milliers d'autres sites", "Une identité qui n'existe que chez vous"],
  ["Alourdi par des modules inutiles, souvent lent", "Léger et rapide, rien de superflu"],
  ["Un référencement générique, mal maîtrisé", "Une structure pensée pour Google dès le départ"],
  ["Compliqué à faire évoluer sans tout casser", "Simple à faire grandir avec votre activité"],
  ["Vous ressemblez à vos concurrents", "Vous vous démarquez"],
];

const STEPS = [
  { n: "01", title: "Cadrage", desc: "On clarifie votre activité, vos objectifs et vos clients cibles." },
  { n: "02", title: "Design", desc: "Maquette sur-mesure validée avant la moindre ligne de code." },
  { n: "03", title: "Développement", desc: "Intégration rapide, soignée, optimisée pour Google et le mobile." },
  { n: "04", title: "Mise en ligne & suivi", desc: "Publication, prise en main, et accompagnement dans la durée." },
];

export function CreationPage() {
  const { open } = useContactModal();
  // Progression de lecture de la section méthode (barre au-dessus des 4 étapes)
  const stepsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start 75%", "end 78%"],
  });

  return (
    <main id="main" className="relative overflow-hidden">
      {/* Fond chaud éditorial (pas d'aurora) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="warm-bloom absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, rgba(2,3,10,0.6) 100%)",
          }}
        />
      </div>

      {/* Hero — disposition commune aux trois pages de service */}
      <PageHero
        theme="warm"
        kicker="Création de sites web"
        title="Un site qui vend."
        sub="Sur-mesure pour votre activité, jamais un template recyclé."
        body="Je conçois et développe votre site de A à Z : identité, design premium, performance, et une structure pensée pour transformer vos visiteurs en clients."
        cta="Discuter de votre site"
      />

      {/* Inclus / features */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">Ce qui est inclus</span>
          <h2 className="t-h1 mt-4 text-text-1">Tout ce qu&apos;un site doit faire.</h2>
        </div>
        {/* Rangée vedette — les deux arguments qui vendent */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {FEATURED.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: easings.outQuart, delay: i * 0.1 }}
              >
                <SpotlightCard glow="warm" className="h-full">
                  <div className="p-8 md:p-9">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-void-0"
                      style={{ background: "var(--grad-warm)" }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <h3 className="t-h3 mt-6 !text-[22px] font-bold text-text-1">{f.title}</h3>
                    <p className="body-md mt-3 text-[15px]">{f.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Rangée compacte — le socle, sans tuiles */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: easings.outQuart, delay: 0.1 + i * 0.06 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4.5 w-4.5 shrink-0 text-warm-2" strokeWidth={1.8} />
                  <h3 className="font-display text-[16px] font-bold tracking-[-0.01em] text-text-1">
                    {f.title}
                  </h3>
                </div>
                <p className="body-md mt-2.5 text-[14px]">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <SectionGlow />

      {/* Comparatif — section distinctive de la page Création */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <span className="kicker">La différence</span>
          <h2 className="t-h1 mt-4 text-text-1 md:whitespace-nowrap">Template ou sur-mesure&nbsp;?</h2>
          <p className="body-md mt-4 max-w-xl text-[15px]">
            Un template coûte moins cher au départ. Il vous coûte des clients ensuite.
            Voici ce qui change concrètement.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Template */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: easings.outQuart }}
            className="rounded-3xl border border-white/[0.07] bg-white/[0.015] p-8 md:p-9"
          >
            <span className="kicker text-text-3">Un template</span>
            <ul className="mt-6 space-y-4">
              {COMPARE.map(([tpl]) => (
                <li key={tpl} className="flex items-start gap-3 text-[15px] text-text-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-text-3" strokeWidth={2.5} />
                  {tpl}
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Sur-mesure — mis en avant */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: easings.outQuart, delay: 0.1 }}
            className="glow-warm rounded-3xl border border-white/[0.1] bg-white/[0.03] p-8 md:p-9"
          >
            <span
              className="kicker"
              style={{
                background: "var(--grad-warm)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sur-mesure
            </span>
            <ul className="mt-6 space-y-4">
              {COMPARE.map(([, sur]) => (
                <li key={sur} className="flex items-start gap-3 text-[15px] text-text-1">
                  <span
                    className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full"
                    style={{ background: "var(--grad-warm)" }}
                  >
                    <Check className="h-3 w-3 text-void-0" strokeWidth={3} />
                  </span>
                  {sur}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <SectionGlow />

      {/* Process */}
      <section ref={stepsRef} className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">Comment ça se passe</span>
          <h2 className="t-h1 mt-4 text-text-1">Un cadre clair, du début à la mise en ligne.</h2>
        </div>
        {/* Barre de progression horizontale : se remplit au fil du scroll */}
        <div className="mt-12 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
          <motion.div
            className="h-full origin-left"
            style={{ scaleX: stepsProgress, background: "var(--grad-warm)" }}
          />
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: easings.outQuart, delay: i * 0.08 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7"
            >
              <span
                className="font-mono text-2xl font-bold"
                style={{
                  background: "var(--grad-warm)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.n}
              </span>
              <h3 className="t-h3 mt-4 text-text-1">{s.title}</h3>
              <p className="body-md mt-2 text-[15px]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-4xl px-6 pb-32 pt-10 text-center md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easings.outQuart }}
          className="glow-warm rounded-3xl border border-white/[0.08] bg-white/[0.03] p-12 md:p-16"
        >
          <h2 className="t-h1 text-text-1">Un projet de site ?</h2>
          <p className="body-lg mt-4 mx-auto max-w-xl">
            Parlons-en. Je vous réponds avec une première idée concrète.
          </p>
          <button
            onClick={open}
            className="group mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-void-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--grad-warm)", boxShadow: "0 20px 60px -12px rgba(255,122,77,0.55)" }}
          >
            Discuter du projet
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="body-md mt-7 text-[14px] text-text-2">
            Un beau site attire, encore faut-il être trouvé.{" "}
            <Link
              href="/visibilite-en-ligne"
              className="inline-flex items-center gap-1 text-warm-2 underline decoration-white/20 underline-offset-2 transition-colors hover:text-text-1"
            >
              Voir la visibilité en ligne
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
