import tr from "./tr";
import en from "./en";
import lv from "./lv";
import de from "./de";

export const locales = ["en", "tr", "lv", "de"] as const;
export type Locale = (typeof locales)[number];

const messages = { en, tr, lv, de } as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}

export type Messages = typeof en;
