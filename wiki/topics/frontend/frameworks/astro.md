---
title: "Astro"
category: frontend/frameworks
tags: [astro, meta-framework, content-first, islands, ssg]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A content-first meta-framework (2022) that ships **zero JavaScript by default**. Unlike Next.js which is JS-heavy, Astro generates pure HTML and only adds JS where you explicitly need interactivity. Can use React, Vue, Svelte, or any UI library — even multiple in the same project.

## Why It Exists

Most websites are mostly content (text, images) with small interactive parts. But React-based frameworks ship the entire React runtime even for a static blog post. Astro asks: **why send JavaScript for content that doesn't need it?**

## How It Works — Islands Architecture

```
Traditional SPA (React/Next.js):
┌──────────────────────────────────┐
│         Everything is JS          │  ← Entire page is a React app
│  Header  Content  Sidebar  Chat  │     Even static text goes through React
└──────────────────────────────────┘

Astro Islands:
┌──────────────────────────────────┐
│  Header    Content     Sidebar   │  ← Static HTML (no JS)
│  (HTML)    (HTML)      (HTML)    │
│                          ┌─────┐ │
│                          │Chat │ │  ← Only this is interactive (JS island)
│                          │(React)│
│                          └─────┘ │
└──────────────────────────────────┘
```

Only the interactive "islands" load JavaScript. Everything else is pure HTML.

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Fastest page loads (minimal JS) | Not suited for app-like UIs (dashboards, SPAs) |
| Use any UI library (React, Vue, Svelte) | Younger ecosystem than Next.js |
| Perfect for content/docs/blogs | Islands model adds complexity for heavy interactivity |
| Built-in markdown/MDX support | Less community support and fewer tutorials |
| Simple mental model for content sites | SSR support is newer, less mature |

## When to Use / When Not to Use

**Use when:**
- Building a content-heavy site (blog, docs, wiki)
- Performance is critical and most pages are static
- Want to mix UI libraries

**Don't use when:**
- Building interactive dashboards or app-like UIs
- Need heavy client-side state management
- Most pages require real-time data

## Why we considered it for djkimlab

Our wiki and research pages are content-heavy → Astro would excel here. But our dashboards (briefing, infra, trading) need heavy interactivity → Astro's islands model would add friction. Using Next.js for everything keeps one mental model.

## Related

- [Next.js](nextjs.md) — The JS-heavy alternative we chose instead
- [Rendering Strategies](../fundamentals/rendering.md) — Astro is SSG-first
- [React](../libraries/react.md) — Can be used inside Astro islands
