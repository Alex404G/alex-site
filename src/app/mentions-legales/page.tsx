import type { Metadata } from "next";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Mentions légales — Alexandre GIL",
  description: "Mentions légales du site d'Alexandre GIL.",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Nav />
      <main id="main" className="relative mx-auto max-w-3xl px-6 pb-28 pt-40 md:pt-48">
        <span className="kicker">Informations légales</span>
        <h1 className="t-h1 mt-4 text-text-1">Mentions légales</h1>

        <section className="mt-12 space-y-3">
          <h2 className="t-h3 text-text-1">Éditeur du site</h2>
          <p className="body-md text-[15px]">
            Alexandre Raphaël Gil — Entrepreneur Individuel (micro-entreprise, régime micro-BNC).
          </p>
          <p className="body-md text-[15px]">
            8 rue des Sœurs de Cauvigny, 34300 Agde, France.
          </p>
          <p className="body-md text-[15px]">
            SIRET : 948 239 645 00021. TVA non applicable, art. 293 B du CGI.
          </p>
          <p className="body-md text-[15px]">
            Contact :{" "}
            <a href="mailto:marsugil@gmail.com" className="text-warm-2 underline-offset-4 hover:underline">
              marsugil@gmail.com
            </a>{" "}
            — 07 67 67 77 42.
          </p>
          <p className="body-md text-[15px]">Directeur de la publication : Alexandre Gil.</p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Hébergement</h2>
          <p className="body-md text-[15px]">
            Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
            (vercel.com).
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Propriété intellectuelle</h2>
          <p className="body-md text-[15px]">
            L&apos;ensemble des contenus de ce site (textes, visuels, code) est la propriété
            d&apos;Alexandre Gil, sauf mention contraire. Toute reproduction sans autorisation est interdite.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Données personnelles</h2>
          <p className="body-md text-[15px]">
            Les modalités de traitement des données sont détaillées dans la{" "}
            <a href="/confidentialite" className="text-warm-2 underline-offset-4 hover:underline">
              politique de confidentialité
            </a>.
          </p>
        </section>
      </main>
    </>
  );
}
