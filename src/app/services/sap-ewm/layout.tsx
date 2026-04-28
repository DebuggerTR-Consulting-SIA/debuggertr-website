import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAP EWM Consulting",
  description:
    "SAP Extended Warehouse Management (EWM) consulting: implementation, S/4HANA migration, RF/mobile rollout, and process optimization for European businesses.",
  alternates: { canonical: "https://www.debuggertr.com/services/sap-ewm" },
  openGraph: {
    title: "SAP EWM Consulting | DebuggerTR",
    description:
      "Expert SAP EWM implementation, migration, and optimization across Europe.",
    url: "https://www.debuggertr.com/services/sap-ewm",
  },
};

export default function SapEwmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
