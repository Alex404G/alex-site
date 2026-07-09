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
    "Pas d'outil sur étagère : des agents IA, automatisations et outils internes construits sur votre métier, vos données et vos outils.",
  alternates: { canonical: "/automatisations" },
  openGraph: {
    title: "Automatisations & IA sur-mesure — Alexandre GIL",
    description:
      "Pas d'outil sur étagère : des agents IA, automatisations et outils internes construits sur votre métier, vos données et vos outils.",
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
          title="L'IA, intégrée à votre métier."
          sub="Je ne vends pas d'outils : je construis votre solution."
          body="J'étudie comment vous travaillez, puis je conçois l'agent ou l'automatisation qui vous enlève les tâches répétitives, sur vos données et vos outils."
          cta="Discuter d'une automatisation"
        />

        <AgentsSection />
        <MarqueeSection />
        <CtaFinal />
      </main>
    </>
  );
}
