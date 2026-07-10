"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useContactModal } from "./contact-modal";

const LINKS = [
  { href: "/creation-site-web", label: "Sites web", grad: "var(--grad-warm)" },
  { href: "/visibilite-en-ligne", label: "Visibilité", grad: "var(--grad-visi)" },
  { href: "/automatisations", label: "Automatisations", grad: "var(--grad-signature)" },
];

export function Nav() {
  const { scrollY } = useScroll();
  // Subtle backdrop appears as you scroll past the hero
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const { open } = useContactModal();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const onAuto = pathname.startsWith("/automatisations");
  const onVisi = pathname.startsWith("/visibilite");
  const onCrea = pathname.startsWith("/creation");
  const accent = onAuto
    ? "var(--grad-signature)"
    : onVisi
      ? "var(--grad-visi)"
      : onCrea
        ? "var(--grad-warm)"
        : "var(--grad-brand)";
  const dotShadow = onAuto
    ? "0 0 10px rgba(139,92,246,0.7)"
    : onVisi
      ? "0 0 10px rgba(43,201,138,0.7)"
      : onCrea
        ? "0 0 10px rgba(255,122,77,0.7)"
        : "0 0 10px rgba(61,92,255,0.8)";

  // Le menu mobile se ferme à la navigation, sur Échap, et verrouille le scroll
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8 md:py-5">
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

        {/* Liens (pages) — desktop */}
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

        <div className="flex items-center gap-2.5">
          {/* Contact (modal global) — cible tactile 44px */}
          <button
            onClick={open}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium leading-none text-void-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Contact</span>
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
            />
          </button>

          {/* Menu mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/[0.04] text-text-1 transition-colors hover:border-white/25 md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Overlay de navigation mobile — plein écran, dans la DA void */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[95] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 cursor-default bg-void-0/90 backdrop-blur-2xl"
            />
            <motion.nav
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="relative flex h-full flex-col justify-center gap-1 px-8"
              initial={{ y: 14 }}
              animate={{ y: 0 }}
              exit={{ y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="absolute right-6 top-5 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/10 text-text-2 transition-colors hover:text-text-1"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="kicker mb-6">Menu</span>
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    className="group flex items-center gap-4 py-4 font-display text-4xl font-bold tracking-[-0.03em] text-text-1"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125"
                      style={{ background: l.grad }}
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="mt-8"
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    open();
                  }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-void-0"
                >
                  Contact
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                </button>
                <p className="body-md mt-6 text-[14px]">
                  07 67 67 77 42 · contact@alexandregil.com
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
