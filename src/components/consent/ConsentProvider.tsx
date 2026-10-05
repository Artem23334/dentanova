"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Cookie consent state.
 * The choice is stored in a first-party "necessary" cookie (dn_consent, 180 days).
 * Optional technologies must check `consent.analytics` / `consent.marketing`
 * before loading.
 */
export type ConsentCategories = { necessary: true; analytics: boolean; marketing: boolean };
type Consent = ConsentCategories & { decided: boolean };

type ConsentContextValue = {
  consent: Consent;
  ready: boolean;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  save: (choice: { analytics: boolean; marketing: boolean }) => void;
  acceptAll: () => void;
  rejectOptional: () => void;
};

const COOKIE = "dn_consent";
const VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 180;
const initial: Consent = { necessary: true, analytics: false, marketing: false, decided: false };

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readCookie(): Consent | null {
  try {
    const match = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
    if (!match) return null;
    const parsed = JSON.parse(decodeURIComponent(match.slice(COOKIE.length + 1)));
    if (parsed?.v !== VERSION) return null;
    return { necessary: true, analytics: parsed.a === true, marketing: parsed.m === true, decided: true };
  } catch {
    return null;
  }
}

function writeCookie(c: { analytics: boolean; marketing: boolean }) {
  const value = encodeURIComponent(JSON.stringify({ v: VERSION, a: c.analytics, m: c.marketing, t: Date.now() }));
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent>(initial);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readCookie();
    if (stored) setConsent(stored);
    setReady(true);
  }, []);

  const save = useCallback((choice: { analytics: boolean; marketing: boolean }) => {
    writeCookie(choice);
    setConsent({ necessary: true, ...choice, decided: true });
    setSettingsOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      save,
      acceptAll: () => save({ analytics: true, marketing: true }),
      rejectOptional: () => save({ analytics: false, marketing: false }),
    }),
    [consent, ready, settingsOpen, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
