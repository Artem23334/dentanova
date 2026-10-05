# DentaNova — demo dental clinic website (UA / PL / EN)

A demonstration website for a **fictional** dental clinic in Warsaw, built to show
clinic owners what a modern, multilingual clinic site can look like.

> **DentaNova is not a real clinic.** All doctors, testimonials, prices, the address,
> phone, email and clinic information are demo content. Photos are illustrative
> stock images from Unsplash and do not show a real clinic or real staff.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- No UI libraries, no database, no auth — intentionally simple

## Run locally (VS Code)

```bash
npm install
cp .env.example .env.local   # optional, all values have safe defaults
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run typecheck`.

## URLs

| Language | Home | Example |
|---|---|---|
| Ukrainian (default) | `/` | `/services/implantology` |
| Polish | `/pl` | `/pl/services/implantology` |
| English | `/en` | `/en/services/implantology` |

Pages: home, services, 9 service pages, prices, about, doctors, contact, booking,
privacy policy, cookie policy, localized 404.

Routing is handled by `src/middleware.ts`: un-prefixed URLs are rewritten to the
Ukrainian locale internally, `/uk/...` redirects to the clean URL.

## Where to change things

| What | File |
|---|---|
| Clinic name, phone, email, address, hours, map location, socials | `src/config/site.ts` |
| Prices (single source of truth) | `src/data/prices.ts` |
| Services + procedures | `src/data/services.ts` |
| Doctors | `src/data/doctors.ts` |
| Technology, testimonials, FAQ | `src/data/content.ts` |
| Photos | `src/data/images.ts` (put your own files in `public/images`) |
| UI texts per language | `src/i18n/dictionaries/{uk,pl,en}.ts` |
| Colours, fonts, design tokens | `src/app/globals.css` (`@theme`) |

## Project structure

```
src/
  app/
    [locale]/            pages (layout, home, services, prices, …)
    api/booking/         booking endpoint (server-side validation)
    sitemap.ts robots.ts icon.svg apple-icon.png
  components/
    layout/              header, language switcher, footer, mobile CTA bar
    sections/            homepage sections, cards, contact, legal page
    booking/             multi-step booking form
    consent/             cookie consent provider, banner, gated scripts
    map/                 Google Maps embed
    ui/                  buttons, icons, accordion, image with fallback
  config/ data/ i18n/ lib/
```

## Booking form

5 steps (service → timeframe → contact time → details → consent) + confirmation.
Validation lives in `src/lib/booking.ts` and runs in the browser **and again on the
server** in `src/app/api/booking/route.ts` (JSON only, size limit, honeypot,
basic rate limit). In demo mode nothing is stored.

To send real leads (e.g. to n8n or a CRM) set the server-only variables
`BOOKING_WEBHOOK_URL` (and optionally `BOOKING_WEBHOOK_SECRET`) — the validated
request is forwarded there. The URL never reaches the browser.

## Cookies & third parties

- Consent categories: Necessary / Analytics / Marketing, stored in the `dn_consent` cookie.
- Google Analytics (`NEXT_PUBLIC_GA_ID`) loads **only** after Analytics consent;
  Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) only after Marketing consent.
- The Google Map loads only after the visitor clicks “Show map” or accepts Marketing cookies.
- “Cookie settings” in the footer reopens the dialog at any time.

## Google Maps

Location is set in `src/config/site.ts → map`. Without a key a key-less Google
embed is used. With `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` the official Embed API is
used — embed keys are visible in the browser by design, so restrict the key to
your domain (HTTP referrer) in Google Cloud Console.

## SEO

Per-page titles/descriptions, canonical + `hreflang` alternates, Open Graph/Twitter
image (`public/og.png`), sitemap with language alternates, robots.txt, JSON-LD
(`Dentist`, `FAQPage`, `BreadcrumbList`).

**Indexing is disabled by default** (`NEXT_PUBLIC_ALLOW_INDEXING=false` →
`noindex` + `Disallow: /`) so search engines don't list a clinic that doesn't
exist. Set it to `true` for a real client site and set `NEXT_PUBLIC_SITE_URL`.

## Adapting for a real clinic — checklist

1. Replace data in `src/config/site.ts` and `src/data/*`.
2. Replace stock photos with the clinic's own (and remove the Unsplash entry in `next.config.ts`).
3. Remove the demo bar/badges/notes (search for `demo` in the dictionaries and components).
4. Have a lawyer prepare the Privacy and Cookie policies (GDPR/RODO).
5. Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING=true`, and the booking webhook.
