import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data-store";
import { services as defaultServices } from "@/config/services";
import { withCache } from "@/lib/cache-response";

export async function GET() {
  const data = await readData("services.json", defaultServices);
  return withCache(NextResponse.json(data));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await writeData("services.json", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
