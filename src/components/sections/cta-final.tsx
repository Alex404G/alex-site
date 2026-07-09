"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Copy, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { MeshShader } from "@/components/backgrounds/mesh-shader";

const EMAIL = "marsugil@gmail.com";
const PHONE = "07 67 67 77 42";
const PHONE_HREF = "+33767677742";

export function CtaFinal() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      track("email_copy");
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
        {/* Transition douce depuis le noir : l'aurora commence à poindre
            AVANT le titre, puis s'installe progressivement. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[38vh] min-h-[220px]"
          style={{
            background:
              "linear-gradient(to bottom, var(--void-0) 0%, rgba(2,3,10,0.9) 26%, rgba(2,3,10,0.62) 52%, rgba(2,3,10,0.3) 76%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
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
          en visio, comme vous préférez.
        </motion.p>

        {/* Deux cartes de contact direct — téléphone et mail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-2"
        >
          {/* Téléphone */}
          <a
            href={`tel:${PHONE_HREF}`}
            className="glass group relative flex flex-col items-start gap-3 rounded-2xl p-6 text-left transition-all hover:-translate-y-1"
          >
            <div className="flex w-full items-center justify-between">
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
              <ArrowUpRight className="h-4 w-4 text-text-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-1" />
            </div>
            <span className="kicker">Téléphone</span>
            <span className="font-display text-lg font-bold tracking-tight text-text-1">
              {PHONE}
            </span>
            <span className="text-xs text-text-3">Le plus direct pour en parler</span>
          </a>

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
            <span className="font-mono text-sm text-text-1 break-all">{EMAIL}</span>
            <span className="text-xs text-text-3">
              {copied ? "Copié !" : "Cliquez pour copier · réponse dans la journée"}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
