import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { AgentsSection } from "@/components/sections/agents";
import { MarqueeSection } from "@/components/sections/marquee";
import { CtaFinal } from "@/components/sections/cta-final";
import { BackgroundOrbs } from "@/components/backgrounds/orbs";
import { ParticleField } from "@/components/backgrounds/particle-field";
import { CenterVignette } from "@/components/backgrounds/center-vignette";
import { StickyCta } from "@/components/sticky-cta";
import { PageHero } from "@/components/page-hero";
import { JsonLd, serviceLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Automatisations & IA sur-mesure — Alexandre GIL",
  description:
    "Agents IA, automatisations de tâches et outils internes sur-mesure, conçus sur votre métier et vos données.",
  alternates: { canonical: "/automatisations" },
  openGraph: {
    title: "Automatisations & IA sur-mesure — Alexandre GIL",
    description:
      "Agents IA, automatisations de tâches et outils internes sur-mesure, conçus sur votre métier et vos données.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function AutomatisationsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Automatisations et IA sur-mesure",
            serviceType: "Automatisation et intelligence artificielle",
            description:
              "Agents IA, automatisations de tâches et outils internes sur-mesure, conçus sur votre métier, vos données et votre vocabulaire.",
            path: "/automatisations",
          }),
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Automatisations & IA", path: "/automatisations" },
          ]),
        ]}
      />
      <ParticleField count={140} />
      <BackgroundOrbs />
      <CenterVignette />
      <Nav />
      <StickyCta />

      <main id="main" className="relative">
        <PageHero
          theme="sig"
          kicker="Automatisations & IA"
          title="Faites travailler la machine."
          sub="Agents IA, automatisations et outils internes, conçus sur votre métier."
          body="Tri de mails, factures, veille, documents : ce qui vous prend des heures peut tourner tout seul. Chaque outil est construit sur vos données et votre vocabulaire, pas sur un template."
          cta="Discuter d'une automatisation"
        />

        <AgentsSection />
        <MarqueeSection />
        <CtaFinal />
      </main>
    </>
  );
}
