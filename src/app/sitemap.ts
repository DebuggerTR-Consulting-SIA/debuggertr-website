import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { locales } from "@/messages";
import { localizedUrl } from "@/lib/i18n-routing";

export const dynamic = "force-static";

const BASE_URL = "https://www.debuggertr.com";

// Localized pages: the default (en) URL is listed, with hreflang alternates for
// every locale. Priorities mirror the previous sitemap.
const LOCALIZED: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/sap-ewm", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/abap", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/adisora", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

function languagesFor(p: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of locales) langs[l] = localizedUrl(l, p);
  return langs;
}

interface CvEntry {
  slug: string;
  uploadedAt: string;
}

function readCvs(): CvEntry[] {
  try {
    return JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "src", "data", "cvs.json"),
        "utf-8",
      ),
    );
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localized: MetadataRoute.Sitemap = LOCALIZED.map((entry) => ({
    url: localizedUrl("en", entry.path),
    lastModified: new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: { languages: languagesFor(entry.path) },
  }));

  // CV pages are not localized (single URL).
  const cvs = readCvs();
  const cvEntries: MetadataRoute.Sitemap = cvs.map((cv) => ({
    url: `${BASE_URL}/cvs/${cv.slug}`,
    lastModified: cv.uploadedAt ? new Date(cv.uploadedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...localized,
    {
      url: `${BASE_URL}/cvs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...cvEntries,
  ];
}
