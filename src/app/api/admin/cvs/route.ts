import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Admin API is dev-only; force-static so the production static export build succeeds.
export const dynamic = "force-static";

const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();
const DATA_FILE = path.join(PROJECT_ROOT, "src", "data", "cvs.json");
const CVS_DIR = path.join(PROJECT_ROOT, "public", "cvs");

interface CvEntry {
  id: string;
  name: string;
  slug: string;
  birthDate: string;
  module: string;
  rate: string;
  rateCurrency: string;
  ratePeriod: string;
  fileName: string;
  fileType: string;
  htmlContent: string;
  uploadedAt: string;
}

function readCvs(): CvEntry[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeCvs(data: CvEntry[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(readCvs());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as CvEntry;
    const cvs = readCvs();
    const existing = cvs.findIndex((c) => c.id === body.id);
    if (existing >= 0) {
      cvs[existing] = { ...cvs[existing], ...body };
    } else {
      cvs.push({ ...body, uploadedAt: new Date().toISOString() });
    }
    writeCvs(cvs);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "No id" }, { status: 400 });

    const cvs = readCvs();
    const entry = cvs.find((c) => c.id === id);

    if (entry?.fileName) {
      const filePath = path.join(CVS_DIR, entry.fileName);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    writeCvs(cvs.filter((c) => c.id !== id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
