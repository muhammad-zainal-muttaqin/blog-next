import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/content";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/MDXComponents";
// import TOC from "@/components/TOC";

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
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          (await import("rehype-slug")).default,
          [(await import("rehype-autolink-headings")).default, { behavior: "append" }],
        ],
        remarkPlugins: [(await import("remark-gfm")).default],
      },
    },
    components: mdxComponents,
  });

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <header className="mb-6">
          <p className="text-sm text-black/60 dark:text-white/60">
            {meta.category ? `${meta.category} • ` : ""}
            <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString()}</time>
            {meta.readingTimeMinutes ? ` • ${meta.readingTimeMinutes} min read` : ""}
          </p>
          <h1 className="text-3xl font-bold tracking-tight mt-1">{meta.title}</h1>
          {meta.description && <p className="mt-2 text-black/70 dark:text-white/70">{meta.description}</p>}
        </header>
        <div className="[&_pre]:rounded-xl [&_pre]:bg-zinc-950/95 [&_pre]:text-zinc-100 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-sm">
          {compiled.content}
        </div>
      </article>
      {/* <TOC /> */}
    </div>
  );
}


