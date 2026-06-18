"use client";

import Link from "next/link";
import { useContactModal } from "./contact-modal";

const NAV = [
  { href: "/creation-site-web", label: "Création de sites web" },
  { href: "/visibilite-en-ligne", label: "Visibilité en ligne" },
  { href: "/automatisations", label: "Automatisations" },
];

const LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
];

export function Footer() {
  const { open } = useContactModal();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.07] bg-void-0">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marque */}
          <div>
            <Link
              href="/"
              className="inline-flex items-baseline gap-2 font-display text-lg font-bold tracking-[-0.02em] text-text-1"
            >
              <span>Alexandre GIL</span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 translate-y-[-2px] rounded-full"
                style={{ background: "var(--grad-warm)" }}
              />
            </Link>
            <p className="body-md mt-4 max-w-xs text-[15px]">
              Création de sites web sur-mesure et visibilité en ligne. Plus de clients,
              une image à la hauteur.
            </p>
            <div className="mt-5 space-y-1.5 text-sm">
              <a
                href="mailto:marsugil@gmail.com"
                className="block text-text-2 transition-colors hover:text-text-1"
              >
                marsugil@gmail.com
              </a>
              <a
                href="tel:+33767677742"
                className="block text-text-2 transition-colors hover:text-text-1"
              >
                07 67 67 77 42
              </a>
            </div>
            <button
              onClick={open}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-void-0 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Discuter du projet
            </button>
          </div>

          {/* Prestations */}
          <nav aria-label="Prestations">
            <h2 className="kicker text-[11px]">Prestations</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-text-2 transition-colors hover:text-text-1">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Légal */}
          <nav aria-label="Informations légales">
            <h2 className="kicker text-[11px]">Informations</h2>
            <ul className="mt-4 space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-text-2 transition-colors hover:text-text-1">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={open}
                  className="cursor-pointer text-sm text-text-2 transition-colors hover:text-text-1"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-text-3 sm:flex-row sm:items-center">
          <span>© {year} Alexandre Gil. Tous droits réservés.</span>
          <span>Entrepreneur individuel · Agde, France</span>
        </div>
      </div>
    </footer>
  );
}
