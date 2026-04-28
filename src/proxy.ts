import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    return new NextResponse(null, { status: 404 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/_blocked";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
