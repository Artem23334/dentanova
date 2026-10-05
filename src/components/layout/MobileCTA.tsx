"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizePath, stripLocale, type Locale } from "@/i18n/config";
import { site } from "@/config/site";
import { buttonClasses } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";

/** Sticky bottom bar on small screens: always-reachable call + booking actions. */
export function MobileCTA({ locale, book, call }: { locale: Locale; book: string; call: string }) {
  const path = stripLocale(usePathname() || "/");
  if (path === "/booking") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a
          href={site.phoneHref}
          className="flex h-12 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-white text-navy-900"
          aria-label={`${call}: ${site.phone}`}
        >
          <Icon name="phone" />
        </a>
        <Link href={localizePath(locale, "/booking")} className={buttonClasses("primary", "md", "flex-1")}>
          <Icon name="calendar" className="h-[1.1em] w-[1.1em]" />
          {book}
        </Link>
      </div>
    </div>
  );
}
