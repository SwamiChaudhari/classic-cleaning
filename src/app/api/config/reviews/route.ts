import { NextRequest, NextResponse } from "next/server";
import { withCache } from "@/lib/cache-response";
import { readData, writeData } from "@/lib/data-store";
import { reviews as defaultReviews } from "@/config/reviews";

export async function GET() {
  const data = await readData("reviews.json", defaultReviews);
  return withCache(NextResponse.json(data), 300);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await writeData("reviews.json", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
