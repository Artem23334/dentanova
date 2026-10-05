import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  text,
  align = "left",
  dark = false,
  as: Tag = "h2",
  className,
  aside,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className={cn("eyebrow", dark && "text-azure-200 before:bg-azure-200/60")}>{eyebrow}</p> : null}
        <Tag
          id={id}
          className={cn(
            "mt-4 text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.75rem]",
            dark && "text-white",
          )}
        >
          {title}
        </Tag>
        {text ? (
          <p className={cn("mt-5 text-lg leading-relaxed text-ink-muted", dark && "text-white/70")}>{text}</p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */
type Variant = "primary" | "secondary" | "ghost" | "light" | "outlineLight";
type Size = "md" | "lg" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white shadow-[0_8px_20px_-8px_rgb(11_29_58/0.55)] hover:bg-navy-800 hover:-translate-y-px active:translate-y-0",
  secondary: "border border-line bg-white text-navy-900 hover:border-navy-900/25 hover:bg-mist",
  ghost: "text-navy-900 hover:bg-cloud",
  light: "bg-white text-navy-900 hover:bg-azure-50 hover:-translate-y-px",
  outlineLight: "border border-white/25 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: IconName;
};

export function ButtonLink({ variant, size, className, icon, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {icon ? <Icon name={icon} className="h-[1.1em] w-[1.1em]" /> : null}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Badges                                                              */
/* ------------------------------------------------------------------ */
export function DemoBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-amber-800",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function DemoNote({ children, className, dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 text-sm",
        dark ? "text-white/60" : "text-ink-muted",
        className,
      )}
    >
      <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function IconBadge({ name, className, dark = false }: { name: IconName; className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
        dark ? "bg-white/10 text-azure-200" : "bg-azure-50 text-azure-600 ring-1 ring-azure-100",
        className,
      )}
    >
      <Icon name={name} className="h-6 w-6" />
    </span>
  );
}
