import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_TOKEN = process.env.AUTH_TOKEN || "";
const COOKIE_NAME = "auth_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token !== VALID_TOKEN || !VALID_TOKEN) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
