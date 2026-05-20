"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useContactModal } from "./contact-modal";

export function Nav() {
  const { scrollY } = useScroll();
  // Subtle backdrop appears as you scroll past the hero
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const { open } = useContactModal();

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
        {/* Wordmark — direct, no pill */}
        <a
          href="#hero"
          className="group inline-flex items-baseline gap-2 font-display text-[18px] font-bold tracking-[-0.02em] text-text-1 transition-colors hover:text-white"
        >
          <span>Alex Gil</span>
          <span
            aria-hidden
            className="block h-1.5 w-1.5 translate-y-[-2px] rounded-full transition-transform group-hover:scale-125"
            style={{
              background: "var(--grad-signature)",
              boxShadow: "0 0 10px rgba(139,92,246,0.7)",
            }}
          />
        </a>

        {/* Center nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: "#agents", label: "Agents" },
            { href: "#benefices", label: "Bénéfices" },
            { href: "#processus", label: "Processus" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-text-2 transition-colors hover:bg-white/5 hover:text-text-1"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Contact button */}
        <button
          onClick={open}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-void-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Contact</span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--grad-signature)" }}
          />
        </button>
      </div>
    </motion.header>
  );
}
