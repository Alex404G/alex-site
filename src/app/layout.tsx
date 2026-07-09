import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GrainOverlay } from "@/components/grain-overlay";
import { ContactModalProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { CallTracker } from "@/components/call-tracker";
import { SITE_URL } from "@/lib/site";
import { ORG_ID } from "@/lib/seo";
import { satoshi, generalSans, jetbrainsMono } from "./fonts";

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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "fr-FR",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: SITE.name,
      description: SITE.description,
      url: SITE.url,
      image: `${SITE.url}/opengraph-image`,
      areaServed: { "@type": "Country", name: "France" },
      email: "marsugil@gmail.com",
      telephone: "+33767677742",
      priceRange: "€€",
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
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`antialiased ${satoshi.variable} ${generalSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
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
          <CallTracker />
          <Analytics />
        </ContactModalProvider>
      </body>
    </html>
  );
}
