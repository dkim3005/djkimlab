import Link from "next/link";
import { MLVIZ_CATEGORY_META, MLVIZ_TIMELINE } from "@/lib/mlviz";

export default function MlVizTimelinePage() {
  const liveCount = MLVIZ_TIMELINE.filter(
    (node) => node.demoStatus === "live",
  ).length;

  return (
    <>
      <section className="mb-10">
        <div className="mb-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono text-accent">
          Interactive Timeline
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Why this model existed, and what broke before it
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          This route follows the exact chain from the plan: practical model,
          visual intuition, then the math underneath. Click any node to drill
          into a model page. The first live demo is linear regression, and the
          rest of the timeline is already wired so the history can grow without
          dead ends.
        </p>
      </section>

      <section className="mb-12 grid gap-4 lg:grid-cols-[minmax(0,1.6fr),minmax(300px,1fr)]">
        <div className="rounded-2xl border border-card-border bg-card-bg/80 p-6">
          <h2 className="mb-3 text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Flow
          </h2>
          <div className="space-y-3 text-sm leading-7 text-muted">
            <p>I use this when...</p>
            <p>Why it exists, what failed before it, what changed after it.</p>
            <p>See it move, inspect the math, then jump to the wiki.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-card-border bg-card-bg/80 p-6">
          <h2 className="mb-3 text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Status
          </h2>
          <p className="text-sm leading-7 text-muted">
            {liveCount} live demo, {MLVIZ_TIMELINE.length - liveCount} planned
            nodes.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/projects/mlviz/linear-regression"
              className="rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent transition-colors hover:bg-accent/15"
            >
              Open live demo
            </Link>
            <Link
              href="/wiki/topics/ai-ml/history/timeline"
              className="rounded-md border border-card-border px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Read history wiki
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-14 rounded-3xl border border-card-border bg-card-bg/60 p-6 md:hidden">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Timeline</h2>
          <span className="text-xs font-mono text-muted">mobile stack</span>
        </div>
        {MLVIZ_TIMELINE.map((node, index) => {
          const category = MLVIZ_CATEGORY_META[node.category];

          return (
            <div
              key={node.modelSlug}
              className="grid grid-cols-[24px,1fr] gap-4"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`mt-2 h-5 w-5 rounded-full border-4 ${category.dotClass}`}
                />
                {index < MLVIZ_TIMELINE.length - 1 && (
                  <span className="mt-2 h-full w-px bg-card-border" />
                )}
              </div>

              <div className="pb-8">
                <p className="font-mono text-xs text-muted">{node.year}</p>
                <Link
                  href={`/projects/mlviz/${node.modelSlug}`}
                  className="mt-2 block rounded-2xl border border-card-border bg-background/70 p-4 transition-colors hover:border-accent/40"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-mono ${category.badgeClass}`}
                    >
                      {category.label}
                    </span>
                    <span className="text-[11px] font-mono text-muted">
                      {node.demoStatus === "live" ? "live" : "planned"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{node.title}</h3>
                  <p className="mt-1 text-sm text-accent">{node.subtitle}</p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {node.description}
                  </p>
                </Link>
                {index < MLVIZ_TIMELINE.length - 1 && (
                  <p className="mt-3 text-xs leading-6 text-muted">
                    {node.bridge}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <section className="hidden rounded-3xl border border-card-border bg-card-bg/60 p-6 md:block">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Timeline</h2>
          <span className="text-xs font-mono text-muted">
            desktop horizontal scroll
          </span>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="relative min-w-[1440px]">
            <div className="absolute left-2 right-2 top-[3.15rem] h-px bg-card-border" />
            <div className="flex items-start gap-6">
              {MLVIZ_TIMELINE.map((node, index) => {
                const category = MLVIZ_CATEGORY_META[node.category];

                return (
                  <div key={node.modelSlug} className="w-[240px] shrink-0">
                    <p className="font-mono text-xs text-muted">{node.year}</p>
                    <div className="relative h-12">
                      <span
                        className={`absolute left-0 top-5 h-5 w-5 rounded-full border-4 ${category.dotClass}`}
                      />
                    </div>
                    <Link
                      href={`/projects/mlviz/${node.modelSlug}`}
                      className="block rounded-2xl border border-card-border bg-background/70 p-5 transition-colors hover:border-accent/40"
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[11px] font-mono ${category.badgeClass}`}
                        >
                          {category.label}
                        </span>
                        <span className="text-[11px] font-mono text-muted">
                          {node.demoStatus === "live" ? "live" : "planned"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">{node.title}</h3>
                      <p className="mt-1 text-sm text-accent">{node.subtitle}</p>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {node.description}
                      </p>
                    </Link>
                    {index < MLVIZ_TIMELINE.length - 1 && (
                      <p className="mt-3 text-xs leading-6 text-muted">
                        {node.bridge}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
