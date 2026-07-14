import { NextResponse, type NextRequest } from "next/server";

// Kept in sync with src/messages locales. Hardcoded here so the proxy bundle
// doesn't pull in the (large) message objects.
const PREFIXED_LOCALES = ["tr", "lv", "de"]; // en is the default, served unprefixed
const DEFAULT_LOCALE = "en";

// Root-level routes that live OUTSIDE app/[locale] and must not be localized.
const NON_LOCALIZED_PREFIXES = ["/cvs", "/admin", "/api", "/_blocked"];

function isPassthrough(pathname: string): boolean {
  if (
    NON_LOCALIZED_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    )
  ) {
    return true;
  }
  return (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin protection in production (unchanged behavior).
  if (process.env.NODE_ENV === "production") {
    if (pathname.startsWith("/api/admin")) {
      return new NextResponse(null, { status: 404 });
    }
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const url = request.nextUrl.clone();
      url.pathname = "/_blocked";
      return NextResponse.rewrite(url);
    }
  }

  // Non-localized + metadata routes pass straight through.
  if (isPassthrough(pathname)) {
    return NextResponse.next();
  }

  const firstSeg = pathname.split("/")[1] ?? "";

  // Explicit /en → strip the prefix so the default locale has one canonical URL.
  if (firstSeg === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Already-prefixed non-default locales render directly from app/[locale].
  if (PREFIXED_LOCALES.includes(firstSeg)) {
    return NextResponse.next();
  }

  // Unprefixed localized path (/, /about, ...) → serve the default locale
  // internally without changing the URL.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
