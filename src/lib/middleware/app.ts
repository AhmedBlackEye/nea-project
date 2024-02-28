import { NextRequest, NextResponse } from "next/server";

import { createServerClient } from "../supabase/server";
import { parseRequest } from "./utils";

export default async function AppMiddleware(req: NextRequest) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { path, fullPath } = parseRequest(req);
  
  if (!user && path !== "/login" && path !== "/register") {
    return NextResponse.redirect(
      new URL(
        `/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`,
        req.url,
      ),
    );
  } else if (user && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // otherwise, rewrite the path to /app
  return NextResponse.rewrite(
    new URL(`/app.dub.co${fullPath === "/" ? "" : fullPath}`, req.url),
  );
}
