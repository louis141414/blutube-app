# Blutube

YouTube-style video platform built with **Next.js** — ready for **Vercel**.

## Features

- Home feed with category chips
- Search
- Trending (sorted by views)
- Watch page with player, related videos, likes, subscribe, comments, share
- View counts increase when you open a video
- Studio: add / delete videos by public MP4 URL
- Sidebar navigation
- Original Blutube branding

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy on Vercel

1. Import this repo in vercel.com
2. Deploy (no env vars required for the demo)

### Data note

Demo stores data in **server memory**. It works when you click; cold starts can reset data. Swap `src/lib/data.ts` for Neon/Turso/Supabase for permanence.
