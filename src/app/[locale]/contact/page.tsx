import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { site } from "@/config/site";
import { breadcrumbJsonLd, clinicJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { ContactSection } from "@/components/sections/ContactSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata({ locale, path: "/contact", title: t.meta.contactTitle, description: t.meta.contactDescription });
}

export default async function ContactPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);

  return (
    <>
      <JsonLd data={clinicJsonLd(locale, t.meta.contactDescription)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: localizePath(locale, "/") },
          { name: t.nav.contact, path: localizePath(locale, "/contact") },
        ])}
      />
      <PageHero
        eyebrow={t.contactPage.eyebrow}
        title={t.contactPage.title}
        lead={t.contactPage.lead}
        breadcrumbLabel={t.nav.breadcrumbs}
        crumbs={[{ label: t.nav.home, href: localizePath(locale, "/") }, { label: t.nav.contact }]}
      >
        <div className="mt-8 flex max-w-xl items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Icon name="alert" />
          </span>
          <div>
            <p className="font-semibold text-navy-900">{t.contactPage.urgentTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t.contactPage.urgentText}</p>
            <a href={site.phoneHref} className="mt-2 inline-block font-semibold text-azure-600 hover:text-navy-900">
              {site.phone}
            </a>
          </div>
        </div>
      </PageHero>
      <div className="pt-12 sm:pt-16">
        <ContactSection locale={locale} t={t} showHeading={false} />
      </div>
    </>
  );
}
