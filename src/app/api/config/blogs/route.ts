import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data-store";
import { blogPosts as defaultBlogs } from "@/config/blog";

export async function GET() {
  const data = await readData("blogs.json", defaultBlogs);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await writeData("blogs.json", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
