"use client";

import * as React from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
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
      <MotionConfig reducedMotion="user">
        {children}
        <ContactModal />
      </MotionConfig>
    </Ctx.Provider>
  );
}

export function useContactModal() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useContactModal must be used inside ContactModalProvider");
  return ctx;
}

type Status = "idle" | "loading" | "success" | "fallback" | "error";

const EMAIL = "marsugil@gmail.com";
const PHONE = "07 67 67 77 42";
const PHONE_HREF = "+33767677742";

function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [mailtoHref, setMailtoHref] = React.useState<string>(`mailto:${EMAIL}`);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);
  const fallbackRef = React.useRef<HTMLHeadingElement>(null);

  // Gestion du focus clavier : focus initial, piège (trap), restauration à la fermeture
  React.useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = (document.activeElement as HTMLElement) ?? null;
    setStatus("idle");
    setError(null);

    const focusFirst = setTimeout(() => {
      const el = dialogRef.current?.querySelector<HTMLElement>(
        'input:not([tabindex="-1"]),select,textarea,button,a[href]',
      );
      el?.focus();
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]):not([tabindex="-1"]),select:not([disabled]),textarea:not([disabled])',
      );
      const list = Array.from(nodes).filter((el) => el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
      restoreRef.current?.focus?.();
    };
  }, [isOpen]);

  // Donne le focus au message de fin quand il apparaît (annonce lecteur d'écran)
  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "fallback") fallbackRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // mailto pré-rempli — sert de repli si le formulaire n'est pas (encore) actif
    const mailSubject = `Demande via le site — ${data.subject || "Projet"}`;
    const mailBody = [
      `Nom : ${data.name || ""}`,
      data.company ? `Entreprise : ${data.company}` : "",
      data.phone ? `Téléphone : ${data.phone}` : "",
      data.email ? `Email : ${data.email}` : "",
      "",
      data.message || "",
    ]
      .filter(Boolean)
      .join("\n");
    setMailtoHref(
      `mailto:${EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`,
    );

    if (data.website) {
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
      const j = (await r.json().catch(() => ({}))) as { delivered?: boolean };
      if (j.delivered) {
        setStatus("success");
        form.reset();
      } else {
        // Aucun fournisseur d'e-mail configuré côté serveur → repli honnête
        setStatus("fallback");
      }
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="glass-strong relative w-full max-w-[560px] rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow accent (chaud) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,154,77,0.45), transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <button
              onClick={close}
              aria-label="Fermer le formulaire"
              className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-text-2 transition-colors hover:bg-white/5 hover:text-text-1"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <div role="status" aria-live="polite" className="flex flex-col items-center py-8 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full" style={{ background: "var(--grad-warm)" }}>
                  <Check className="h-6 w-6 text-void-0" strokeWidth={3} />
                </div>
                <h3 ref={successRef} tabIndex={-1} className="t-h3 mt-6 text-text-1 outline-none">
                  Message envoyé
                </h3>
                <p className="body-md mt-3 max-w-sm">
                  Je vous réponds dans la journée. Si c&apos;est urgent, par mail direct{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-text-1 underline decoration-white/30 underline-offset-2"
                  >
                    {EMAIL}
                  </a>{" "}
                  ou au{" "}
                  <a
                    href={`tel:${PHONE_HREF}`}
                    className="whitespace-nowrap text-text-1 underline decoration-white/30 underline-offset-2"
                  >
                    {PHONE}
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
            ) : status === "fallback" ? (
              <div role="status" aria-live="polite" className="flex flex-col items-center py-6 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/15">
                  <Mail className="h-6 w-6 text-warm-2" />
                </div>
                <h3 ref={fallbackRef} tabIndex={-1} className="t-h3 mt-6 text-text-1 outline-none">
                  Dernière étape
                </h3>
                <p className="body-md mt-3 max-w-sm">
                  Pour que votre message me parvienne tout de suite, terminez l&apos;envoi
                  depuis votre messagerie — tout est déjà pré-rempli.
                </p>
                <a
                  href={mailtoHref}
                  className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-void-0 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "var(--grad-warm)" }}
                >
                  <Mail className="h-4 w-4" />
                  Terminer par e-mail
                </a>
                <p className="body-md mt-5 text-[14px]">
                  Ou directement{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-text-1 underline decoration-white/30 underline-offset-2"
                  >
                    {EMAIL}
                  </a>{" "}
                  ·{" "}
                  <a
                    href={`tel:${PHONE_HREF}`}
                    className="whitespace-nowrap text-text-1 underline decoration-white/30 underline-offset-2"
                  >
                    {PHONE}
                  </a>
                </p>
                <button
                  onClick={close}
                  className="mt-7 cursor-pointer text-sm text-text-2 transition-colors hover:text-text-1"
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
                  Dites-moi votre activité et ce que vous voulez accomplir en ligne.
                  Je vous réponds dans la journée.
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
                      defaultValue="Site web"
                      required
                      className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-text-1 outline-none transition-colors focus:border-white/25"
                    >
                      <option className="bg-void-2">Site web</option>
                      <option className="bg-void-2">Visibilité en ligne</option>
                      <option className="bg-void-2">Refonte de site</option>
                      <option className="bg-void-2">Automatisation / IA</option>
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
                      placeholder="Votre activité et ce que vous voulez accomplir en ligne, en deux lignes."
                    />
                  </label>

                  {status === "error" && (
                    <p role="alert" className="text-sm text-red-300">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      "group mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all",
                      "text-void-0 hover:scale-[1.01] active:scale-[0.99]",
                      "disabled:opacity-60 disabled:hover:scale-100",
                    )}
                    style={{ background: "var(--grad-warm)" }}
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

                  <p className="text-center text-xs text-text-3">
                    En envoyant ce message, vous acceptez que vos données soient utilisées pour
                    traiter votre demande. Voir la{" "}
                    <a href="/confidentialite" className="text-text-2 underline decoration-white/20 underline-offset-2 hover:text-text-1">
                      politique de confidentialité
                    </a>
                    .
                  </p>

                  <p className="text-center text-xs text-text-3">
                    Ou directement{" "}
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-text-2 underline decoration-white/20 underline-offset-2 hover:text-text-1"
                    >
                      {EMAIL}
                    </a>{" "}
                    ·{" "}
                    <a
                      href={`tel:${PHONE_HREF}`}
                      className="whitespace-nowrap text-text-2 underline decoration-white/20 underline-offset-2 hover:text-text-1"
                    >
                      {PHONE}
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
