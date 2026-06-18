import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Tous les robots, y compris les crawlers IA (GPTBot, ClaudeBot, PerplexityBot…)
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
