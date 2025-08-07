import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export const metadata = { title: "Tentang" };

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "content", "pages", "about.mdx");
  const source = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "# Tentang\n\nHalo, ini halaman tentang.";
  const compiled = await compileMDX({ source });
  return <div className="prose prose-neutral dark:prose-invert max-w-3xl">{compiled.content}</div>;
}


