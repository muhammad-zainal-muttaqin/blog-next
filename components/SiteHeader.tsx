"use client";

import Link from "next/link";
import { Menu, Search, Rss } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 header-glass">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="sm:hidden rounded-md p-2 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="font-semibold tracking-tight text-lg">
            Zainal Blog
          </Link>
        </div>
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          <Link href="/blog" className="hover:underline underline-offset-4">
            Blog
          </Link>
          <Link href="/about" className="hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/api/feed" className="hover:underline underline-offset-4" title="RSS">
            <Rss className="h-4 w-4" />
          </Link>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 opacity-60" />
            <input
              className="search-input rounded-lg pl-8 pr-3 py-1.5 text-sm"
              placeholder="Cari..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const v = (e.target as HTMLInputElement).value;
                  window.location.href = `/search?q=${encodeURIComponent(v)}`;
                }
              }}
            />
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}


