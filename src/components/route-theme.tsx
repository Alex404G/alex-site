"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pose data-theme sur <html> selon la route : sélection de texte, focus ring
 * et micro-surfaces (modale, footer) suivent le thème de la page via les
 * variables --accent-* de globals.css.
 */
export function RouteTheme() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.dataset.theme = pathname.startsWith("/automatisations")
      ? "sig"
      : pathname.startsWith("/visibilite")
        ? "visi"
        : "warm";
  }, [pathname]);
  return null;
}
