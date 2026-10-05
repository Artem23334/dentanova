"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { useConsent } from "@/components/consent/ConsentProvider";
import { buttonClasses } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Google Maps embed for the (demo) clinic location.
 *
 * - Location comes from `site.map` in /src/config/site.ts — change it there.
 * - If NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is set, the official Maps Embed API is used.
 *   (Embed keys are public by design: restrict the key to your domain in Google Cloud.)
 *   Otherwise a key-less embed URL is used.
 * - Privacy + performance: the iframe (third-party cookies) loads only after the
 *   visitor clicks "Show map" or has accepted marketing cookies.
 */
const EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

function embedUrl(lang: string): string {
  const { lat, lng, zoom } = site.map;
  if (EMBED_KEY) {
    const p = new URLSearchParams({ key: EMBED_KEY, q: `${lat},${lng}`, zoom: String(zoom), language: lang });
    return `https://www.google.com/maps/embed/v1/place?${p.toString()}`;
  }
  const p = new URLSearchParams({ q: `${lat},${lng}`, z: String(zoom), hl: lang, output: "embed" });
  return `https://maps.google.com/maps?${p.toString()}`;
}

export function MapEmbed({
  lang,
  title,
  loadLabel,
  notice,
  className,
}: {
  lang: string;
  title: string;
  loadLabel: string;
  notice: string;
  className?: string;
}) {
  const { consent } = useConsent();
  const [clicked, setClicked] = useState(false);
  const show = clicked || consent.marketing;

  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-line bg-cloud", className)}>
      {show ? (
        <iframe
          title={title}
          src={embedUrl(lang)}
          className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          {/* Stylised map placeholder (no third-party request) */}
          <svg className="absolute inset-0 h-full w-full text-line" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 400 300">
            <rect width="400" height="300" fill="#eef2f7" />
            <path d="M-10 210 C 80 190, 140 240, 220 200 S 360 120, 420 140" stroke="#dbe5f3" strokeWidth="28" fill="none" />
            <path d="M0 80 L400 120 M60 0 L120 300 M250 0 L300 300 M0 260 L400 230" stroke="#ffffff" strokeWidth="9" />
            <path d="M0 40 L400 60 M180 0 L200 300 M340 0 L370 300" stroke="#ffffff" strokeWidth="4" />
          </svg>
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white shadow-lift">
            <Icon name="pin" className="h-7 w-7" />
          </span>
          <button type="button" onClick={() => setClicked(true)} className={buttonClasses("light", "sm", "relative shadow-soft")}>
            {loadLabel}
          </button>
          <p className="relative max-w-xs text-xs leading-relaxed text-ink-muted">{notice}</p>
        </div>
      )}
    </div>
  );
}
