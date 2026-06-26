import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_TOKEN = process.env.ADMIN_TOKEN || "admin123";
const COOKIE_NAME = "auth_token";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

const attempts = new Map<string, { count: number; lockedUntil: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function isLocked(ip: string): boolean {
  const record = attempts.get(ip);
  if (!record) return false;
  if (Date.now() > record.lockedUntil) {
    attempts.delete(ip);
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isLocked(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const { password } = body;

  if (password === VALID_TOKEN) {
    attempts.delete(ip);

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, VALID_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  }

  // Record failed attempt
  const record = attempts.get(ip) || { count: 0, lockedUntil: 0 };
  record.count += 1;
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_MS;
  }
  attempts.set(ip, record);

  const remaining = MAX_ATTEMPTS - record.count;
  return NextResponse.json(
    { error: `Invalid password. ${remaining > 0 ? `${remaining} attempts remaining.` : "Account locked for 15 minutes."}` },
    { status: 401 }
  );
}
