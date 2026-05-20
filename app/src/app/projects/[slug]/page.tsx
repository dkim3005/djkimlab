import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getProjectDetail,
  type ProjectDetail,
} from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectDetail(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.tagline,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: `${p.title} · djkimlab`,
      description: p.tagline,
      url: `/projects/${slug}`,
    },
  };
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xs font-mono uppercase tracking-widest text-accent">
        {label}
      </h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectDetail(slug);
  if (!p) notFound();
  const isLive = !!p.href;

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            djkimlab<span className="text-accent">.com</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#projects" className="text-sm text-muted hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/wiki" className="text-sm text-muted hover:text-foreground transition-colors">
              Wiki
            </Link>
            <Link href="/#contact" className="text-sm text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#projects"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← All projects
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-card-border px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted">
              {p.category}
            </span>
            {isLive && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                live
              </span>
            )}
            {!isLive && (
              <span className="text-xs font-mono uppercase tracking-wider text-violet-400">
                coursework
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {p.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-300">
            {p.tagline}
          </p>
          {p.metric && (
            <p className="mt-3 font-mono text-sm uppercase tracking-wider text-accent">
              {p.metric}
            </p>
          )}

          {(isLive || p.resources?.length) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {isLive && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Open live demo ↗
                </a>
              )}
              {p.resources?.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="rounded-md border border-card-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent/50 transition-all"
                >
                  {r.label}
                </a>
              ))}
            </div>
          )}

          <div className="my-12 border-t border-card-border" />

          <Section label="The problem">
            <p className="text-sm leading-7 text-muted">{p.problem}</p>
          </Section>

          <Section label="Who this is for">
            <p className="text-sm leading-7 text-muted">{p.audience}</p>
          </Section>

          {p.architecture.length > 0 && (
            <Section label="Architecture">
              <dl className="overflow-hidden rounded-xl border border-card-border divide-y divide-card-border">
                {p.architecture.map((a) => (
                  <div
                    key={a.component}
                    className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="font-mono text-sm text-foreground break-words">
                      {a.component}
                    </dt>
                    <dd className="text-sm leading-6 text-muted break-words">
                      {a.role}
                    </dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          <Section label="Request / data flow">
            <ol className="space-y-2 text-sm leading-7 text-muted">
              {p.flow.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 font-mono text-xs text-accent pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          {p.decisions.length > 0 && (
            <Section label="Key decisions">
              <div className="space-y-5">
                {p.decisions.map((d, i) => (
                  <div key={i} className="rounded-xl border border-card-border bg-card-bg/40 p-5">
                    <p className="text-sm font-medium text-foreground">{d.decision}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      <span className="font-mono text-xs uppercase tracking-wider text-accent mr-2">
                        why
                      </span>
                      {d.why}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section label="Stack">
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-card-bg text-muted border border-card-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </Section>

          {p.rebuild && p.rebuild.length > 0 && (
            <Section label="If I rebuilt it">
              <ul className="space-y-3 text-sm leading-7 text-muted">
                {p.rebuild.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent shrink-0 mt-1">›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <div className="mt-16 pt-6 border-t border-card-border flex flex-wrap gap-6 text-sm">
            <Link href="/#projects" className="text-muted hover:text-accent transition-colors">
              ← All projects
            </Link>
            <Link href="/#contact" className="text-muted hover:text-accent transition-colors">
              Contact me about this →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
