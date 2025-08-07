Blog sederhana berbasis Next.js 15 + MDX. KISS: cepat setup, mudah ditulis, enak dibaca.

## Jalankan Lokal

```bash
npm run dev
```
Kunjungi `http://localhost:3000`.

## Struktur Utama

```
app/
  blog/
    page.tsx              # daftar semua tulisan
    [slug]/page.tsx       # halaman detail post
    category/[category]/page.tsx  # daftar per kategori (URL: /blog/category/..)
  about/page.tsx
  search/page.tsx
content/
  journal/
  tutorials/
  pages/about.mdx
```

## Build & Deploy

```bash
npm run build && npm start
```
