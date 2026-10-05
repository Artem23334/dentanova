"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image with a graceful, on-brand fallback if a (remote demo) image
 * fails to load — the layout never shows a broken-image icon.
 */
export function SmartImage({
  fallbackLabel,
  className,
  alt,
  ...props
}: ImageProps & { fallbackLabel?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-azure-100 via-cloud to-azure-50 text-navy-700",
          props.fill && "absolute inset-0",
          className,
        )}
      >
        {fallbackLabel ? (
          <span className="text-4xl font-semibold tracking-tight text-navy-700/70">{fallbackLabel}</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-10 w-10 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M7.2 3.5c-2.3 0-4 1.8-4 4.3 0 2 .7 3.1 1.4 4.8.6 1.5.7 3.3 1 5.1.3 1.7.8 3.3 2 3.3 1.5 0 1.7-2.2 2.2-3.9.4-1.3.9-2.1 2.2-2.1s1.8.8 2.2 2.1c.5 1.7.7 3.9 2.2 3.9 1.2 0 1.7-1.6 2-3.3.3-1.8.4-3.6 1-5.1.7-1.7 1.4-2.8 1.4-4.8 0-2.5-1.7-4.3-4-4.3-1.9 0-2.8 1-4.8 1s-2.9-1-4.8-1Z" />
          </svg>
        )}
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
