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
    title: "About Us",
    description:
      "Learn about DebuggerTR Consulting SIA — a Latvia-based SAP EWM and ABAP consulting firm. Our mission, vision, values, and legal information.",
    keywords: ["about DebuggerTR", "SAP EWM consulting Latvia", "ABAP consulting firm", "DebuggerTR Consulting SIA"],
    alternates: alternatesFor(l, "/about"),
    openGraph: {
      title: "About DebuggerTR Consulting",
      description: "Latvia-based SAP EWM and ABAP consulting firm. Reg. No: 50203500891.",
      url: localizedUrl(l, "/about"),
    },
  };
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
