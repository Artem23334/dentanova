import type { MetadataRoute } from "next";
import { locales, localizePath } from "@/i18n/config";
import { services } from "@/data/services";
import { languageAlternates } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

const staticPaths = ["/", "/services", "/prices", "/about", "/doctors", "/contact", "/booking", "/privacy", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [...staticPaths, ...services.map((s) => `/services/${s.slug}`)];
  const lastModified = new Date();

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: base + localizePath(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([k, v]) => [k, base + v])),
      },
    })),
  );
}
