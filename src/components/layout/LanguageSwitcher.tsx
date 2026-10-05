"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, localizePath, stripLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** UA / PL / EN segmented switcher. Keeps the user on the same page. */
export function LanguageSwitcher({
  locale,
  label,
  className,
  dark = false,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  className?: string;
  dark?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || "/";
  const basePath = stripLocale(pathname);

  return (
    <nav aria-label={label} className={className}>
      <ul
        className={cn(
          "flex items-center rounded-full p-1 text-xs font-semibold",
          dark ? "bg-white/10" : "bg-cloud",
        )}
      >
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={localizePath(l, basePath)}
                hrefLang={localeLabels[l].htmlLang}
                lang={localeLabels[l].htmlLang}
                aria-current={active ? "true" : undefined}
                aria-label={localeLabels[l].name}
                onClick={onNavigate}
                className={cn(
                  "flex h-8 min-w-10 items-center justify-center rounded-full px-2.5 tracking-wide transition",
                  active
                    ? dark
                      ? "bg-white text-navy-900"
                      : "bg-white text-navy-900 shadow-sm"
                    : dark
                      ? "text-white/70 hover:text-white"
                      : "text-ink-muted hover:text-navy-900",
                )}
              >
                {localeLabels[l].short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
