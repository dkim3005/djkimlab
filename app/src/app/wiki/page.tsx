import Link from "next/link";
import { getWikiEntries, WikiEntry } from "@/lib/wiki";

function groupByCategory(entries: WikiEntry[]) {
  const groups: Record<string, WikiEntry[]> = {};
  for (const entry of entries) {
    const key = entry.category || "uncategorized";
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  return groups;
}

export default function WikiIndex() {
  const topics = getWikiEntries("topics");
  const decisions = getWikiEntries("decisions");
  const grouped = groupByCategory(topics);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            djkimlab<span className="text-accent">.com</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#projects" className="text-sm text-muted hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/#experience" className="text-sm text-muted hover:text-foreground transition-colors">
              Experience
            </Link>
            <Link href="/wiki" className="text-sm text-foreground font-medium">
              Wiki
            </Link>
            <Link href="/research" className="text-sm text-muted hover:text-foreground transition-colors">
              Research
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Wiki</h1>
          <p className="text-muted mb-12">
            Technical knowledge base — fundamentals, tools, and architecture decisions.
          </p>

          {/* Topics by category */}
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, entries]) => (
              <section key={category} className="mb-12">
                <h2 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
                  {category.replace(/\//g, " / ")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {entries.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/wiki/${entry.slug}`}
                      className="group block p-4 rounded-lg border border-card-border bg-card-bg hover:border-accent/40 transition-all"
                    >
                      <h3 className="font-medium group-hover:text-accent transition-colors mb-1">
                        {entry.title}
                      </h3>
                      {entry.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {entry.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-1.5 py-0.5 rounded bg-background text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            ))}

          {/* Decisions */}
          {decisions.length > 0 && (
            <section className="mb-12">
              <h2 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
                Architecture Decisions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {decisions.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/wiki/${entry.slug}`}
                    className="group block p-4 rounded-lg border border-card-border bg-card-bg hover:border-accent/40 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium group-hover:text-accent transition-colors">
                        {entry.title}
                      </h3>
                      {entry.status && (
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded-full border border-card-border text-muted">
                          {entry.status}
                        </span>
                      )}
                    </div>
                    {entry.date && (
                      <p className="text-xs text-muted">{entry.date}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
