import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { localeLabels, localizePath, tr, type Locale } from "@/i18n/config";
import { mapsRouteUrl, site } from "@/config/site";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/map/MapEmbed";

/** Contact details + Google Map. Rendered right before the footer. */
export function ContactSection({
  locale,
  t,
  showHeading = true,
}: {
  locale: Locale;
  t: Dictionary;
  showHeading?: boolean;
}) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-20 pt-4 sm:pb-28">
      <Container>
        {showHeading ? (
          <SectionHeading id="contact-title" eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.text} />
        ) : (
          <h2 id="contact-title" className="sr-only">
            {t.contact.title}
          </h2>
        )}

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <div className="card flex flex-col p-7 sm:p-9 lg:col-span-5">
            <address className="flex-1 space-y-6 not-italic">
              <ContactRow icon="pin" label={t.common.address}>
                <span className="block font-semibold text-navy-900">
                  {site.address.street}, {site.address.postalCode} {site.address.city}
                </span>
                <span className="block text-sm text-ink-muted">
                  {tr(site.address.district, locale)} · {t.contact.demoAddress}
                </span>
              </ContactRow>
              <ContactRow icon="phone" label={t.common.phone}>
                <a href={site.phoneHref} className="font-semibold text-navy-900 hover:text-azure-600">
                  {site.phone}
                </a>
              </ContactRow>
              <ContactRow icon="mail" label={t.common.email}>
                <a href={`mailto:${site.email}`} className="font-semibold text-navy-900 hover:text-azure-600">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon="clock" label={t.common.hours}>
                <ul className="space-y-1">
                  {site.hours.map((h) => (
                    <li key={h.days.en} className="flex justify-between gap-6 text-[0.95rem]">
                      <span className="text-ink-muted">{tr(h.days, locale)}</span>
                      <span className="font-semibold tabular-nums text-navy-900">{h.time ?? t.common.closed}</span>
                    </li>
                  ))}
                </ul>
              </ContactRow>
            </address>

            <div className="mt-9 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={localizePath(locale, "/booking")} className="flex-1">
                {t.nav.book}
              </ButtonLink>
              <a
                href={mapsRouteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line px-6 text-[0.95rem] font-semibold text-navy-900 transition hover:bg-mist"
              >
                <Icon name="route" className="h-5 w-5" />
                {t.common.route}
                <span className="sr-only">({t.common.externalLink})</span>
              </a>
            </div>
          </div>

          <MapEmbed
            lang={localeLabels[locale].htmlLang}
            title={t.contact.mapTitle}
            loadLabel={t.contact.loadMap}
            notice={t.contact.mapNotice}
            className="min-h-[22rem] lg:col-span-7 lg:min-h-full"
          />
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: "pin" | "phone" | "mail" | "clock";
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-azure-50 text-azure-600 ring-1 ring-azure-100">
        <Icon name={icon} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
