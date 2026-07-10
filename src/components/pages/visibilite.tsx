"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
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
import { PageHero } from "@/components/page-hero";
import { SectionGlow } from "@/components/section-glow";
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
  { n: "02", title: "Fondations", desc: "Fiche Google Business et SEO local en place : la base qui rapporte." },
  { n: "03", title: "Acquisition", desc: "Avis, Google & Meta Ads pour amener un flux de clients qualifiés." },
  { n: "04", title: "Optimisation", desc: "Suivi régulier et ajustements pour faire progresser les résultats." },
];

export function VisibilitePage() {
  const { open } = useContactModal();
  // Remplissage du rail de la timeline au fil du scroll
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: railProgress } = useScroll({
    target: railRef,
    offset: ["start 78%", "end 62%"],
  });

  return (
    <main id="main" className="relative overflow-hidden">
      {/* Fond chaud éditorial (pas d'aurora) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="visi-bloom absolute inset-0" />
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
        theme="visi"
        kicker="Visibilité en ligne"
        title="Soyez trouvé."
        sub="Là où vos clients cherchent : Google et les réseaux."
        body="SEO local, fiche Google Business, avis, Google & Meta Ads : je travaille votre présence pour attirer des clients qualifiés, durablement."
        cta="Booster ma visibilité"
      />

      {/* Leviers */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">Les leviers</span>
          <h2 className="t-h1 mt-4 text-text-1">Tout ce qui vous rend visible.</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
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
                <SpotlightCard glow="visi" className="h-full">
                  <div className="p-4 sm:p-7">
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-void-0 sm:h-11 sm:w-11"
                      style={{ background: "var(--grad-visi)" }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                    </span>
                    <h3 className="t-h3 mt-3.5 !text-[15.5px] text-text-1 sm:mt-5 sm:!text-[18px]">{f.title}</h3>
                    <p className="body-md mt-1.5 text-[12.5px] sm:mt-2 sm:text-[15px]">{f.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      <SectionGlow theme="visi" />

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
                    style={{ background: "var(--grad-visi)" }}
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

      <SectionGlow theme="visi" />

      {/* Approche — timeline verticale (grammaire distincte des 4 cartes de Création) */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="kicker">L&apos;approche</span>
          <h2 className="t-h1 mt-4 text-text-1">Des fondations, puis de l&apos;acquisition.</h2>
        </div>
        <div ref={railRef} className="relative mt-12 max-w-2xl">
          {/* Rail émeraude — se remplit au fil du scroll */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-0.5 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              style={{ scaleY: railProgress, transformOrigin: "50% 0%" }}
              className="h-full w-full"
            >
              <div className="h-full w-full" style={{ background: "var(--grad-visi)" }} />
            </motion.div>
          </div>
          <div className="flex flex-col gap-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: easings.outQuart, delay: i * 0.08 }}
                className="relative pl-11"
              >
                {/* Pastille sur le rail */}
                <span aria-hidden className="absolute left-[8px] top-1.5 -translate-x-1/2">
                  <span
                    className="block h-3 w-3 rounded-full"
                    style={{
                      background: "var(--grad-visi)",
                      boxShadow:
                        "0 0 0 4px rgba(95,227,161,0.14), 0 0 18px rgba(95,227,161,0.55)",
                    }}
                  />
                </span>
                <span className="kicker text-[11px] text-visi-2">{s.n}</span>
                <h3 className="t-h3 mt-1.5 text-text-1">{s.title}</h3>
                <p className="body-md mt-1.5 max-w-md text-[15px]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-4xl px-6 pb-32 pt-10 text-center md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easings.outQuart }}
          className="glow-visi rounded-3xl border border-white/[0.08] bg-white/[0.03] p-12 md:p-16"
        >
          <h2 className="t-h1 text-text-1">Prêt à être vu ?</h2>
          <p className="body-lg mt-4 mx-auto max-w-xl">
            On fait le point sur votre visibilité actuelle, et ce qu&apos;on peut gagner.
          </p>
          <button
            onClick={open}
            className="group mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-void-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--grad-visi)", boxShadow: "0 20px 60px -12px rgba(43,201,138,0.5)" }}
          >
            Discuter du projet
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="body-md mt-7 text-[14px] text-text-2">
            La visibilité amène le trafic, le site le transforme en clients.{" "}
            <Link
              href="/creation-site-web"
              className="inline-flex items-center gap-1 text-visi-2 underline decoration-white/20 underline-offset-2 transition-colors hover:text-text-1"
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
