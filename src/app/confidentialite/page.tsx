import type { Metadata } from "next";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Alexandre GIL",
  description: "Comment vos données sont traitées sur le site d'Alexandre GIL.",
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <>
      <Nav />
      <main id="main" className="relative mx-auto max-w-3xl px-6 pb-28 pt-40 md:pt-48">
        <span className="kicker">Vos données</span>
        <h1 className="t-h1 mt-4 text-text-1">Politique de confidentialité</h1>

        <section className="mt-12 space-y-3">
          <h2 className="t-h3 text-text-1">Responsable du traitement</h2>
          <p className="body-md text-[15px]">
            Alexandre Gil (Entrepreneur Individuel), 8 rue des Sœurs de Cauvigny, 34300 Agde.
            Contact :{" "}
            <a href="mailto:contact@alexandregil.com" className="text-warm-2 underline-offset-4 hover:underline">
              contact@alexandregil.com
            </a>.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Données collectées</h2>
          <p className="body-md text-[15px]">
            Ce site ne comporte pas de formulaire : vous me contactez directement par
            e-mail ou par téléphone. Les seules données traitées sont celles que vous
            choisissez de transmettre dans votre message ou votre appel. Aucune donnée
            n&apos;est collectée à votre insu.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Finalité et base légale</h2>
          <p className="body-md text-[15px]">
            Ces données servent uniquement à répondre à votre demande. La base légale est
            l&apos;exécution de mesures précontractuelles prises à votre initiative
            (art. 6.1.b du RGPD).
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Destinataires et conservation</h2>
          <p className="body-md text-[15px]">
            Vos messages sont reçus directement par Alexandre Gil, sans intermédiaire
            commercial. Ils sont conservés le temps nécessaire au traitement de votre demande,
            puis au maximum 3 ans après le dernier échange, conformément aux recommandations de la CNIL.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Mesure d&apos;audience</h2>
          <p className="body-md text-[15px]">
            Le site utilise une mesure d&apos;audience anonyme (Vercel Analytics), sans cookie
            et sans identifiant permettant de reconnaître un visiteur. Aucune donnée
            personnelle n&apos;est traitée à ce titre.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Cookies et traceurs</h2>
          <p className="body-md text-[15px]">
            Ce site n&apos;utilise aucun cookie de suivi ni traceur publicitaire.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="t-h3 text-text-1">Vos droits</h2>
          <p className="body-md text-[15px]">
            Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
            données. Pour l&apos;exercer, écrivez à{" "}
            <a href="mailto:contact@alexandregil.com" className="text-warm-2 underline-offset-4 hover:underline">
              contact@alexandregil.com
            </a>. Vous pouvez également saisir la CNIL (cnil.fr).
          </p>
        </section>
      </main>
    </>
  );
}
