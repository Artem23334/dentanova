import type { L10n } from "@/i18n/config";

/**
 * DEMO PRICES — fictional, for presentation only. All amounts in PLN.
 * `from: true` renders as "from 750 PLN".
 * `popular: true` shows the item in the homepage price preview.
 * `service` links the item to a category in /src/data/services.ts.
 */
export type PriceItem = {
  id: string;
  service: string;
  name: L10n;
  amount: number;
  from?: boolean;
  popular?: boolean;
};

export const prices: PriceItem[] = [
  // Consultation & diagnostics
  { id: "consultation", service: "consultation-diagnostics", amount: 100, popular: true,
    name: { uk: "Консультація", pl: "Konsultacja", en: "Consultation" } },
  { id: "consultation-plan", service: "consultation-diagnostics", amount: 300, popular: true,
    name: { uk: "Консультація + план лікування", pl: "Konsultacja + plan leczenia", en: "Consultation + treatment plan" } },
  { id: "rtg", service: "consultation-diagnostics", amount: 50,
    name: { uk: "Прицільний знімок (RTG)", pl: "Zdjęcie punktowe (RTG)", en: "Periapical X-ray (RTG)" } },
  { id: "panoramic", service: "consultation-diagnostics", amount: 120,
    name: { uk: "Панорамний знімок", pl: "Zdjęcie pantomograficzne", en: "Panoramic X-ray" } },
  { id: "cbct", service: "consultation-diagnostics", amount: 200, popular: true,
    name: { uk: "3D-знімок (CBCT)", pl: "Skan 3D (CBCT)", en: "3D scan (CBCT)" } },

  // Hygiene
  { id: "hygiene", service: "hygiene", amount: 400, popular: true,
    name: { uk: "Професійна гігієна (скейлінг + AirFlow + полірування)", pl: "Higienizacja (skaling + piaskowanie + polerowanie)", en: "Professional hygiene (scaling + AirFlow + polishing)" } },
  { id: "fluoride", service: "hygiene", amount: 80,
    name: { uk: "Фторування", pl: "Fluoryzacja", en: "Fluoride treatment" } },
  { id: "whitening-office", service: "hygiene", amount: 1200, from: true,
    name: { uk: "Кабінетне відбілювання", pl: "Wybielanie gabinetowe", en: "In-office whitening" } },

  // Therapeutic
  { id: "restoration", service: "therapeutic-dentistry", amount: 350, from: true, popular: true,
    name: { uk: "Реставрація (пломба)", pl: "Wypełnienie (plomba)", en: "Restoration (filling)" } },
  { id: "aesthetic-restoration", service: "therapeutic-dentistry", amount: 550, from: true,
    name: { uk: "Естетична реставрація", pl: "Odbudowa estetyczna", en: "Aesthetic restoration" } },
  { id: "post-endo", service: "therapeutic-dentistry", amount: 600, from: true,
    name: { uk: "Відновлення після ендодонтії", pl: "Odbudowa po leczeniu kanałowym", en: "Post-endodontic restoration" } },

  // Endodontics
  { id: "root-canal", service: "endodontics", amount: 750, from: true, popular: true,
    name: { uk: "Лікування кореневих каналів", pl: "Leczenie kanałowe", en: "Root canal treatment" } },
  { id: "root-canal-multi", service: "endodontics", amount: 1300, from: true,
    name: { uk: "Лікування багатоканального зуба під мікроскопом", pl: "Leczenie zęba wielokanałowego pod mikroskopem", en: "Multi-canal treatment under microscope" } },
  { id: "retreatment", service: "endodontics", amount: 1500, from: true,
    name: { uk: "Повторне лікування каналів", pl: "Ponowne leczenie kanałowe", en: "Root canal retreatment" } },

  // Surgery
  { id: "extraction", service: "surgery", amount: 300, from: true,
    name: { uk: "Видалення зуба", pl: "Ekstrakcja zęba", en: "Tooth extraction" } },
  { id: "wisdom", service: "surgery", amount: 600, from: true,
    name: { uk: "Видалення зуба мудрості", pl: "Usunięcie zęba mądrości", en: "Wisdom tooth extraction" } },
  { id: "frenectomy", service: "surgery", amount: 500, from: true,
    name: { uk: "Френектомія", pl: "Frenektomia", en: "Frenectomy" } },

  // Prosthetics
  { id: "zirconia-crown", service: "prosthetics", amount: 1700, from: true, popular: true,
    name: { uk: "Цирконієва коронка", pl: "Korona cyrkonowa", en: "Zirconia crown" } },
  { id: "ceramic-crown", service: "prosthetics", amount: 1500, from: true,
    name: { uk: "Керамічна коронка", pl: "Korona ceramiczna", en: "Ceramic crown" } },
  { id: "veneer", service: "prosthetics", amount: 1900, from: true,
    name: { uk: "Керамічний вінір", pl: "Licówka ceramiczna", en: "Ceramic veneer" } },
  { id: "temporary-crown", service: "prosthetics", amount: 250, from: true,
    name: { uk: "Тимчасова коронка", pl: "Korona tymczasowa", en: "Temporary crown" } },

  // Orthodontics
  { id: "ortho-consultation", service: "orthodontics", amount: 200,
    name: { uk: "Консультація ортодонта", pl: "Konsultacja ortodontyczna", en: "Orthodontic consultation" } },
  { id: "braces-metal", service: "orthodontics", amount: 2500, from: true,
    name: { uk: "Металеві брекети (одна щелепа)", pl: "Aparat metalowy (jeden łuk)", en: "Metal braces (one arch)" } },
  { id: "braces-aesthetic", service: "orthodontics", amount: 3500, from: true,
    name: { uk: "Естетичні брекети (одна щелепа)", pl: "Aparat estetyczny (jeden łuk)", en: "Aesthetic braces (one arch)" } },
  { id: "retainer", service: "orthodontics", amount: 400, from: true,
    name: { uk: "Ретейнер", pl: "Retainer", en: "Retainer" } },

  // Implantology
  { id: "implant", service: "implantology", amount: 3000, from: true, popular: true,
    name: { uk: "Імплант", pl: "Implant", en: "Implant" } },
  { id: "implant-crown", service: "implantology", amount: 2200, from: true,
    name: { uk: "Коронка на імпланті", pl: "Korona na implancie", en: "Crown on implant" } },
  { id: "bone-graft", service: "implantology", amount: 1500, from: true,
    name: { uk: "Кісткова пластика", pl: "Regeneracja kości", en: "Bone grafting" } },
  { id: "surgical-guide", service: "implantology", amount: 800, from: true,
    name: { uk: "Хірургічний шаблон", pl: "Szablon chirurgiczny", en: "Surgical guide" } },

  // Aesthetic
  { id: "whitening", service: "aesthetic-dentistry", amount: 1200, from: true,
    name: { uk: "Відбілювання", pl: "Wybielanie", en: "Whitening" } },
  { id: "smile-design", service: "aesthetic-dentistry", amount: 500, from: true,
    name: { uk: "Аналіз і дизайн усмішки", pl: "Analiza i projekt uśmiechu", en: "Smile analysis & design" } },
];

export const popularPrices = prices.filter((p) => p.popular);

export function pricesForService(slug: string): PriceItem[] {
  return prices.filter((p) => p.service === slug);
}
