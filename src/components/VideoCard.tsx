import Link from "next/link";
import { formatViews, timeAgo, type Video } from "@/lib/data";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt=""
          className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/85 px-1.5 py-0.5 text-xs font-semibold">
          {video.duration}
        </span>
      </div>
      <div className="mt-3 flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1c2230] text-sm font-semibold">
          {video.channel.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#f3f5f9]">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-[#9aa3b5]">{video.channel}</p>
          <p className="text-xs text-[#9aa3b5]">
            {formatViews(video.views)} · {timeAgo(video.uploadedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
