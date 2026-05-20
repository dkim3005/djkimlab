import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LinearRegressionDemo from "../components/LinearRegressionDemo";
import PerceptronDemo from "../components/PerceptronDemo";
import KMeansDemo from "../components/KMeansDemo";
import { getMlvizNode, MLVIZ_CATEGORY_META, MLVIZ_TIMELINE } from "@/lib/mlviz";

export function generateStaticParams() {
  return MLVIZ_TIMELINE.map((node) => ({
    model: node.modelSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  const node = getMlvizNode(model);
  if (!node) return {};
  const title = `${node.title} (${node.year})`;
  const description = `${node.subtitle}. ${node.description}`;
  const canonical = `/projects/mlviz/${node.modelSlug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${title} · ML Visualizer`,
      description,
      url: canonical,
    },
  };
}

export default async function MlVizModelPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const node = getMlvizNode(model);

  if (!node) notFound();

  const category = MLVIZ_CATEGORY_META[node.category];
  const resources = node.resourceLinks ?? [
    {
      label: `Wiki: ${node.title}`,
      href: node.wikiHref,
      description: "Read the concept and history first.",
    },
    {
      label: "History Timeline",
      href: "/wiki/topics/ai-ml/history/timeline",
      description: "See the bigger arc around this node.",
    },
    {
      label: "All demos",
      href: "/projects/mlviz",
      description: "Return to the interactive timeline.",
    },
  ];

  return (
    <>
      <section className="mb-8">
        <Link
          href="/projects/mlviz"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          &larr; Back to timeline
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-mono ${category.badgeClass}`}
          >
            {category.label}
          </span>
          <span className="text-xs font-mono text-muted">
            {node.year}
          </span>
          <span className="text-xs font-mono text-muted">
            {node.demoStatus === "live" ? "interactive demo live" : "demo planned"}
          </span>
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {node.title}
        </h1>
        <p className="mt-2 text-lg text-accent">{node.subtitle}</p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          {node.description}
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr),340px]">
        <div>
          {node.modelSlug === "linear-regression" ? (
            <LinearRegressionDemo />
          ) : node.modelSlug === "perceptron" ? (
            <PerceptronDemo />
          ) : node.modelSlug === "k-means" ? (
            <KMeansDemo />
          ) : (
            <div className="rounded-3xl border border-card-border bg-card-bg/70 p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-card-border bg-background/60 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted">
                Roadmap node · demo on the way
              </div>
              <h2 className="text-2xl font-semibold">
                Read the wiki entry for {node.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                The interactive demo for this model is on the build list — the
                live linear regression demo is the template the rest will
                follow. The wiki entry already has the full concept, history,
                and where this fits in the chain.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={node.wikiHref}
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Read the wiki →
                </Link>
                <Link
                  href="/projects/mlviz/linear-regression"
                  className="rounded-md border border-card-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  See the live demo pattern
                </Link>
                <Link
                  href="/projects/mlviz"
                  className="rounded-md border border-card-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  Back to timeline
                </Link>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
              Why this node mattered
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {node.description}
            </p>
          </div>

          <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
              Pressure from the previous era
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">{node.bridge}</p>
          </div>

          <div className="rounded-2xl border border-card-border bg-card-bg/70 p-5">
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
              Deep links
            </h2>
            <div className="mt-3 space-y-3">
              {resources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="block rounded-xl border border-card-border bg-background/60 p-4 transition-colors hover:border-accent/40"
                >
                  <div className="text-sm font-medium">{resource.label}</div>
                  <div className="mt-1 text-sm leading-6 text-muted">
                    {resource.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
