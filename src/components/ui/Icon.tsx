import type { SVGProps } from "react";

/**
 * Small, dependency-free stroke icon set (24×24, 1.6 stroke).
 * Decorative by default (aria-hidden); pass `title` for a meaningful icon.
 */
const paths = {
  tooth: (
    <path d="M7.2 3.5c-2.3 0-4 1.8-4 4.3 0 2 .7 3.1 1.4 4.8.6 1.5.7 3.3 1 5.1.3 1.7.8 3.3 2 3.3 1.5 0 1.7-2.2 2.2-3.9.4-1.3.9-2.1 2.2-2.1s1.8.8 2.2 2.1c.5 1.7.7 3.9 2.2 3.9 1.2 0 1.7-1.6 2-3.3.3-1.8.4-3.6 1-5.1.7-1.7 1.4-2.8 1.4-4.8 0-2.5-1.7-4.3-4-4.3-1.9 0-2.8 1-4.8 1s-2.9-1-4.8-1Z" />
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14.2c1 1.3 2.4 2 4 2s3-.7 4-2" />
      <path d="M9 9.5h.01M15 9.5h.01" strokeWidth="2.4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.6 9a2 2 0 0 0 1.4 1.4l5.5 1.6-5.5 1.6a2 2 0 0 0-1.4 1.4L12 20.5 10.4 15A2 2 0 0 0 9 13.6L3.5 12 9 10.4A2 2 0 0 0 10.4 9Z" />
      <path d="M19 3v3M17.5 4.5h3" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </>
  ),
  cube: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  xray: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M9 8.5c0 2 .4 3 1 4.5.5 1.2.5 2.5.5 3.5M15 8.5c0 2-.4 3-1 4.5-.5 1.2-.5 2.5-.5 3.5M9 8.5c1 .6 2 .8 3 .8s2-.2 3-.8" />
    </>
  ),
  microscope: (
    <>
      <path d="M6 21h12M9 17h6" />
      <path d="M12 17a5 5 0 0 0 5-5c0-2.2-1.4-4-3.3-4.7" />
      <path d="m8.5 3.5 3 1.2-2.4 6-3-1.2Z" />
      <path d="M7.4 12.6 9 13.3" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2.5h6L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" />
      <circle cx="12" cy="12.8" r="3.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 19 6v5.5c0 4.3-2.9 7.9-7 9.3-4.1-1.4-7-5-7-9.3V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  crown: (
    <>
      <path d="m3.5 8 4 3.5L12 5l4.5 6.5 4-3.5-1.8 10H5.3Z" />
      <path d="M5.5 21h13" />
    </>
  ),
  braces: (
    <>
      <path d="M3 12h18" />
      <rect x="5" y="9.5" width="3" height="5" rx="1" />
      <rect x="10.5" y="9.5" width="3" height="5" rx="1" />
      <rect x="16" y="9.5" width="3" height="5" rx="1" />
    </>
  ),
  implant: (
    <>
      <path d="M8 3.5h8l-1 4H9Z" />
      <path d="M9.5 7.5h5M9.8 10.5h4.4M10.2 13.5h3.6M10.6 16.5h2.8" />
      <path d="M9.5 7.5 12 20.5l2.5-13" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.4-7.5-10.1A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 7.5 2.9C19.5 15.6 12 20 12 20Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.8 20c.6-3.4 3.2-5.5 6.2-5.5s5.6 2.1 6.2 5.5" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c1.7.7 2.9 2.4 3.2 5.2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
    </>
  ),
  phone: (
    <path d="M5 4h3.2l1.6 4.2-2 1.3a10.5 10.5 0 0 0 6.7 6.7l1.3-2 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5A15.6 15.6 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H16a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h7.5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  quote: (
    <path d="M9.5 7C6.9 7.6 5 9.9 5 12.8V17h4.5v-4.5H7.2c0-1.6 1-2.9 2.3-3.3ZM18.5 7c-2.6.6-4.5 2.9-4.5 5.8V17h4.5v-4.5h-2.3c0-1.6 1-2.9 2.3-3.3Z" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8h.01" strokeWidth="2" />
    </>
  ),
  cookie: (
    <>
      <path d="M20.8 12.5A8.8 8.8 0 1 1 11.5 3.2a3 3 0 0 0 3.6 3.6 3 3 0 0 0 3.6 3.6 3 3 0 0 0 2.1 2.1Z" />
      <path d="M8.5 9.5h.01M15.5 15h.01M9.5 15.5h.01M12 12h.01" strokeWidth="2.4" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.2 6.8h.01" strokeWidth="2.4" />
    </>
  ),
  facebook: <path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5V21H14v-6.5h2.6L17 11h-3V9a1 1 0 0 1 1-1Z" />,
  alert: (
    <>
      <path d="M12 3.5 21 19.5H3Z" />
      <path d="M12 10v4.5M12 17h.01" strokeWidth="2" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; title?: string };

export function Icon({ name, title, className = "h-5 w-5", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
