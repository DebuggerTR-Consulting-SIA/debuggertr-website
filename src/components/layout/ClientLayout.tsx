"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { I18nProvider } from "@/lib/i18n-context";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isCvProfile = pathname.startsWith("/cvs/");

  if (isAdmin || isCvProfile) return <>{children}</>;

  return (
    <I18nProvider defaultLocale="en">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </I18nProvider>
  );
}
