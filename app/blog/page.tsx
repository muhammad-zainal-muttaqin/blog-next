import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Semua Tulisan</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}


