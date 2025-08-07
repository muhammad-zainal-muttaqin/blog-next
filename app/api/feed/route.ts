import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/content";
import { Feed } from "feed";

export async function GET() {
  const posts = getAllPosts().slice(0, 50);
  const siteUrl = "https://example.com";

  const feed = new Feed({
    id: siteUrl,
    title: "Zainal Blog",
    description: "RSS Feed Zainal Blog",
    link: siteUrl,
    language: "id",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Zainal`,
    feedLinks: {
      rss: `${siteUrl}/api/feed`,
    },
  });

  for (const p of posts) {
    feed.addItem({
      id: `${siteUrl}/blog/${p.slug}`,
      title: p.title,
      link: `${siteUrl}/blog/${p.slug}`,
      description: p.description,
      date: new Date(p.date),
    });
  }

  return new NextResponse(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}


