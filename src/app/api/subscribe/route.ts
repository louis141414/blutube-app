import { NextRequest, NextResponse } from "next/server";
import { toggleSubscribe } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const channel = body?.channel ? String(body.channel) : "";
  if (!channel) {
    return NextResponse.json({ error: "channel required" }, { status: 400 });
  }
  return NextResponse.json(toggleSubscribe(channel));
}
