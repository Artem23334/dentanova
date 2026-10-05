import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./primitives";
import { Icon } from "./Icon";

export type Crumb = { label: string; href?: string };

/** Header block for inner pages: breadcrumbs + H1 + lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  breadcrumbLabel,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  breadcrumbLabel: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-mist">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-azure-200/40 blur-3xl" aria-hidden="true" />
      <Container className="relative py-14 sm:py-20">
        <nav aria-label={breadcrumbLabel}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 ? <Icon name="chevronDown" className="h-3.5 w-3.5 -rotate-90 opacity-50" /> : null}
                {c.href ? (
                  <Link href={c.href} className="transition hover:text-navy-900">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-navy-900">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-8 max-w-3xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">{title}</h1>
          {lead ? <p className="mt-5 text-lg leading-relaxed text-ink-muted sm:text-xl">{lead}</p> : null}
        </div>
        {children}
      </Container>
    </div>
  );
}
