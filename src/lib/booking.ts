/**
 * Booking form schema + validation.
 * Shared by the client form (UX) and the API route (security):
 * the server NEVER trusts browser input and re-validates everything.
 */

export const serviceOptions = [
  "treatment",
  "implantology",
  "orthodontics",
  "prosthetics",
  "endodontics",
  "surgery",
  "hygiene",
  "whitening",
  "diagnostics",
  "unsure",
] as const;
export const timeframeOptions = ["asap", "month", "quarter", "unknown"] as const;
export const contactTimeOptions = ["morning", "day", "evening", "anytime"] as const;
export const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"] as const;

export type ServiceOption = (typeof serviceOptions)[number];
export type TimeframeOption = (typeof timeframeOptions)[number];
export type ContactTimeOption = (typeof contactTimeOptions)[number];

export type BookingData = {
  service: ServiceOption | "";
  timeframe: TimeframeOption | "";
  contactTime: ContactTimeOption | "";
  name: string;
  phone: string;
  email: string;
  date: string; // YYYY-MM-DD, optional
  time: string; // HH:MM, optional
  message: string;
  consent: boolean;
};

export type BookingErrorKey = "required" | "name" | "phone" | "email" | "date" | "consent";
export type BookingErrors = Partial<Record<keyof BookingData, BookingErrorKey>>;

export const emptyBooking: BookingData = {
  service: "",
  timeframe: "",
  contactTime: "",
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  message: "",
  consent: false,
};

export const LIMITS = { name: 80, phone: 25, email: 120, message: 500 } as const;

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]{1,79}$/u;
const PHONE_CHARS_RE = /^\+?[\d\s()-]{7,25}$/;
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Today as YYYY-MM-DD in local time. */
export function todayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!PHONE_CHARS_RE.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function isValidDate(value: string, now = new Date()): boolean {
  if (!DATE_RE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return false;
  if (value < todayISO(now)) return false;
  // Max ~1 year ahead
  const max = new Date(now);
  max.setFullYear(max.getFullYear() + 1);
  if (date > max) return false;
  return date.getDay() !== 0; // closed on Sundays
}

/** Validate a single step (1-based). Step 4 = contact details, step 5 = consent. */
export function validateStep(step: number, data: BookingData): BookingErrors {
  const errors: BookingErrors = {};
  if (step === 1 && !serviceOptions.includes(data.service as ServiceOption)) errors.service = "required";
  if (step === 2 && !timeframeOptions.includes(data.timeframe as TimeframeOption)) errors.timeframe = "required";
  if (step === 3 && !contactTimeOptions.includes(data.contactTime as ContactTimeOption)) errors.contactTime = "required";
  if (step === 4) {
    if (!NAME_RE.test(data.name.trim())) errors.name = "name";
    if (!isValidPhone(data.phone)) errors.phone = "phone";
    if (data.email.trim() && (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email.trim()))) errors.email = "email";
    if (data.date && !isValidDate(data.date)) errors.date = "date";
  }
  if (step === 5 && data.consent !== true) errors.consent = "consent";
  return errors;
}

export function validateAll(data: BookingData): BookingErrors {
  return [1, 2, 3, 4, 5].reduce<BookingErrors>((acc, s) => ({ ...acc, ...validateStep(s, data) }), {});
}

/**
 * Coerce unknown JSON (from the network) into BookingData.
 * Anything unexpected becomes an empty value and then fails validation.
 */
export function parseBooking(input: unknown): BookingData {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
  const time = str(o.time, 5);
  return {
    service: str(o.service, 20) as BookingData["service"],
    timeframe: str(o.timeframe, 20) as BookingData["timeframe"],
    contactTime: str(o.contactTime, 20) as BookingData["contactTime"],
    name: str(o.name, LIMITS.name),
    phone: str(o.phone, LIMITS.phone),
    email: str(o.email, LIMITS.email),
    date: str(o.date, 10),
    time: (timeSlots as readonly string[]).includes(time) ? time : "",
    message: str(o.message, LIMITS.message),
    consent: o.consent === true,
  };
}
