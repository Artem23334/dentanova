import type { Dictionary } from "@/i18n";
import { localizePath, tr, type Locale } from "@/i18n/config";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { popularPrices } from "@/data/prices";
import { faqs, technologies, testimonials } from "@/data/content";
import { galleryImages, images } from "@/data/images";
import { site } from "@/config/site";
import {
  ButtonLink,
  Container,
  DemoBadge,
  DemoNote,
  IconBadge,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SmartImage } from "@/components/ui/SmartImage";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";
import { DoctorCard, PriceRows, ServiceCard } from "./cards";

type P = { locale: Locale; t: Dictionary };

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */
const benefitIcons: IconName[] = ["scan", "users", "layers", "heart"];

export function Benefits({ t }: P) {
  return (
    <Section labelledBy="benefits-title" className="bg-mist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="benefits-title" eyebrow={t.benefits.eyebrow} title={t.benefits.title} text={t.benefits.text} />
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {t.benefits.items.map((b, i) => (
              <li key={b.title} className="reveal card p-7">
                <IconBadge name={benefitIcons[i] ?? "check"} />
                <h3 className="mt-6 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export function ServicesGrid({ locale, t }: P) {
  return (
    <Section id="services" labelledBy="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow={t.servicesSection.eyebrow}
          title={t.servicesSection.title}
          text={t.servicesSection.text}
          aside={
            <ButtonLink href={localizePath(locale, "/services")} variant="secondary" icon="arrowRight">
              {t.common.allServices}
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug} className="reveal">
              <ServiceCard service={s} locale={locale} cta={t.common.learnMore} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Technology                                                          */
/* ------------------------------------------------------------------ */
export function Technology({ locale, t }: P) {
  return (
    <Section labelledBy="tech-title" className="relative overflow-hidden bg-navy-900 text-white">
      <div className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-azure-500/20 blur-3xl" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading id="tech-title" eyebrow={t.technology.eyebrow} title={t.technology.title} text={t.technology.text} dark />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="relative min-h-[22rem] overflow-hidden rounded-3xl bg-navy-800 lg:col-span-5">
            <SmartImage
              src={images.xray.src}
              alt={tr(images.xray.alt, locale)}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <Icon name="cube" className="h-6 w-6 text-azure-200" />
              <p className="text-sm font-semibold">{tr(technologies[0].title, locale)}</p>
            </div>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-7">
            {technologies.map((tech, i) => (
              <li
                key={tech.title.en}
                className={cn("bg-navy-900 p-7 transition hover:bg-navy-800", i === 0 && "sm:col-span-2")}
              >
                <div className="flex items-center gap-4">
                  <IconBadge name={tech.icon} dark />
                  <h3 className="text-lg font-semibold text-white">{tr(tech.title, locale)}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-white/65">{tr(tech.text, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */
export function Process({ t }: P) {
  return (
    <Section labelledBy="process-title">
      <Container>
        <SectionHeading id="process-title" eyebrow={t.process.eyebrow} title={t.process.title} text={t.process.text} />
        <ol className="relative mt-14 grid gap-5 md:grid-cols-5">
          <span className="absolute left-0 right-[16%] top-7 hidden h-px bg-gradient-to-r from-azure-200 via-azure-400 to-azure-200 md:block" aria-hidden="true" />
          {t.process.steps.map((step, i) => (
            <li key={step.title} className="reveal relative flex gap-5 md:block">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-white text-lg font-semibold tabular-nums text-navy-900 shadow-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-6">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Doctors                                                             */
/* ------------------------------------------------------------------ */
export function DoctorsPreview({ locale, t }: P) {
  return (
    <Section labelledBy="doctors-title" className="bg-mist">
      <Container>
        <SectionHeading
          id="doctors-title"
          eyebrow={t.doctorsSection.eyebrow}
          title={t.doctorsSection.title}
          text={t.doctorsSection.text}
          aside={
            <ButtonLink href={localizePath(locale, "/doctors")} variant="secondary" icon="arrowRight">
              {t.doctorsSection.cta}
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.slice(0, 4).map((d) => (
            <li key={d.id} className="reveal">
              <DoctorCard doctor={d} locale={locale} t={t} />
            </li>
          ))}
        </ul>
        <DemoNote className="mt-8">{t.demo.doctorsNote}</DemoNote>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Prices                                                              */
/* ------------------------------------------------------------------ */
export function PricesPreview({ locale, t }: P) {
  return (
    <Section labelledBy="prices-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="prices-title" eyebrow={t.pricesSection.eyebrow} title={t.pricesSection.title} text={t.pricesSection.text} />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={localizePath(locale, "/prices")} icon="arrowRight">
                {t.pricesSection.cta}
              </ButtonLink>
              <ButtonLink href={localizePath(locale, "/booking")} variant="secondary">
                {t.nav.book}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="card relative p-6 sm:p-8">
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-muted">{t.common.popular}</p>
                <DemoBadge label={t.demo.badge} />
              </div>
              <PriceRows items={popularPrices} locale={locale} t={t} />
            </div>
            <DemoNote className="mt-5">{t.demo.pricesNote}</DemoNote>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */
// First image is large (2×2), the other four fill the grid evenly.
const galleryLayout = ["sm:col-span-2 sm:row-span-2", "", "", "", ""];

export function Gallery({ locale, t, headingLevel = "h2" }: P & { headingLevel?: "h2" }) {
  return (
    <Section labelledBy="gallery-title" className="bg-mist">
      <Container>
        <SectionHeading id="gallery-title" as={headingLevel} eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} />
        <ul className="mt-14 grid auto-rows-[13rem] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[14rem]">
          {galleryImages.map((key, i) => (
            <li key={key} className={cn("reveal relative overflow-hidden rounded-3xl bg-cloud", galleryLayout[i])}>
              <SmartImage
                src={images[key].src}
                alt={tr(images[key].alt, locale)}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 hover:scale-[1.03]"
              />
            </li>
          ))}
        </ul>
        <DemoNote className="mt-6">{t.demo.galleryNote}</DemoNote>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials (fictional)                                            */
/* ------------------------------------------------------------------ */
export function Testimonials({ locale, t }: P) {
  return (
    <Section labelledBy="testimonials-title">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          text={t.testimonials.text}
          aside={<DemoBadge label={t.demo.badge} className="text-xs" />}
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((r) => (
            <li key={r.name} className="reveal">
              <figure className="card flex h-full flex-col p-7">
                <Icon name="quote" className="h-8 w-8 text-azure-400" />
                <blockquote className="mt-5 flex-1 leading-relaxed text-ink-soft">{tr(r.text, locale)}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                    {r.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-navy-900">
                      {r.name} <span className="font-normal text-ink-muted">· {t.demo.badge}</span>
                    </span>
                    <span className="block text-xs text-ink-muted">{tr(r.service, locale)}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <DemoNote className="mt-8">{t.demo.testimonialsNote}</DemoNote>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export function FaqSection({ locale, t }: P) {
  return (
    <Section id="faq" labelledBy="faq-title" className="bg-mist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} text={t.faq.text} />
              <a href={site.phoneHref} className="mt-8 inline-flex items-center gap-3 font-semibold text-navy-900 hover:text-azure-600">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-azure-600 shadow-soft">
                  <Icon name="phone" />
                </span>
                {site.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs.map((f) => ({ question: tr(f.q, locale), answer: tr(f.a, locale) }))} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */
export function FinalCta({ locale, t }: P) {
  return (
    <section aria-labelledby="final-cta-title" className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-azure-500/30 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="final-cta-title" className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {t.finalCta.title}
            </h2>
            <p className="mt-5 text-lg text-white/70">{t.finalCta.text}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={localizePath(locale, "/booking")} variant="light" size="lg" icon="arrowRight">
                {t.finalCta.cta}
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-7 font-semibold text-white transition hover:bg-white/10"
              >
                <Icon name="phone" className="h-5 w-5" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
