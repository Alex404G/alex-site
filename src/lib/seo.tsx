import { SITE_URL } from "@/lib/site";

// @id stable de l'entité (le prestataire) — référencé par les schemas WebSite,
// Service et BreadcrumbList pour que Google relie tout à une seule entité.
export const ORG_ID = `${SITE_URL}/#alexandregil`;

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function serviceLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    areaServed: { "@type": "Country", name: "France" },
    provider: { "@id": ORG_ID },
  };
}

// Injecteur JSON-LD — composant serveur, à poser dans n'importe quelle page.
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
