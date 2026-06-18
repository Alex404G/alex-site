"use client";

import { motion } from "framer-motion";
import { Utensils, HardHat, Camera, Scale, Store, Leaf } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { useContactModal } from "@/components/contact-modal";
import { easings } from "@/lib/utils";

const SECTORS = [
  { icon: Utensils, title: "Restaurants & cafés", line: "Carte, réservation, avis Google — donner faim avant la première bouchée." },
  { icon: HardHat, title: "Artisans & BTP", line: "Réalisations en photos, devis en un clic, confiance immédiate." },
  { icon: Camera, title: "Photographes & créatifs", line: "Un portfolio qui met le travail en valeur et déclenche la prise de contact." },
  { icon: Scale, title: "Professions libérales", line: "Sérieux, clarté, prise de rendez-vous — pour avocats, santé, conseil." },
  { icon: Store, title: "Commerces & boutiques", line: "Être trouvé en local, afficher horaires et nouveautés, attirer en boutique." },
  { icon: Leaf, title: "Coachs & bien-être", line: "Une présence qui inspire confiance et remplit l'agenda." },
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
          Chaque activité a ses codes. Voici les terrains où j&apos;interviens — votre projet
          restera unique.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: easings.outQuart, delay: (i % 3) * 0.08 }}
            >
              <SpotlightCard glow="warm" className="h-full">
                <div className="p-7">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-void-0"
                    style={{ background: "var(--grad-warm)" }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="t-h3 mt-5 text-text-1">{s.title}</h3>
                  <p className="body-md mt-2 text-[15px]">{s.line}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
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
        </button>{" "}
        — je vous montre des projets adaptés à votre secteur.
      </motion.p>
    </section>
  );
}
