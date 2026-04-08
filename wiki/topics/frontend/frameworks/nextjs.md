---
title: "Next.js"
category: frontend/frameworks
tags: [nextjs, react, meta-framework, vercel, ssr, ssg]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A React-based meta-framework created by Vercel (2016). The most popular way to build production React applications. Provides routing, rendering (SSG/SSR/CSR/ISR), API endpoints, image optimization, and more — things React alone doesn't handle.

## Why It Exists

React is a UI library. To build a real website, you need:

| Need | React alone | Next.js |
|------|-------------|---------|
| Routing (`/wiki/docker`) | Install react-router, configure manually | Create a file → route exists |
| SSG (static pages) | Not supported | Built-in |
| SSR (server rendering) | Complex manual setup | Built-in (default) |
| API endpoints | Separate Express/FastAPI server | `app/api/` folder |
| Code splitting | Manual React.lazy/Suspense | Automatic per-page |
| Image optimization | Manual or third-party | `<Image>` component |

Next.js bundles all of these so you can focus on building features.

## How It Works

### File-based routing
```
app/
├── page.tsx                    → /
├── wiki/
│   ├── page.tsx                → /wiki
│   └── [slug]/
│       └── page.tsx            → /wiki/docker, /wiki/python, ...
├── projects/
│   ├── briefing/
│   │   └── page.tsx            → /projects/briefing
│   └── trading/
│       └── page.tsx            → /projects/trading
└── api/
    └── chat/
        └── route.ts            → /api/chat (API endpoint)
```

No router configuration. The folder structure IS the routing.

### Per-page rendering strategy
```typescript
// Static page (SSG) — built at deploy time
// app/wiki/[slug]/page.tsx
export async function generateStaticParams() {
  // Tell Next.js which pages to pre-build
  return [{ slug: 'docker' }, { slug: 'python' }, { slug: 'react' }]
}

export default function WikiPage({ params }) {
  const content = getMarkdownContent(params.slug)
  return <article>{content}</article>
}
```

```typescript
// Dynamic page (SSR) — rendered per request
// app/projects/briefing/page.tsx
export const dynamic = 'force-dynamic'

export default async function BriefingPage() {
  const news = await db.getLatestNews()  // fresh data every request
  return <Dashboard news={news} />
}
```

### Server Components (React Server Components)
Next.js 13+ introduced a paradigm shift: components run on the server by default.

```typescript
// This runs on the SERVER — never shipped to browser
// Can directly access database, file system, etc.
async function WikiPage() {
  const content = await fs.readFile('wiki/docker.md')  // server-side file read
  return <article>{content}</article>
}

// Add "use client" to make it run in the browser
"use client"
function ChatWidget() {
  const [message, setMessage] = useState('')  // needs browser interactivity
  return <input value={message} onChange={e => setMessage(e.target.value)} />
}
```

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| All rendering strategies in one app | Vercel-optimized — some features work best on Vercel hosting |
| File-based routing — intuitive | App Router (v13+) was a rocky transition |
| Largest React meta-framework ecosystem | Can be heavy for simple sites |
| Most job postings among meta-frameworks | Learning curve: React + Next.js conventions |
| API Routes reduce backend needs | Build times grow with page count |
| Excellent documentation | Vendor lock-in concerns (Vercel) |

## When to Use / When Not to Use

**Use when:**
- Need SSG + SSR + CSR in one app
- Building with React ecosystem (charts, UI libraries, etc.)
- Want file-based routing simplicity
- Project has both static content and dynamic features

**Don't use when:**
- Pure static site (blog/docs only) → Astro or Hugo are lighter
- Don't need React → SvelteKit is simpler
- Minimal interactivity → htmx + server templates
- Bundle size is critical → Astro ships less JS

## Related

- [React](../libraries/react.md) — The library Next.js is built on
- [Astro](astro.md) — Content-first alternative
- [Remix](remix.md) — Another React meta-framework, different philosophy
- [Rendering Strategies](../fundamentals/rendering.md) — SSG/SSR/CSR explained
