import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GrainOverlay } from "@/components/grain-overlay";
import { ContactModalProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/site";

const SITE = {
  name: "Alexandre GIL",
  url: SITE_URL,
  title: "Alexandre GIL — Création de sites web & visibilité en ligne",
  description:
    "Création de sites web premium sur-mesure et visibilité en ligne : SEO local, avis Google, fiche Google Business, Google & Meta Ads. Automatisations et IA en bonus.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    locale: "fr_FR",
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  areaServed: "FR",
  email: "marsugil@gmail.com",
  telephone: "+33767677742",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 rue des Sœurs de Cauvigny",
    postalCode: "34300",
    addressLocality: "Agde",
    addressCountry: "FR",
  },
  founder: { "@type": "Person", name: "Alexandre Gil" },
  knowsAbout: [
    "Création de site web",
    "Référencement local (SEO)",
    "Fiche Google Business",
    "Avis Google",
    "Google Ads",
    "Meta Ads",
    "Automatisation",
    "Intelligence artificielle",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&f[]=general-sans@600,500,400&f[]=jetbrains-mono@500,400&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative overflow-x-clip bg-void-0 text-text-1">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void-0"
        >
          Aller au contenu
        </a>
        <ContactModalProvider>
          <SmoothScroll />
          {children}
          <Footer />
          <GrainOverlay />
        </ContactModalProvider>
      </body>
    </html>
  );
}
