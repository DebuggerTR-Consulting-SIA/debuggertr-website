import type { Metadata } from "next";

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
  return <>{children}</>;
}
