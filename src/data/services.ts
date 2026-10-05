import type { L10n } from "@/i18n/config";
import type { IconName } from "@/components/ui/Icon";
import type { ImageKey } from "./images";

/**
 * Main service categories (demo content).
 * Each category gets its own page at /services/[slug].
 */
export type Service = {
  slug: string;
  icon: IconName;
  image: ImageKey;
  title: L10n;
  short: L10n;
  intro: L10n;
  highlights: L10n[];
  procedures: L10n[];
};

export const services: Service[] = [
  {
    slug: "consultation-diagnostics",
    icon: "scan",
    image: "scanTablet",
    title: { uk: "Консультація та діагностика", pl: "Konsultacja i diagnostyka", en: "Consultation & Diagnostics" },
    short: {
      uk: "Огляд, цифрові знімки та 3D-діагностика — основа точного плану лікування.",
      pl: "Badanie, zdjęcia cyfrowe i diagnostyka 3D — podstawa precyzyjnego planu leczenia.",
      en: "Examination, digital imaging and 3D diagnostics — the basis of a precise plan.",
    },
    intro: {
      uk: "Кожне лікування починається з розуміння ситуації. Під час консультації лікар оглядає зуби та ясна, за потреби робить цифрові знімки і складає письмовий план лікування з етапами та вартістю.",
      pl: "Każde leczenie zaczyna się od zrozumienia sytuacji. Podczas konsultacji lekarz bada zęby i dziąsła, w razie potrzeby wykonuje zdjęcia cyfrowe i przygotowuje pisemny plan leczenia z etapami i kosztami.",
      en: "Every treatment starts with understanding your situation. During the consultation the doctor examines your teeth and gums, takes digital images if needed and prepares a written plan with stages and costs.",
    },
    highlights: [
      { uk: "Письмовий план лікування", pl: "Pisemny plan leczenia", en: "Written treatment plan" },
      { uk: "Наочні знімки на екрані", pl: "Czytelne zdjęcia na ekranie", en: "Clear images on screen" },
      { uk: "Низька доза опромінення", pl: "Niska dawka promieniowania", en: "Low radiation dose" },
    ],
    procedures: [
      { uk: "Консультація стоматолога", pl: "Konsultacja stomatologiczna", en: "Dental consultation" },
      { uk: "План лікування", pl: "Plan leczenia", en: "Treatment plan" },
      { uk: "Прицільний знімок (RTG)", pl: "Zdjęcie punktowe (RTG)", en: "Periapical X-ray (RTG)" },
      { uk: "3D-діагностика", pl: "Diagnostyka 3D", en: "3D diagnostics" },
      { uk: "Комп’ютерна томографія (CBCT)", pl: "Tomografia komputerowa (CBCT)", en: "Cone beam CT (CBCT)" },
      { uk: "Панорамний знімок", pl: "Zdjęcie pantomograficzne", en: "Panoramic X-ray" },
    ],
  },
  {
    slug: "hygiene",
    icon: "sparkle",
    image: "exam",
    title: { uk: "Профілактика та гігієна", pl: "Profilaktyka i higienizacja", en: "Preventive Dentistry & Hygiene" },
    short: {
      uk: "Професійна чистка, AirFlow та відбілювання для здорових ясен і світлої усмішки.",
      pl: "Profesjonalne czyszczenie, AirFlow i wybielanie dla zdrowych dziąseł i jasnego uśmiechu.",
      en: "Professional cleaning, AirFlow and whitening for healthy gums and a brighter smile.",
    },
    intro: {
      uk: "Регулярна професійна гігієна — найпростіший спосіб уникнути карієсу та запалення ясен. Ми делікатно видаляємо зубний камінь і наліт, поліруємо зуби та даємо персональні рекомендації щодо домашнього догляду.",
      pl: "Regularna profesjonalna higienizacja to najprostszy sposób na uniknięcie próchnicy i stanów zapalnych dziąseł. Delikatnie usuwamy kamień i osad, polerujemy zęby i udzielamy indywidualnych wskazówek dotyczących higieny domowej.",
      en: "Regular professional hygiene is the simplest way to prevent decay and gum inflammation. We gently remove tartar and stains, polish your teeth and give personal advice for home care.",
    },
    highlights: [
      { uk: "Рекомендовано кожні 6 місяців", pl: "Zalecana co 6 miesięcy", en: "Recommended every 6 months" },
      { uk: "Делікатно для ясен", pl: "Delikatna dla dziąseł", en: "Gentle on gums" },
      { uk: "Персональні поради з догляду", pl: "Indywidualne wskazówki", en: "Personal care advice" },
    ],
    procedures: [
      { uk: "Професійна гігієна", pl: "Higienizacja", en: "Professional hygiene" },
      { uk: "Скейлінг (видалення каменю)", pl: "Skaling", en: "Scaling" },
      { uk: "AirFlow", pl: "Piaskowanie AirFlow", en: "AirFlow" },
      { uk: "Полірування", pl: "Polerowanie", en: "Polishing" },
      { uk: "Фторування", pl: "Fluoryzacja", en: "Fluoride treatment" },
      { uk: "Відбілювання", pl: "Wybielanie", en: "Whitening" },
    ],
  },
  {
    slug: "therapeutic-dentistry",
    icon: "tooth",
    image: "treatment",
    title: { uk: "Терапевтична стоматологія", pl: "Stomatologia zachowawcza", en: "Therapeutic Dentistry" },
    short: {
      uk: "Лікування карієсу та естетичні реставрації, які неможливо відрізнити від власних зубів.",
      pl: "Leczenie próchnicy i estetyczne odbudowy nie do odróżnienia od naturalnych zębów.",
      en: "Caries treatment and aesthetic restorations that blend in with your natural teeth.",
    },
    intro: {
      uk: "Ми лікуємо карієс на ранніх стадіях і відновлюємо зуби сучасними композитними матеріалами. Реставрації підбираються за кольором і формою, щоб зберегти природний вигляд та функцію зуба.",
      pl: "Leczymy próchnicę we wczesnych stadiach i odbudowujemy zęby nowoczesnymi materiałami kompozytowymi. Wypełnienia dobieramy pod względem koloru i kształtu, aby zachować naturalny wygląd i funkcję zęba.",
      en: "We treat decay at an early stage and restore teeth with modern composite materials. Restorations are matched in colour and shape to keep the tooth looking and working naturally.",
    },
    highlights: [
      { uk: "Комфортна анестезія", pl: "Komfortowe znieczulenie", en: "Comfortable anaesthesia" },
      { uk: "Підбір кольору реставрації", pl: "Dobór koloru wypełnienia", en: "Shade-matched fillings" },
      { uk: "Максимальне збереження тканин", pl: "Maksymalne zachowanie tkanek", en: "Minimally invasive" },
    ],
    procedures: [
      { uk: "Лікування карієсу", pl: "Leczenie próchnicy", en: "Caries treatment" },
      { uk: "Естетична реставрація", pl: "Odbudowa estetyczna", en: "Aesthetic restoration" },
      { uk: "Відновлення зуба", pl: "Odbudowa zęba", en: "Tooth restoration" },
      { uk: "Відновлення після ендодонтії", pl: "Odbudowa po leczeniu kanałowym", en: "Post-endodontic restoration" },
    ],
  },
  {
    slug: "endodontics",
    icon: "microscope",
    image: "xray",
    title: { uk: "Ендодонтія", pl: "Endodoncja", en: "Endodontics" },
    short: {
      uk: "Лікування кореневих каналів під мікроскопом — шанс зберегти власний зуб.",
      pl: "Leczenie kanałowe pod mikroskopem — szansa na uratowanie własnego zęba.",
      en: "Root canal treatment under a microscope — a chance to save your own tooth.",
    },
    intro: {
      uk: "Сучасна ендодонтія дозволяє зберегти зуби, які раніше доводилося видаляти. Робота під мікроскопом дає змогу знайти та ретельно обробити всі канали, включно з повторним лікуванням.",
      pl: "Nowoczesna endodoncja pozwala uratować zęby, które dawniej trzeba było usuwać. Praca pod mikroskopem umożliwia odnalezienie i dokładne opracowanie wszystkich kanałów, także przy ponownym leczeniu.",
      en: "Modern endodontics makes it possible to save teeth that once had to be extracted. Working under a microscope allows every canal to be found and thoroughly treated, including retreatment.",
    },
    highlights: [
      { uk: "Мікроскоп на кожному етапі", pl: "Mikroskop na każdym etapie", en: "Microscope at every stage" },
      { uk: "Контрольні знімки", pl: "Zdjęcia kontrolne", en: "Control X-rays" },
      { uk: "Збереження власного зуба", pl: "Zachowanie własnego zęba", en: "Saving your natural tooth" },
    ],
    procedures: [
      { uk: "Лікування кореневих каналів", pl: "Leczenie kanałowe", en: "Root canal treatment" },
      { uk: "Лікування під мікроскопом", pl: "Leczenie pod mikroskopem", en: "Microscope-assisted treatment" },
      { uk: "Повторне лікування каналів", pl: "Ponowne leczenie kanałowe", en: "Root canal retreatment" },
      { uk: "Лікування багатоканальних зубів", pl: "Leczenie zębów wielokanałowych", en: "Multi-canal treatment" },
    ],
  },
  {
    slug: "surgery",
    icon: "shield",
    image: "instruments",
    title: { uk: "Хірургічна стоматологія", pl: "Chirurgia stomatologiczna", en: "Surgical Dentistry" },
    short: {
      uk: "Видалення зубів, зокрема зубів мудрості, — спокійно і з ретельною підготовкою.",
      pl: "Ekstrakcje zębów, w tym ósemek — spokojnie i z dokładnym przygotowaniem.",
      en: "Extractions, including wisdom teeth — calmly and with careful planning.",
    },
    intro: {
      uk: "Хірургічні процедури плануються на основі 3D-діагностики, що робить їх передбачуваними та безпечними. Ми детально пояснюємо, як підготуватися до процедури та як доглядати за раною після неї.",
      pl: "Zabiegi chirurgiczne planujemy na podstawie diagnostyki 3D, co czyni je przewidywalnymi i bezpiecznymi. Szczegółowo wyjaśniamy, jak przygotować się do zabiegu i jak dbać o ranę po nim.",
      en: "Surgical procedures are planned using 3D diagnostics, making them predictable and safe. We explain in detail how to prepare and how to care for the area afterwards.",
    },
    highlights: [
      { uk: "Планування за 3D-знімком", pl: "Planowanie na podstawie 3D", en: "Planned with 3D imaging" },
      { uk: "Щадні методики", pl: "Oszczędne techniki", en: "Gentle techniques" },
      { uk: "Чіткі рекомендації після", pl: "Jasne zalecenia po zabiegu", en: "Clear aftercare guidance" },
    ],
    procedures: [
      { uk: "Видалення зуба", pl: "Ekstrakcja zęba", en: "Tooth extraction" },
      { uk: "Видалення зуба мудрості", pl: "Usunięcie zęba mądrości", en: "Wisdom tooth extraction" },
      { uk: "Складне видалення", pl: "Ekstrakcja skomplikowana", en: "Complex extraction" },
      { uk: "Френектомія (пластика вуздечки)", pl: "Frenektomia (podcięcie wędzidełka)", en: "Frenectomy" },
    ],
  },
  {
    slug: "prosthetics",
    icon: "crown",
    image: "smile",
    title: { uk: "Протезування", pl: "Protetyka", en: "Prosthetics" },
    short: {
      uk: "Вініри, керамічні та цирконієві коронки, протези — відновлення функції та естетики.",
      pl: "Licówki, korony ceramiczne i cyrkonowe, protezy — przywrócenie funkcji i estetyki.",
      en: "Veneers, ceramic and zirconia crowns, dentures — restoring function and aesthetics.",
    },
    intro: {
      uk: "Протезування повертає зубам міцність, форму та естетику. Ми працюємо з сучасною керамікою і цирконієм, використовуємо цифрові відбитки та тимчасові конструкції, щоб ви не залишалися без усмішки.",
      pl: "Protetyka przywraca zębom wytrzymałość, kształt i estetykę. Pracujemy z nowoczesną ceramiką i cyrkonem, korzystamy z cyfrowych wycisków i uzupełnień tymczasowych, abyś nigdy nie był bez uśmiechu.",
      en: "Prosthetic dentistry restores strength, shape and aesthetics. We work with modern ceramics and zirconia, using digital impressions and temporaries so you're never left without a smile.",
    },
    highlights: [
      { uk: "Цифрові відбитки", pl: "Cyfrowe wyciski", en: "Digital impressions" },
      { uk: "Тимчасові коронки", pl: "Korony tymczasowe", en: "Temporary crowns" },
      { uk: "Натуральна естетика", pl: "Naturalna estetyka", en: "Natural aesthetics" },
    ],
    procedures: [
      { uk: "Вініри", pl: "Licówki", en: "Veneers" },
      { uk: "Керамічні коронки", pl: "Korony ceramiczne", en: "Ceramic crowns" },
      { uk: "Цирконієві коронки", pl: "Korony cyrkonowe", en: "Zirconia crowns" },
      { uk: "Тимчасові коронки", pl: "Korony tymczasowe", en: "Temporary crowns" },
      { uk: "Знімні протези", pl: "Protezy", en: "Dentures" },
      { uk: "Мікропротезування (вкладки, накладки)", pl: "Mikroprotetyka (wkłady, nakłady)", en: "Microprosthetics (inlays, onlays)" },
    ],
  },
  {
    slug: "orthodontics",
    icon: "braces",
    image: "aligners",
    title: { uk: "Ортодонтія", pl: "Ortodoncja", en: "Orthodontics" },
    short: {
      uk: "Брекет-системи для дітей і дорослих — рівні зуби та правильний прикус.",
      pl: "Aparaty ortodontyczne dla dzieci i dorosłych — proste zęby i prawidłowy zgryz.",
      en: "Braces for children and adults — straight teeth and a healthy bite.",
    },
    intro: {
      uk: "Ортодонтичне лікування — це не лише естетика, а й здоров’я прикусу та суглобів. Після діагностики ортодонт підбере оптимальну систему і пояснить тривалість та етапи лікування.",
      pl: "Leczenie ortodontyczne to nie tylko estetyka, ale także zdrowie zgryzu i stawów. Po diagnostyce ortodonta dobierze optymalny aparat i wyjaśni czas trwania oraz etapy leczenia.",
      en: "Orthodontic treatment is about more than looks — it's about a healthy bite and joints. After diagnostics, the orthodontist will choose the best system and explain the timeline and stages.",
    },
    highlights: [
      { uk: "Для дітей і дорослих", pl: "Dla dzieci i dorosłych", en: "For children and adults" },
      { uk: "Естетичні варіанти", pl: "Estetyczne rozwiązania", en: "Aesthetic options" },
      { uk: "Ретенція результату", pl: "Utrzymanie efektu", en: "Long-term retention" },
    ],
    procedures: [
      { uk: "Консультація ортодонта", pl: "Konsultacja ortodontyczna", en: "Orthodontic consultation" },
      { uk: "Ортодонтична діагностика", pl: "Diagnostyka ortodontyczna", en: "Orthodontic diagnostics" },
      { uk: "Металеві брекети", pl: "Aparat metalowy", en: "Metal braces" },
      { uk: "Естетичні брекети", pl: "Aparat estetyczny", en: "Aesthetic braces" },
      { uk: "Самолігуючі брекети", pl: "Aparat samoligaturujący", en: "Self-ligating braces" },
      { uk: "Ретейнери", pl: "Retainery", en: "Retainers" },
    ],
  },
  {
    slug: "implantology",
    icon: "implant",
    image: "implantModel",
    title: { uk: "Імплантологія", pl: "Implantologia", en: "Implantology" },
    short: {
      uk: "Імплантація з цифровим плануванням і хірургічним шаблоном.",
      pl: "Implanty z cyfrowym planowaniem i szablonem chirurgicznym.",
      en: "Implants with digital planning and a surgical guide.",
    },
    intro: {
      uk: "Імплант — надійний спосіб відновити втрачений зуб. Ми плануємо лікування на основі CBCT, за потреби використовуємо хірургічний шаблон і виконуємо процедури з кістковою та м’якотканинною пластикою.",
      pl: "Implant to niezawodny sposób na odbudowę utraconego zęba. Leczenie planujemy na podstawie CBCT, w razie potrzeby stosujemy szablon chirurgiczny i wykonujemy zabiegi regeneracji kości oraz tkanek miękkich.",
      en: "An implant is a reliable way to replace a missing tooth. We plan treatment using CBCT, use a surgical guide where appropriate and perform bone and soft-tissue procedures when needed.",
    },
    highlights: [
      { uk: "Планування за CBCT", pl: "Planowanie na podstawie CBCT", en: "CBCT-based planning" },
      { uk: "Хірургічний шаблон", pl: "Szablon chirurgiczny", en: "Surgical guide" },
      { uk: "Коронка на імпланті", pl: "Korona na implancie", en: "Crown on implant" },
    ],
    procedures: [
      { uk: "Встановлення імпланта", pl: "Wszczepienie implantu", en: "Implant placement" },
      { uk: "Коронка на імпланті", pl: "Korona na implancie", en: "Crown on implant" },
      { uk: "Кісткова пластика", pl: "Regeneracja kości", en: "Bone grafting" },
      { uk: "Пластика м’яких тканин", pl: "Zabiegi na tkankach miękkich", en: "Soft tissue procedures" },
      { uk: "Формувач ясен", pl: "Śruba gojąca", en: "Healing abutment" },
      { uk: "Хірургічний шаблон", pl: "Szablon chirurgiczny", en: "Surgical guide" },
    ],
  },
  {
    slug: "aesthetic-dentistry",
    icon: "smile",
    image: "chair",
    title: { uk: "Естетична стоматологія", pl: "Stomatologia estetyczna", en: "Aesthetic Dentistry" },
    short: {
      uk: "Відбілювання, вініри та естетичні реставрації для впевненої усмішки.",
      pl: "Wybielanie, licówki i odbudowy estetyczne dla pewnego siebie uśmiechu.",
      en: "Whitening, veneers and aesthetic restorations for a confident smile.",
    },
    intro: {
      uk: "Естетичне лікування починається з аналізу усмішки та ваших побажань. Ми пропонуємо рішення від делікатного відбілювання до вінірів — з акцентом на природність і збереження власних тканин зуба.",
      pl: "Leczenie estetyczne zaczyna się od analizy uśmiechu i Twoich oczekiwań. Proponujemy rozwiązania od delikatnego wybielania po licówki — z naciskiem na naturalny efekt i zachowanie tkanek zęba.",
      en: "Aesthetic treatment begins with an analysis of your smile and your wishes. We offer solutions from gentle whitening to veneers — focusing on natural results and preserving tooth tissue.",
    },
    highlights: [
      { uk: "Аналіз усмішки", pl: "Analiza uśmiechu", en: "Smile analysis" },
      { uk: "Природний результат", pl: "Naturalny efekt", en: "Natural-looking results" },
      { uk: "Мінімально інвазивно", pl: "Minimalnie inwazyjnie", en: "Minimally invasive" },
    ],
    procedures: [
      { uk: "Відбілювання", pl: "Wybielanie", en: "Whitening" },
      { uk: "Вініри", pl: "Licówki", en: "Veneers" },
      { uk: "Естетичні реставрації", pl: "Odbudowy estetyczne", en: "Aesthetic restorations" },
      { uk: "Покращення усмішки", pl: "Poprawa estetyki uśmiechu", en: "Smile enhancement" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
