import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data-store";
import { reviews as defaultReviews } from "@/config/reviews";

export async function GET() {
  const data = await readData("reviews.json", defaultReviews);
  return NextResponse.json(data);
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
