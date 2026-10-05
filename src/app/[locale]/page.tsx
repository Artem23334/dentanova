import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tr } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { faqs } from "@/data/content";
import { clinicJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import {
  Benefits,
  DoctorsPreview,
  FaqSection,
  FinalCta,
  Gallery,
  PricesPreview,
  Process,
  ServicesGrid,
  Technology,
  Testimonials,
} from "@/components/sections/HomeSections";
import { ContactSection } from "@/components/sections/ContactSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/", title: t.meta.homeTitle, description: t.meta.homeDescription, absoluteTitle: true });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd data={clinicJsonLd(locale, t.meta.homeDescription)} />
      <JsonLd data={faqJsonLd(faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) })))} />
      <Hero locale={locale} t={t} />
      <Benefits locale={locale} t={t} />
      <ServicesGrid locale={locale} t={t} />
      <Technology locale={locale} t={t} />
      <Process locale={locale} t={t} />
      <DoctorsPreview locale={locale} t={t} />
      <PricesPreview locale={locale} t={t} />
      <Gallery locale={locale} t={t} />
      <Testimonials locale={locale} t={t} />
      <FaqSection locale={locale} t={t} />
      <FinalCta locale={locale} t={t} />
      <ContactSection locale={locale} t={t} />
    </>
  );
}
