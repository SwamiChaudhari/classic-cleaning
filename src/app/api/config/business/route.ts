import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data-store";
import { business } from "@/config/business";

export async function GET() {
  const data = await readData("business.json", business);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Merge with existing to preserve nested objects
    const current = await readData("business.json", business);
    const merged = { ...current, ...body };
    await writeData("business.json", merged);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
