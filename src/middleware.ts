import { NextRequest, NextResponse } from "next/server";

import { AUTH_ROUTES, PUBLIC_ROUTES } from "@lib/constants/middleware";
import { updateSession } from "@lib/middleware";
import { parseRequest } from "@lib/middleware/utils";
import { createServerClient } from "@lib/supabase/server";

export async function middleware(request: NextRequest) {
  await updateSession(request);
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { key } = parseRequest(request);

  if (!user && !PUBLIC_ROUTES.has(key) && !AUTH_ROUTES.has(key)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user && AUTH_ROUTES.has(key)) {
    return NextResponse.redirect(new URL("/projects", request.url));
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
