import VideoCard from "@/components/VideoCard";
import { listVideos } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const videos = listVideos({ q });

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold text-[#9aa3b5]">
        {q ? (
          <>
            Results for <span className="text-white">&quot;{q}&quot;</span>
          </>
        ) : (
          "Search"
        )}
      </h1>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
      {videos.length === 0 && (
        <p className="py-16 text-center text-[#9aa3b5]">No videos found.</p>
      )}
    </div>
  );
}
