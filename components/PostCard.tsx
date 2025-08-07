import Link from "next/link";
import { PostMeta } from "@/lib/types";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group rounded-2xl border border-black/5 dark:border-white/10 p-5 bg-white/60 dark:bg-black/30 backdrop-blur-sm hover:shadow-sm transition">
      <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
        {post.category && (
          <Link href={`/blog/category/${post.category}`} className="font-medium hover:underline">
            {post.category}
          </Link>
        )}
        <span>•</span>
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        {post.readingTimeMinutes && (
          <>
            <span>•</span>
            <span>{post.readingTimeMinutes} min read</span>
          </>
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      {post.description && (
        <p className="mt-2 text-sm text-black/70 dark:text-white/70 line-clamp-2">{post.description}</p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full bg-black/5 dark:bg-white/10 text-xs px-2 py-0.5">
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}


