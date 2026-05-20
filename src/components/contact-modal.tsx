"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, Check, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type ContactCtx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = React.createContext<ContactCtx | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <Ctx.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactModal />
    </Ctx.Provider>
  );
}

export function useContactModal() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useContactModal must be used inside ContactModalProvider");
  return ctx;
}

type Status = "idle" | "loading" | "success" | "error";

function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (data.website) {
      // honeypot
      setStatus("success");
      return;
    }

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || "Erreur d'envoi");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Fermer"
            onClick={close}
            className="absolute inset-0 cursor-default bg-void-0/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="glass-strong relative w-full max-w-[560px] rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(139,92,246,0.5), transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <button
              onClick={close}
              aria-label="Fermer le formulaire"
              className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full text-text-2 transition-colors hover:bg-white/5 hover:text-text-1"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full" style={{ background: "var(--grad-signature)" }}>
                  <Check className="h-6 w-6 text-white" strokeWidth={3} />
                </div>
                <h3 className="t-h3 mt-6 text-text-1">Message envoyé</h3>
                <p className="body-md mt-3 max-w-sm">
                  Je te réponds dans la journée. Si c'est urgent, par mail direct :{" "}
                  <a
                    href="mailto:alexandre.gil@california.fr"
                    className="text-text-1 underline decoration-white/30 underline-offset-2"
                  >
                    alexandre.gil@california.fr
                  </a>
                  .
                </p>
                <button
                  onClick={close}
                  className="mt-8 cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-medium text-void-0"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <span className="kicker">Discuter du projet</span>
                <h3 id="contact-title" className="t-h2 mt-2 text-text-1">
                  On en parle ?
                </h3>
                <p className="body-md mt-3">
                  Dis-moi en deux lignes ce que tu veux automatiser ou créer. Je te
                  reviens dans la journée.
                </p>

                <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden
                  />

                  <Field label="Nom" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Entreprise" name="company" />
                    <Field label="Téléphone" name="phone" type="tel" />
                  </div>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="text-text-2">Sujet</span>
                    <select
                      name="subject"
                      defaultValue="Agent IA"
                      required
                      className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-text-1 outline-none transition-colors focus:border-white/25"
                    >
                      <option className="bg-void-2">Agent IA</option>
                      <option className="bg-void-2">Site web</option>
                      <option className="bg-void-2">Dashboard</option>
                      <option className="bg-void-2">Automatisation</option>
                      <option className="bg-void-2">Outil interne</option>
                      <option className="bg-void-2">Autre</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="text-text-2">Message</span>
                    <textarea
                      name="message"
                      required
                      maxLength={1000}
                      rows={4}
                      className="resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-text-1 outline-none transition-colors focus:border-white/25"
                      placeholder="Ce que tu cherches à faire, en deux lignes."
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-red-300">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      "group mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all",
                      "bg-white text-void-0 hover:scale-[1.01] active:scale-[0.99]",
                      "disabled:opacity-60 disabled:hover:scale-100",
                    )}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Envoi…
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Envoyer
                      </>
                    )}
                  </button>

                  <p className="mt-1 text-center text-xs text-text-3">
                    Tu peux aussi écrire à{" "}
                    <a
                      href="mailto:alexandre.gil@california.fr"
                      className="text-text-2 underline decoration-white/20 underline-offset-2 hover:text-text-1"
                    >
                      alexandre.gil@california.fr
                    </a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-text-2">
        {label}
        {required && <span className="ml-1 text-text-3">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-text-1 outline-none transition-colors placeholder:text-text-3 focus:border-white/25"
      />
    </label>
  );
}
