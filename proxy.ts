import { createClient } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/activate"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { response, supabase } = createClient(request);

  const isPublic = publicPaths.includes(pathname);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isPublic && user) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (!isPublic && !user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:png|svg|ico)$).*)",
  ],
};
