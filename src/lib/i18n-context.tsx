"use client";

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Messages, Locale } from "@/messages";
import { getMessages, locales } from "@/messages";

const DEFAULT_LOCALE: Locale = "en";

interface I18nContextType {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

/** Strip a leading /tr, /lv, /de prefix (en is unprefixed). Returns "/..." path. */
function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if ((locales as readonly string[]).includes(seg) && seg !== DEFAULT_LOCALE) {
    return pathname.slice(seg.length + 1) || "/";
  }
  return pathname || "/";
}

export function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const messages = getMessages(locale);
  const router = useRouter();
  const pathname = usePathname();

  // Keep <html lang> in sync with the active locale (root layout renders a
  // static shell; this corrects it client-side for tr/lv/de).
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (!locales.includes(newLocale) || newLocale === locale) return;
      const basePath = stripLocale(pathname || "/");
      const target =
        newLocale === DEFAULT_LOCALE
          ? basePath
          : `/${newLocale}${basePath === "/" ? "" : basePath}`;
      router.push(target || "/");
    },
    [locale, pathname, router],
  );

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
