import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "References",
  description:
    "Our client references across logistics, pharmaceutical, retail, and manufacturing sectors. Successful SAP EWM and ABAP projects in Europe.",
  keywords: ["SAP EWM references", "ABAP project references", "SAP consulting clients", "DebuggerTR references"],
  alternates: { canonical: "https://debuggertr.com/references" },
  openGraph: {
    title: "Client References | DebuggerTR Consulting",
    description: "Successful SAP EWM and ABAP projects across European industries.",
    url: "https://debuggertr.com/references",
  },
};

export default function ReferencesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
