"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useContactModal } from "@/components/contact-modal";
import { MagneticButton } from "@/components/magnetic-button";
import { ArrowDown } from "lucide-react";
import { easings } from "@/lib/utils";

// Les trois prestations, chacune avec sa pastille de thème — le hero vend
// l'ensemble, les pages détaillent.
const OFFERS = [
  { href: "/creation-site-web", label: "Sites web", grad: "var(--grad-warm)" },
  { href: "/visibilite-en-ligne", label: "Visibilité en ligne", grad: "var(--grad-visi)" },
  { href: "/automatisations", label: "Automatisations & IA", grad: "var(--grad-signature)" },
];

export function Hero() {
  const { open } = useContactModal();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallaxe de profondeur — la scène vit quand on défile
  // (neutralisée si l'utilisateur préfère réduire les animations)
  const glowYRaw = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const gridYRaw = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentYRaw = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowY = reduce ? 0 : glowYRaw;
  const gridY = reduce ? 0 : gridYRaw;
  const contentY = reduce ? 0 : contentYRaw;
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Titre généraliste : la home vend les trois offres, pas seulement le site.
  // Ligne 1 neutre, ligne 2 en argent (le thème « brand » de l'accueil —
  // les couleurs n'appartiennent qu'aux offres).
  const lines: { text: string; cls: string }[] = [
    { text: "Une présence en ligne", cls: "text-text-1" },
    { text: "qui travaille pour vous.", cls: "text-gradient-brand" },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Fond neutre + parallaxe */}
      <div className="absolute inset-0 -z-10">
        <motion.div aria-hidden style={{ y: glowY }} className="absolute inset-0">
          <div className="brand-bloom absolute inset-0" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ y: gridY }}
          className="bg-grid absolute inset-0 opacity-[0.35]"
        />
        {/* Échos discrets des deux autres thèmes — le hero représente les 3 offres */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 26% 22% at 10% 78%, rgba(43,201,138,0.07), transparent 70%), radial-gradient(ellipse 26% 22% at 90% 18%, rgba(139,92,246,0.08), transparent 70%)",
          }}
        />
        {/* Vignettage central pour la lisibilité du titre */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 72% 60% at 50% 46%, transparent 32%, rgba(2,3,10,0.55) 72%, rgba(2,3,10,0.85) 100%)",
          }}
        />
        {/* Fondu vers la section suivante */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-56"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(2,3,10,0.6) 55%, var(--void-0) 100%)",
          }}
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-24 text-center"
      >
        {/* Kicker — pour qui */}
        <motion.span
          className="kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easings.outQuart, delay: 0.15 }}
        >
          Pour artisans, commerces &amp; TPE
        </motion.span>

        {/* Headline — ligne 1 neutre, ligne 2 tri-thème. Taille calée pour
            qu'aucune des deux lignes ne se replie en desktop. */}
        <h1 className="t-display mt-5 !text-[clamp(27px,6.2vw,84px)]">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="block md:whitespace-nowrap"
              initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: easings.outQuart, delay: 0.25 + i * 0.14 }}
            >
              <span className={line.cls}>{line.text}</span>
            </motion.span>
          ))}
        </h1>

        {/* Sous-titre — une ligne */}
        <motion.p
          className="t-lede mt-6 max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.65 }}
        >
          Plus de clients, une meilleure place sur Google, et du temps gagné.
        </motion.p>

        {/* Corps — les trois prestations en une phrase, deux lignes max */}
        <motion.p
          className="body-md mt-5 max-w-2xl text-[13.5px] leading-relaxed sm:text-[15px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.85 }}
        >
          Sites web sur-mesure, visibilité en ligne (SEO local, avis, Google &amp; Meta Ads)
          et automatisations IA : je construis ce qui fait grandir votre activité.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 1.1 }}
        >
          <MagneticButton
            onClick={open}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
            style={{
              background: "var(--grad-brand-btn)",
              boxShadow: "0 20px 60px -12px rgba(61,92,255,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            Discuter du projet
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/70" />
          </MagneticButton>
          <a
            href="#offres"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-text-1 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.06]"
          >
            Voir les offres
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* Les trois offres, chacune sous sa couleur */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 1.25 }}
        >
          {OFFERS.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="group inline-flex items-center gap-2 py-1 text-sm text-text-2 transition-colors hover:text-text-1"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125"
                style={{ background: o.grad }}
              />
              {o.label}
            </Link>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
