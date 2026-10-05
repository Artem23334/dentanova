import type { L10n } from "@/i18n/config";
import type { IconName } from "@/components/ui/Icon";
import type { ImageKey } from "./images";

/* ------------------------------------------------------------------ */
/* Technology                                                          */
/* ------------------------------------------------------------------ */
export type Technology = { icon: IconName; title: L10n; text: L10n; image?: ImageKey };

export const technologies: Technology[] = [
  {
    icon: "cube",
    image: "xray",
    title: { uk: "3D-томографія CBCT", pl: "Tomografia 3D CBCT", en: "3D CBCT imaging" },
    text: {
      uk: "Тривимірне зображення кісток і коренів для планування імплантації, хірургії та лікування каналів.",
      pl: "Trójwymiarowy obraz kości i korzeni do planowania implantów, chirurgii i leczenia kanałowego.",
      en: "A three-dimensional view of bone and roots for planning implants, surgery and root canal treatment.",
    },
  },
  {
    icon: "xray",
    title: { uk: "Цифровий рентген", pl: "Cyfrowe RTG", en: "Digital X-ray" },
    text: {
      uk: "Миттєвий знімок на екрані з низькою дозою опромінення.",
      pl: "Natychmiastowy obraz na ekranie przy niskiej dawce promieniowania.",
      en: "Instant images on screen with a low radiation dose.",
    },
  },
  {
    icon: "microscope",
    title: { uk: "Стоматологічний мікроскоп", pl: "Mikroskop stomatologiczny", en: "Dental microscope" },
    text: {
      uk: "Багаторазове збільшення для точного лікування каналів і реставрацій.",
      pl: "Wielokrotne powiększenie dla precyzyjnego leczenia kanałowego i odbudów.",
      en: "High magnification for precise root canal work and restorations.",
    },
  },
  {
    icon: "camera",
    title: { uk: "Інтраоральна камера", pl: "Kamera wewnątrzustna", en: "Intraoral camera" },
    text: {
      uk: "Ви бачите те, що бачить лікар, — і краще розумієте план лікування.",
      pl: "Widzisz to, co widzi lekarz — i lepiej rozumiesz plan leczenia.",
      en: "You see what the doctor sees — and understand your plan better.",
    },
  },
  {
    icon: "scan",
    title: { uk: "Цифрова діагностика", pl: "Diagnostyka cyfrowa", en: "Digital diagnostics" },
    text: {
      uk: "Цифрові відбитки та фотопротокол замість неприємних відбиткових мас.",
      pl: "Cyfrowe wyciski i dokumentacja fotograficzna zamiast tradycyjnych mas wyciskowych.",
      en: "Digital impressions and photo records instead of messy impression trays.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials — FICTIONAL, for demonstration only                    */
/* ------------------------------------------------------------------ */
export type Testimonial = { name: string; service: L10n; text: L10n };

export const testimonials: Testimonial[] = [
  {
    name: "Anna K.",
    service: { uk: "Професійна гігієна", pl: "Higienizacja", en: "Professional hygiene" },
    text: {
      uk: "Усе пояснили українською, без поспіху. Після гігієни отримала зрозумілі поради, як доглядати за зубами вдома.",
      pl: "Wszystko wyjaśniono spokojnie i w moim języku. Po higienizacji dostałam jasne wskazówki, jak dbać o zęby w domu.",
      en: "Everything was explained calmly and in my language. After the hygiene visit I got clear tips for home care.",
    },
  },
  {
    name: "Andrii M.",
    service: { uk: "Лікування каналів", pl: "Leczenie kanałowe", en: "Root canal treatment" },
    text: {
      uk: "Боявся лікування каналів, але все пройшло спокійно. Лікар показав знімки до і після — усе прозоро.",
      pl: "Bałem się leczenia kanałowego, ale wszystko przebiegło spokojnie. Lekarz pokazał zdjęcia przed i po — pełna przejrzystość.",
      en: "I was nervous about the root canal, but it went smoothly. The doctor showed me the before and after images — fully transparent.",
    },
  },
  {
    name: "Magdalena W.",
    service: { uk: "Імплантація", pl: "Implantologia", en: "Implantology" },
    text: {
      uk: "Отримала письмовий план із етапами і вартістю ще до початку. Жодних несподіванок у процесі.",
      pl: "Otrzymałam pisemny plan z etapami i kosztami jeszcze przed rozpoczęciem. Żadnych niespodzianek po drodze.",
      en: "I received a written plan with stages and costs before we started. No surprises along the way.",
    },
  },
  {
    name: "Daniel R.",
    service: { uk: "Консультація", pl: "Konsultacja", en: "Consultation" },
    text: {
      uk: "Записався онлайн за хвилину, мені передзвонили того ж дня. Зручно, що можна спілкуватися англійською.",
      pl: "Zapisałem się online w minutę, oddzwoniono tego samego dnia. Wygodne, że można rozmawiać po angielsku.",
      en: "Booked online in a minute and got a call back the same day. Great that I could speak English.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export type Faq = { q: L10n; a: L10n };

export const faqs: Faq[] = [
  {
    q: { uk: "Як записатися на консультацію?", pl: "Jak umówić się na konsultację?", en: "How can I book a consultation?" },
    a: {
      uk: "Заповніть коротку онлайн-форму на сайті або зателефонуйте нам. Адміністратор зв’яжеться з вами у зручний час і підтвердить дату візиту.",
      pl: "Wypełnij krótki formularz online na stronie lub zadzwoń do nas. Recepcja skontaktuje się z Tobą w dogodnym czasie i potwierdzi termin wizyty.",
      en: "Fill in the short online form or give us a call. Our reception will contact you at a convenient time to confirm the date.",
    },
  },
  {
    q: { uk: "Скільки коштує консультація?", pl: "Ile kosztuje konsultacja?", en: "How much does a consultation cost?" },
    a: {
      uk: "Консультація коштує 100 zł, консультація з письмовим планом лікування — 300 zł (демо-ціни). Діагностичні знімки оплачуються окремо, якщо вони потрібні.",
      pl: "Konsultacja kosztuje 100 zł, konsultacja z pisemnym planem leczenia — 300 zł (ceny demo). Zdjęcia diagnostyczne są płatne osobno, jeśli są potrzebne.",
      en: "A consultation costs 100 PLN; a consultation with a written treatment plan is 300 PLN (demo prices). Diagnostic images are charged separately if needed.",
    },
  },
  {
    q: { uk: "Якими мовами ви спілкуєтеся?", pl: "W jakich językach rozmawiacie?", en: "What languages are available?" },
    a: {
      uk: "Українською, польською та англійською. Мову можна вказати під час запису — ми підберемо лікаря, з яким вам буде комфортно.",
      pl: "Po polsku, ukraińsku i angielsku. Język możesz wskazać przy zapisie — dobierzemy lekarza, z którym będzie Ci wygodnie.",
      en: "Ukrainian, Polish and English. Let us know when booking and we'll match you with a doctor you're comfortable with.",
    },
  },
  {
    q: { uk: "Чи можна зробити діагностику в клініці?", pl: "Czy diagnostykę można wykonać w klinice?", en: "Can diagnostics be done at the clinic?" },
    a: {
      uk: "Так. На місці можна зробити прицільний і панорамний знімок, а також 3D-томографію (CBCT) — без додаткових поїздок.",
      pl: "Tak. Na miejscu wykonamy zdjęcie punktowe, pantomogram oraz tomografię 3D (CBCT) — bez dodatkowych wizyt w innych miejscach.",
      en: "Yes. Periapical and panoramic X-rays as well as 3D CBCT can be taken on site — no need to go elsewhere.",
    },
  },
  {
    q: { uk: "Що робити, якщо болить зуб?", pl: "Co zrobić, gdy boli ząb?", en: "What should I do in case of dental pain?" },
    a: {
      uk: "Зателефонуйте нам якомога раніше — ми намагаємося прийняти пацієнтів із гострим болем того ж дня. При набряку обличчя, високій температурі чи утрудненому диханні негайно зверніться по невідкладну допомогу (112).",
      pl: "Zadzwoń do nas jak najszybciej — staramy się przyjmować pacjentów z ostrym bólem tego samego dnia. W przypadku obrzęku twarzy, wysokiej gorączki lub trudności w oddychaniu natychmiast wezwij pomoc (112).",
      en: "Call us as soon as possible — we try to see patients with acute pain the same day. If you have facial swelling, a high fever or difficulty breathing, seek emergency help immediately (112).",
    },
  },
  {
    q: { uk: "Скільки триває лікування?", pl: "Jak długo trwa leczenie?", en: "How long does treatment take?" },
    a: {
      uk: "Це залежить від ситуації: пломба — зазвичай один візит, лікування каналів — 1–3 візити, імплантація — кілька місяців з урахуванням загоєння. Точні терміни ви побачите у плані лікування.",
      pl: "To zależy od sytuacji: wypełnienie to zwykle jedna wizyta, leczenie kanałowe 1–3 wizyty, a implantacja kilka miesięcy z uwzględnieniem gojenia. Dokładne terminy znajdziesz w planie leczenia.",
      en: "It depends: a filling is usually one visit, root canal treatment 1–3 visits, and implants take several months including healing. You'll see exact timelines in your treatment plan.",
    },
  },
];
