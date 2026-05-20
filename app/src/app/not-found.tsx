import Link from "next/link";

export const metadata = {
  title: "Not Found",
  description: "This page is not in the index.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-start">
        <p className="font-mono text-sm text-accent">$ ls /this-page</p>
        <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
          404
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
          That route isn&apos;t mapped to anything on this server. It may have
          moved, or the link is just wrong.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Back home
          </Link>
          <Link
            href="/wiki"
            className="rounded-md border border-card-border px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground hover:border-accent/50"
          >
            Wiki
          </Link>
          <Link
            href="/projects/mlviz"
            className="rounded-md border border-card-border px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground hover:border-accent/50"
          >
            ML Visualizer
          </Link>
        </div>
        <pre className="mt-12 max-w-md whitespace-pre rounded-lg border border-card-border bg-card-bg p-5 font-mono text-xs leading-relaxed text-muted">
{`{
  "status": 404,
  "method": "GET",
  "hint": "try one of the buttons above"
}`}
        </pre>
      </div>
    </main>
  );
}
