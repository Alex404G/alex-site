import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { AgentsSection } from "@/components/sections/agents";
import { MarqueeSection } from "@/components/sections/marquee";
import { CtaFinal } from "@/components/sections/cta-final";
import { BackgroundOrbs } from "@/components/backgrounds/orbs";
import { ParticleField } from "@/components/backgrounds/particle-field";
import { CenterVignette } from "@/components/backgrounds/center-vignette";
import { StickyCta } from "@/components/sticky-cta";
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
        <header className="relative mx-auto max-w-5xl px-6 pt-40 pb-6 text-center md:pt-48">
          <span className="kicker">Bonus · Automatisations &amp; IA</span>
          <h1 className="t-h1 mt-6">
            <span className="text-gradient-sig">Automatisations &amp; IA.</span>
          </h1>
          <p className="t-h2 mt-6 mx-auto max-w-3xl text-text-1">
            Faites travailler la machine à votre place.
          </p>
          <p className="body-md mt-6 mx-auto max-w-xl">
            Agents IA, automatisations de tâches et outils internes — conçus exclusivement
            sur votre métier, vos données, votre vocabulaire.
          </p>
        </header>

        <AgentsSection />
        <MarqueeSection />
        <CtaFinal />
      </main>
    </>
  );
}
