import { NextRequest, NextResponse } from "next/server";

import { AppMiddleware, updateSession } from "./lib/middleware";
import {
  APP_DOMAIN,
  APP_HOSTNAMES,
  DEFAULT_REDIRECTS,
} from "./lib/middleware/constants";
import { parseRequest } from "./lib/middleware/utils";

export async function middleware(request: NextRequest) {
  await updateSession(request);
  const { path, key, domain } = parseRequest(request);
  console.log(APP_DOMAIN);
  // for App
  if (APP_HOSTNAMES.has(domain)) {
    return AppMiddleware(request);
  }
  console.log("passed", key in DEFAULT_REDIRECTS, domain, APP_DOMAIN);
  // default redirects for dub.sh
  if (domain === APP_DOMAIN && key in DEFAULT_REDIRECTS) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECTS[key]));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
