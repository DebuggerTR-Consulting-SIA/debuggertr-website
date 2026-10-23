import { NextResponse, type NextRequest } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { adminGuard } from "@/lib/admin-guard";

// Local dev tool, refused elsewhere by adminGuard (src/lib/admin-guard.ts).
// force-dynamic: the handler gets the real request (force-static empties the
// headers and strips the query string).
export const dynamic = "force-dynamic";

const execAsync = promisify(exec);

const PROJECT_ROOT = process.env.PROJECT_ROOT ?? process.cwd();
const OUT_DIR = path.join(PROJECT_ROOT, "out");
// Published folder sits next to the project root
const PUBLISHED_DIR = path.join(PROJECT_ROOT, "..", "Published");

function copyDirSync(src: string, dest: string) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function removeDirSync(dir: string) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

export async function POST(req: NextRequest) {
  const denied = adminGuard(req);
  if (denied) return denied;
  try {
    // Resolve node binary path from the running process to avoid PATH issues
    // when Turbopack tries to spawn pooled node processes in a restricted env.
    const nodeBin = process.execPath;
    const nodeDir = path.dirname(nodeBin);

    // Build the static site (output: export).
    // --webpack forces webpack (not Turbopack), which is required for static
    // export and avoids Turbopack pooled-process panics in restricted envs.
    const { stdout, stderr } = await execAsync(
      `"${nodeBin}" node_modules/next/dist/bin/next build --webpack`,
      {
        cwd: PROJECT_ROOT,
        timeout: 180000,
        maxBuffer: 50 * 1024 * 1024, // 50 MB — next build output exceeds the 1 MB default
        env: {
          ...process.env,
          NODE_ENV: "production",
          PATH: `${nodeDir}:${process.env.PATH ?? ""}`,
        },
      }
    );

    if (!fs.existsSync(OUT_DIR)) {
      return NextResponse.json(
        { error: "Build succeeded but 'out/' folder not found.", stdout, stderr },
        { status: 500 }
      );
    }

    // Clear old Published folder and copy fresh build
    removeDirSync(PUBLISHED_DIR);
    copyDirSync(OUT_DIR, PUBLISHED_DIR);

    // Remove admin page from Published (it only works in dev mode)
    const adminPublishedDir = path.join(PUBLISHED_DIR, "admin");
    removeDirSync(adminPublishedDir);

    // Write publish metadata
    fs.writeFileSync(
      path.join(PUBLISHED_DIR, "publish-info.json"),
      JSON.stringify(
        { publishedAt: new Date().toISOString(), source: "debuggertr-website" },
        null,
        2
      )
    );

    return NextResponse.json({
      ok: true,
      publishedAt: new Date().toISOString(),
      publishedTo: PUBLISHED_DIR,
    });
  } catch (err: unknown) {
    const error = err as { message?: string; stdout?: string; stderr?: string };
    return NextResponse.json(
      { error: error.message ?? String(err), stdout: error.stdout, stderr: error.stderr },
      { status: 500 }
    );
  }
}
