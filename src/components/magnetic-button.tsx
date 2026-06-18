"use client";

import { type ReactNode, type CSSProperties, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  /** intensité de l'aimantation, 0 = aucune (défaut 0.3) */
  strength?: number;
};

/**
 * Bouton "magnétique" — il se rapproche légèrement du curseur (ressort), se
 * tend au survol et s'enfonce au clic. Tout est piloté par le visiteur ; rien
 * ne bouge tout seul. Respecte prefers-reduced-motion (aimantation désactivée).
 */
export function MagneticButton({
  children,
  onClick,
  className,
  style,
  strength = 0.3,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y, ...style }}
      whileHover={reduce ? undefined : { scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
