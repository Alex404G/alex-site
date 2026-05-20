"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useContactModal } from "./contact-modal";

export function Nav() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);
  const { open } = useContactModal();

  return (
    <motion.header
      className="fixed inset-x-0 top-4 z-50 px-4 md:px-8"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <motion.div
        style={{ opacity }}
        className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3"
      >
        <a href="#hero" className="flex items-center gap-2 group">
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-full"
            style={{ background: "var(--grad-signature)" }}
          >
            <span className="font-display text-xs font-black text-white">A</span>
          </span>
          <span className="font-display text-sm font-medium tracking-tight">
            Alex Gil
          </span>
        </a>

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
      </motion.div>
    </motion.header>
  );
}
