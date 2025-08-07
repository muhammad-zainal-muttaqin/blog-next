import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ThemeToggle from "@/components/ThemeToggle";
import ReadingProgress from "@/components/ReadingProgress";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
    <html lang="id" className="dark">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Providers>
          <ReadingProgress />
          <div className="fixed right-4 bottom-4 z-50"><ThemeToggle /></div>
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
