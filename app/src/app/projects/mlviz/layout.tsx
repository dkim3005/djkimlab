import Link from "next/link";

export default function MlVizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            djkimlab<span className="text-accent">.com</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/wiki"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Wiki
            </Link>
            <Link href="/projects/mlviz" className="text-sm font-medium text-foreground">
              ML Visualizer
            </Link>
          </div>
        </div>
      </nav>

      <main className="px-6 pb-20 pt-24">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
