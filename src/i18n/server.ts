import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./index";

/** Resolve and validate the [locale] route param (404 for unknown locales). */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<{ locale: Locale; t: Dictionary }> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, t: getDictionary(locale) };
}
