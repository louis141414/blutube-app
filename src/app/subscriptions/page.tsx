import VideoCard from "@/components/VideoCard";
import { getSubscriptions, listVideos } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function SubscriptionsPage() {
  const subs = getSubscriptions();
  const videos = listVideos().filter((v) => subs.includes(v.channel));

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold">Subscriptions</h1>
      <p className="mb-5 text-sm text-[#9aa3b5]">
        {subs.length
          ? `Following: ${subs.join(", ")}`
          : "Subscribe to channels from a watch page to see them here."}
      </p>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
      {videos.length === 0 && (
        <p className="py-12 text-center text-[#9aa3b5]">No subscription videos yet.</p>
      )}
    </div>
  );
}
