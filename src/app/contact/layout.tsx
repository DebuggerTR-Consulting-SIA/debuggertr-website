import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with DebuggerTR Consulting SIA. SAP EWM and ABAP consulting inquiries welcome. Located in Riga, Latvia.",
  keywords: ["contact DebuggerTR", "SAP consulting contact", "ABAP developer contact Latvia"],
  alternates: { canonical: "https://debuggertr.com/contact" },
  openGraph: {
    title: "Contact DebuggerTR Consulting",
    description: "Reach out for SAP EWM and ABAP consulting services. Based in Riga, Latvia.",
    url: "https://debuggertr.com/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
