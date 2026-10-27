import VideoCard from "@/components/VideoCard";
import { listVideos } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function TrendingPage() {
  const videos = [...listVideos()].sort((a, b) => b.views - a.views);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Trending</h1>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
