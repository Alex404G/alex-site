/**
 * URL de base du site, résolue dans cet ordre :
 *  1. NEXT_PUBLIC_SITE_URL — à définir quand le vrai domaine sera branché.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — domaine de production *.vercel.app
 *     fourni automatiquement par Vercel au build (aucune config requise).
 *  3. localhost en dev.
 *
 * Sert de `metadataBase` (donc d'origine pour l'image OG de partage, les
 * canonical, le sitemap et robots). Important pour un site envoyé EN LIEN :
 * l'aperçu de partage doit pointer vers le domaine réellement servi.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
