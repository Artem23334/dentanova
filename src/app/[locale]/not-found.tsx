"use client";

import { usePathname } from "next/navigation";
import { isLocale, localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ButtonLink, Container } from "@/components/ui/primitives";

/**
 * Localized 404. not-found components don't receive route params,
 * so the locale is derived from the URL.
 */
export default function NotFound() {
  const seg = (usePathname() || "/").split("/")[1];
  const locale: Locale = isLocale(seg) ? seg : "uk";
  const t = getDictionary(locale);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-semibold tracking-tight text-azure-200 sm:text-8xl">404</p>
      <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">{t.notFound.title}</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">{t.notFound.text}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={localizePath(locale, "/")}>{t.common.backHome}</ButtonLink>
        <ButtonLink href={localizePath(locale, "/services")} variant="secondary">
          {t.common.allServices}
        </ButtonLink>
      </div>
    </Container>
  );
}
