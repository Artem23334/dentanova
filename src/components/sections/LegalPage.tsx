import type { Dictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { CookieSettingsButton } from "@/components/consent/CookieBanner";
import { buttonClasses } from "@/components/ui/primitives";

/** Shared layout for the placeholder Privacy / Cookie policy pages. */
export function LegalPage({
  locale,
  t,
  title,
  sections,
  showCookieButton = false,
}: {
  locale: Locale;
  t: Dictionary;
  title: string;
  sections: Array<{ title: string; text: string }>;
  showCookieButton?: boolean;
}) {
  return (
    <>
      <PageHero
        title={title}
        breadcrumbLabel={t.nav.breadcrumbs}
        crumbs={[{ label: t.nav.home, href: localizePath(locale, "/") }, { label: title }]}
      >
        <p className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
          {t.legal.placeholder}
        </p>
      </PageHero>
      <Container className="py-14 sm:py-20">
        <article className="prose-legal max-w-3xl">
          {sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          {showCookieButton ? (
            <CookieSettingsButton label={t.footer.cookieSettings} className={buttonClasses("primary", "md", "mt-10")} />
          ) : null}
        </article>
      </Container>
    </>
  );
}
