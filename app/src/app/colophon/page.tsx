import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colophon — how this site is built and run",
  description:
    "djkimlab.com runs on a single laptop in an apartment, fronted by a Cloudflare Tunnel. Eight Next.js apps in parallel, $0/month server, manual deploys.",
  alternates: { canonical: "/colophon" },
  openGraph: {
    title: "Colophon · djkimlab",
    description:
      "djkimlab.com is self-hosted on one laptop fronted by Cloudflare Tunnel. Here is the entire stack and deploy process.",
    url: "/colophon",
  },
};

const SUBDOMAINS = [
  { sub: "djkimlab.com", port: 3000, role: "portfolio + wiki (this site)" },
  { sub: "ops.djkimlab.com", port: 3001, role: "Investment Operations Suite" },
  { sub: "radiology.djkimlab.com", port: 3002, role: "Radiology AI" },
  { sub: "rl.djkimlab.com", port: 3003, role: "Reinforcement Learning Lab" },
  { sub: "agent.djkimlab.com", port: 3004, role: "Autonomous AI Agent" },
  { sub: "audio.djkimlab.com", port: 3005, role: "Audio Intelligence" },
  { sub: "lamp.djkimlab.com", port: 3006, role: "Responsive Lamp (gaze + memory)" },
  { sub: "quant.djkimlab.com", port: 3007, role: "Quant Trading Platform" },
  { sub: "chatbot.djkimlab.com", port: 3008, role: "Consulate Chatbot" },
];

export default function Colophon() {
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
            <Link href="/#experience" className="text-sm text-muted hover:text-foreground transition-colors">
              Experience
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
            $ uname -a · uptime
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Colophon</h1>
          <p className="text-lg text-muted leading-relaxed mb-12">
            Everything on <code className="font-mono text-foreground">djkimlab.com</code> and the
            8 subdomain apps runs on <span className="text-foreground">one laptop in my
            apartment</span>. No Vercel, no AWS, no Render. This page documents the
            stack so the homelab work isn&apos;t invisible.
          </p>

          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              The path of one HTTP request
            </h2>
            <div className="rounded-xl border border-card-border bg-card-bg/60 p-6 font-mono text-sm leading-7 text-muted">
              <div>You hit <span className="text-foreground">djkimlab.com</span></div>
              <div className="pl-4 text-accent">↓</div>
              <div>Cloudflare DNS resolves to a Cloudflare edge IP <span className="text-muted/70">(172.64.x.x)</span></div>
              <div className="pl-4 text-accent">↓</div>
              <div>Cloudflare edge holds the TLS session, checks <span className="text-foreground">cf-cache</span> for the page</div>
              <div className="pl-4 text-accent">↓</div>
              <div>On miss, it forwards through the Cloudflare Tunnel</div>
              <div className="pl-4 text-accent">↓</div>
              <div><span className="text-foreground">cloudflared</span> daemon (systemd service, runs as root) accepts on this laptop</div>
              <div className="pl-4 text-accent">↓</div>
              <div>Routes to <span className="text-foreground">127.0.0.1:300X</span> based on subdomain</div>
              <div className="pl-4 text-accent">↓</div>
              <div><span className="text-foreground">next-server</span> (one of 9 long-lived Node processes) responds</div>
              <div className="pl-4 text-accent">↓</div>
              <div>Cloudflare edge caches per route, then back to you</div>
              <div className="mt-3 text-xs text-muted/70">p95 ≈ 140&nbsp;ms from Toronto last I checked.</div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              The hardware
            </h2>
            <div className="rounded-xl border border-card-border bg-card-bg/60 p-6 font-mono text-sm leading-7 text-muted">
              <div><span className="text-foreground">Host</span>      Samsung Galaxy Book4 Pro 360 (dk-950XBE)</div>
              <div><span className="text-foreground">OS</span>        Ubuntu 26.04 LTS</div>
              <div><span className="text-foreground">Kernel</span>    7.0.0-15-generic</div>
              <div><span className="text-foreground">RAM</span>       7.1 GB total — usually 4–5 GB live</div>
              <div><span className="text-foreground">Disk</span>      233 GB NVMe — ~25% used</div>
              <div><span className="text-foreground">Uplink</span>    Cloudflare Tunnel (no inbound ports open)</div>
              <div><span className="text-foreground">Cost</span>      $0/mo server · ~$10/yr domain</div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Subdomain → port table
            </h2>
            <div className="overflow-x-auto rounded-xl border border-card-border">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="bg-card-bg text-left">
                    <th className="px-4 py-3 text-foreground font-medium">Subdomain</th>
                    <th className="px-4 py-3 text-foreground font-medium">Port</th>
                    <th className="px-4 py-3 text-foreground font-medium">App</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {SUBDOMAINS.map((row) => (
                    <tr key={row.sub} className="border-t border-card-border">
                      <td className="px-4 py-2.5 text-foreground">{row.sub}</td>
                      <td className="px-4 py-2.5">{row.port}</td>
                      <td className="px-4 py-2.5">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              Each row is a long-running <code className="font-mono text-foreground">next start</code> (or
              FastAPI + Uvicorn for non-Next apps) inside its own{" "}
              <code className="font-mono text-foreground">keep-alive.sh</code> loop.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              How deploys happen
            </h2>
            <p className="text-sm leading-7 text-muted mb-4">
              No CI/CD, no webhook, no auto-pull. The deploy is four shell lines
              I type after merging a PR:
            </p>
            <pre className="overflow-x-auto rounded-xl border border-card-border bg-card-bg p-5 font-mono text-xs leading-7 text-foreground">
{`git pull origin main
cd app && npm install && npm run build
kill $(ss -tlnp | grep ":3000 " | grep -oP 'pid=\\K\\d+')
# keep-alive.sh sees \`next start\` exit and restarts it
# within ~2 s, now serving the new .next/ build.`}
            </pre>
            <p className="mt-4 text-sm leading-7 text-muted">
              Downtime per deploy: about 2 seconds. Cloudflare&apos;s
              long edge cache (<code className="font-mono text-foreground">s-maxage=31536000</code> on
              SSG routes) means most visitors never notice.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              The cloudflared service
            </h2>
            <p className="text-sm leading-7 text-muted">
              The tunnel daemon runs as a systemd service. The auth token used
              to live in the unit file&apos;s{" "}
              <code className="font-mono text-foreground">ExecStart=</code>, which made it
              visible to any user via <code className="font-mono text-foreground">/proc/$PID/cmdline</code>.
              Now it sits in <code className="font-mono text-foreground">/etc/cloudflared/tunnel.env</code> (mode
              600, root), loaded with <code className="font-mono text-foreground">EnvironmentFile=</code>,
              so cmdline shows only{" "}
              <code className="font-mono text-foreground">cloudflared --no-autoupdate tunnel run</code>.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Why self-host instead of Vercel
            </h2>
            <ul className="space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-2">
                <span className="text-accent shrink-0 mt-1">›</span>
                <span>
                  Cost — 9 separate Next apps on Vercel Hobby is over the free
                  tier. On a laptop I already own, the marginal cost is one
                  power outlet.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent shrink-0 mt-1">›</span>
                <span>
                  Backend control — most of these apps need a long-lived FastAPI
                  process for ML inference, WebSocket streaming, or scheduled
                  trading cycles. Vercel functions are not the right shape.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent shrink-0 mt-1">›</span>
                <span>
                  Practice — running the whole stack myself keeps the
                  infra muscle that the CKA cert was supposed to prove.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              This page&apos;s own stack
            </h2>
            <div className="rounded-xl border border-card-border bg-card-bg/60 p-6 font-mono text-sm leading-7 text-muted">
              <div><span className="text-foreground">Framework</span>  Next.js 16, App Router, fully SSG except <code>/opengraph-image</code></div>
              <div><span className="text-foreground">Style</span>      Tailwind v4 + CSS variables for the dark palette</div>
              <div><span className="text-foreground">Fonts</span>      Geist + Geist Mono, self-hosted, 4 weights × 2 families = 8 files</div>
              <div><span className="text-foreground">Wiki</span>       Markdown under <code>/wiki/</code>, loaded at build via <code>gray-matter</code></div>
              <div><span className="text-foreground">Render</span>     <code>react-markdown</code> + <code>remark-gfm</code> + <code>rehype-slug</code> + <code>rehype-highlight</code></div>
              <div><span className="text-foreground">SEO</span>        Per-page <code>generateMetadata</code>, <code>sitemap.ts</code>, <code>robots.ts</code>, dynamic OG image via <code>next/og</code></div>
            </div>
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
