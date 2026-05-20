import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { AgentsSection } from "@/components/sections/agents";
import { MarqueeSection } from "@/components/sections/marquee";
import { BenefitsSection } from "@/components/sections/benefits";
import { ProcessSection } from "@/components/sections/process";
import { CtaFinal } from "@/components/sections/cta-final";
import { BackgroundOrbs } from "@/components/backgrounds/orbs";
import { ParticleField } from "@/components/backgrounds/particle-field";
import { CenterVignette } from "@/components/backgrounds/center-vignette";
import { StickyCta } from "@/components/sticky-cta";

export default function Home() {
  return (
    <>
      <ParticleField count={140} />
      <BackgroundOrbs />
      <CenterVignette />
      <Nav />
      <StickyCta />

      <main className="relative">
        <Hero />
        <Manifesto />
        <AgentsSection />
        <MarqueeSection />
        <BenefitsSection />
        <ProcessSection />
        <CtaFinal />
      </main>
    </>
  );
}
