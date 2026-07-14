import type { Metadata } from "next";
import { SoftwareApplicationJsonLd, BreadcrumbJsonLd } from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "Adisora — Restaurant Operations Platform",
  description:
    "Adisora is a multilingual restaurant operations platform by DebuggerTR — menu, ordering, kitchen and billing in one place. Web panel + Android app.",
  alternates: { canonical: "https://www.debuggertr.com/products/adisora" },
  openGraph: {
    title: "Adisora — Restaurant Operations Platform",
    description:
      "Multilingual restaurant operations platform: menu, ordering, kitchen and billing in one place. By DebuggerTR.",
    url: "https://www.debuggertr.com/products/adisora",
  },
};

export default function AdisoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.debuggertr.com" },
          { name: "Adisora", url: "https://www.debuggertr.com/products/adisora" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Adisora Business"
        description="Adisora is a multilingual restaurant operations platform by DebuggerTR — menu, ordering, kitchen and billing in one place. Web panel + iOS & Android apps."
        url="https://www.debuggertr.com/products/adisora"
        downloadUrls={[
          "https://apps.apple.com/lv/app/adisora-business-app/id6763128028",
          "https://play.google.com/store/apps/details?id=com.debuggertr.adisorabusiness",
        ]}
      />
      {children}
    </>
  );
}
