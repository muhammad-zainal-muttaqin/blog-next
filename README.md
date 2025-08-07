Blog modern berbasis Next.js 15 + MDX dengan UI premium (dark default, glassmorphism, heading anchor, code block nyaman).

## Fitur Utama
- Dark mode default dengan aksen ungu/biru, Theme Toggle
- Hero glass + gradient glare, header sticky kaca dengan search
- MDX kaya: heading slug + autolink, GFM (tabel, task list), komponen `Callout`
- Code block kontras, reading progress
- Routing nested untuk post (`/blog/...`) dengan SSG
- RSS: `/api/feed`, Search: `/search`

## Jalankan Lokal
```bash
npm run dev
```
Kunjungi `http://localhost:3000`.

## Struktur
```
app/
  blog/
    page.tsx                 # daftar semua tulisan
    [...slug]/page.tsx       # halaman detail post (catch-all)
    category/[category]/page.tsx
  about/page.tsx
  search/page.tsx
components/
  MDXComponents.tsx          # komponen kustom MDX (heading anchor, Callout, code)
  Providers.tsx              # next-themes provider
  ReadingProgress.tsx
  SiteHeader.tsx / SiteFooter.tsx
content/
  tutorials/                 # konten MDX
  pages/about.mdx
```

## Menulis Konten
- Buat file `.mdx` baru di `content/tutorials/` dengan frontmatter minimal:
```mdx
---
title: "Judul"
description: "Ringkasan"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
category: "tutorial"
---
```
- Gunakan komponen: `<Callout>...</Callout>`
- Heading `##`/`###` otomatis punya anchor

## Build & Deploy
```bash
npm run build && npm start
```
Atau deploy ke Vercel (direkomendasikan). Pastikan folder `content/**` termasuk dalam output tracing (sudah dikonfigurasi di `next.config.ts`).
