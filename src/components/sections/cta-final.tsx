"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageSquarePlus, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useContactModal } from "@/components/contact-modal";
import { MeshShader } from "@/components/backgrounds/mesh-shader";

const EMAIL = "alexandre.gil@california.fr";

export function CtaFinal() {
  const { open } = useContactModal();
  const [copied, setCopied] = useState(false);
  const [phoneReveal, setPhoneReveal] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <section className="relative isolate w-full overflow-hidden py-32 md:py-40">
      {/* Bottom shader */}
      <div className="absolute inset-0 -z-10">
        <MeshShader
          className="relative h-full w-full"
          speed={0.18}
          colors={["#02030A", "#5B6BFF", "#8B5CF6", "#B845E8", "#3D5CFF"]}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(2,3,10,0.55) 60%, rgba(2,3,10,0.95) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background: "linear-gradient(to bottom, var(--void-0), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="t-display"
        >
          <span className="text-gradient-sig">On en parle ?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="body-lg mt-8 max-w-2xl mx-auto"
        >
          RDV physique possible dans le sud de la France. Sinon, par écrit ou
          en visio — comme tu veux.
        </motion.p>

        {/* Three contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 grid gap-4 sm:grid-cols-3"
        >
          {/* Mail */}
          <button
            type="button"
            onClick={copyEmail}
            className="glass group relative flex cursor-pointer flex-col items-start gap-3 rounded-2xl p-6 text-left transition-all hover:-translate-y-1"
          >
            <div className="flex w-full items-center justify-between">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(61,92,255,0.35), rgba(61,92,255,0.1))",
                  border: "1px solid rgba(61,92,255,0.3)",
                }}
              >
                <Mail className="h-4 w-4 text-white" strokeWidth={1.75} />
              </div>
              <span className="text-text-3 transition-colors group-hover:text-text-1">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </span>
            </div>
            <span className="kicker">Mail</span>
            <span className="font-mono text-sm text-text-1 break-all">
              {EMAIL}
            </span>
            <span className="text-xs text-text-3">
              {copied ? "Copié !" : "Clique pour copier"}
            </span>
          </button>

          {/* Phone (reveal-on-click anti-scrape) */}
          <button
            type="button"
            onClick={() => setPhoneReveal(true)}
            className="glass group relative flex cursor-pointer flex-col items-start gap-3 rounded-2xl p-6 text-left transition-all hover:-translate-y-1"
            disabled={phoneReveal}
          >
            <div
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(139,92,246,0.1))",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <Phone className="h-4 w-4 text-white" strokeWidth={1.75} />
            </div>
            <span className="kicker">Téléphone</span>
            <span className="font-mono text-sm text-text-1">
              {phoneReveal ? (
                <a
                  href="tel:+33000000000"
                  className="underline decoration-white/30 underline-offset-2"
                >
                  +33 ● ● ● ● ●
                </a>
              ) : (
                "+33 ● ● ● ● ●"
              )}
            </span>
            <span className="text-xs text-text-3">
              {phoneReveal
                ? "Numéro communiqué en RDV ou par mail"
                : "Clique pour afficher"}
            </span>
          </button>

          {/* Form */}
          <button
            type="button"
            onClick={open}
            className="group relative flex cursor-pointer flex-col items-start gap-3 overflow-hidden rounded-2xl p-6 text-left transition-all hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(135deg, rgba(184,69,232,0.18), rgba(91,107,255,0.12))",
              border: "1px solid rgba(184,69,232,0.35)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 70px -25px rgba(184,69,232,0.55)",
            }}
          >
            <div
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(184,69,232,0.55), rgba(184,69,232,0.2))",
                border: "1px solid rgba(184,69,232,0.45)",
              }}
            >
              <MessageSquarePlus className="h-4 w-4 text-white" strokeWidth={1.75} />
            </div>
            <span className="kicker">Formulaire</span>
            <span className="font-display text-base font-medium text-text-1">
              Envoyer un message →
            </span>
            <span className="text-xs text-text-3">
              Réponse dans la journée
            </span>
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-text-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-bold tracking-[-0.02em] text-text-1">
              Alex Gil
            </span>
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--grad-signature)",
                boxShadow: "0 0 10px rgba(139,92,246,0.7)",
              }}
            />
            <span className="hidden md:inline">·</span>
            <span>Auto-entrepreneur · Languedoc, France</span>
          </div>
          <span>© {new Date().getFullYear()} · Tous droits réservés.</span>
        </div>
      </footer>
    </section>
  );
}
