const ipHits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests
const WINDOW_MS = 60_000; // per minute

/**
 * Simple in-memory rate limiter. Returns true if request should be blocked.
 * Note: In production with multiple instances, use Redis or similar.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hit = ipHits.get(ip);

  if (!hit || now > hit.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  hit.count++;
  if (hit.count > RATE_LIMIT) {
    return true;
  }

  // Periodic cleanup to prevent memory leak
  if (ipHits.size > 10000) {
    for (const [key, val] of ipHits) {
      if (now > val.resetAt) ipHits.delete(key);
    }
  }

  return false;
}
