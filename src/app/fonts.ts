import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

// Satoshi & General Sans : polices Fontshare self-hostées (woff2 dans ./fonts).
// Servies same-origin via next/font — plus de <link> CDN externe bloquant.
export const satoshi = localFont({
  src: [
    { path: "./fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const generalSans = localFont({
  src: [
    { path: "./fonts/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/general-sans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/general-sans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
