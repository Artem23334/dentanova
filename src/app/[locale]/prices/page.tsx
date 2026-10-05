import type { Metadata } from "next";
import Link from "next/link";
import { localizePath, tr } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { services } from "@/data/services";
import { pricesForService } from "@/data/prices";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Container, DemoBadge, Section } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { PriceRows } from "@/components/sections/cards";
import { FinalCta } from "@/components/sections/HomeSections";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata({ locale, path: "/prices", title: t.meta.pricesTitle, description: t.meta.pricesDescription });
}

export default async function PricesPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);
  const groups = services.map((s) => ({ service: s, items: pricesForService(s.slug) })).filter((g) => g.items.length > 0);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: localizePath(locale, "/") },
          { name: t.nav.prices, path: localizePath(locale, "/prices") },
        ])}
      />
      <PageHero
        eyebrow={t.pricesPage.eyebrow}
        title={t.pricesPage.title}
        lead={t.pricesPage.lead}
        breadcrumbLabel={t.nav.breadcrumbs}
        crumbs={[{ label: t.nav.home, href: localizePath(locale, "/") }, { label: t.nav.prices }]}
      >
        <p className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
          {t.demo.pricesNote}
        </p>
      </PageHero>

      <Section className="!py-14 sm:!py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Category jump links */}
            <nav aria-label={t.pricesPage.title} className="min-w-0 lg:col-span-3">
              <ul className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-32 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                {groups.map(({ service }) => (
                  <li key={service.slug} className="shrink-0">
                    <a
                      href={`#${service.slug}`}
                      className="block whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-navy-900/20 hover:text-navy-900 lg:whitespace-normal lg:rounded-xl lg:border-transparent lg:px-3"
                    >
                      {tr(service.title, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 space-y-6 lg:col-span-9">
              {groups.map(({ service, items }) => (
                <section key={service.slug} id={service.slug} aria-labelledby={`${service.slug}-h`} className="card p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
                        <Icon name={service.icon} />
                      </span>
                      <h2 id={`${service.slug}-h`} className="text-xl font-semibold">
                        {tr(service.title, locale)}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <DemoBadge label={t.demo.badge} />
                      <Link
                        href={localizePath(locale, `/services/${service.slug}`)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-azure-600 hover:text-navy-900"
                      >
                        {t.common.learnMore}
                        <Icon name="arrowRight" className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <PriceRows items={items} locale={locale} t={t} />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <FinalCta locale={locale} t={t} />
    </>
  );
}
