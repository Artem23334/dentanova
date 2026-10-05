import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing:
 *  /pl/...  and /en/...  -> served as-is
 *  /uk/...               -> redirected to the un-prefixed URL (Ukrainian is the default)
 *  everything else       -> internally rewritten to /uk/... (URL stays clean)
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === "pl" || first === "en") return NextResponse.next();

  if (first === "uk") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/uk/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/uk${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and files with an extension (images, sitemap.xml, robots.txt ...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
