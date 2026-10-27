"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconFire,
  IconHistory,
  IconHome,
  IconLibrary,
  IconStudio,
  IconSubs,
} from "./Icons";

const items = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/trending", label: "Trending", icon: IconFire },
  { href: "/subscriptions", label: "Subscriptions", icon: IconSubs },
  { href: "/library", label: "Library", icon: IconLibrary },
  { href: "/history", label: "History", icon: IconHistory },
  { href: "/studio", label: "Studio", icon: IconStudio },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[72px] shrink-0 overflow-y-auto px-1 py-3 md:block lg:w-56 lg:px-3">
      <nav className="flex flex-col gap-0.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-3 text-[10px] lg:flex-row lg:gap-4 lg:px-3 lg:py-2.5 lg:text-sm ${
                active
                  ? "bg-[#1c2230] text-white"
                  : "text-[#9aa3b5] hover:bg-[#141821] hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
