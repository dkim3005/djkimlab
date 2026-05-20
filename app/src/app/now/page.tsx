import type { Metadata } from "next";
import Link from "next/link";
import { getSiteLastUpdated } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Now — what I'm working on this month",
  description:
    "A /now page in the spirit of nownownow.com — current focus, what I'm reading, what I'm shipping.",
  alternates: { canonical: "/now" },
  openGraph: {
    title: "Now · djkimlab",
    description:
      "Current focus, what I'm shipping, what I'm reading.",
    url: "/now",
  },
};

export default function NowPage() {
  const updated = getSiteLastUpdated();

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
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
            $ date · last commit: {updated}
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Now</h1>
          <p className="text-lg text-muted leading-relaxed mb-12">
            A short page in the spirit of{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-2 hover:underline"
            >
              nownownow.com
            </a>{" "}
            — what I&apos;m focused on this month. Updated when something
            actually changes.
          </p>

          <section className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Currently working on
            </h2>
            <ul className="space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-2">
                <span className="text-accent shrink-0 mt-1">›</span>
                <span>
                  <span className="text-foreground">Investment Operations Suite</span>{" "}
                  — five back-office modules over one continuously evolving
                  market simulation; the closest thing I have to a fund
                  back-office in miniature.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent shrink-0 mt-1">›</span>
                <span>
                  <span className="text-foreground">This portfolio</span> —
                  polishing it from &quot;list of stuff I built&quot; to
                  &quot;documented body of work&quot;. See{" "}
                  <Link href="/colophon" className="text-accent underline-offset-2 hover:underline">
                    /colophon
                  </Link>{" "}
                  for the actual stack.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              In the queue
            </h2>
            <ul className="space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-2">
                <span className="text-accent shrink-0 mt-1">›</span>
                <span>
                  More mlviz live demos — Perceptron, k-Means, Gradient
                  Descent landscape. The 1-live / 17-planned ratio bothers me.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent shrink-0 mt-1">›</span>
                <span>
                  Wiki entries that document my own projects, not just
                  textbook ML topics.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent shrink-0 mt-1">›</span>
                <span>
                  Graduating M.S. CS (AI) at Georgia Tech — May 2026.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Open to
            </h2>
            <p className="text-sm leading-7 text-muted">
              Senior ML / AI Engineer and MLOps roles. Toronto, remote, or
              relocation. See{" "}
              <Link href="/#contact" className="text-accent underline-offset-2 hover:underline">
                contact
              </Link>{" "}
              for details and how to reach me.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-card-border">
            <Link href="/" className="text-sm text-muted hover:text-accent transition-colors">
              ← Back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
