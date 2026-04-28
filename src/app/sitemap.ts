import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

const BASE_URL = "https://www.debuggertr.com";

interface CvEntry { slug: string; uploadedAt: string }

function readCvs(): CvEntry[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "data", "cvs.json"), "utf-8"));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const cvs = readCvs();
  const cvEntries: MetadataRoute.Sitemap = cvs.map((cv) => ({
    url: `${BASE_URL}/cvs/${cv.slug}`,
    lastModified: cv.uploadedAt ? new Date(cv.uploadedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/sap-ewm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/abap`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    // { url: `${BASE_URL}/references`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }, // hidden until client permissions are confirmed
    { url: `${BASE_URL}/cvs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    ...cvEntries,
  ];
}
