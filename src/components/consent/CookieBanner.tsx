"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";
import { buttonClasses } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { useConsent } from "./ConsentProvider";

type Props = { locale: Locale; t: Dictionary["cookies"]; footer: Dictionary["footer"] };

export function CookieBanner({ locale, t, footer }: Props) {
  const { consent, ready, settingsOpen, openSettings, closeSettings, save, acceptAll, rejectOptional } = useConsent();
  const showBanner = ready && !consent.decided && !settingsOpen;

  return (
    <>
      {showBanner ? (
        <div
          role="region"
          aria-label={t.title}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl animate-fade-up rounded-3xl border border-line bg-white/95 p-5 shadow-lift backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-azure-50 text-azure-600 sm:flex">
              <Icon name="cookie" className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-navy-900">{t.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                {t.text}{" "}
                <Link href={localizePath(locale, "/privacy")} className="underline underline-offset-2 hover:text-navy-900">
                  {footer.privacy}
                </Link>
                {" · "}
                <Link href={localizePath(locale, "/cookies")} className="underline underline-offset-2 hover:text-navy-900">
                  {footer.cookies}
                </Link>
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button type="button" onClick={acceptAll} className={buttonClasses("primary", "sm")}>
                  {t.acceptAll}
                </button>
                <button type="button" onClick={rejectOptional} className={buttonClasses("secondary", "sm")}>
                  {t.rejectOptional}
                </button>
                <button type="button" onClick={openSettings} className={buttonClasses("ghost", "sm", "underline-offset-4 hover:underline")}>
                  {t.settings}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {settingsOpen ? (
        <SettingsDialog
          t={t}
          initial={{ analytics: consent.analytics, marketing: consent.marketing }}
          onClose={closeSettings}
          onSave={save}
          onAcceptAll={acceptAll}
        />
      ) : null}
    </>
  );
}

function SettingsDialog({
  t,
  initial,
  onClose,
  onSave,
  onAcceptAll,
}: {
  t: Dictionary["cookies"];
  initial: { analytics: boolean; marketing: boolean };
  onClose: () => void;
  onSave: (c: { analytics: boolean; marketing: boolean }) => void;
  onAcceptAll: () => void;
}) {
  const [choice, setChoice] = useState(initial);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus management + Escape to close + simple focus trap
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const el = dialogRef.current;
    el?.querySelector<HTMLElement>("button, input")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && el) {
        const focusables = el.querySelectorAll<HTMLElement>("button, input, a[href]");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const rows: Array<{ key: "necessary" | "analytics" | "marketing"; locked?: boolean }> = [
    { key: "necessary", locked: true },
    { key: "analytics" },
    { key: "marketing" },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-950/50 p-3 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-lift sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookie-settings-title" className="text-xl font-semibold">
            {t.settingsTitle}
          </h2>
          <button type="button" onClick={onClose} aria-label={t.close} className="-m-2 rounded-full p-2 text-ink-muted hover:bg-cloud hover:text-navy-900">
            <Icon name="close" />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.settingsText}</p>

        <ul className="mt-6 space-y-3">
          {rows.map(({ key, locked }) => {
            const checked = locked ? true : choice[key as "analytics" | "marketing"];
            const id = `consent-${key}`;
            return (
              <li key={key} className="rounded-2xl border border-line p-4">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor={id} className="font-semibold text-navy-900">
                    {t.categories[key].title}
                  </label>
                  {locked ? (
                    <span className="text-xs font-semibold text-azure-600">{t.alwaysOn}</span>
                  ) : null}
                  <input
                    id={id}
                    type="checkbox"
                    role="switch"
                    aria-checked={checked}
                    checked={checked}
                    disabled={locked}
                    onChange={(e) => setChoice((c) => ({ ...c, [key]: e.target.checked }))}
                    className={cn(
                      "relative h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full bg-line transition",
                      "before:absolute before:left-0.5 before:top-0.5 before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition",
                      "checked:bg-navy-900 checked:before:translate-x-5 disabled:cursor-not-allowed disabled:opacity-60",
                      locked && "sr-only",
                    )}
                  />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.categories[key].text}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={() => onSave(choice)} className={buttonClasses("secondary", "md", "flex-1")}>
            {t.save}
          </button>
          <button type="button" onClick={onAcceptAll} className={buttonClasses("primary", "md", "flex-1")}>
            {t.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Small button (used in the footer) to reopen cookie settings at any time. */
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className={className}>
      {label}
    </button>
  );
}
