"use client";

import { motion } from "framer-motion";
import { MousePointer2, Layers, Gauge } from "lucide-react";

const CARDS = [
  {
    icon: MousePointer2,
    title: "Animation scroll-driven",
    hook: "Le scroll est devenu un média.",
    body: "Chaque scène réagit à ta lecture. Pas de gimmicks, pas d'effets pour montrer qu'on sait — juste ce qui sert le sens.",
    rgb: "61, 92, 255",
  },
  {
    icon: Layers,
    title: "Glassmorphisme & profondeur",
    hook: "Chaque pixel a une couche.",
    body: "Cinq plans de profondeur jouent ensemble : ambiance, mouvements lents, contenu net, grain. Comme un décor de cinéma.",
    rgb: "139, 92, 246",
  },
  {
    icon: Gauge,
    title: "Performance & accessibilité",
    hook: "Aussi rapide qu'élégant.",
    body: "Lighthouse 95+ partout. Compatible lecteurs d'écran, sensible à prefers-reduced-motion. Le beau n'a aucune excuse à être lent.",
    rgb: "184, 69, 232",
  },
];

export function ConceptionSection() {
  return (
    <section id="conception" className="relative w-full py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="kicker">03 / Conception de sites</span>
          <h2 className="t-h1 mt-3">
            <span className="text-gradient-sig">Ce site est la démo.</span>
          </h2>
          <p className="body-lg mt-5 max-w-xl">
            Tu fais défiler depuis tout à l'heure. Chaque détail t'a déjà
            répondu. Sites vitrines, e-commerce, dashboards, apps métier,
            landing campagnes — tout est sur-mesure, tout reste à toi.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass relative overflow-hidden rounded-3xl p-7"
                style={{
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px -25px rgba(${c.rgb}, 0.45)`,
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50"
                  style={{
                    background: `radial-gradient(closest-side, rgba(${c.rgb}, 0.4), transparent 70%)`,
                    filter: "blur(24px)",
                  }}
                />

                <div
                  className="grid h-11 w-11 place-items-center rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, rgba(${c.rgb}, 0.35), rgba(${c.rgb}, 0.1))`,
                    border: `1px solid rgba(${c.rgb}, 0.3)`,
                  }}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                </div>

                <h3 className="mt-6 font-display text-xl font-medium leading-tight">
                  {c.title}
                </h3>
                <p
                  className="mt-2 text-[17px] font-medium italic text-text-1"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  “{c.hook}”
                </p>
                <p className="body-md mt-4 text-[14.5px]">{c.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Lighthouse badge row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {["Performance", "Accessibilité", "Best practices", "SEO"].map((label) => (
            <div
              key={label}
              className="glass flex items-center gap-3 rounded-full px-5 py-2.5"
            >
              <span
                className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-void-0"
                style={{ background: "var(--grad-signature)" }}
              >
                95+
              </span>
              <span className="text-sm font-medium text-text-1">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
