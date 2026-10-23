import { NextResponse, type NextRequest } from "next/server";

/**
 * Route-level guard for the /api/admin/* developer tools.
 *
 * These routes have no login. They read and write files under src/data and
 * public/cvs, and /api/admin/publish runs `next build`. They are meant to run
 * only on a local `next dev` server, driven by the /admin page.
 *
 * src/proxy.ts also returns 404 for /api/admin/* in production. This guard
 * does not rely on it: a proxy bypass must still reach a handler that says no.
 * Every handler under src/app/api/admin must call it first:
 *
 *   const denied = adminGuard(req);
 *   if (denied) return denied;
 *
 * The admin routes must use `dynamic = "force-dynamic"`. Under "force-static"
 * Next.js hands the handler an empty `headers` object and a URL without its
 * query string, so the local-origin checks below would see nothing.
 */

// `next build` inlines NODE_ENV, so on any built deployment (Vercel production,
// Vercel preview, `next start`) this is false and cannot be flipped at runtime.
// VERCEL_ENV is a second, independent signal for Vercel deployments. It is
// "development" (or unset) for local work, including after `vercel env pull`.
export function adminToolsEnabled(): boolean {
  const vercelEnv = process.env.VERCEL_ENV;
  return (
    process.env.NODE_ENV === "development" &&
    vercelEnv !== "production" &&
    vercelEnv !== "preview"
  );
}

const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

function hostnameOf(host: string): string | null {
  try {
    return new URL(`http://${host}`).hostname;
  } catch {
    return null;
  }
}

/**
 * In dev, accept only same-origin requests addressed to a loopback host.
 * This blocks a web page open in the same browser from writing to the data
 * files (cross-site POST, or DNS rebinding to localhost).
 * Returns a reason string when the request must be refused.
 */
function localRequestProblem(req: NextRequest): string | null {
  const host = req.headers.get("host");
  const hostname = host ? hostnameOf(host) : null;
  if (!hostname || !LOOPBACK_HOSTNAMES.has(hostname)) {
    return "the Host is not localhost";
  }

  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") {
    return `Sec-Fetch-Site is ${fetchSite}`;
  }

  const origin = req.headers.get("origin");
  if (origin) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (originHost !== host) {
      return "the Origin does not match the Host";
    }
  }

  return null;
}

/**
 * Returns a response to send instead of running the handler, or null when the
 * request may proceed.
 * - Outside local development: 404 with an empty body, the same as proxy.ts.
 * - In local development, from a non-local or cross-site caller: 403.
 */
export function adminGuard(req: NextRequest): NextResponse | null {
  if (!adminToolsEnabled()) {
    return new NextResponse(null, { status: 404 });
  }
  const problem = localRequestProblem(req);
  if (problem) {
    return NextResponse.json(
      { error: `Admin API refused: ${problem}. Open /admin on localhost.` },
      { status: 403 },
    );
  }
  return null;
}
