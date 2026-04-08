---
title: "Rendering Strategies — SSG vs SSR vs CSR"
category: frontend/fundamentals
tags: [rendering, ssg, ssr, csr, core-concept]
created: 2026-04-07
updated: 2026-04-07
---

## The Core Question

A web page is just HTML. The question is: **who generates that HTML, and when?**

This single question splits the frontend world into three camps.

## SSG — Static Site Generation

**"Build it all ahead of time."**

```
[Build time — before deploy]

Source files              Build tool           Ready-to-serve HTML
wiki/docker.md    →     framework runs   →   /wiki/docker.html
wiki/python.md    →     conversion       →   /wiki/python.html

[When user visits]
Browser → Server: "give me the docker page"
Server → Browser: docker.html (pre-built file, just send it)
```

- **Who makes HTML:** Build tool (at deploy time)
- **When:** Once, before the site goes live
- **Server work at runtime:** Zero. Just file delivery.
- **First load speed:** Fastest possible
- **Drawback:** Content changes require a rebuild
- **Best for:** Wikis, blogs, documentation — content that doesn't change per-request

**Real-world analogy:** A printed book. Already written. Hand it to whoever asks. Fast, but you can't update a page without reprinting.

## SSR — Server-Side Rendering

**"Build it fresh on every request."**

```
[When user visits]
Browser → Server: "give me the news briefing page"
Server:  1. Query database for latest news
         2. Generate HTML with that data
         3. Send to browser
```

- **Who makes HTML:** Server (on each request)
- **When:** Every time someone visits
- **Server work at runtime:** Yes, every request
- **First load speed:** Fast (HTML arrives ready)
- **Drawback:** Server does work per request. Needs a running server process.
- **Best for:** News feeds, dashboards — pages where data changes frequently and SEO matters

**Real-world analogy:** A restaurant kitchen. Makes each dish to order. Fresh, but takes time and resources.

## CSR — Client-Side Rendering

**"Send a blank page + JavaScript. Let the browser figure it out."**

```
[When user visits]
Browser → Server: "give me the page"
Server → Browser: near-empty HTML + large JS bundle
Browser: 1. Download JS
         2. Execute JS
         3. JS calls API for data
         4. JS builds the HTML
         5. Page finally appears
```

- **Who makes HTML:** Browser (via JavaScript)
- **When:** After the page loads, in the user's browser
- **Server work at runtime:** Only API calls
- **First load speed:** Slowest (download JS → execute → fetch data → render)
- **Drawback:** Blank page until JS loads. Search engines may not see content (bad for SEO).
- **Best for:** App-like UIs after login, interactive tools, dashboards where SEO doesn't matter

**Real-world analogy:** IKEA furniture. You get the parts and assembly instructions. You build it yourself. Cheaper for the store, more work for you.

## Side-by-Side Comparison

```
                Who makes HTML?   When?          First load   Server cost   SEO
SSG             Build tool        Before deploy  ★★★★★        None          ★★★★★
SSR             Server            Per request    ★★★★         Per request   ★★★★★
CSR             Browser (JS)      After loading  ★★           None          ★
```

## Hybrid — The Modern Reality

Modern meta-frameworks (Next.js, Astro, SvelteKit) let you **mix strategies per page:**

```
djkimlab.com/wiki/docker    → SSG  (content rarely changes)
djkimlab.com/projects/briefing → SSR  (needs fresh data)
djkimlab.com/projects/mlviz    → CSR  (heavy interactivity, no SEO needed)
```

This is why meta-frameworks exist — plain React can only do CSR. You need Next.js (or similar) to get SSG and SSR.

## ISR — Incremental Static Regeneration

A fourth strategy, pioneered by Next.js:

```
[First visit]
Serve pre-built HTML (like SSG)

[After N seconds]
Next request triggers a background rebuild of that page
New visitors get the updated version
```

Best of both: SSG speed + fresh data. But adds complexity.

## How This Connects to Our Project

| Page | Strategy | Why |
|------|----------|-----|
| Wiki pages | SSG | Markdown content, rarely changes, fast load |
| Main hub | SSG or SSR | Mostly static, chatbot is client-side |
| News briefing | SSR | Needs latest data from database |
| ML visualization | CSR | Heavy JS interaction, no SEO value |
| DevOps dashboard | SSR | Real-time server metrics |

## Related

- [Frontend Overview](../_index.md) — The complete frontend map
- [Next.js](../frameworks/nextjs.md) — Supports all rendering strategies
- [Astro](../frameworks/astro.md) — SSG-first with optional SSR
