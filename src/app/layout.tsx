import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GrainOverlay } from "@/components/grain-overlay";
import { CursorFollow } from "@/components/cursor-follow";
import { ContactModalProvider } from "@/components/contact-modal";

export const metadata: Metadata = {
  title: "Alex Gil — Sur-mesure à 200 %",
  description:
    "Logiciels internes, assistants IA, sites, dashboards, automatisations — conçus exclusivement sur ton métier, tes données, ton vocabulaire.",
  metadataBase: new URL("https://alexgil.dev"),
  openGraph: {
    title: "Alex Gil — Sur-mesure à 200 %",
    description:
      "Plus de temps. Plus d'argent. Plus de clients. Outils IA sur-mesure conçus sur ton métier.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Gil — Sur-mesure à 200 %",
    description:
      "Plus de temps. Plus d'argent. Plus de clients. Outils IA sur-mesure conçus sur ton métier.",
  },
  robots: { index: true, follow: true },
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
      </head>
      <body className="relative overflow-x-clip bg-void-0 text-text-1">
        <ContactModalProvider>
          <SmoothScroll />
          <CursorFollow />
          {children}
          <GrainOverlay />
        </ContactModalProvider>
      </body>
    </html>
  );
}
