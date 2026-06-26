import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data-store";
import { faqs as defaultFaqs } from "@/config/faq";

export async function GET() {
  const data = await readData("faqs.json", defaultFaqs);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await writeData("faqs.json", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
