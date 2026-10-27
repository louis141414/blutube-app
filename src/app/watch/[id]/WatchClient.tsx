"use client";

import Link from "next/link";
import { useState } from "react";
import { IconShare, IconThumbsUp } from "@/components/Icons";
import { formatViews, timeAgo, type Comment, type Video } from "@/lib/data";

type Props = {
  video: Video;
  related: Video[];
  initialComments: Comment[];
  initiallyLiked: boolean;
  initiallySubscribed: boolean;
};

export default function WatchClient({
  video,
  related,
  initialComments,
  initiallyLiked,
  initiallySubscribed,
}: Props) {
  const [likes, setLikes] = useState(video.likes);
  const [liked, setLiked] = useState(initiallyLiked);
  const [subscribed, setSubscribed] = useState(initiallySubscribed);
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function onLike() {
    const res = await fetch(`/api/videos/${video.id}/like`, { method: "POST" });
    if (!res.ok) return;
    const data = await res.json();
    setLiked(data.liked);
    setLikes(data.likes);
  }

  async function onSubscribe() {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel: video.channel }),
    });
    if (!res.ok) return;
    const data = await res.json();
    setSubscribed(data.subscribed);
  }

  async function onShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied");
    } catch {
      prompt("Copy link:", window.location.href);
    }
  }

  async function onComment(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/videos/${video.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, author: "Guest" }),
      });
      if (res.ok) {
        const c = await res.json();
        setComments((prev) => [c, ...prev]);
        setText("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1">
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <video
            key={video.id}
            src={video.src}
            controls
            playsInline
            autoPlay
            className="h-full w-full"
          />
        </div>

        <h1 className="mt-3 text-xl font-bold leading-snug">{video.title}</h1>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c2230] font-semibold">
              {video.channel.charAt(0)}
            </div>
            <div>
              <p className="font-semibold">{video.channel}</p>
              <p className="text-xs text-[#9aa3b5]">Channel</p>
            </div>
            <button
              type="button"
              onClick={onSubscribe}
              className={`ml-2 rounded-full px-4 py-2 text-sm font-semibold ${
                subscribed
                  ? "bg-[#1c2230] text-white"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onLike}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                liked ? "bg-[#2a3344] text-[#8eb0ff]" : "bg-[#1c2230] hover:bg-[#262d3d]"
              }`}
            >
              <IconThumbsUp />
              {likes.toLocaleString()}
            </button>
            <button
              type="button"
              onClick={onShare}
              className="inline-flex items-center gap-2 rounded-full bg-[#1c2230] px-4 py-2 text-sm font-medium hover:bg-[#262d3d]"
            >
              <IconShare />
              Share
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#141821] p-4 text-sm leading-relaxed">
          <p className="font-semibold">
            {formatViews(video.views)} · {timeAgo(video.uploadedAt)}
          </p>
          <p className="mt-2 whitespace-pre-wrap text-[#d1d5e0]">{video.description}</p>
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-base font-semibold">
            {comments.length} Comment{comments.length === 1 ? "" : "s"}
          </h2>
          <form onSubmit={onComment} className="mb-4 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-full border border-[#2a3344] bg-[#0b0d12] px-4 py-2 text-sm outline-none focus:border-[#6b8cff]"
            />
            <button
              type="submit"
              disabled={busy || !text.trim()}
              className="rounded-full bg-gradient-to-r from-[#5b8cff] to-[#7c5cfc] px-4 py-2 text-sm font-semibold disabled:opacity-40"
            >
              Comment
            </button>
          </form>
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1c2230] text-xs font-semibold">
                  {c.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{c.author}</span>{" "}
                    <span className="text-xs text-[#9aa3b5]">{timeAgo(c.createdAt)}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-[#d1d5e0]">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="flex w-full shrink-0 flex-col gap-3 lg:w-[400px]">
        {related.map((v) => (
          <Link key={v.id} href={`/watch/${v.id}`} className="flex gap-2.5">
            <div className="relative w-40 shrink-0 overflow-hidden rounded-lg bg-black aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.thumbnail} alt="" className="h-full w-full object-cover" />
              <span className="absolute bottom-1 right-1 rounded bg-black/85 px-1 text-[10px] font-semibold">
                {v.duration}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{v.title}</h3>
              <p className="mt-1 text-xs text-[#9aa3b5]">{v.channel}</p>
              <p className="text-xs text-[#9aa3b5]">
                {formatViews(v.views)} · {timeAgo(v.uploadedAt)}
              </p>
            </div>
          </Link>
        ))}
      </aside>
    </div>
  );
}
