import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { localizePath, tr, type Locale } from "@/i18n/config";
import type { Service } from "@/data/services";
import type { Doctor } from "@/data/doctors";
import type { PriceItem } from "@/data/prices";
import { DemoBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn, formatAmount } from "@/lib/utils";

/* ------------------------------------------------------------------ */
export function ServiceCard({ service, locale, cta }: { service: Service; locale: Locale; cta: string }) {
  return (
    <Link
      href={localizePath(locale, `/services/${service.slug}`)}
      className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-azure-200 hover:shadow-lift"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-azure-50 text-azure-600 ring-1 ring-azure-100 transition group-hover:bg-navy-900 group-hover:text-white group-hover:ring-navy-900">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-6 text-xl font-semibold">{tr(service.title, locale)}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{tr(service.short, locale)}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
        {cta}
        <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
export function DoctorCard({ doctor, locale, t }: { doctor: Doctor; locale: Locale; t: Dictionary }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition duration-300 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-cloud">
        <SmartImage
          src={doctor.photo}
          alt={`${doctor.name} — ${tr(doctor.role, locale)} (${t.demo.badge})`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          fallbackLabel={doctor.initials}
        />
        <DemoBadge label={t.demo.badge} className="absolute left-4 top-4 shadow-sm" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{doctor.name}</h3>
        <p className="mt-1 text-sm font-medium text-azure-600">{tr(doctor.role, locale)}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{tr(doctor.bio, locale)}</p>
        <dl className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs text-ink-muted">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">{t.common.experience}</dt>
            <Icon name="clock" className="h-4 w-4" />
            <dd>{tr(doctor.experience, locale)}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">{t.common.languagesLabel}</dt>
            <Icon name="globe" className="h-4 w-4" />
            <dd className="flex gap-1">
              {doctor.languages.map((l) => (
                <span key={l} className="rounded bg-cloud px-1.5 py-0.5 font-semibold text-navy-800">
                  {l}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
export function PriceRows({
  items,
  locale,
  t,
  className,
}: {
  items: PriceItem[];
  locale: Locale;
  t: Dictionary;
  className?: string;
}) {
  return (
    <ul className={cn("divide-y divide-line", className)}>
      {items.map((p) => (
        <li key={p.id} className="flex items-baseline justify-between gap-6 py-4">
          <span className="text-[0.98rem] text-navy-900">{tr(p.name, locale)}</span>
          <span className="shrink-0 whitespace-nowrap text-right font-semibold tabular-nums text-navy-900">
            {p.from ? <span className="mr-1 text-sm font-normal text-ink-muted">{t.common.from}</span> : null}
            {formatAmount(p.amount, locale)} <span className="text-sm font-medium text-ink-muted">{t.common.currency}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
