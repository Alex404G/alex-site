"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// Écoute déléguée sur tout le document : un clic sur n'importe quel lien tel:
// déclenche un événement call_click. Aucun listener par lien à maintenir.
export function CallTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('a[href^="tel:"]')) track("call_click");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
