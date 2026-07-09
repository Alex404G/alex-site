"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/components/contact-modal";
import { easings } from "@/lib/utils";

type Theme = "warm" | "visi" | "sig";

const THEMES: Record<
  Theme,
  { gradientText: string; grad: string; shadow: string; ink: string }
> = {
  warm: {
    gradientText: "text-gradient-warm",
    grad: "var(--grad-warm)",
    shadow: "0 20px 60px -12px rgba(255,122,77,0.55)",
    ink: "text-void-0",
  },
  visi: {
    gradientText: "text-gradient-visi",
    grad: "var(--grad-visi)",
    shadow: "0 20px 60px -12px rgba(43,201,138,0.5)",
    ink: "text-void-0",
  },
  sig: {
    gradientText: "text-gradient-sig",
    // Variante bouton assombrie : blanc AA sur tous les stops
    grad: "var(--grad-signature-btn)",
    shadow: "0 20px 60px -12px rgba(139,92,246,0.55)",
    ink: "text-white",
  },
};

/**
 * Hero commun aux trois pages de service : même disposition partout,
 * seul le thème (dégradé) et le contenu changent.
 */
export function PageHero({
  kicker,
  title,
  sub,
  body,
  cta,
  theme,
}: {
  kicker: string;
  title: ReactNode;
  sub: string;
  body: ReactNode;
  cta: string;
  theme: Theme;
}) {
  const { open } = useContactModal();
  const t = THEMES[theme];

  return (
    // Groupe centré sur les deux axes : le bloc kicker→CTA forme une seule
    // masse visuelle, posée au centre de l'écran (pt pour dégager la nav).
    <section className="relative mx-auto flex min-h-[88svh] max-w-5xl flex-col items-center justify-center px-6 pb-14 pt-28 text-center">
      <motion.span
        className="kicker"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easings.outQuart }}
      >
        {kicker}
      </motion.span>
      <motion.h1
        className="t-display mt-5"
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: easings.outQuart, delay: 0.1 }}
      >
        <span className={t.gradientText}>{title}</span>
      </motion.h1>
      <motion.p
        className="t-lede mt-6 mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.3 }}
      >
        {sub}
      </motion.p>
      <motion.p
        className="body-md mt-5 mx-auto max-w-xl text-[15.5px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.45 }}
      >
        {body}
      </motion.p>
      <motion.div
        className="mt-9 flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easings.outQuart, delay: 0.6 }}
      >
        <button
          onClick={open}
          className={`group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${t.ink}`}
          style={{ background: t.grad, boxShadow: t.shadow }}
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </section>
  );
}
