"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { localizePath, stripLocale, type Locale } from "@/i18n/config";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = { locale: Locale; nav: Dictionary["nav"]; demo: Dictionary["demo"]; callLabel: string };

export function Header({ locale, nav, demo, callLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = stripLocale(usePathname() || "/");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [panelTop, setPanelTop] = useState(72);

  const links = [
    { href: "/services", label: nav.services },
    { href: "/prices", label: nav.prices },
    { href: "/about", label: nav.about },
    { href: "/doctors", label: nav.doctors },
    { href: "/#faq", label: nav.faq },
    { href: "/contact", label: nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll + Escape + focus first link while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    setPanelTop(Math.max(0, headerRef.current?.getBoundingClientRect().bottom ?? 72));
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href !== "/#faq" && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[80] rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {nav.skip}
      </a>

      {/* Demo disclosure bar */}
      <div className="bg-navy-950 text-white/80">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center text-[0.75rem] leading-snug sm:px-8">
          <span className="rounded-full bg-amber-400/90 px-2 py-px text-[0.65rem] font-bold uppercase tracking-wider text-navy-950">
            {demo.badge}
          </span>
          <span>{demo.bar}</span>
        </p>
      </div>

      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open
            ? "border-line bg-white/90 shadow-[0_6px_24px_-18px_rgb(11_29_58/0.35)] backdrop-blur-xl"
            : "border-transparent bg-white",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20">
          <Link href={localizePath(locale, "/")} aria-label={`${site.name} — ${nav.home}`} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label={nav.menu} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localizePath(locale, l.href)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition hover:text-navy-900",
                      isActive(l.href) ? "text-navy-900" : "text-ink-soft",
                    )}
                  >
                    {l.label}
                    {isActive(l.href) ? (
                      <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-azure-500" aria-hidden="true" />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-sm font-semibold text-navy-900 transition hover:text-azure-600 xl:flex"
            >
              <Icon name="phone" className="h-4 w-4 text-azure-600" />
              {site.phone}
            </a>
            <LanguageSwitcher locale={locale} label={nav.language} className="hidden sm:block" />
            <div className="hidden md:block">
              <Link href={localizePath(locale, "/booking")} className={buttonClasses("primary", "sm")}>
                {nav.book}
              </Link>
            </div>
            <a
              href={site.phoneHref}
              aria-label={`${callLabel}: ${site.phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy-900 lg:hidden"
            >
              <Icon name="phone" className="h-[1.1rem] w-[1.1rem]" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.closeMenu : nav.openMenu}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-white lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu (outside <header>: backdrop-filter would trap position:fixed) */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        style={{ top: panelTop }}
        className="fixed inset-x-0 bottom-0 z-[45] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <div className="flex min-h-full flex-col px-5 pb-8 pt-4 sm:px-8">
          <nav aria-label={nav.menu}>
            <ul className="divide-y divide-line">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localizePath(locale, l.href)}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 text-xl font-semibold text-navy-900"
                  >
                    {l.label}
                    <Icon name="arrowRight" className="h-5 w-5 text-ink-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-5 pt-8">
            <LanguageSwitcher locale={locale} label={nav.language} onNavigate={() => setOpen(false)} />
            <a href={site.phoneHref} className="flex items-center gap-3 text-lg font-semibold text-navy-900">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-azure-50 text-azure-600">
                <Icon name="phone" />
              </span>
              {site.phone}
            </a>
            <Link
              href={localizePath(locale, "/booking")}
              onClick={() => setOpen(false)}
              className={buttonClasses("primary", "lg", "w-full")}
            >
              {nav.book}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
