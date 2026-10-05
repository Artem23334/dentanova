import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { BookingForm } from "@/components/booking/BookingForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata({ locale, path: "/booking", title: t.meta.bookingTitle, description: t.meta.bookingDescription });
}

export default async function BookingPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);

  return (
    <>
      <PageHero
        eyebrow={t.booking.eyebrow}
        title={t.booking.title}
        lead={t.booking.text}
        breadcrumbLabel={t.nav.breadcrumbs}
        crumbs={[{ label: t.nav.home, href: localizePath(locale, "/") }, { label: t.booking.title }]}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-lift lg:col-span-8">
              <BookingForm
                t={t.booking}
                privacyHref={localizePath(locale, "/privacy")}
                homeHref={localizePath(locale, "/")}
              />
            </div>

            <aside className="space-y-5 lg:col-span-4">
              <div className="rounded-3xl bg-navy-900 p-7 text-white">
                <h2 className="text-lg font-semibold text-white">{t.booking.asideTitle}</h2>
                <ol className="mt-5 space-y-4">
                  {t.booking.aside.map((line, i) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed text-white/75">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      {line}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="card p-7">
                <p className="text-sm text-ink-muted">{t.booking.asideCall}</p>
                <a href={site.phoneHref} className="mt-2 flex items-center gap-3 text-xl font-semibold text-navy-900 hover:text-azure-600">
                  <Icon name="phone" className="h-5 w-5 text-azure-600" />
                  {site.phone}
                </a>
                <ul className="mt-5 space-y-1.5 border-t border-line pt-5 text-sm">
                  {site.hours.map((h) => (
                    <li key={h.days.en} className="flex justify-between gap-4">
                      <span className="text-ink-muted">{h.days[locale]}</span>
                      <span className="font-semibold tabular-nums text-navy-900">{h.time ?? t.common.closed}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
                {t.booking.demoNotice}
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
