"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n-context";
import type { Locale } from "@/messages";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <I18nProvider locale={locale}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </I18nProvider>
  );
}
