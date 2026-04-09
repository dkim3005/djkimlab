import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getWikiEntry, getAllWikiSlugs } from "@/lib/wiki";

function wikiComponents(currentSlug: string): Components {
  const currentDir = "/wiki/" + currentSlug.split("/").slice(0, -1).join("/");
  return {
    a: ({ href, children, ...props }) => {
      if (!href) return <span {...props}>{children}</span>;
      // Convert relative .md links to wiki routes
      if (href.endsWith(".md") || href.includes(".md#")) {
        const [path, hash] = href.split("#");
        // Resolve relative path
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            djkimlab<span className="text-accent">.com</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/wiki" className="text-sm text-muted hover:text-foreground transition-colors">
              Wiki
            </Link>
            <Link href="/research" className="text-sm text-muted hover:text-foreground transition-colors">
              Research
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
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

          {/* Meta */}
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

          {/* Content */}
          <article className="wiki-content">
            <Markdown remarkPlugins={[remarkGfm]} components={wikiComponents(slugPath)}>{entry.content}</Markdown>
          </article>

          {/* Back */}
          <div className="mt-16 pt-8 border-t border-card-border">
            <Link
              href="/wiki"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              &larr; Back to Wiki
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
