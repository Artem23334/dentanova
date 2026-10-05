import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { doctors } from "@/data/doctors";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { DoctorCard } from "@/components/sections/cards";
import { FinalCta } from "@/components/sections/HomeSections";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata({ locale, path: "/doctors", title: t.meta.doctorsTitle, description: t.meta.doctorsDescription });
}

export default async function DoctorsPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: localizePath(locale, "/") },
          { name: t.nav.doctors, path: localizePath(locale, "/doctors") },
        ])}
      />
      <PageHero
        eyebrow={t.doctorsPage.eyebrow}
        title={t.doctorsPage.title}
        lead={t.doctorsPage.lead}
        breadcrumbLabel={t.nav.breadcrumbs}
        crumbs={[{ label: t.nav.home, href: localizePath(locale, "/") }, { label: t.nav.doctors }]}
      >
        <p className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
          {t.demo.doctorsNote}
        </p>
      </PageHero>
      <Section className="!py-16 sm:!py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => (
              <li key={d.id} className="reveal">
                <DoctorCard doctor={d} locale={locale} t={t} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <FinalCta locale={locale} t={t} />
    </>
  );
}
