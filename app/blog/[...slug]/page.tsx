import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/content";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug.split("/") }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const joined = slug.join("/");
  const post = getPostBySlug(joined);
  if (!post) return notFound();

  const { content, ...meta } = post;
  const compiled = await compileMDX<{ [key: string]: unknown }>({
    source: content,
    options: { parseFrontmatter: false },
  });

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <header className="mb-6">
        <p className="text-sm text-black/60 dark:text-white/60">
          {meta.category ? `${meta.category} • ` : ""}
          <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString()}</time>
          {meta.readingTimeMinutes ? ` • ${meta.readingTimeMinutes} min read` : ""}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">{meta.title}</h1>
        {meta.description && <p className="mt-2 text-black/70 dark:text-white/70">{meta.description}</p>}
      </header>
      <div>{compiled.content}</div>
    </article>
  );
}


