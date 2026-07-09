"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** teinte de la lueur : chaud (défaut), émeraude ou signature violette */
  glow?: "warm" | "visi" | "sig";
};

const GLOWS = {
  warm: { ring: "rgba(255,154,77,0.45)", halo: "rgba(255,122,77,0.16)" },
  visi: { ring: "rgba(95,227,161,0.45)", halo: "rgba(43,201,138,0.15)" },
  sig: { ring: "rgba(139,92,246,0.45)", halo: "rgba(139,92,246,0.16)" },
} as const;

/**
 * Carte "vivante" — élévation à ressort + bord lumineux + halo doux au survol.
 * Pas de suivi du curseur (pas de halo qui colle au pointeur). Tout est en
 * réponse au visiteur (hover), aucune boucle autonome.
 */
export function SpotlightCard({ children, className = "", glow = "warm" }: Props) {
  const { ring, halo } = GLOWS[glow];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={
        "group/sc relative overflow-hidden rounded-3xl border border-white/[0.08] " +
        "bg-gradient-to-b from-white/[0.045] to-white/[0.015] " +
        "shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_24px_50px_-30px_rgba(0,0,0,0.8)] " +
        "transition-shadow duration-300 " +
        className
      }
    >
      {/* Liseré lumineux en tête de carte au survol */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover/sc:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${ring}, transparent)` }}
      />
      {/* Halo doux par le haut (fixe, pas lié au curseur) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/sc:opacity-100"
        style={{ background: `radial-gradient(120% 55% at 50% 0%, ${halo}, transparent 60%)` }}
      />
      {/* Bord lumineux au survol */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/sc:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${ring}` }}
      />
      {children}
    </motion.div>
  );
}
