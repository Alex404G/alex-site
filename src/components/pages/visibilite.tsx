"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Store,
  Star,
  Megaphone,
  Share2,
  LineChart,
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { useContactModal } from "@/components/contact-modal";
import { SpotlightCard } from "@/components/spotlight-card";
import { easings } from "@/lib/utils";

const LEVERS = [
  { icon: MapPin, title: "SEO local", desc: "Apparaître quand on cherche votre métier dans votre secteur, sur Google." },
  { icon: Store, title: "Fiche Google Business", desc: "Une fiche optimisée et tenue à jour : horaires, photos, services, posts." },
  { icon: Star, title: "Avis Google", desc: "Collecter et valoriser les avis pour inspirer confiance et grimper dans les résultats." },
  { icon: Megaphone, title: "Google Ads", desc: "Capter la demande au bon moment, avec des campagnes maîtrisées et rentables." },
  { icon: Share2, title: "Meta Ads", desc: "Toucher de nouveaux clients sur Instagram et Facebook avec des visuels qui marquent." },
  { icon: LineChart, title: "Suivi & reporting", desc: "Des résultats lisibles : ce qui marche, ce qu'on ajuste, où va le budget." },
];

const SURFACES = [
  {
    icon: Search,
    title: "Sur Google",
    desc: "Quand ils tapent votre métier. Le SEO vous place dans les résultats, là où la plupart des gens ne dépassent jamais la première page.",
  },
  {
    icon: MapPin,
    title: "Sur la carte",
    desc: "La fiche Google Business, les avis et Maps décident qui on appelle près de chez soi. C'est souvent le premier réflexe en local.",
  },
  {
    icon: Share2,
    title: "Sur les réseaux",
    desc: "Instagram et Facebook. Les campagnes Meta vous mettent devant les bonnes personnes, au bon moment, même sans qu'elles vous cherchent.",
  },
];

const STEPS = [
  { n: "01", title: "État des lieux", desc: "Audit de votre présence actuelle : Google, fiche, avis, concurrence." },
  { n: "02", title: "Fondations", desc: "Fiche Google Business et SEO local en place — la base qui rapporte." },
  { n: "03", title: "Acquisition", desc: "Avis, Google & Meta Ads pour amener un flux de clients qualifiés." },
  { n: "04", title: "Optimisation", desc: "Suivi régulier et ajustements pour faire progresser les résultats." },
];

export function VisibilitePage() {
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
          Visibilité en ligne
        </motion.span>
        <motion.h1
          className="t-display mt-6"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: easings.outQuart, delay: 0.1 }}
        >
          <span className="text-gradient-warm">Soyez trouvé.</span>
        </motion.h1>
        <motion.p
          className="t-h2 mt-7 mx-auto max-w-3xl text-text-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.3 }}
        >
          Là où vos clients cherchent : Google et les réseaux.
        </motion.p>
        <motion.p
          className="body-md mt-6 mx-auto max-w-xl text-[15.5px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.45 }}
        >
          SEO local, fiche Google Business, avis Google, Google &amp; Meta Ads :
          je travaille votre présence pour attirer des clients qualifiés et
          installer une image solide, durablement.
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
            Booster ma visibilité
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </section>

      {/* Leviers */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">Les leviers</span>
          <h2 className="t-h1 mt-4 text-text-1">Tout ce qui vous rend visible.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEVERS.map((f, i) => {
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

      {/* Où vos clients vous cherchent — section distinctive de la page Visibilité */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">Trois terrains</span>
          <h2 className="t-h1 mt-4 text-text-1">Où vos clients vous cherchent.</h2>
          <p className="body-md mt-4 max-w-xl text-[15px]">
            On travaille les trois, dans l&apos;ordre qui rapporte le plus à votre activité.
          </p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3">
          {SURFACES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: easings.outQuart, delay: i * 0.1 }}
                className="flex flex-col bg-void-0/70 p-8"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-void-0"
                    style={{ background: "var(--grad-warm)" }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="kicker text-[11px]">0{i + 1}</span>
                </div>
                <h3 className="t-h3 mt-5 text-text-1">{s.title}</h3>
                <p className="body-md mt-2 text-[14.5px]">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Approche */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">L&apos;approche</span>
          <h2 className="t-h1 mt-4 text-text-1">Des fondations, puis de l&apos;acquisition.</h2>
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
          <h2 className="t-h1 text-text-1">Prêt à être vu ?</h2>
          <p className="body-lg mt-4 mx-auto max-w-xl">
            On fait le point sur votre visibilité actuelle, et ce qu&apos;on peut gagner.
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
            La visibilité amène le trafic, le site le transforme en clients.{" "}
            <Link
              href="/creation-site-web"
              className="inline-flex items-center gap-1 text-warm-2 underline decoration-white/20 underline-offset-2 transition-colors hover:text-text-1"
            >
              Voir la création de site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
