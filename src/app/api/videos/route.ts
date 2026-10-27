import { NextRequest, NextResponse } from "next/server";
import { addVideo, listVideos } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || undefined;
  const category = req.nextUrl.searchParams.get("category") || undefined;
  return NextResponse.json(listVideos({ q, category }));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.title || !body?.src) {
      return NextResponse.json({ error: "title and src are required" }, { status: 400 });
    }
    const video = addVideo({
      title: String(body.title),
      description: body.description ? String(body.description) : "",
      src: String(body.src),
      thumbnail: body.thumbnail ? String(body.thumbnail) : undefined,
      duration: body.duration ? String(body.duration) : undefined,
      channel: body.channel ? String(body.channel) : undefined,
      category: body.category ? String(body.category) : undefined,
    });
    return NextResponse.json(video, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}
