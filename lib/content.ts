import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { PostContent, PostMeta, PostFrontmatter } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function isMdxFile(filePath: string): boolean {
  return filePath.endsWith(".mdx") || filePath.endsWith(".md");
}

function walkDir(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else if (isMdxFile(full)) {
      files.push(full);
    }
  }
  return files;
}

function filePathToSlug(filePath: string): string {
  const rel = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
  return rel.replace(/\.mdx?$/i, "");
}

export function getAllPostFilePaths(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const all = walkDir(CONTENT_DIR);
  // Exclude pages directory from posts list
  return all.filter((p) => !p.includes(`${path.sep}pages${path.sep}`));
}

export function readPostByFile(filePath: string): PostContent {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const slug = filePathToSlug(filePath);
  const rt = readingTime(content);
  return {
    slug,
    content,
    readingTimeMinutes: Math.ceil(rt.minutes),
    ...fm,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = getAllPostFilePaths();
  const posts = files.map((f) => {
  const { content: _content, ...meta } = readPostByFile(f);
  return meta;
  });
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getFeaturedPosts(limit = 4): PostMeta[] {
  const posts = getAllPosts().filter((p) => p.featured);
  return posts.slice(0, limit);
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  for (const post of getAllPosts()) {
    if (post.category) categories.add(post.category);
  }
  return Array.from(categories).sort();
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => (p.category || "").toLowerCase() === category.toLowerCase());
}

export function getPostBySlug(slug: string): PostContent | null {
  const fullPathMdx = path.join(CONTENT_DIR, `${slug}.mdx`);
  const fullPathMd = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(fullPathMdx)
    ? fullPathMdx
    : fs.existsSync(fullPathMd)
    ? fullPathMd
    : null;
  if (!filePath) return null;
  return readPostByFile(filePath);
}


