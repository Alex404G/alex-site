import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { StickyCta } from "@/components/sticky-cta";
import { CreationPage } from "@/components/pages/creation";

export const metadata: Metadata = {
  title: "Création de site web sur-mesure — Alexandre GIL",
  description:
    "Sites web premium sur-mesure : design, performance, mobile et optimisation conversion + SEO. Pas un template.",
  alternates: { canonical: "/creation-site-web" },
  openGraph: {
    title: "Création de site web sur-mesure — Alexandre GIL",
    description:
      "Un site qui vend : design premium, rapide, mobile, optimisé conversion et SEO.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  return (
    <>
      <Nav />
      <StickyCta />
      <CreationPage />
    </>
  );
}
