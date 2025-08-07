export default function SiteFooter() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 mt-12 py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-black/60 dark:text-white/60">
        <p>
          © {new Date().getFullYear()} Zainal. Dibangun dengan Next.js 15, Tailwind, dan MDX.
        </p>
      </div>
    </footer>
  );
}


