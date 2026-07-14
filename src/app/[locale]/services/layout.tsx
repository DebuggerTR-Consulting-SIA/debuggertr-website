import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { alternatesFor, localizedUrl } from "@/lib/i18n-routing";
import type { Locale } from "@/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return {
    title: "SAP EWM & ABAP Services",
    description:
      "SAP EWM consulting, ABAP development, SAP integration, and training services. End-to-end warehouse management solutions for European businesses.",
    keywords: ["SAP EWM services", "ABAP development services", "SAP consulting services", "warehouse management solutions"],
    alternates: alternatesFor(l, "/services"),
    openGraph: {
      title: "SAP EWM & ABAP Services | DebuggerTR Consulting",
      description: "Expert SAP EWM consulting and ABAP development services for European businesses.",
      url: localizedUrl(l, "/services"),
    },
  };
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.debuggertr.com" },
          { name: "Services", url: "https://www.debuggertr.com/services" },
        ]}
      />
      <ServiceJsonLd
        name="SAP EWM & ABAP Consulting Services"
        description="SAP EWM consulting, ABAP development, SAP integration, and training services. End-to-end warehouse management solutions for European businesses."
        url="https://www.debuggertr.com/services"
      />
      {children}
    </>
  );
}
