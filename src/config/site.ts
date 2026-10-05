import type { L10n } from "@/i18n/config";

/**
 * Central clinic configuration.
 * ALL VALUES ARE FICTIONAL DEMO DATA. DentaNova is not a real clinic.
 * To adapt the site for a real client, change the values here (and in /src/data).
 */
export const site = {
  name: "DentaNova",
  legalName: "DentaNova (demo)",
  // Clearly fictional contact details
  phone: "+48 22 000 00 00",
  phoneHref: "tel:+48220000000",
  email: "hello@dentanova.example",
  address: {
    street: "ul. Przykładowa 15",
    postalCode: "00-950",
    city: "Warszawa",
    district: { uk: "Середмістя", pl: "Śródmieście", en: "Śródmieście" } satisfies L10n,
    country: "PL",
  },
  /**
   * Demo map location (central Warsaw). Replace with the real clinic's
   * coordinates / Google Maps query when adapting the template.
   */
  map: {
    lat: 52.2297,
    lng: 21.0122,
    zoom: 15,
    // Text query used by the Google Maps embed and the "Route" button
    query: "Centrum, Warszawa",
  },
  hours: [
    { days: { uk: "Пн – Пт", pl: "Pon – Pt", en: "Mon – Fri" } satisfies L10n, time: "09:00 – 20:00" },
    { days: { uk: "Субота", pl: "Sobota", en: "Saturday" } satisfies L10n, time: "09:00 – 15:00" },
    { days: { uk: "Неділя", pl: "Niedziela", en: "Sunday" } satisfies L10n, time: null },
  ],
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
  languages: ["UA", "PL", "EN"],
} as const;

export function mapsRouteUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${site.map.lat},${site.map.lng}`;
}
