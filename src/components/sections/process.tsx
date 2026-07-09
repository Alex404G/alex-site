"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    n: "01",
    label: "Cadrage",
    duration: "~1 jour",
    body: "On parle de votre activité, de vos clients et de vos objectifs. Je définis le périmètre.",
    rgb: "255, 193, 120",
  },
  {
    n: "02",
    label: "Design",
    duration: "~1 semaine",
    body: "Une maquette sur-mesure, validée ensemble avant la moindre ligne de code.",
    rgb: "255, 154, 77",
  },
  {
    n: "03",
    label: "Mise en ligne",
    duration: "1 à 3 semaines",
    body: "Développement soigné, optimisé pour Google et le mobile, puis publication.",
    rgb: "255, 111, 97",
  },
  {
    n: "04",
    label: "Visibilité & suivi",
    duration: "en continu",
    body: "Fiche Google, SEO local, avis, campagnes — et je reste joignable. Le site est à vous.",
    rgb: "240, 71, 107",
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  // La barre se remplit verticalement au fil du défilement du visiteur.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="processus" className="relative w-full py-32 md:py-40">
      {/* Header sur l'axe commun des sections de l'accueil */}
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="kicker">Processus</span>
          <h2 className="t-h1 mt-3">
            Du cadrage à la <span className="text-gradient-warm">visibilité.</span>
          </h2>
          <p className="body-lg mt-5">
            Un seul interlocuteur : design, développement, mise en ligne, visibilité.
            Vous savez toujours à qui parler, et le site reste le vôtre.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* Timeline verticale — rail qui se remplit au scroll */}
        <div ref={ref} className="relative mt-16">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute left-[7px] top-1 bottom-1 w-0.5 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              style={{ scaleY, transformOrigin: "50% 0%" }}
              className="h-full w-full"
            >
              <div className="h-full w-full" style={{ background: "var(--grad-warm)" }} />
            </motion.div>
          </div>

          <div className="flex flex-col gap-14 md:gap-16">
            {STEPS.map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-18%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 md:pl-14"
              >
                {/* Pastille sur le rail */}
                <span
                  aria-hidden
                  className="absolute left-[8px] top-1.5 -translate-x-1/2"
                >
                  <span
                    className="block h-3.5 w-3.5 rounded-full"
                    style={{
                      background: `rgb(${s.rgb})`,
                      boxShadow: `0 0 0 4px rgba(${s.rgb}, 0.16), 0 0 22px rgba(${s.rgb}, 0.7)`,
                    }}
                  />
                </span>

                <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-text-2">
                  {s.n} · {s.duration}
                </span>
                <h3 className="mt-2 font-display text-xl font-medium leading-tight md:text-2xl">
                  {s.label}
                </h3>
                <p className="body-md mt-2 max-w-md text-[15px]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
