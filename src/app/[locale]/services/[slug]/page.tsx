import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, localizePath, tr } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getService, services } from "@/data/services";
import { pricesForService } from "@/data/prices";
import { images } from "@/data/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, Container, DemoBadge, DemoNote, Section } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { SmartImage } from "@/components/ui/SmartImage";
import { PriceRows, ServiceCard } from "@/components/sections/cards";
import { FinalCta, Process } from "@/components/sections/HomeSections";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

async function resolve(params: Props["params"]) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) notFound();
  return { locale, service, t: getDictionary(locale) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, service } = await resolve(params);
  const cityWord = { uk: "у Варшаві", pl: "w Warszawie", en: "in Warsaw" }[locale];
  return pageMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: `${tr(service.title, locale)} ${cityWord}`,
    description: tr(service.short, locale),
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, service, t } = await resolve(params);
  const title = tr(service.title, locale);
  const related = pricesForService(service.slug);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const image = images[service.image];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: localizePath(locale, "/") },
          { name: t.nav.services, path: localizePath(locale, "/services") },
          { name: title, path: localizePath(locale, `/services/${service.slug}`) },
        ])}
      />
      <PageHero
        eyebrow={t.servicesPage.eyebrow}
        title={title}
        lead={tr(service.short, locale)}
        breadcrumbLabel={t.nav.breadcrumbs}
        crumbs={[
          { label: t.nav.home, href: localizePath(locale, "/") },
          { label: t.nav.services, href: localizePath(locale, "/services") },
          { label: title },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={localizePath(locale, "/booking")} size="lg" icon="arrowRight">
            {t.nav.book}
          </ButtonLink>
          <a
            href={site.phoneHref}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line bg-white px-7 font-semibold text-navy-900 transition hover:bg-mist"
          >
            <Icon name="phone" className="h-5 w-5" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      <Section className="!pb-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-xl leading-relaxed text-ink-soft">{tr(service.intro, locale)}</p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {service.highlights.map((h) => (
                  <li key={h.en} className="inline-flex items-center gap-2 rounded-full bg-azure-50 px-4 py-2 text-sm font-semibold text-navy-800 ring-1 ring-azure-100">
                    <Icon name="check" className="h-4 w-4 text-azure-600" />
                    {tr(h, locale)}
                  </li>
                ))}
              </ul>

              <h2 className="mt-14 text-2xl font-semibold sm:text-3xl">{t.common.procedures}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.procedures.map((p) => (
                  <li key={p.en} className="flex items-center gap-3 rounded-2xl border border-line p-4 font-medium text-navy-900">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-azure-600">
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>
                    {tr(p, locale)}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-6 lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cloud">
                <SmartImage src={image.src} alt={tr(image.alt, locale)} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              {related.length > 0 ? (
                <div className="card p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold">{t.common.relatedPrices}</h2>
                    <DemoBadge label={t.demo.badge} />
                  </div>
                  <PriceRows items={related} locale={locale} t={t} className="mt-2" />
                  <ButtonLink href={localizePath(locale, "/prices")} variant="ghost" size="sm" icon="arrowRight" className="-ml-4 mt-2">
                    {t.common.allPrices}
                  </ButtonLink>
                </div>
              ) : null}
              <DemoNote>{t.demo.pricesNote}</DemoNote>
            </aside>
          </div>
        </Container>
      </Section>

      <Process locale={locale} t={t} />

      <Section className="bg-mist">
        <Container>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t.servicesPage.otherServices}</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} locale={locale} cta={t.common.learnMore} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCta locale={locale} t={t} />
    </>
  );
}
