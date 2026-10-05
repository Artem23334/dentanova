import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { localizePath, tr, type Locale } from "@/i18n/config";
import { site } from "@/config/site";
import { Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { CookieSettingsButton } from "@/components/consent/CookieBanner";
import { Logo } from "./Logo";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const year = new Date().getFullYear();
  const links = [
    { href: "/services", label: t.nav.services },
    { href: "/prices", label: t.nav.prices },
    { href: "/about", label: t.nav.about },
    { href: "/doctors", label: t.nav.doctors },
    { href: "/#faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
    { href: "/booking", label: t.nav.book },
  ];
  const linkCls = "text-white/70 transition hover:text-white";

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <Container className="relative pb-28 pt-16 sm:pt-20 md:pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href={localizePath(locale, "/")} aria-label={site.name}>
              <Logo light />
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-white/65">{t.footer.description}</p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-white">{t.footer.followTitle}</p>
              <div className="mt-3 flex gap-2">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram (${t.common.externalLink})`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <Icon name="instagram" />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook (${t.common.externalLink})`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <Icon name="facebook" />
                </a>
              </div>
            </div>
          </div>

          <nav aria-label={t.footer.navTitle} className="lg:col-span-3 lg:col-start-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">{t.footer.navTitle}</h2>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={localizePath(locale, l.href)} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">{t.footer.contactTitle}</h2>
            <address className="mt-5 space-y-4 not-italic">
              <a href={site.phoneHref} className="flex items-center gap-3 text-lg font-semibold text-white hover:text-azure-200">
                <Icon name="phone" className="h-5 w-5 text-azure-400" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className={`flex items-center gap-3 ${linkCls}`}>
                <Icon name="mail" className="h-5 w-5 text-azure-400" />
                {site.email}
              </a>
              <p className="flex items-start gap-3 text-white/70">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-azure-400" />
                <span>
                  {site.address.street}, {site.address.postalCode} {site.address.city}
                  <span className="block text-sm text-white/45">{t.contact.demoAddress}</span>
                </span>
              </p>
              <div className="flex items-start gap-3 text-white/70">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-azure-400" />
                <ul className="space-y-1 text-sm">
                  {site.hours.map((h) => (
                    <li key={h.days.en} className="flex gap-3">
                      <span className="w-20">{tr(h.days, locale)}</span>
                      <span className="text-white">{h.time ?? t.common.closed}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </address>
          </div>
        </div>

        <p className="mt-14 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          {t.demo.footerNote}
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={localizePath(locale, "/privacy")} className="hover:text-white">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={localizePath(locale, "/cookies")} className="hover:text-white">
                {t.footer.cookies}
              </Link>
            </li>
            <li>
              <CookieSettingsButton label={t.footer.cookieSettings} className="hover:text-white" />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
