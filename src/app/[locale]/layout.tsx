import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, localeLabels, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { site } from "@/config/site";
import { siteUrl } from "@/lib/utils";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { ConsentScripts } from "@/components/consent/ConsentScripts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b1d3a",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t.meta.siteTitle, template: `%s · ${site.name}` },
    description: t.meta.homeDescription,
    applicationName: site.name,
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={localeLabels[locale].htmlLang} className={manrope.variable}>
      <body className="min-h-screen font-sans">
        <ConsentProvider>
          <Header locale={locale} nav={t.nav} demo={t.demo} callLabel={t.common.call} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} t={t} />
          <MobileCTA locale={locale} book={t.nav.bookShort} call={t.common.call} />
          <CookieBanner locale={locale} t={t.cookies} footer={t.footer} />
          <ConsentScripts />
        </ConsentProvider>
      </body>
    </html>
  );
}
