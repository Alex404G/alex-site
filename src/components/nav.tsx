"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContactModal } from "./contact-modal";

const LINKS = [
  { href: "/creation-site-web", label: "Sites web" },
  { href: "/visibilite-en-ligne", label: "Visibilité" },
  { href: "/automatisations", label: "Automatisations" },
];

export function Nav() {
  const { scrollY } = useScroll();
  // Subtle backdrop appears as you scroll past the hero
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const { open } = useContactModal();
  const pathname = usePathname();
  const onAuto = pathname.startsWith("/automatisations");
  const onVisi = pathname.startsWith("/visibilite");
  const accent = onAuto
    ? "var(--grad-signature)"
    : onVisi
      ? "var(--grad-visi)"
      : "var(--grad-warm)";
  const dotShadow = onAuto
    ? "0 0 10px rgba(139,92,246,0.7)"
    : onVisi
      ? "0 0 10px rgba(43,201,138,0.7)"
      : "0 0 10px rgba(255,122,77,0.7)";

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      {/* Background that fades in on scroll */}
      <motion.div
        aria-hidden
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 border-b border-white/[0.06] bg-void-0/65 backdrop-blur-xl"
      />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        {/* Wordmark → accueil */}
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 font-display text-[18px] font-bold tracking-[-0.02em] text-text-1 transition-colors hover:text-white"
        >
          <span>Alexandre GIL</span>
          <span
            aria-hidden
            className="block h-1.5 w-1.5 translate-y-[-2px] rounded-full transition-transform group-hover:scale-125"
            style={{ background: accent, boxShadow: dotShadow }}
          />
        </Link>

        {/* Liens (pages) */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "rounded-full px-4 py-2 text-sm transition-colors " +
                  (active
                    ? "bg-white/[0.07] text-text-1"
                    : "text-text-2 hover:bg-white/5 hover:text-text-1")
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Contact (modal global) */}
        <button
          onClick={open}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-void-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Contact</span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
        </button>
      </div>
    </motion.header>
  );
}
