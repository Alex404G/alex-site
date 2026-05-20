"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    n: "01",
    label: "Conversation",
    duration: "~1 jour",
    body: "On parle métier. Tu décris la douleur, je propose le scope.",
    rgb: "61, 92, 255",
  },
  {
    n: "02",
    label: "Cadrage",
    duration: "~3 jours",
    body: "Un doc clair : ce qu'on fait, ce qu'on ne fait pas, le délai, le prix.",
    rgb: "91, 107, 255",
  },
  {
    n: "03",
    label: "Construction",
    duration: "1 à 6 semaines",
    body: "Tu vois l'avancée en continu. Démos régulières. Pas de boîte noire.",
    rgb: "139, 92, 246",
  },
  {
    n: "04",
    label: "Livraison & suivi",
    duration: "30 jours inclus",
    body: "Le code te revient. Je reste joignable pour les ajustements et l'évolution.",
    rgb: "184, 69, 232",
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="processus" ref={ref} className="relative w-full py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="kicker">04 / Processus</span>
          <h2 className="t-h1 mt-3">
            D'une semaine à huit.{" "}
            <span className="text-gradient-sig">Pas plus.</span>
          </h2>
          <p className="body-lg mt-5 max-w-xl">
            Un seul interlocuteur — conception, code, déploiement, support. Tu
            sais à qui parler, et l'outil reste à toi.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Track */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 h-px overflow-hidden bg-white/8"
          >
            <motion.div
              style={{ scaleX, transformOrigin: "0% 50%" }}
              className="h-full w-full"
            >
              <div
                className="h-full w-full"
                style={{ background: "var(--grad-signature)" }}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  aria-hidden
                  className="relative z-10 mx-auto h-3.5 w-3.5 rounded-full"
                  style={{
                    background: `rgb(${s.rgb})`,
                    boxShadow: `0 0 0 4px rgba(${s.rgb}, 0.18), 0 0 24px rgba(${s.rgb}, 0.7)`,
                  }}
                />

                <div className="mt-6 text-center md:text-left">
                  <span
                    className="font-mono text-xs font-medium tracking-[0.18em] text-text-2"
                  >
                    {s.n} · {s.duration}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-medium leading-tight">
                    {s.label}
                  </h3>
                  <p className="body-md mt-2 text-[14.5px]">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
