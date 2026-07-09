"use client";

import { motion } from "framer-motion";
import { useContactModal } from "@/components/contact-modal";
import { easings } from "@/lib/utils";

// Liste éditoriale (pas de cartes) : index mono, métier en display,
// promesse en regard. Une grammaire propre à cette section.
const SECTORS = [
  { title: "Restaurants & cafés", line: "Carte, réservation, avis Google : donner faim avant la première bouchée." },
  { title: "Artisans & BTP", line: "Réalisations en photos, devis en un clic, confiance immédiate." },
  { title: "Photographes & créatifs", line: "Un portfolio qui met le travail en valeur et déclenche la prise de contact." },
  { title: "Professions libérales", line: "Sérieux, clarté, prise de rendez-vous : avocats, santé, conseil." },
  { title: "Commerces & boutiques", line: "Être trouvé en local, afficher horaires et nouveautés, attirer en boutique." },
  { title: "Coachs & bien-être", line: "Une présence qui inspire confiance et remplit l'agenda." },
];

export function RealisationsSection() {
  const { open } = useContactModal();

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: easings.outQuart }}
        className="max-w-2xl"
      >
        <span className="kicker">Pour qui</span>
        <h2 className="t-h1 mt-4 text-text-1">
          Un site pensé pour <span className="text-gradient-warm">votre métier.</span>
        </h2>
        <p className="body-lg mt-5">
          Chaque activité a ses codes. Voici les terrains où j&apos;interviens, et votre
          projet restera unique.
        </p>
      </motion.div>

      <div className="mt-14 border-t border-white/[0.07]">
        {SECTORS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: easings.outQuart, delay: i * 0.05 }}
            className="group flex items-baseline gap-5 border-b border-white/[0.07] py-6 transition-all duration-300 hover:pl-3 md:gap-8 md:py-7"
          >
            <span className="kicker w-8 shrink-0 text-warm-2/80">
              0{i + 1}
            </span>
            <div className="flex flex-1 flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-text-1 transition-colors group-hover:text-white md:text-2xl">
                {s.title}
              </h3>
              <p className="body-md max-w-md text-[15px] md:text-right">{s.line}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="body-md mt-10 text-[15px]"
      >
        Vous voulez voir des exemples concrets ?{" "}
        <button onClick={open} className="cursor-pointer text-warm-2 underline-offset-4 hover:underline">
          Demandez-les en message
        </button>
        , je vous montre des projets adaptés à votre secteur.
      </motion.p>
    </section>
  );
}
