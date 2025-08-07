import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getFeaturedPosts, getAllPosts, getAllCategories } from "@/lib/content";

export default function Home() {
  const featured = getFeaturedPosts(4);
  const recent = getAllPosts().slice(0, 6);
  const categories = getAllCategories();

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-100 via-white to-purple-100 dark:from-zinc-900 dark:via-black dark:to-zinc-900 p-10 border border-black/5 dark:border-white/10">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Tulisan yang sederhana, bermanfaat, dan to the point.</h1>
          <p className="mt-3 text-black/70 dark:text-white/70">Journal, tutorial, dan opini seputar teknologi dan kehidupan. Ditulis ringan dan KISS.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/blog" className="rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-sm font-medium">Jelajahi Blog</Link>
            <Link href="/about" className="rounded-xl px-4 py-2 border border-black/10 dark:border-white/20 text-sm">Tentang Penulis</Link>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Pilihan Unggulan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Terbaru</h2>
          <Link href="/blog" className="text-sm hover:underline">Lihat semua</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {categories.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Kategori</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c} href={`/blog/category/${c}`} className="rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 text-sm">
                {c}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
