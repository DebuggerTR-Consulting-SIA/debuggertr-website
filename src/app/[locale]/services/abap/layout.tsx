import type { Metadata } from "next";
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
    title: "ABAP Development",
    description:
      "Custom SAP ABAP development: reports, enhancements, BAdIs, OData services, and clean-core extensions for SAP S/4HANA and ECC systems.",
    alternates: alternatesFor(l, "/services/abap"),
    openGraph: {
      title: "ABAP Development | DebuggerTR",
      description:
        "Custom ABAP development and S/4HANA extensions for European businesses.",
      url: localizedUrl(l, "/services/abap"),
    },
  };
}

export default function AbapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.debuggertr.com" },
          { name: "Services", url: "https://www.debuggertr.com/services" },
          { name: "ABAP Development", url: "https://www.debuggertr.com/services/abap" },
        ]}
      />
      <ServiceJsonLd
        name="SAP ABAP Development"
        description="Custom SAP ABAP development: reports, enhancements, BAdIs, OData services, and clean-core extensions for SAP S/4HANA and ECC systems."
        url="https://www.debuggertr.com/services/abap"
      />
      {children}
    </>
  );
}
