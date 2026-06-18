import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { StickyCta } from "@/components/sticky-cta";
import { VisibilitePage } from "@/components/pages/visibilite";

export const metadata: Metadata = {
  title: "Visibilité en ligne : SEO local, avis, Google & Meta Ads — Alexandre GIL",
  description:
    "Être trouvé sur Google : SEO local, fiche Google Business, avis Google, Google et Meta Ads, suivi des résultats.",
  alternates: { canonical: "/visibilite-en-ligne" },
  openGraph: {
    title: "Visibilité en ligne — Alexandre GIL",
    description:
      "SEO local, fiche Google Business, avis Google, Google & Meta Ads : attirez des clients qualifiés.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  return (
    <>
      <Nav />
      <StickyCta />
      <VisibilitePage />
    </>
  );
}
