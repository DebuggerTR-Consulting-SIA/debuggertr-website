import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { adminGuard } from "@/lib/admin-guard";

// Local dev tool, refused elsewhere by adminGuard (src/lib/admin-guard.ts).
// force-dynamic: the handler gets the real request (force-static empties the
// headers and strips the query string).
export const dynamic = "force-dynamic";

const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();
const trackingFile = path.join(PROJECT_ROOT, "src", "data", "tracking.json");

export async function GET(req: NextRequest) {
  const denied = adminGuard(req);
  if (denied) return denied;
  try {
    const data = JSON.parse(fs.readFileSync(trackingFile, "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { googleAnalytics: "", yandexMetrica: "", customHeadCode: "", customBodyCode: "" }
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = adminGuard(req);
  if (denied) return denied;
  try {
    const body = await req.json();
    fs.writeFileSync(trackingFile, JSON.stringify(body, null, 2) + "\n");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
