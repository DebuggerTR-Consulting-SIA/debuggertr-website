import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Admin API is dev-only; force-static so the production static export build succeeds.
export const dynamic = "force-static";

const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();
const trackingFile = path.join(PROJECT_ROOT, "src", "data", "tracking.json");

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(trackingFile, "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { googleAnalytics: "", yandexMetrica: "", customHeadCode: "", customBodyCode: "" }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    fs.writeFileSync(trackingFile, JSON.stringify(body, null, 2) + "\n");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
