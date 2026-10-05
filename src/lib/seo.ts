import type { Metadata } from "next";
import { defaultLocale, localeLabels, locales, localizePath, type Locale } from "@/i18n/config";
import { site } from "@/config/site";
import { indexingAllowed, siteUrl } from "./utils";

/** hreflang map for a path, e.g. "/prices" -> { uk: "/prices", pl: "/pl/prices", en: "/en/prices", x-default } */
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[localeLabels[l].htmlLang] = localizePath(l, path);
  map["x-default"] = localizePath(defaultLocale, path);
  return map;
}

/** Per-page metadata: title, description, canonical, hreflang, Open Graph, robots. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = localizePath(locale, path);
  const index = indexingAllowed();
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: localeLabels[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — demo` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/** schema.org structured data for the (demo) clinic. */
export function clinicJsonLd(locale: Locale, description: string) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `${site.name} (demo)`,
    description,
    url: base + localizePath(locale, "/"),
    image: base + "/og.png",
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    availableLanguage: ["uk", "pl", "en"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.map.lat, longitude: site.map.lng },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
    ],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: base + it.path,
    })),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
