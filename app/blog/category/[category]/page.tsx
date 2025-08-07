import { getAllCategories, getPostsByCategory } from "@/lib/content";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return { title: `Kategori: ${category}` };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kategori: {category}</h1>
      {posts.length === 0 ? (
        <p className="text-sm text-black/60 dark:text-white/60">Belum ada tulisan.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}


