"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IconBell, IconMenu, IconPlus, IconSearch, Logo } from "./Icons";

export default function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
    else router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-3 border-b border-[#1e2430] bg-[#0b0d12]/95 px-3 backdrop-blur md:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <button type="button" className="hidden rounded-full p-2 text-[#9aa3b5] hover:bg-[#1c2230] sm:inline-flex" aria-label="Menu">
          <IconMenu />
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <Logo />
          <span className="bg-gradient-to-r from-[#8eb0ff] to-[#c4b5fd] bg-clip-text text-lg text-transparent">
            Blutube
          </span>
        </Link>
      </div>

      <form onSubmit={onSearch} className="mx-auto flex w-full max-w-xl flex-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="w-full rounded-l-full border border-[#2a3344] border-r-0 bg-[#0b0d12] px-4 py-2 text-sm text-[#f3f5f9] outline-none placeholder:text-[#6b7385] focus:border-[#6b8cff]"
        />
        <button
          type="submit"
          className="rounded-r-full border border-[#2a3344] bg-[#1c2230] px-5 text-[#9aa3b5] hover:text-white"
          aria-label="Search"
        >
          <IconSearch className="h-4 w-4" />
        </button>
      </form>

      <div className="flex items-center gap-1">
        <Link
          href="/studio"
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-[#9aa3b5] hover:bg-[#1c2230] hover:text-white"
          title="Studio"
        >
          <IconPlus className="h-4 w-4" />
          <span className="hidden md:inline">Create</span>
        </Link>
        <button type="button" className="rounded-full p-2 text-[#9aa3b5] hover:bg-[#1c2230]" aria-label="Notifications">
          <IconBell />
        </button>
        <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5b8cff] to-[#7c5cfc] text-sm font-semibold">
          B
        </div>
      </div>
    </header>
  );
}
