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
    title: "SAP EWM Consulting",
    description:
      "SAP Extended Warehouse Management (EWM) consulting: implementation, S/4HANA migration, RF/mobile rollout, and process optimization for European businesses.",
    alternates: alternatesFor(l, "/services/sap-ewm"),
    openGraph: {
      title: "SAP EWM Consulting | DebuggerTR",
      description:
        "Expert SAP EWM implementation, migration, and optimization across Europe.",
      url: localizedUrl(l, "/services/sap-ewm"),
    },
  };
}

export default function SapEwmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.debuggertr.com" },
          { name: "Services", url: "https://www.debuggertr.com/services" },
          { name: "SAP EWM Consulting", url: "https://www.debuggertr.com/services/sap-ewm" },
        ]}
      />
      <ServiceJsonLd
        name="SAP EWM Consulting"
        description="SAP Extended Warehouse Management (EWM) consulting: implementation, S/4HANA migration, RF/mobile rollout, and process optimization for European businesses."
        url="https://www.debuggertr.com/services/sap-ewm"
      />
      {children}
    </>
  );
}
