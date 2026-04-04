"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Messages, Locale } from "@/messages";
import { getMessages, locales } from "@/messages";

interface I18nContextType {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({
  children,
  defaultLocale = "tr",
}: {
  children: ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const messages = getMessages(locale);

  const setLocale = useCallback((newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
    }
  }, []);

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
