"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import {
  contactTimeOptions,
  emptyBooking,
  LIMITS,
  serviceOptions,
  timeframeOptions,
  timeSlots,
  todayISO,
  validateStep,
  type BookingData,
  type BookingErrors,
} from "@/lib/booking";
import { buttonClasses } from "@/components/ui/primitives";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type T = Dictionary["booking"];
type Status = "idle" | "sending" | "success" | "error";

const serviceIcons: Record<(typeof serviceOptions)[number], IconName> = {
  treatment: "tooth",
  implantology: "implant",
  orthodontics: "braces",
  prosthetics: "crown",
  endodontics: "microscope",
  surgery: "shield",
  hygiene: "sparkle",
  whitening: "smile",
  diagnostics: "scan",
  unsure: "info",
};
const timeframeIcons: IconName[] = ["alert", "calendar", "calendar", "info"];
const contactIcons: IconName[] = ["sparkle", "clock", "users", "check"];

const TOTAL = 5;

export function BookingForm({
  t,
  privacyHref,
  homeHref,
}: {
  t: T;
  privacyHref: string;
  homeHref: string;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [reference, setReference] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const [minDate, setMinDate] = useState("");

  useEffect(() => setMinDate(todayISO()), []);

  // Move focus to the step heading on step change (screen readers + keyboard users)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, status]);

  const update = <K extends keyof BookingData>(key: K, value: BookingData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const next = () => {
    const e = validateStep(step, data);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(TOTAL, s + 1));
  };

  const back = () => {
    setErrors({});
    setServerError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (step < TOTAL) return next();
    const e = validateStep(TOTAL, data);
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; fields?: BookingErrors };
      if (res.ok && json.ok) {
        setReference(json.reference ?? "");
        setStatus("success");
        return;
      }
      if (res.status === 422 && json.fields) {
        // Jump back to the first step that the server rejected
        setErrors(json.fields);
        const fields = Object.keys(json.fields);
        const order: Array<[number, string[]]> = [
          [1, ["service"]],
          [2, ["timeframe"]],
          [3, ["contactTime"]],
          [4, ["name", "phone", "email", "date"]],
        ];
        const target = order.find(([, keys]) => keys.some((k) => fields.includes(k)));
        if (target) setStep(target[0]);
        setStatus("idle");
        return;
      }
      setServerError(res.status === 429 ? t.errors.rateLimit : t.errors.server);
      setStatus("error");
    } catch {
      setServerError(t.errors.server);
      setStatus("error");
    }
  };

  const reset = () => {
    setData(emptyBooking);
    setErrors({});
    setReference("");
    setStatus("idle");
    setStep(1);
  };

  /* ---------------------------------------------------------------- */
  if (status === "success") {
    return (
      <div className="p-7 text-center sm:p-12" aria-live="polite">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-2xl font-semibold outline-none sm:text-3xl">
          {t.success.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-muted">{t.success.text}</p>
        {reference ? (
          <p className="mx-auto mt-6 inline-flex flex-col rounded-2xl bg-mist px-6 py-3 text-sm">
            <span className="text-ink-muted">{t.success.reference}</span>
            <span className="font-mono text-lg font-semibold tracking-wider text-navy-900">{reference}</span>
          </p>
        ) : null}
        <p className="mx-auto mt-6 flex max-w-md items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
          {t.success.demo}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={homeHref} className={buttonClasses("primary")}>
            {t.success.home}
          </Link>
          <button type="button" onClick={reset} className={buttonClasses("secondary")}>
            {t.success.again}
          </button>
        </div>
      </div>
    );
  }

  const stepTitle = [t.q1, t.q2, t.q3, t.q4, t.q5][step - 1];
  const progress = (step / TOTAL) * 100;

  return (
    <form onSubmit={submit} noValidate className="flex flex-col">
      {/* Progress */}
      <div className="border-b border-line px-6 pb-6 pt-7 sm:px-10">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-navy-900">
            {t.stepLabel} {step} {t.of} {TOTAL}
          </span>
          <span className="text-ink-muted">{t.steps[step - 1]}</span>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-cloud"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={step}
          aria-label={`${t.stepLabel} ${step} ${t.of} ${TOTAL}`}
        >
          <div className="h-full rounded-full bg-navy-900 transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <ol className="mt-4 hidden grid-cols-5 gap-2 text-xs sm:grid">
          {t.steps.map((label, i) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-1.5",
                i + 1 < step ? "text-azure-600" : i + 1 === step ? "font-semibold text-navy-900" : "text-ink-muted",
              )}
            >
              {i + 1 < step ? <Icon name="check" className="h-3.5 w-3.5" /> : <span className="tabular-nums">{i + 1}.</span>}
              {label}
            </li>
          ))}
        </ol>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none sm:text-[1.7rem]">
          {stepTitle}
        </h2>

        {/* Honeypot (hidden from users and assistive tech) */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" />
          </label>
        </div>

        {step === 1 ? (
          <ChoiceGroup
            name="service"
            legend={t.q1}
            hint={t.q1hint}
            value={data.service}
            error={errors.service ? t.errors.required : undefined}
            onChange={(v) => update("service", v as BookingData["service"])}
            options={serviceOptions.map((o) => ({ value: o, label: t.services[o], icon: serviceIcons[o] }))}
            columns="sm:grid-cols-2"
          />
        ) : null}

        {step === 2 ? (
          <ChoiceGroup
            name="timeframe"
            legend={t.q2}
            value={data.timeframe}
            error={errors.timeframe ? t.errors.required : undefined}
            onChange={(v) => update("timeframe", v as BookingData["timeframe"])}
            options={timeframeOptions.map((o, i) => ({ value: o, label: t.timeframes[o], icon: timeframeIcons[i] }))}
            columns="sm:grid-cols-2"
          />
        ) : null}

        {step === 3 ? (
          <ChoiceGroup
            name="contactTime"
            legend={t.q3}
            value={data.contactTime}
            error={errors.contactTime ? t.errors.required : undefined}
            onChange={(v) => update("contactTime", v as BookingData["contactTime"])}
            options={contactTimeOptions.map((o, i) => ({ value: o, label: t.contactTimes[o], icon: contactIcons[i] }))}
            columns="sm:grid-cols-2"
          />
        ) : null}

        {step === 4 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field id="bk-name" label={t.fields.name} error={errors.name ? t.errors.name : undefined} className="sm:col-span-2">
              <input
                id="bk-name"
                className="input"
                autoComplete="name"
                maxLength={LIMITS.name}
                placeholder={t.fields.namePlaceholder}
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "bk-name-err" : undefined}
                required
              />
            </Field>
            <Field id="bk-phone" label={t.fields.phone} error={errors.phone ? t.errors.phone : undefined}>
              <input
                id="bk-phone"
                className="input"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={LIMITS.phone}
                placeholder={t.fields.phonePlaceholder}
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "bk-phone-err" : undefined}
                required
              />
            </Field>
            <Field id="bk-email" label={t.fields.email} optional={t.fields.optional} error={errors.email ? t.errors.email : undefined}>
              <input
                id="bk-email"
                className="input"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={LIMITS.email}
                placeholder={t.fields.emailPlaceholder}
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "bk-email-err" : undefined}
              />
            </Field>
            <Field id="bk-date" label={t.fields.date} optional={t.fields.optional} error={errors.date ? t.errors.date : undefined}>
              <input
                id="bk-date"
                className="input"
                type="date"
                min={minDate || undefined}
                value={data.date}
                onChange={(e) => update("date", e.target.value)}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "bk-date-err" : undefined}
              />
            </Field>
            <Field id="bk-time" label={t.fields.time} optional={t.fields.optional}>
              <select id="bk-time" className="input" value={data.time} onChange={(e) => update("time", e.target.value)}>
                <option value="">{t.fields.anyTime}</option>
                {timeSlots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="bk-msg" label={t.fields.message} optional={t.fields.optional} className="sm:col-span-2">
              <textarea
                id="bk-msg"
                className="input min-h-24 resize-y"
                maxLength={LIMITS.message}
                placeholder={t.fields.messagePlaceholder}
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </Field>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="mt-7 space-y-6">
            <div className="rounded-2xl bg-mist p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">{t.summary}</p>
              <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                <Summary label={t.steps[0]} value={data.service ? t.services[data.service] : "—"} />
                <Summary label={t.steps[1]} value={data.timeframe ? t.timeframes[data.timeframe] : "—"} />
                <Summary label={t.steps[2]} value={data.contactTime ? t.contactTimes[data.contactTime] : "—"} />
                <Summary label={t.fields.name} value={data.name} />
                <Summary label={t.fields.phone} value={data.phone} />
                {data.email ? <Summary label={t.fields.email} value={data.email} /> : null}
                {data.date || data.time ? (
                  <Summary label={t.fields.date} value={[data.date, data.time].filter(Boolean).join(" · ")} />
                ) : null}
              </dl>
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line p-4 transition hover:border-navy-900/20">
                <input
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-navy-900"
                  checked={data.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "bk-consent-err" : undefined}
                />
                <span className="text-sm leading-relaxed text-ink-soft">
                  <ConsentText text={t.consent} linkText={t.consentLink} href={privacyHref} />
                </span>
              </label>
              {errors.consent ? <ErrorText id="bk-consent-err">{t.errors.consent}</ErrorText> : null}
            </div>

            <p className="flex items-start gap-2 text-sm text-ink-muted">
              <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              {t.demoNotice}
            </p>

            {serverError ? (
              <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {serverError}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Navigation */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line px-6 py-5 sm:px-10">
        {step > 1 ? (
          <button type="button" onClick={back} className={buttonClasses("ghost", "md", "-ml-3")}>
            <Icon name="chevronLeft" className="h-4 w-4" />
            {t.back}
          </button>
        ) : (
          <span />
        )}
        {step < TOTAL ? (
          <button type="submit" className={buttonClasses("primary", "md", "min-w-36")}>
            {t.next}
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className={buttonClasses("primary", "md", "min-w-44")}>
            {status === "sending" ? t.sending : t.submit}
          </button>
        )}
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
function ChoiceGroup({
  name,
  legend,
  hint,
  value,
  options,
  onChange,
  error,
  columns,
}: {
  name: string;
  legend: string;
  hint?: string;
  value: string;
  options: Array<{ value: string; label: string; icon: IconName }>;
  onChange: (v: string) => void;
  error?: string;
  columns?: string;
}) {
  const errId = `${name}-err`;
  return (
    <fieldset className="mt-6" aria-describedby={error ? errId : undefined}>
      <legend className="sr-only">{legend}</legend>
      {hint ? <p className="mb-5 text-ink-muted">{hint}</p> : null}
      <div className={cn("grid gap-3", columns)}>
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                "group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-azure-100",
                checked ? "border-navy-900 bg-navy-900 text-white shadow-lift" : "border-line bg-white hover:border-navy-900/25 hover:bg-mist",
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
                  checked ? "bg-white/15 text-white" : "bg-azure-50 text-azure-600",
                )}
              >
                <Icon name={o.icon} className="h-5 w-5" />
              </span>
              <span className={cn("flex-1 font-medium", checked ? "text-white" : "text-navy-900")}>{o.label}</span>
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  checked ? "border-white bg-white text-navy-900" : "border-line",
                )}
                aria-hidden="true"
              >
                {checked ? <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
              </span>
            </label>
          );
        })}
      </div>
      {error ? <ErrorText id={errId}>{error}</ErrorText> : null}
    </fieldset>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy-900">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-ink-muted">({optional})</span> : <span className="ml-0.5 text-azure-600">*</span>}
      </label>
      {children}
      {error ? <ErrorText id={`${id}-err`}>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700">
      <Icon name="alert" className="h-4 w-4 shrink-0" />
      {children}
    </p>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="truncate font-semibold text-navy-900">{value}</dd>
    </div>
  );
}

/** Renders the consent sentence with the privacy-policy words turned into a link (no raw HTML). */
function ConsentText({ text, linkText, href }: { text: string; linkText: string; href: string }) {
  const i = text.indexOf(linkText);
  if (i === -1) {
    return (
      <>
        {text}{" "}
        <Link href={href} target="_blank" className="font-semibold text-navy-900 underline underline-offset-2">
          {linkText}
        </Link>
      </>
    );
  }
  return (
    <>
      {text.slice(0, i)}
      <Link href={href} target="_blank" className="font-semibold text-navy-900 underline underline-offset-2">
        {linkText}
      </Link>
      {text.slice(i + linkText.length)}
    </>
  );
}
