import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientLayout from "@/components/layout/ClientLayout";
import { locales, type Locale } from "@/messages";
import { alternatesFor } from "@/lib/i18n-routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Home-page (and default) hreflang alternates. Sub-pages override with their
// own path via generateMetadata.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { alternates: alternatesFor(l, "/") };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }
  return <ClientLayout locale={locale as Locale}>{children}</ClientLayout>;
}
