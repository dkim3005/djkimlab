import Link from "next/link";
import { getSiteLastUpdated } from "@/lib/site-meta";

const EMAIL = "djkim3005@gmail.com";
const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Approach", href: "/#approach" },
  { label: "Experience", href: "/#experience" },
];

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Dongjin Kim
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted sm:gap-6">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="hidden hover:text-foreground sm:inline">
              {n.label}
            </Link>
          ))}
          <a href={`mailto:${EMAIL}`} className="rounded-md bg-accent px-3 py-1.5 font-medium text-white hover:bg-accent-hover">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const lastUpdated = getSiteLastUpdated();
  return (
    <footer className="mt-auto border-t border-card-border">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-5 py-6 text-xs text-muted">
        <span>© {new Date().getFullYear()} Dongjin Kim · Toronto</span>
        <span>
          <Link href="/wiki" className="hover:text-foreground">Learning notes</Link> ·{" "}
          <Link href="/projects/mlviz" className="hover:text-foreground">ML visualizations</Link> ·{" "}
          <Link href="/colophon" className="hover:text-foreground">Colophon</Link>
          {lastUpdated ? ` · Updated ${lastUpdated}` : ""}
        </span>
      </div>
    </footer>
  );
}
