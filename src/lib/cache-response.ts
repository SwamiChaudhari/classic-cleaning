import { NextResponse } from "next/server";

/**
 * Wrap a NextResponse with caching headers for static config data.
 * These responses rarely change, so we cache aggressively.
 */
export function withCache(response: NextResponse, maxAge = 60): NextResponse {
  response.headers.set(
    "Cache-Control",
    `public, max-age=${maxAge}, stale-while-revalidate=300`
  );
  return response;
}
