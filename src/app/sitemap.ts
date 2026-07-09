import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/lib/site";

// seo.md §5.11 / §833 : Google IGNORE <priority> et <changefreq>. Un <lastmod>
// remis à « aujourd'hui » à chaque build devient non fiable et Google l'ignore
// aussi. On ne liste que des URL canoniques, 200, indexables, avec un lastmod
// HONNÊTE (date de la dernière modification réelle de contenu, mise à jour à la
// main quand le contenu change vraiment).
const LAST_CONTENT_UPDATE = "2026-07-08";

const ROUTES = [
  "/",
  "/creation-site-web",
  "/visibilite-en-ligne",
  "/automatisations",
  "/mentions-legales",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: LAST_CONTENT_UPDATE,
  }));
}
