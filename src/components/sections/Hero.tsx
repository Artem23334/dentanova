import type { Dictionary } from "@/i18n";
import { localizePath, tr, type Locale } from "@/i18n/config";
import { images } from "@/data/images";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SmartImage } from "@/components/ui/SmartImage";

const trustIcons: IconName[] = ["scan", "users", "heart", "globe"];

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
        <div className="absolute -right-32 -top-48 h-[36rem] w-[36rem] rounded-full bg-azure-100/70 blur-3xl" />
      </div>

      <Container className="relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="animate-fade-up lg:col-span-6">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-5 text-[2.6rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-xl font-medium text-navy-800 sm:text-2xl">{t.hero.text}</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">{t.hero.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={localizePath(locale, "/booking")} size="lg" icon="arrowRight">
              {t.hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink href={localizePath(locale, "/services")} variant="secondary" size="lg">
              {t.hero.ctaSecondary}
            </ButtonLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {t.hero.trust.map((item, i) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium leading-snug text-navy-900">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-azure-50 text-azure-600 ring-1 ring-azure-100">
                  <Icon name={trustIcons[i] ?? "check"} className="h-[1.1rem] w-[1.1rem]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms] lg:col-span-6 lg:pl-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-cloud shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <SmartImage
              src={images.hero.src}
              alt={tr(images.hero.alt, locale)}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  );
}
