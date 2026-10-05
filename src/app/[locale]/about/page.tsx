import type { Metadata } from "next";
import { localizePath, tr } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { images } from "@/data/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Container, IconBadge, Section, SectionHeading } from "@/components/ui/primitives";
import type { IconName } from "@/components/ui/Icon";
import { SmartImage } from "@/components/ui/SmartImage";
import { FinalCta, Gallery, Process, Technology } from "@/components/sections/HomeSections";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata({ locale, path: "/about", title: t.meta.aboutTitle, description: t.meta.aboutDescription });
}

const valueIcons: IconName[] = ["layers", "microscope", "heart", "globe"];

export default async function AboutPage({ params }: Props) {
  const { locale, t } = await resolveLocale(params);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: localizePath(locale, "/") },
          { name: t.nav.about, path: localizePath(locale, "/about") },
        ])}
      />
      <PageHero
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        lead={t.about.lead}
        breadcrumbLabel={t.nav.breadcrumbs}
        crumbs={[{ label: t.nav.home, href: localizePath(locale, "/") }, { label: t.nav.about }]}
      />

      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cloud shadow-lift">
                <SmartImage src={images.office.src} alt={tr(images.office.alt, locale)} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden aspect-square w-48 overflow-hidden rounded-3xl border-8 border-white bg-cloud shadow-lift sm:block">
                <SmartImage src={images.lounge.src} alt={tr(images.lounge.alt, locale)} fill sizes="200px" className="object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">{t.about.storyTitle}</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
                {t.about.story.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-mist" labelledBy="values-title">
        <Container>
          <SectionHeading id="values-title" title={t.about.valuesTitle} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v, i) => (
              <li key={v.title} className="reveal card p-7">
                <IconBadge name={valueIcons[i] ?? "check"} />
                <h3 className="mt-6 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Technology locale={locale} t={t} />
      <Process locale={locale} t={t} />
      <Gallery locale={locale} t={t} />
      <FinalCta locale={locale} t={t} />
    </>
  );
}
