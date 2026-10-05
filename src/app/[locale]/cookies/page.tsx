import type { Metadata } from "next";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata({ locale, path: "/cookies", title: t.meta.cookiesTitle, description: t.legal.placeholder });
}

export default async function CookiesPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);
  return <LegalPage locale={locale} t={t} title={t.meta.cookiesTitle} sections={t.legal.cookies} showCookieButton />;
}
