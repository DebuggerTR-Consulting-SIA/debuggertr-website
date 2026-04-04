import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import CvProfileClient from "./CvProfileClient";

const DATA_FILE = path.join(
  process.env.PROJECT_ROOT ?? process.cwd(),
  "src", "data", "cvs.json"
);

interface CvEntry {
  id: string; name: string; slug: string; birthDate: string;
  module: string; rate: string; rateCurrency: string;
  ratePeriod: "daily" | "hourly"; fileName: string;
  fileType: string; htmlContent: string; uploadedAt: string;
}

function readCvs(): CvEntry[] {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")); }
  catch { return []; }
}

// Promote standalone bold paragraphs to h2 for CVs that use title-case headings
// (outside table cells — split on <table> blocks to skip job titles inside cells)
function promoteHeadings(html: string): string {
  if (!html || /<h2/i.test(html)) return html; // already has headings
  const parts = html.split(/(<table[\s\S]*?<\/table>)/gi);
  return parts.map((part, i) => {
    if (i % 2 === 1) return part; // table block — skip
    return part.replace(
      /<p><strong>([^<]{3,75})<\/strong><\/p>/g,
      (match, text) => {
        const t = text.trim();
        if (!t || t.includes("|") || t.includes("@") || t.includes("·")) return match;
        return `<h2>${t}</h2>`;
      }
    );
  }).join("");
}

// ── Static params for output: export ────────────────────────────────
export function generateStaticParams() {
  return readCvs().map(cv => ({ slug: cv.slug }));
}

// ── Dynamic metadata for SEO ────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cv = readCvs().find(c => c.slug === slug);
  if (!cv) return { title: "Consultant Profile | DebuggerTR" };

  const modules = cv.module.split(/[,،]/).map(m => m.trim()).filter(Boolean);
  const title = `${cv.name} | SAP ${modules[0]} Consultant | DebuggerTR`;
  const description = `${cv.name} is an experienced SAP ${modules.join(" & ")} consultant available through DebuggerTR Consulting SIA. Rate: ${cv.rateCurrency === "EUR" ? "€" : cv.rateCurrency}${cv.rate} per ${cv.ratePeriod}.`;

  return {
    title,
    description,
    keywords: [
      cv.name, "SAP consultant", ...modules.map(m => `SAP ${m}`),
      "EWM ABAP consultant", "DebuggerTR", "SAP freelancer",
      "SAP developer Latvia", "SAP EWM specialist"
    ],
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://debuggertr.com/cvs/${cv.slug}`,
      siteName: "DebuggerTR Consulting",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://debuggertr.com/cvs/${cv.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────
export default async function CvPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cvs = readCvs();
  const cv = cvs.find(c => c.slug === slug);
  if (!cv) notFound();

  const initialCv = { ...cv, htmlContent: promoteHeadings(cv.htmlContent) };
  return <CvProfileClient initialCv={initialCv} />;
}
