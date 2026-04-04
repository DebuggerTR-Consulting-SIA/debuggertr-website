import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Admin API is dev-only; force-static so the production static export build succeeds.
export const dynamic = "force-static";

// process.cwd() may return the session root when started via preview_start.
// PROJECT_ROOT env var (set in .env.local) provides the reliable project path.
const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();
const dataDir = path.join(PROJECT_ROOT, "src", "data");

function readJson(file: string) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));
}

function writeJson(file: string, data: unknown) {
  fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2) + "\n");
}

export async function GET() {
  try {
    const references = readJson("references.json");
    const stats = readJson("stats.json");
    const company = readJson("company.json");
    return NextResponse.json({ references, stats, company });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.references !== undefined) writeJson("references.json", body.references);
    if (body.stats !== undefined) writeJson("stats.json", body.stats);
    if (body.company !== undefined) writeJson("company.json", body.company);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
