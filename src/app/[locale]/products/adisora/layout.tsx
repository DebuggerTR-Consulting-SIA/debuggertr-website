import type { Metadata } from "next";
import { SoftwareApplicationJsonLd, BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { alternatesFor, localizedUrl } from "@/lib/i18n-routing";
import type { Locale } from "@/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return {
    title: "Adisora — Restaurant Operations Platform",
    description:
      "Adisora is a multilingual restaurant operations platform by DebuggerTR — menu, ordering, kitchen and billing in one place. Web panel + Android app.",
    alternates: alternatesFor(l, "/products/adisora"),
    openGraph: {
      title: "Adisora — Restaurant Operations Platform",
      description:
        "Multilingual restaurant operations platform: menu, ordering, kitchen and billing in one place. By DebuggerTR.",
      url: localizedUrl(l, "/products/adisora"),
    },
  };
}

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
