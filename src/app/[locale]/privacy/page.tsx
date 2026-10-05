import type { Metadata } from "next";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata({ locale, path: "/privacy", title: t.meta.privacyTitle, description: t.legal.placeholder });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);
  return <LegalPage locale={locale} t={t} title={t.meta.privacyTitle} sections={t.legal.privacy} />;
}
