import type { Metadata } from "next";
import { localizePath, tr } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { services } from "@/data/services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, Container, Section } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { FinalCta } from "@/components/sections/HomeSections";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata({ locale, path: "/services", title: t.meta.servicesTitle, description: t.meta.servicesDescription });
}

export default async function ServicesPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: localizePath(locale, "/") },
          { name: t.nav.services, path: localizePath(locale, "/services") },
        ])}
      />
      <PageHero
        eyebrow={t.servicesPage.eyebrow}
        title={t.servicesPage.title}
        lead={t.servicesPage.lead}
        breadcrumbLabel={t.nav.breadcrumbs}
        crumbs={[{ label: t.nav.home, href: localizePath(locale, "/") }, { label: t.nav.services }]}
      />

      <Section className="!py-16 sm:!py-20">
        <Container>
          <ul className="space-y-5">
            {services.map((s, i) => (
              <li key={s.slug} className="reveal">
                <article className="card grid gap-8 p-7 transition hover:shadow-lift sm:p-9 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-azure-50 text-azure-600 ring-1 ring-azure-100">
                        <Icon name={s.icon} className="h-6 w-6" />
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold sm:text-[1.7rem]">{tr(s.title, locale)}</h2>
                    <p className="mt-3 leading-relaxed text-ink-muted">{tr(s.short, locale)}</p>
                    <ButtonLink
                      href={localizePath(locale, `/services/${s.slug}`)}
                      variant="secondary"
                      size="sm"
                      icon="arrowRight"
                      className="mt-6"
                      aria-label={`${t.common.learnMore}: ${tr(s.title, locale)}`}
                    >
                      {t.common.learnMore}
                    </ButtonLink>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">{t.common.procedures}</p>
                    <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {s.procedures.map((p) => (
                        <li key={p.en} className="flex items-start gap-3 text-[0.97rem] text-navy-900">
                          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-azure-500" />
                          {tr(p, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-center text-lg text-ink-muted">{t.servicesPage.cta}</p>
        </Container>
      </Section>
      <FinalCta locale={locale} t={t} />
    </>
  );
}
