"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/components/contact-modal";
import { MagneticButton } from "@/components/magnetic-button";
import { easings } from "@/lib/utils";

export function CtaWarm() {
  const { open } = useContactModal();

  return (
    <section className="relative mx-auto max-w-4xl px-6 pb-36 pt-10 text-center md:pb-44">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: easings.outQuart }}
        className="glow-warm relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-12 md:p-16"
      >
        <div
          aria-hidden
          className="warm-bloom pointer-events-none absolute inset-0 opacity-70"
        />
        <div className="relative">
          <span className="kicker">On en parle ?</span>
          <h2 className="t-h1 mt-4 text-text-1">
            Votre site et votre visibilité,{" "}
            <span className="text-gradient-warm">ensemble.</span>
          </h2>
          <p className="body-lg mt-5 mx-auto max-w-xl">
            Dites-moi votre activité et votre objectif. Je reviens vers vous avec une
            première idée concrète.
          </p>
          <MagneticButton
            onClick={open}
            className="group mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-void-0"
            style={{
              background: "var(--grad-warm)",
              boxShadow: "0 20px 60px -12px rgba(255,122,77,0.55)",
            }}
          >
            Discuter du projet
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
