import { NextRequest, NextResponse } from "next/server";
import {
  deleteVideo,
  getRelated,
  getVideo,
  incrementViews,
  isLiked,
  isSubscribed,
  listComments,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const video = getVideo(id);
  if (!video) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  incrementViews(id);
  const updated = getVideo(id)!;
  return NextResponse.json({
    video: updated,
    related: getRelated(id),
    comments: listComments(id),
    liked: isLiked(id),
    subscribed: isSubscribed(updated.channel),
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = deleteVideo(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
