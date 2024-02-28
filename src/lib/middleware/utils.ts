import { NextRequest } from "next/server";

export function parseRequest(req: NextRequest) {
  let domain = req.headers.get("host") as string;
  domain = domain.replace("www.", ""); // remove www. from domain

  // path is the path of the URL (e.g. dub.co/stats/github -> /stats/github)
  let path = req.nextUrl.pathname;

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString();
  const fullPath = `${path}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Here, we are using decodeURIComponent to handle foreign languages
  const key = decodeURIComponent(path.split("/")[1]); // key is the first part of the path (e.g. dub.co/stats/github -> stats)
  return { domain, path, key, fullPath };
}
