import type { L10n } from "@/i18n/config";

/**
 * Demo imagery (Unsplash, free licence: https://unsplash.com/license).
 * These are ILLUSTRATIVE STOCK PHOTOS — they do not show a real DentaNova clinic
 * or real DentaNova staff. Replace with the client's own photos:
 * put files in /public/images and change `src` to e.g. "/images/hero.jpg".
 */
export type DemoImage = { src: string; alt: L10n };

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const images = {
  hero: {
    src: u("photo-1629909613654-28e377c37b09"),
    alt: {
      uk: "Сучасний стоматологічний кабінет зі світлим кріслом та обладнанням",
      pl: "Nowoczesny gabinet stomatologiczny z jasnym fotelem i sprzętem",
      en: "Modern dental surgery with a light dental chair and equipment",
    },
  },
  xray: {
    src: u("photo-1588776814546-1ffcf47267a5"),
    alt: {
      uk: "Лікар аналізує рентгенівські знімки зубів",
      pl: "Lekarz analizuje zdjęcia rentgenowskie zębów",
      en: "A dentist reviewing dental X-ray images",
    },
  },
  scanner: {
    src: u("photo-1667133295315-820bb6481730"),
    alt: {
      uk: "Стоматолог проводить огляд із цифровим сканером",
      pl: "Stomatolog wykonuje badanie skanerem cyfrowym",
      en: "Dentist examining a patient with a digital scanner",
    },
  },
  treatment: {
    src: u("photo-1657470179447-0f5aa16daa91"),
    alt: {
      uk: "Стоматолог під час лікування пацієнта",
      pl: "Stomatolog podczas leczenia pacjenta",
      en: "A dentist treating a patient",
    },
  },
  room: {
    src: u("photo-1643660527098-559f89e45a92"),
    alt: {
      uk: "Стоматологічний кабінет із кріслом і монітором",
      pl: "Gabinet stomatologiczny z fotelem i monitorem",
      en: "Treatment room with a dental chair and monitor",
    },
  },
  office: {
    src: u("photo-1704455306251-b4634215d98f"),
    alt: {
      uk: "Консультаційна зона клініки зі столом і кріслами",
      pl: "Strefa konsultacji ze stołem i krzesłami",
      en: "Consultation area with a desk and chairs",
    },
  },
  lounge: {
    src: u("photo-1629909614456-6b1c5c94cecc"),
    alt: {
      uk: "Затишна зона очікування з диваном і рослиною",
      pl: "Przytulna poczekalnia z sofą i rośliną",
      en: "Cosy waiting area with a sofa and a plant",
    },
  },
  instruments: {
    src: u("photo-1606811856475-5e6fcdc6e509"),
    alt: {
      uk: "Стоматологічне дзеркало та зонд на білій поверхні",
      pl: "Lusterko stomatologiczne i zgłębnik na białej powierzchni",
      en: "Dental mirror and explorer on a white surface",
    },
  },
  implantModel: {
    src: u("photo-1593022356769-11f762e25ed9"),
    alt: {
      uk: "Модель зубного імпланта",
      pl: "Model implantu zębowego",
      en: "Dental implant model",
    },
  },
  exam: {
    src: u("photo-1606811971618-4486d14f3f99"),
    alt: {
      uk: "Стоматологічний огляд із дзеркалом",
      pl: "Badanie stomatologiczne z lusterkiem",
      en: "Dental examination with a mirror",
    },
  },
  aligners: {
    src: u("photo-1564420228450-d9a5bc8d6565"),
    alt: {
      uk: "Прозорі елайнери та футляр для зберігання",
      pl: "Przezroczyste nakładki ortodontyczne i etui",
      en: "Clear aligners and a storage case",
    },
  },
  smile: {
    src: u("photo-1677026010083-78ec7f1b84ed"),
    alt: {
      uk: "Крупний план білосніжної усмішки",
      pl: "Zbliżenie białego uśmiechu",
      en: "Close-up of a bright white smile",
    },
  },
  chair: {
    src: u("photo-1643660526741-094639fbe53a"),
    alt: {
      uk: "Стоматологічне крісло в кабінеті з картиною на стіні",
      pl: "Fotel dentystyczny w gabinecie z obrazem na ścianie",
      en: "Dental chair in a room with a painting on the wall",
    },
  },
  scanTablet: {
    src: u("photo-1600170311833-c2cf5280ce49"),
    alt: {
      uk: "Лікар показує цифровий знімок зубів на планшеті",
      pl: "Lekarz pokazuje cyfrowy skan zębów na tablecie",
      en: "Doctor pointing at a digital dental scan on a tablet",
    },
  },
} satisfies Record<string, DemoImage>;

export type ImageKey = keyof typeof images;

/** Gallery order on the homepage / about page */
export const galleryImages: ImageKey[] = ["room", "lounge", "instruments", "chair", "scanTablet"];
