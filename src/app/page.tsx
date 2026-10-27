import ChipBar from "@/components/ChipBar";
import VideoCard from "@/components/VideoCard";
import { getCategories, listVideos } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category || "All";
  const videos = listVideos({ category });
  const categories = getCategories();

  return (
    <div>
      <ChipBar categories={categories} active={category} />
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
      {videos.length === 0 && (
        <p className="py-16 text-center text-[#9aa3b5]">No videos in this category.</p>
      )}
    </div>
  );
}
