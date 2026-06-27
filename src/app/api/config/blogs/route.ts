import { NextRequest, NextResponse } from "next/server";
import { withCache } from "@/lib/cache-response";
import { readData, writeData } from "@/lib/data-store";
import { blogPosts as defaultBlogs } from "@/config/blog";

export async function GET() {
  const data = await readData("blogs.json", defaultBlogs);
  return withCache(NextResponse.json(data), 300);
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
