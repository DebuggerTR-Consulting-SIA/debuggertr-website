import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SAP EWM & ABAP Services",
  description:
    "SAP EWM consulting, ABAP development, SAP integration, and training services. End-to-end warehouse management solutions for European businesses.",
  keywords: ["SAP EWM services", "ABAP development services", "SAP consulting services", "warehouse management solutions"],
  alternates: { canonical: "https://www.debuggertr.com/services" },
  openGraph: {
    title: "SAP EWM & ABAP Services | DebuggerTR Consulting",
    description: "Expert SAP EWM consulting and ABAP development services for European businesses.",
    url: "https://www.debuggertr.com/services",
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
