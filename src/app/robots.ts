import type { MetadataRoute } from "next";
import { indexingAllowed, siteUrl } from "@/lib/utils";

/**
 * The fictional demo is NOT indexed by default (NEXT_PUBLIC_ALLOW_INDEXING=false),
 * so search engines don't list a clinic that doesn't exist.
 * For a real client site set NEXT_PUBLIC_ALLOW_INDEXING=true.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  if (!indexingAllowed()) {
    return { rules: [{ userAgent: "*", disallow: "/" }], sitemap: `${base}/sitemap.xml` };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
