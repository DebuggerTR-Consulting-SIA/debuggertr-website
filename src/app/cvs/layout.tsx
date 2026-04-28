import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Our Consultants",
  description:
    "Browse senior SAP EWM and ABAP consultants available through DebuggerTR Consulting.",
  alternates: { canonical: "https://www.debuggertr.com/cvs" },
  openGraph: {
    title: "Our Consultants | DebuggerTR Consulting",
    description:
      "Browse senior SAP EWM and ABAP consultants available through DebuggerTR Consulting.",
    url: "https://www.debuggertr.com/cvs",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F4C81",
};

export default function CvsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
