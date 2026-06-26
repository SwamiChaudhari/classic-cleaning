import { NextRequest, NextResponse } from "next/server";

// Paths that require authentication
const protectedPaths = ["/dashboard"];

// Paths that should redirect to dashboard if already authenticated
const authPaths = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth_token")?.value;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPath = authPaths.some((p) => pathname.startsWith(p));

  // Redirect unauthenticated users from protected routes to login
  if (isProtected && !authToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login to dashboard
  if (isAuthPath && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
