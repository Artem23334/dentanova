import type { Locale } from "./config";
import uk, { type Dictionary } from "./dictionaries/uk";
import pl from "./dictionaries/pl";
import en from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { uk, pl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
