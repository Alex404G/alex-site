import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { Manifesto } from "@/components/sections/manifesto";
import { BenefitsSection } from "@/components/sections/benefits";
import { ProcessSection } from "@/components/sections/process";
import { CtaWarm } from "@/components/sections/cta-warm";
import { StickyCta } from "@/components/sticky-cta";
import { SectionGlow } from "@/components/section-glow";

export default function Home() {
  return (
    <>
      {/* Fond chaud — ambiance commune à tout l'accueil */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="warm-bloom absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-[0.28]" />
      </div>

      <Nav />
      <StickyCta />

      <main id="main" className="relative">
        <Hero />
        <Pillars />
        <SectionGlow />
        <Manifesto />
        <SectionGlow />
        <BenefitsSection />
        <SectionGlow />
        <ProcessSection />
        <CtaWarm />
      </main>
    </>
  );
}
