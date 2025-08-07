"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface SearchPostResult {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchPostResult[]>([]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults((json.results as SearchPostResult[]) || []);
    }, 250);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pencarian</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari judul, tag, atau kategori..."
        className="w-full max-w-xl rounded-xl border border-black/10 dark:border-white/20 bg-transparent px-4 py-2 outline-none"
      />

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((p) => (
          <article key={p.slug} className="rounded-2xl border border-black/5 dark:border-white/10 p-5">
            <div className="text-xs text-black/60 dark:text-white/60">
              {p.category} • <time dateTime={p.date}>{new Date(p.date).toLocaleDateString()}</time>
            </div>
            <h3 className="mt-2 text-lg font-semibold">
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </h3>
            {p.description && <p className="mt-2 text-sm text-black/70 dark:text-white/70 line-clamp-2">{p.description}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}


