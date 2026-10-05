import type { NextConfig } from "next";

/**
 * Basic security headers. Kept intentionally simple for a demo site.
 * (A strict CSP is omitted on purpose: Google Maps embeds and optional
 * analytics would need per-project tuning.)
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Demo imagery is served from Unsplash. Replace with the clinic's own
    // photos in /public/images and this list can be removed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
