import { notFound } from "next/navigation";
import {
  getRelated,
  getVideo,
  incrementViews,
  isLiked,
  isSubscribed,
  listComments,
} from "@/lib/data";
import WatchClient from "./WatchClient";

export const dynamic = "force-dynamic";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = getVideo(id);
  if (!video) notFound();

  incrementViews(id);
  const updated = getVideo(id)!;

  return (
    <WatchClient
      video={updated}
      related={getRelated(id)}
      initialComments={listComments(id)}
      initiallyLiked={isLiked(id)}
      initiallySubscribed={isSubscribed(updated.channel)}
    />
  );
}
