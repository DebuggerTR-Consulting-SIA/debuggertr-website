import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DebuggerTR Consulting SIA — a Latvia-based SAP EWM and ABAP consulting firm. Our mission, vision, values, and legal information.",
  keywords: ["about DebuggerTR", "SAP EWM consulting Latvia", "ABAP consulting firm", "DebuggerTR Consulting SIA"],
  alternates: { canonical: "https://www.debuggertr.com/about" },
  openGraph: {
    title: "About DebuggerTR Consulting",
    description: "Latvia-based SAP EWM and ABAP consulting firm. Reg. No: 50203500891.",
    url: "https://www.debuggertr.com/about",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
