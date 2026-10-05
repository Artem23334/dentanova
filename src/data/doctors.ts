import type { L10n } from "@/i18n/config";

/**
 * FICTIONAL DEMO PROFILES. These people do not exist as DentaNova staff.
 * Photos are illustrative stock images (Unsplash) — replace with real team photos.
 */
export type Doctor = {
  id: string;
  name: string;
  initials: string;
  photo: string;
  role: L10n;
  bio: L10n;
  experience: L10n;
  languages: string[];
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&h=1000&q=80&crop=faces`;

export const doctors: Doctor[] = [
  {
    id: "olena-marchenko",
    name: "Olena Marchenko",
    initials: "OM",
    photo: u("photo-1659353888906-adb3e0041693"),
    role: { uk: "Стоматолог-терапевт, ендодонтист", pl: "Lekarz dentysta, endodonta", en: "General dentist, endodontist" },
    bio: {
      uk: "Лікування кореневих каналів під мікроскопом і відновлення зубів після ендодонтії.",
      pl: "Leczenie kanałowe pod mikroskopem i odbudowa zębów po endodoncji.",
      en: "Microscope-assisted root canal treatment and post-endodontic restorations.",
    },
    experience: { uk: "12 років практики", pl: "12 lat praktyki", en: "12 years in practice" },
    languages: ["UA", "PL", "EN"],
  },
  {
    id: "tomasz-wisniewski",
    name: "Tomasz Wiśniewski",
    initials: "TW",
    photo: u("photo-1612349317150-e413f6a5b16d"),
    role: { uk: "Хірург-імплантолог", pl: "Chirurg, implantolog", en: "Oral surgeon, implantologist" },
    bio: {
      uk: "Імплантація з цифровим плануванням, кісткова пластика та складні видалення.",
      pl: "Implantacja z cyfrowym planowaniem, regeneracja kości i ekstrakcje złożone.",
      en: "Digitally planned implants, bone grafting and complex extractions.",
    },
    experience: { uk: "15 років практики", pl: "15 lat praktyki", en: "15 years in practice" },
    languages: ["PL", "EN"],
  },
  {
    id: "iryna-kovalenko",
    name: "Iryna Kovalenko",
    initials: "IK",
    photo: u("photo-1623854767648-e7bb8009f0db"),
    role: { uk: "Ортодонт", pl: "Ortodonta", en: "Orthodontist" },
    bio: {
      uk: "Брекет-системи для дітей і дорослих, ортодонтична діагностика та ретенція.",
      pl: "Aparaty ortodontyczne dla dzieci i dorosłych, diagnostyka i retencja.",
      en: "Braces for children and adults, orthodontic diagnostics and retention.",
    },
    experience: { uk: "9 років практики", pl: "9 lat praktyki", en: "9 years in practice" },
    languages: ["UA", "PL"],
  },
  {
    id: "marek-nowak",
    name: "Marek Nowak",
    initials: "MN",
    photo: u("photo-1622253692010-333f2da6031d"),
    role: { uk: "Стоматолог-ортопед", pl: "Protetyk", en: "Prosthodontist" },
    bio: {
      uk: "Коронки, вініри та комплексні естетичні реабілітації з цифровим плануванням.",
      pl: "Korony, licówki i kompleksowe rehabilitacje estetyczne z cyfrowym planowaniem.",
      en: "Crowns, veneers and comprehensive aesthetic rehabilitation with digital planning.",
    },
    experience: { uk: "11 років практики", pl: "11 lat praktyki", en: "11 years in practice" },
    languages: ["PL", "EN", "UA"],
  },
  {
    id: "kateryna-bondar",
    name: "Kateryna Bondar",
    initials: "KB",
    photo: u("photo-1678695972687-033fa0bdbac9"),
    role: { uk: "Гігієніст стоматологічний", pl: "Higienistka stomatologiczna", en: "Dental hygienist" },
    bio: {
      uk: "Професійна гігієна, профілактика та навчання домашнього догляду для дорослих і дітей.",
      pl: "Higienizacja, profilaktyka i instruktaż higieny dla dorosłych i dzieci.",
      en: "Professional hygiene, prevention and home-care coaching for adults and children.",
    },
    experience: { uk: "7 років практики", pl: "7 lat praktyki", en: "7 years in practice" },
    languages: ["UA", "PL", "EN"],
  },
  {
    id: "piotr-zielinski",
    name: "Piotr Zieliński",
    initials: "PZ",
    photo: u("photo-1637059824899-a441006a6875"),
    role: { uk: "Стоматолог-терапевт", pl: "Lekarz dentysta", en: "General dentist" },
    bio: {
      uk: "Лікування карієсу, естетичні реставрації та комплексна діагностика.",
      pl: "Leczenie próchnicy, odbudowy estetyczne i kompleksowa diagnostyka.",
      en: "Caries treatment, aesthetic restorations and comprehensive diagnostics.",
    },
    experience: { uk: "8 років практики", pl: "8 lat praktyki", en: "8 years in practice" },
    languages: ["PL", "EN"],
  },
];
