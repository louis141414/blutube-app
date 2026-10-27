"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { formatViews, timeAgo, type Video } from "@/lib/data";

export default function StudioPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [title, setTitle] = useState("");
  const [src, setSrc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [duration, setDuration] = useState("");
  const [channel, setChannel] = useState("You");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/videos");
    const data = await res.json();
    setVideos(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !src.trim()) return;
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          src,
          thumbnail: thumbnail || undefined,
          duration: duration || undefined,
          channel: channel || "You",
          category: category || "General",
          description,
        }),
      });
      if (!res.ok) {
        setMsg("Failed to add video");
        return;
      }
      setTitle("");
      setSrc("");
      setThumbnail("");
      setDuration("");
      setDescription("");
      setMsg("Video added");
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Studio</h1>
          <p className="mt-1 text-sm text-[#9aa3b5]">
            Add videos by public MP4 URL. Data lives in server memory for this demo.
          </p>
        </div>
        <Link href="/" className="text-sm text-[#8eb0ff] hover:underline">
          ← Back to site
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-[#1e2430] bg-[#141821] p-5">
          <h2 className="font-semibold">Upload by URL</h2>
          <Field label="Title" value={title} onChange={setTitle} required />
          <Field
            label="Video URL (mp4)"
            value={src}
            onChange={setSrc}
            required
            placeholder="https://.../video.mp4"
          />
          <Field
            label="Thumbnail URL"
            value={thumbnail}
            onChange={setThumbnail}
            placeholder="https://.../thumb.jpg"
          />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Duration" value={duration} onChange={setDuration} placeholder="4:20" />
            <Field label="Category" value={category} onChange={setCategory} />
          </div>
          <Field label="Channel" value={channel} onChange={setChannel} />
          <label className="block text-xs font-medium text-[#9aa3b5]">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-[#2a3344] bg-[#0b0d12] px-3 py-2 text-sm text-white outline-none focus:border-[#6b8cff]"
            />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-gradient-to-r from-[#5b8cff] to-[#7c5cfc] py-2.5 text-sm font-semibold disabled:opacity-50"
          >
            {saving ? "Saving…" : "Publish video"}
          </button>
          {msg && <p className="text-sm text-[#8eb0ff]">{msg}</p>}
        </form>

        <div>
          <h2 className="mb-3 font-semibold">Your videos ({videos.length})</h2>
          {loading ? (
            <p className="text-[#9aa3b5]">Loading…</p>
          ) : (
            <ul className="space-y-2">
              {videos.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center gap-3 rounded-xl border border-[#1e2430] bg-[#141821] p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.thumbnail}
                    alt=""
                    className="h-14 w-24 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{v.title}</p>
                    <p className="text-xs text-[#9aa3b5]">
                      {formatViews(v.views)} · {timeAgo(v.uploadedAt)}
                    </p>
                  </div>
                  <Link
                    href={`/watch/${v.id}`}
                    className="text-xs text-[#8eb0ff] hover:underline"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(v.id)}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-xs font-medium text-[#9aa3b5]">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-[#2a3344] bg-[#0b0d12] px-3 py-2 text-sm text-white outline-none focus:border-[#6b8cff]"
      />
    </label>
  );
}
