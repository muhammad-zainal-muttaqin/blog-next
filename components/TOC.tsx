"use client";

import { useEffect, useMemo, useState } from "react";

export default function TOC() {
  const [active, setActive] = useState<string>("");

  const items = useMemo(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3")) as HTMLHeadingElement[];
    return headings.map((h) => ({ id: h.id, text: h.textContent || "", depth: h.tagName === "H2" ? 2 : 3 }));
  }, []);

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll("h2, h3"));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="text-sm font-medium mb-2">Daftar Isi</div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.id} className={it.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${it.id}`}
              className={`block truncate hover:underline underline-offset-4 ${active === it.id ? "text-sky-500" : "text-black/70 dark:text-white/70"}`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
