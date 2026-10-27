# Blutube

YouTube-style video platform built with **Next.js 15** — ready for **Vercel**.

**Repo:** https://github.com/louis141414/blutube-app

## Features

- Home feed with category chips
- Search
- Trending (sorted by views)
- Watch page with player, related videos, likes, subscribe, comments, share
- View counts increase when you open a video
- Studio: add / delete videos by public MP4 URL
- Sidebar navigation (Home, Trending, Subscriptions, Library, History, Studio)
- Original Blutube branding (not a YouTube clone)

## Deploy on Vercel (recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **louis141414/blutube-app** (or fork it first into your account)
3. Framework preset: **Next.js** — leave everything default
4. Click **Deploy** (no environment variables needed)

After deploy you get a live URL. Open it, click videos, use Studio to add more via public `.mp4` links.

## Run locally

```bash
git clone https://github.com/louis141414/blutube-app.git
cd blutube-app
npm install
npm run dev
```

Open http://localhost:3000

## Note about data

This demo stores videos, likes, comments, and subscriptions **in server memory** (`src/lib/data.ts`).

- Everything you click works (like, comment, subscribe, upload by URL, views)
- Data can reset when the serverless instance restarts (cold start)

For permanent storage later, plug in Neon / Turso / Supabase and swap the store in `src/lib/data.ts`.

## Test videos

Seed data uses public sample MP4s (Big Buck Bunny, Sintel, Elephants Dream, etc.).

In **Studio**, paste any public `https://...mp4` URL to publish a new video.

Example test URL:

```
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
```
