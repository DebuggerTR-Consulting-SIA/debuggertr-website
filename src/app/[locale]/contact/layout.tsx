import type { Metadata } from "next";
import type { ReactNode } from "react";
import { alternatesFor, localizedUrl } from "@/lib/i18n-routing";
import type { Locale } from "@/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return {
    title: "Contact",
    description:
      "Get in touch with DebuggerTR Consulting SIA. SAP EWM and ABAP consulting inquiries welcome. Located in Riga, Latvia.",
    keywords: ["contact DebuggerTR", "SAP consulting contact", "ABAP developer contact Latvia"],
    alternates: alternatesFor(l, "/contact"),
    openGraph: {
      title: "Contact DebuggerTR Consulting",
      description: "Reach out for SAP EWM and ABAP consulting services. Based in Riga, Latvia.",
      url: localizedUrl(l, "/contact"),
    },
  };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
