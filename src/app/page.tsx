import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { Manifesto } from "@/components/sections/manifesto";
import { BenefitsSection } from "@/components/sections/benefits";
import { CtaWarm } from "@/components/sections/cta-warm";
import { StickyCta } from "@/components/sticky-cta";
import { SectionGlow } from "@/components/section-glow";

export default function Home() {
  return (
    <>
      {/* Fond chaud — ambiance commune à tout l'accueil.
          Halo central très doux (anti noir-plat) + grille masquée en
          profondeur : dense en haut, fondue vers le bas. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="warm-bloom absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 52% 42% at 50% 58%, rgba(255,154,77,0.05), transparent 70%)",
          }}
        />
        <div className="bg-grid absolute inset-0 opacity-[0.28] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_28%,black,transparent_78%)]" />
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
        <CtaWarm />
      </main>
    </>
  );
}
