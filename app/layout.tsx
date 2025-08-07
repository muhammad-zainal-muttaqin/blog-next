import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ThemeToggle from "@/components/ThemeToggle";
import ReadingProgress from "@/components/ReadingProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zainal Blog",
    template: "%s • Zainal Blog",
  },
  description: "Blog pribadi: journal, tutorial, dan opini. Dibangun dengan Next.js 15.",
  metadataBase: new URL("https://example.com"),
  alternates: {
    types: { "application/rss+xml": "/api/feed" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReadingProgress />
        <div className="fixed right-4 bottom-4 z-50"><ThemeToggle /></div>
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
