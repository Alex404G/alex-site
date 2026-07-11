"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Indice de défilement — un fin trait avec un point d'accent qui descend en
 * boucle, posé en bas du hero pour signaler « la page continue, faites défiler ».
 * Prend la couleur d'accent de la page via var(--accent). Discret et premium.
 * Disparaît naturellement dès qu'on défile (il est ancré au bas du hero).
 */
export function ScrollCue() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-text-3">
        Défiler
      </span>
      <span className="relative block h-10 w-px overflow-hidden rounded-full bg-white/[0.12]">
        <motion.span
          className="absolute inset-x-0 top-0 block h-3.5 rounded-full"
          style={{
            background: "var(--accent, #6E8DFF)",
            boxShadow: "0 0 8px var(--accent-glow, rgba(61,92,255,0.45))",
          }}
          animate={reduce ? { y: 12, opacity: 0.9 } : { y: ["-14px", "40px"] }}
          transition={
            reduce
              ? undefined
              : { duration: 1.7, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }
          }
        />
      </span>
    </motion.div>
  );
}
