import type { Locale } from "@/i18n/config";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const numberLocale: Record<Locale, string> = { uk: "uk-UA", pl: "pl-PL", en: "en-GB" };

/** 3000 -> "3 000" (locale aware grouping). */
export function formatAmount(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(numberLocale[locale]).format(amount);
}

/** Absolute site URL without trailing slash. */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

/** Whether search engines may index the site (off by default for the demo). */
export function indexingAllowed(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}
