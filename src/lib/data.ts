export type Video = {
  id: string;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: number;
  likes: number;
  category: string;
  uploadedAt: string;
};

export type Comment = {
  id: string;
  videoId: string;
  author: string;
  text: string;
  createdAt: string;
};

const SEED: Video[] = [
  {
    id: "demo",
    title: "Big Buck Bunny",
    description:
      "Classic open-source animated short by the Blender Foundation. Public domain test video.",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://picsum.photos/seed/blutube1/640/360",
    duration: "9:56",
    channel: "Blender Foundation",
    views: 12450320,
    likes: 98210,
    category: "Animation",
    uploadedAt: "2024-03-12T10:00:00.000Z",
  },
  {
    id: "sample",
    title: "Elephants Dream",
    description: "The world's first open movie, made entirely with open source software.",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://picsum.photos/seed/blutube2/640/360",
    duration: "10:53",
    channel: "Orange Open Movie",
    views: 4820190,
    likes: 41200,
    category: "Animation",
    uploadedAt: "2023-08-01T10:00:00.000Z",
  },
  {
    id: "sintel",
    title: "Sintel",
    description: "A fantasy short about a girl searching for her lost pet dragon.",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail: "https://picsum.photos/seed/blutube3/640/360",
    duration: "14:48",
    channel: "Blender Foundation",
    views: 8120450,
    likes: 67300,
    category: "Fantasy",
    uploadedAt: "2023-11-20T10:00:00.000Z",
  },
  {
    id: "tears",
    title: "Tears of Steel",
    description: "Science-fiction short combining live action and CGI by the Blender Institute.",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail: "https://picsum.photos/seed/blutube4/640/360",
    duration: "12:14",
    channel: "Blender Institute",
    views: 3201890,
    likes: 28900,
    category: "Sci-Fi",
    uploadedAt: "2024-01-05T10:00:00.000Z",
  },
  {
    id: "blazes",
    title: "For Bigger Blazes",
    description: "Short test clip from the Google sample collection.",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://picsum.photos/seed/blutube5/640/360",
    duration: "0:15",
    channel: "Google Samples",
    views: 890120,
    likes: 5400,
    category: "Test",
    uploadedAt: "2025-02-10T10:00:00.000Z",
  },
  {
    id: "joyrides",
    title: "For Bigger Joyrides",
    description: "Another short sample useful for testing the player.",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail: "https://picsum.photos/seed/blutube6/640/360",
    duration: "0:15",
    channel: "Google Samples",
    views: 1102300,
    likes: 6200,
    category: "Test",
    uploadedAt: "2025-02-11T10:00:00.000Z",
  },
];

type Store = {
  videos: Video[];
  comments: Comment[];
  subscriptions: Set<string>;
  liked: Set<string>;
};

function getStore(): Store {
  const g = globalThis as unknown as { __blutube?: Store };
  if (!g.__blutube) {
    g.__blutube = {
      videos: structuredClone(SEED),
      comments: [],
      subscriptions: new Set(),
      liked: new Set(),
    };
  }
  return g.__blutube;
}

export function listVideos(opts?: { q?: string; category?: string }) {
  let list = [...getStore().videos];
  if (opts?.category && opts.category !== "All") {
    list = list.filter((v) => v.category === opts.category);
  }
  if (opts?.q) {
    const q = opts.q.toLowerCase();
    list = list.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
  }
  return list.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

export function getVideo(id: string) {
  return getStore().videos.find((v) => v.id === id) || null;
}

export function getCategories() {
  const set = new Set(getStore().videos.map((v) => v.category));
  return ["All", ...Array.from(set).sort()];
}

export function getRelated(id: string, limit = 8) {
  return listVideos()
    .filter((v) => v.id !== id)
    .slice(0, limit);
}

export function incrementViews(id: string) {
  const v = getVideo(id);
  if (v) v.views += 1;
  return v;
}

export function toggleLike(id: string) {
  const store = getStore();
  const v = getVideo(id);
  if (!v) return null;
  if (store.liked.has(id)) {
    store.liked.delete(id);
    v.likes = Math.max(0, v.likes - 1);
    return { liked: false, likes: v.likes };
  }
  store.liked.add(id);
  v.likes += 1;
  return { liked: true, likes: v.likes };
}

export function isLiked(id: string) {
  return getStore().liked.has(id);
}

export function toggleSubscribe(channel: string) {
  const store = getStore();
  if (store.subscriptions.has(channel)) {
    store.subscriptions.delete(channel);
    return { subscribed: false };
  }
  store.subscriptions.add(channel);
  return { subscribed: true };
}

export function isSubscribed(channel: string) {
  return getStore().subscriptions.has(channel);
}

export function getSubscriptions() {
  return Array.from(getStore().subscriptions);
}

export function addVideo(input: {
  title: string;
  description?: string;
  src: string;
  thumbnail?: string;
  duration?: string;
  channel?: string;
  category?: string;
}) {
  const id =
    input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) +
    "-" +
    Date.now().toString(36);

  const video: Video = {
    id,
    title: input.title.trim(),
    description: (input.description || "").trim(),
    src: input.src.trim(),
    thumbnail:
      input.thumbnail?.trim() ||
      `https://picsum.photos/seed/${id}/640/360`,
    duration: input.duration?.trim() || "0:00",
    channel: input.channel?.trim() || "You",
    views: 0,
    likes: 0,
    category: input.category?.trim() || "General",
    uploadedAt: new Date().toISOString(),
  };
  getStore().videos.unshift(video);
  return video;
}

export function deleteVideo(id: string) {
  const store = getStore();
  const before = store.videos.length;
  store.videos = store.videos.filter((v) => v.id !== id);
  return store.videos.length < before;
}

export function listComments(videoId: string) {
  return getStore()
    .comments.filter((c) => c.videoId === videoId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function addComment(videoId: string, author: string, text: string) {
  const c: Comment = {
    id: "c-" + Date.now().toString(36),
    videoId,
    author: author.trim() || "Guest",
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };
  getStore().comments.unshift(c);
  return c;
}

export function formatViews(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M views";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K views";
  return n + " views";
}

export function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? "1 minute ago" : mins + " minutes ago";
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : hours + " hours ago";
  const days = Math.floor(hours / 24);
  if (days < 30) return days === 1 ? "1 day ago" : days + " days ago";
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "1 month ago" : months + " months ago";
  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : years + " years ago";
}
