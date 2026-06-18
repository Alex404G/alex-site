"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Gauge,
  MousePointerClick,
  Search,
  Smartphone,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { useContactModal } from "@/components/contact-modal";
import { SpotlightCard } from "@/components/spotlight-card";
import { easings } from "@/lib/utils";

const FEATURES = [
  { icon: Sparkles, title: "Design premium sur-mesure", desc: "Une identité unique, pas un template recyclé. Chaque écran est dessiné pour votre activité." },
  { icon: Gauge, title: "Performance & rapidité", desc: "Un site léger qui charge vite — essentiel pour le confort et le référencement." },
  { icon: Smartphone, title: "Mobile irréprochable", desc: "Pensé mobile d'abord : la majorité de vos visiteurs vient du téléphone." },
  { icon: MousePointerClick, title: "Optimisé conversion", desc: "Parcours clairs, appels à l'action efficaces : des visiteurs qui deviennent clients." },
  { icon: Search, title: "SEO intégré dès le départ", desc: "Structure, contenus et techniques propres pour être bien placé sur Google." },
  { icon: Wrench, title: "Évolutif & maintenu", desc: "Un site qui grandit avec vous, simple à faire évoluer dans le temps." },
];

const STEPS = [
  { n: "01", title: "Cadrage", desc: "On clarifie votre activité, vos objectifs et vos clients cibles." },
  { n: "02", title: "Design", desc: "Maquette sur-mesure validée avant la moindre ligne de code." },
  { n: "03", title: "Développement", desc: "Intégration rapide, soignée, optimisée pour Google et le mobile." },
  { n: "04", title: "Mise en ligne & suivi", desc: "Publication, prise en main, et accompagnement dans la durée." },
];

export function CreationPage() {
  const { open } = useContactModal();

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

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-6 pt-40 pb-16 text-center md:pt-52 md:pb-24">
        <motion.span
          className="kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easings.outQuart }}
        >
          Création de sites web
        </motion.span>
        <motion.h1
          className="t-display mt-6"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: easings.outQuart, delay: 0.1 }}
        >
          <span className="text-gradient-warm">Un site qui vend.</span>
        </motion.h1>
        <motion.p
          className="t-h2 mt-7 mx-auto max-w-3xl text-text-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.3 }}
        >
          Sur-mesure, rapide, moderne. Jamais un template.
        </motion.p>
        <motion.p
          className="body-md mt-6 mx-auto max-w-xl text-[15.5px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.45 }}
        >
          Je conçois et développe votre site de A à Z : identité, design premium,
          performance, et une structure pensée pour transformer vos visiteurs en
          clients — optimisée pour Google dès le départ.
        </motion.p>
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.6 }}
        >
          <button
            onClick={open}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-void-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--grad-warm)", boxShadow: "0 20px 60px -12px rgba(255,122,77,0.55)" }}
          >
            Discuter de votre site
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </section>

      {/* Inclus / features */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">Ce qui est inclus</span>
          <h2 className="t-h1 mt-4 text-text-1">Tout ce qu&apos;un site doit faire.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: easings.outQuart, delay: (i % 3) * 0.08 }}
              >
                <SpotlightCard glow="warm" className="h-full">
                  <div className="p-7">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-void-0"
                      style={{ background: "var(--grad-warm)" }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <h3 className="t-h3 mt-5 text-text-1">{f.title}</h3>
                    <p className="body-md mt-2 text-[15px]">{f.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">Comment ça se passe</span>
          <h2 className="t-h1 mt-4 text-text-1">Un cadre clair, du début à la mise en ligne.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </motion.div>
      </section>
    </main>
  );
}
