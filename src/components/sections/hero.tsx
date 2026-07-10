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
  { href: "/creation-site-web", label: "Sites web", short: "Sites web", grad: "var(--grad-warm)" },
  { href: "/visibilite-en-ligne", label: "Visibilité en ligne", short: "Visibilité", grad: "var(--grad-visi)" },
  { href: "/automatisations", label: "Automatisations & IA", short: "Automatisations", grad: "var(--grad-signature)" },
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
  // Titre : version courte sur mobile (tient à 40px sur 2 lignes propres),
  // version longue dès sm — le desktop ne change pas.
  const lines: { mobile: string; desktop: string; cls: string }[] = [
    { mobile: "Une présence", desktop: "Une présence en ligne", cls: "text-text-1" },
    { mobile: "qui travaille.", desktop: "qui travaille pour vous.", cls: "text-gradient-brand" },
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
        className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-24 text-center sm:pt-24"
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
        <h1 className="t-display mt-4 !text-[clamp(40px,5.2vw,84px)] sm:mt-5">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="block md:whitespace-nowrap"
              initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: easings.outQuart, delay: 0.25 + i * 0.14 }}
            >
              <span className={line.cls}>
                <span className="sm:hidden">{line.mobile}</span>
                <span className="hidden sm:inline">{line.desktop}</span>
              </span>
            </motion.span>
          ))}
        </h1>

        {/* Sous-titre — une ligne de bénéfice concret */}
        <motion.p
          className="t-lede mt-4 max-w-3xl sm:mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.65 }}
        >
          Plus de clients, mieux placé sur Google, du temps gagné.
        </motion.p>

        {/* Corps — coupé sur mobile (les 3 pastilles portent déjà l'offre),
            conservé dès sm pour le desktop et le SEO. */}
        <motion.p
          className="body-md mt-5 hidden max-w-2xl text-[13.5px] leading-relaxed sm:block sm:text-[15px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.85 }}
        >
          Sites web sur-mesure, visibilité en ligne (SEO local, avis, Google &amp; Meta Ads)
          et automatisations IA : je construis ce qui fait grandir votre activité.
        </motion.p>

        {/* CTAs — côte à côte dès le mobile (taille réduite pour tenir sur une ligne) */}
        <motion.div
          className="mt-8 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:mt-9 sm:gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 1.1 }}
        >
          <MagneticButton
            onClick={open}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3.5 text-[13px] font-medium text-white sm:px-6 sm:text-sm"
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
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-3.5 text-[13px] font-medium text-text-1 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.06] sm:px-6 sm:text-sm"
          >
            <span className="sm:hidden">Les offres</span>
            <span className="hidden sm:inline">Voir les offres</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* Les trois offres, chacune sous sa couleur */}
        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:mt-10 sm:gap-x-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 1.25 }}
        >
          {OFFERS.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="group inline-flex items-center gap-1.5 py-1 text-[13px] text-text-2 transition-colors hover:text-text-1 sm:gap-2 sm:text-sm"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-125"
                style={{ background: o.grad }}
              />
              <span className="sm:hidden">{o.short}</span>
              <span className="hidden sm:inline">{o.label}</span>
            </Link>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
