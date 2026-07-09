"use client";

import * as React from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { X, Check, Mail, Phone, Copy, ArrowUpRight } from "lucide-react";
import { track } from "@vercel/analytics";

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

const EMAIL = "marsugil@gmail.com";
const PHONE = "07 67 67 77 42";
const PHONE_HREF = "+33767677742";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Projet — site / visibilité")}`;

/**
 * Contact direct — un appel ou un mail, sans formulaire intermédiaire.
 * Le numéro et l'adresse sont cliquables ; l'adresse se copie en un clic.
 */
function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [copied, setCopied] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);

  // Gestion du focus clavier : focus initial, piège (trap), restauration à la fermeture
  React.useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = (document.activeElement as HTMLElement) ?? null;
    setCopied(false);

    const focusFirst = setTimeout(() => {
      const el = dialogRef.current?.querySelector<HTMLElement>("a[href],button");
      el?.focus();
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href],button:not([disabled])",
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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      track("email_copy");
      setTimeout(() => setCopied(false), 1800);
    } catch {}
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
            className="glass-strong relative max-h-[calc(100dvh-2rem)] w-full max-w-[520px] overflow-y-auto overscroll-contain rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow accent — suit le thème de la page (via --accent-glow) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, var(--accent-glow), transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <button
              onClick={close}
              aria-label="Fermer"
              className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-text-2 transition-colors hover:bg-white/5 hover:text-text-1"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="kicker">Contact</span>
            <h3 id="contact-title" className="t-h2 mt-2 text-text-1">
              On en parle ?
            </h3>
            <p className="body-md mt-3">
              Un appel ou un mail, et je vous réponds dans la journée avec une
              première idée concrète.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              {/* Téléphone */}
              <a
                href={`tel:${PHONE_HREF}`}
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-white/20"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: "var(--accent-grad)", color: "var(--accent-ink)" }}
                >
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="flex flex-col">
                  <span className="kicker text-[10px]">Téléphone</span>
                  <span className="font-display text-xl font-bold tracking-tight text-text-1">
                    {PHONE}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-text-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-1" />
              </a>

              {/* Mail */}
              <div className="glass flex items-center gap-4 rounded-2xl p-5">
                <a
                  href={MAILTO}
                  className="group flex min-w-0 flex-1 items-center gap-4"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                    style={{ background: "var(--accent-grad)", color: "var(--accent-ink)" }}
                  >
                    <Mail className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="kicker text-[10px]">Mail</span>
                    <span className="truncate font-display text-lg font-bold tracking-tight text-text-1 group-hover:underline group-hover:decoration-white/30 group-hover:underline-offset-4">
                      {EMAIL}
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? "Adresse copiée" : "Copier l'adresse e-mail"}
                  className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/10 text-text-2 transition-colors hover:border-white/25 hover:text-text-1"
                >
                  {copied ? <Check className="h-4 w-4" style={{ color: "var(--accent)" }} /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <p aria-live="polite" className="sr-only">
              {copied ? "Adresse e-mail copiée" : ""}
            </p>

            <p className="mt-6 text-center text-xs leading-relaxed text-text-3">
              RDV physique possible dans le sud de la France, sinon par écrit ou en visio.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
