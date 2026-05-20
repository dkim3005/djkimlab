import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import {
  getWikiEntry,
  getAllWikiSlugs,
  getWikiSiblings,
  getWikiBacklinks,
  getWikiToc,
  getWikiSearchIndex,
} from "@/lib/wiki";
import WikiSearch from "@/app/components/WikiSearch";
import WikiTocSidebar from "@/app/components/WikiTocSidebar";
import "highlight.js/styles/github-dark.css";

function summarize(markdown: string, max = 160): string {
  const stripped = markdown
    .replace(/^#.*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (stripped.length <= max) return stripped;
  return stripped.slice(0, max - 1).trimEnd() + "…";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const entry = getWikiEntry(slugPath);
  if (!entry) return {};
  const description = summarize(entry.content);
  const canonical = `/wiki/${slugPath}`;
  return {
    title: entry.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: entry.title,
      description,
      url: canonical,
    },
    twitter: { card: "summary_large_image", title: entry.title, description },
  };
}

function wikiComponents(currentSlug: string): Components {
  const currentDir = "/wiki/" + currentSlug.split("/").slice(0, -1).join("/");
  return {
    a: ({ href, children, ...props }) => {
      if (!href) return <span {...props}>{children}</span>;
      if (href.endsWith(".md") || href.includes(".md#")) {
        const [path, hash] = href.split("#");
        const parts = (currentDir + "/" + path).split("/");
        const resolved: string[] = [];
        for (const p of parts) {
          if (p === "..") resolved.pop();
          else if (p !== "." && p !== "") resolved.push(p);
        }
        const route = "/" + resolved.join("/").replace(/\.md$/, "");
        const fullHref = hash ? `${route}#${hash}` : route;
        return <Link href={fullHref} {...props}>{children}</Link>;
      }
      if (href.startsWith("http")) {
        return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
      }
      return <Link href={href} {...props}>{children}</Link>;
    },
  };
}

export function generateStaticParams() {
  return getAllWikiSlugs().map((slug) => ({
    slug: slug.split("/"),
  }));
}

export default async function WikiPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const entry = getWikiEntry(slugPath);

  if (!entry) notFound();

  const toc = getWikiToc(entry.content);
  const { prev, next } = getWikiSiblings(slugPath);
  const backlinks = getWikiBacklinks(slugPath);
  const searchIndex = getWikiSearchIndex();

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            djkimlab<span className="text-accent">.com</span>
          </Link>
          <div className="flex items-center gap-4">
            <WikiSearch index={searchIndex} />
            <Link href="/#projects" className="text-sm text-muted hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/#experience" className="text-sm text-muted hover:text-foreground transition-colors">
              Experience
            </Link>
            <Link href="/wiki" className="text-sm text-foreground font-medium">
              Wiki
            </Link>
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-1.5 rounded-md border border-card-border text-muted hover:text-foreground hover:border-accent/50 transition-all"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px] gap-12">
          <div className="max-w-3xl mx-auto xl:mx-0 w-full">
            <div className="flex items-center gap-2 text-sm text-muted mb-8">
              <Link href="/wiki" className="hover:text-foreground transition-colors">
                Wiki
              </Link>
              {slug.map((part, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span>/</span>
                  {i < slug.length - 1 ? (
                    <span>{part}</span>
                  ) : (
                    <span className="text-foreground">{entry.title}</span>
                  )}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold mb-3">{entry.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {entry.status && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-card-border text-muted">
                  {entry.status}
                </span>
              )}
              {entry.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-card-bg text-muted border border-card-border"
                >
                  {tag}
                </span>
              ))}
              {(entry.created || entry.date) && (
                <span className="text-xs text-muted">
                  {entry.created || entry.date}
                </span>
              )}
            </div>

            <article className="wiki-content">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeSlug,
                  [rehypeHighlight, { detect: true, ignoreMissing: true }],
                ]}
                components={wikiComponents(slugPath)}
              >
                {entry.content}
              </Markdown>
            </article>

            {(prev || next) && (
              <nav
                className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-3"
                aria-label="Sibling navigation"
              >
                {prev ? (
                  <Link
                    href={`/wiki/${prev.slug}`}
                    className="group block rounded-xl border border-card-border p-4 transition-colors hover:border-accent/40"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-muted">
                      ← Previous
                    </span>
                    <div className="mt-1 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {prev.title}
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}
                {next ? (
                  <Link
                    href={`/wiki/${next.slug}`}
                    className="group block rounded-xl border border-card-border p-4 transition-colors hover:border-accent/40 sm:text-right"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-muted">
                      Next →
                    </span>
                    <div className="mt-1 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {next.title}
                    </div>
                  </Link>
                ) : null}
              </nav>
            )}

            {backlinks.length > 0 && (
              <section className="mt-10 rounded-xl border border-card-border bg-card-bg/50 p-5">
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent">
                  Linked from
                </h2>
                <ul className="mt-3 space-y-2">
                  {backlinks.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/wiki/${b.slug}`}
                        className="text-sm text-muted hover:text-accent transition-colors"
                      >
                        {b.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-10 pt-6 border-t border-card-border">
              <Link
                href="/wiki"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                ← Back to Wiki index
              </Link>
            </div>
          </div>

          <WikiTocSidebar toc={toc} />
        </div>
      </main>
    </div>
  );
}
