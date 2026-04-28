import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABAP Development",
  description:
    "Custom SAP ABAP development: reports, enhancements, BAdIs, OData services, and clean-core extensions for SAP S/4HANA and ECC systems.",
  alternates: { canonical: "https://www.debuggertr.com/services/abap" },
  openGraph: {
    title: "ABAP Development | DebuggerTR",
    description:
      "Custom ABAP development and S/4HANA extensions for European businesses.",
    url: "https://www.debuggertr.com/services/abap",
  },
};

export default function AbapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
