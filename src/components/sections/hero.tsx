"use client";

import { motion } from "framer-motion";
import { MeshShader } from "@/components/backgrounds/mesh-shader";
import { useContactModal } from "@/components/contact-modal";
import { ArrowDown } from "lucide-react";
import { easings } from "@/lib/utils";

export function Hero() {
  const { open } = useContactModal();

  const lines = [
    ["Sur-mesure"],
    ["à", "200", "%."],
  ];

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Background shader */}
      <div className="absolute inset-0 -z-10">
        <MeshShader className="relative h-full w-full" />

        {/* Central darkening — keeps bloom at edges, reads the title */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(2,3,10,0.78) 0%, rgba(2,3,10,0.55) 35%, rgba(2,3,10,0.18) 70%, transparent 100%)",
          }}
        />

        {/* Soft horizontal void band behind the title block */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[58%]"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(2,3,10,0.55) 0%, transparent 75%)",
            filter: "blur(20px)",
          }}
        />

        {/* Bottom blend into next section */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-56"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(2,3,10,0.6) 50%, var(--void-0) 100%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easings.outQuart, delay: 0.5 }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-white"
              style={{ boxShadow: "0 0 10px 2px rgba(255,255,255,0.7)" }}
            />
            <span className="kicker">Alex Gil · Ingénieur IA indépendant</span>
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="t-display mt-8">
          {lines.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((word, i) => {
                const idx = lineIdx * 4 + i;
                return (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 1,
                      ease: easings.outQuart,
                      delay: 0.7 + idx * 0.09,
                    }}
                  >
                    <span className="text-gradient-sig">{word}</span>
                    {i < line.length - 1 && <span>&nbsp;</span>}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="t-h2 mt-8 max-w-3xl text-text-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 1.2 }}
        >
          Plus de temps. Plus d'argent. Plus de clients.
        </motion.p>

        {/* Body */}
        <motion.p
          className="body-md mt-8 max-w-xl text-[15.5px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 1.4 }}
        >
          Logiciels internes, assistants IA, sites, dashboards, automatisations —
          chaque outil est conçu <em className="not-italic text-text-1">exclusivement</em> sur ton métier,
          tes données, ton vocabulaire. Pas un SaaS générique plié sur tes process. L'inverse.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.outQuart, delay: 1.6 }}
        >
          <button
            onClick={open}
            className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-void-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px -10px rgba(139,92,246,0.55)",
            }}
          >
            Discuter du projet
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--grad-signature)" }}
            />
          </button>
          <a
            href="#agents"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-text-1 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.06]"
          >
            Voir les capacités
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="kicker text-[10px]">scroll</span>
        <span className="pulse-line block h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
