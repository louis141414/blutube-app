"use client";

import Link from "next/link";

export default function ChipBar({
  categories,
  active,
}: {
  categories: string[];
  active: string;
}) {
  return (
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
      {categories.map((c) => {
        const isActive = c === active;
        const href = c === "All" ? "/" : `/?category=${encodeURIComponent(c)}`;
        return (
          <Link
            key={c}
            href={href}
            className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium ${
              isActive
                ? "bg-white text-[#0b0d12]"
                : "bg-[#1c2230] text-[#f3f5f9] hover:bg-[#262d3d]"
            }`}
          >
            {c}
          </Link>
        );
      })}
    </div>
  );
}
