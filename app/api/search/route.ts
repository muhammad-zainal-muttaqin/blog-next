import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/content";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  if (!q) return NextResponse.json({ results: [] });

  const posts = getAllPosts();
  const results = posts.filter((p) => {
    const hay = [p.title, p.description, p.category, ...(p.tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });

  return NextResponse.json({ results });
}


