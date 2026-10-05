/**
 * Locale configuration.
 * - "uk" (Ukrainian) is the default and lives at the root: /, /services ...
 * - "pl" and "en" are prefixed: /pl, /pl/services, /en, /en/services ...
 * Internally Ukrainian uses the ISO code "uk"; it is labelled "UA" in the UI.
 */
export const locales = ["uk", "pl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; ogLocale: string }> = {
  uk: { short: "UA", name: "Українська", htmlLang: "uk", ogLocale: "uk_UA" },
  pl: { short: "PL", name: "Polski", htmlLang: "pl", ogLocale: "pl_PL" },
  en: { short: "EN", name: "English", htmlLang: "en", ogLocale: "en_GB" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** A string translated into every supported locale. */
export type L10n = Record<Locale, string>;

/** Pick the translation for a locale. */
export function tr(value: L10n, locale: Locale): string {
  return value[locale] ?? value[defaultLocale];
}

/**
 * Build a localized URL path.
 * localizePath("uk", "/prices") -> "/prices"
 * localizePath("pl", "/prices") -> "/pl/prices"
 * localizePath("en", "/")       -> "/en"
 */
export function localizePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Remove a locale prefix from a pathname: "/pl/prices" -> "/prices". */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname || "/";
}
