"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContactModal } from "@/components/contact-modal";
import { MagneticButton } from "@/components/magnetic-button";
import { ArrowDown } from "lucide-react";
import { easings } from "@/lib/utils";

export function Hero() {
  const { open } = useContactModal();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallaxe de profondeur — la scène vit quand on défile
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const lines = [
    ["Votre", "site,"],
    ["votre", "visibilité."],
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Fond chaud + parallaxe */}
      <div className="absolute inset-0 -z-10">
        <motion.div aria-hidden style={{ y: glowY }} className="absolute inset-0">
          <div className="warm-bloom absolute inset-0" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ y: gridY }}
          className="bg-grid absolute inset-0 opacity-[0.35]"
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
        className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center"
      >
        {/* Headline — dégradé chaud */}
        <h1 className="t-display">
          {lines.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((word, i) => {
                const idx = lineIdx * 4 + i;
                return (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 1,
                      ease: easings.outQuart,
                      delay: 0.25 + idx * 0.09,
                    }}
                  >
                    <span className="text-gradient-warm">{word}</span>
                    {i < line.length - 1 && <span>&nbsp;</span>}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Sous-titre */}
        <motion.p
          className="t-h2 mt-8 max-w-3xl text-text-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.7 }}
        >
          Plus de clients. Mieux trouvé sur Google. Une image à la hauteur.
        </motion.p>

        {/* Corps */}
        <motion.p
          className="body-md mt-8 max-w-xl text-[15.5px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.9 }}
        >
          Je conçois votre site sur-mesure — rapide, moderne, pensé pour convertir —
          et je vous rends <em className="not-italic text-text-1">visible en ligne</em> :
          SEO local, avis Google, fiche Google Business, Google &amp; Meta Ads.
          Les automatisations et l&apos;IA, en bonus.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 1.1 }}
        >
          <MagneticButton
            onClick={open}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-void-0"
            style={{
              background: "var(--grad-warm)",
              boxShadow: "0 20px 60px -12px rgba(255,122,77,0.55)",
            }}
          >
            Discuter du projet
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-void-0/70" />
          </MagneticButton>
          <a
            href="#offres"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-text-1 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.06]"
          >
            Voir les offres
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        style={{ opacity: contentOpacity }}
      >
        <span className="kicker text-[10px]">scroll</span>
        <span className="pulse-line block h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
