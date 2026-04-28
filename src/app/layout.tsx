import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/SEO/JsonLd";
import TrackingScripts from "@/components/SEO/TrackingScripts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DebuggerTR Consulting | SAP EWM & ABAP Consulting",
    template: "%s | DebuggerTR Consulting",
  },
  description:
    "SAP EWM (Extended Warehouse Management) and ABAP consulting services based in Riga, Latvia. Expert SAP warehouse management and custom ABAP development for European businesses.",
  keywords: [
    // English
    "SAP EWM", "SAP EWM consulting", "ABAP development", "SAP consulting",
    "warehouse management", "SAP S/4HANA", "EWM implementation", "ABAP developer",
    "SAP Latvia", "DebuggerTR", "Extended Warehouse Management", "SAP WM",
    "SAP EWM consultant", "SAP ABAP freelancer", "SAP warehouse consultant Europe",
    // German
    "SAP EWM Beratung", "SAP EWM Consultant", "ABAP Entwicklung", "SAP Beratung",
    "Lagerverwaltung SAP", "SAP EWM Implementierung", "SAP Berater Europa",
    "SAP EWM Lettland", "ABAP Entwickler",
    // Turkish
    "SAP EWM danışmanlık", "ABAP geliştirme", "SAP danışmanlık", "depo yönetimi SAP",
    "SAP EWM implementasyon", "ABAP geliştirici", "SAP Letonya", "SAP EWM uzmanı",
    // Latvian
    "SAP EWM konsultācijas", "ABAP izstrāde", "SAP konsultācijas", "noliktavas pārvaldība",
    "SAP risinājumi Latvija", "SAP EWM ieviešana",
  ],
  authors: [{ name: "DebuggerTR Consulting SIA" }],
  creator: "DebuggerTR Consulting SIA",
  publisher: "DebuggerTR Consulting SIA",
  metadataBase: new URL("https://www.debuggertr.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "de": "/",
      "tr": "/",
      "lv": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE", "tr_TR", "lv_LV"],
    url: "https://www.debuggertr.com",
    siteName: "DebuggerTR Consulting",
    title: "DebuggerTR Consulting | SAP EWM & ABAP Consulting",
    description:
      "Expert SAP EWM and ABAP consulting services based in Latvia. Warehouse management implementation, migration, and optimization for European businesses.",
    images: [
      {
        url: "/images/logo-dark.png",
        width: 300,
        height: 80,
        alt: "DebuggerTR Consulting",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "DebuggerTR Consulting | SAP EWM & ABAP",
    description: "Expert SAP EWM and ABAP consulting services based in Latvia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <TrackingScripts />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
