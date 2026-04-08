---
title: "Frontend Framework Selection"
date: 2026-04-07
status: accepted
category: frontend
project: djkimlab
superseded_by:
---

## Context

djkimlab.com is a portfolio site that needs to serve multiple types of content:
- Static content: wiki pages, research notes (markdown → HTML)
- Dynamic dashboards: news briefing, infra monitoring, trading charts
- Interactive tools: ML visualizations, AI chatbot
- All in a single application, served from one M1 MacBook Air (8GB RAM)

We need a framework that supports SSG, SSR, and CSR within the same app.

## Options Considered

| Option | Pros | Cons | Fit |
|--------|------|------|-----|
| [[nextjs]] | SSG+SSR+CSR in one app, file-based routing, API routes, largest React ecosystem, most job postings | Vercel-optimized, App Router transition was rocky, heavier than needed for static-only | ✅ Best fit |
| [[astro]] | Zero JS by default, fastest for content, can mix React/Vue/Svelte | Islands model adds friction for dashboards, younger ecosystem | ⚠️ Great for wiki, weak for dashboards |
| [[sveltekit]] | Smallest bundles, cleanest syntax, SSG+SSR | Small library ecosystem — fewer charting/visualization options | ⚠️ Ecosystem too small |
| [[remix]] | Web-standards, excellent data loading | Weaker SSG, Shopify acquisition uncertainty | ❌ SSG support insufficient |
| [[nuxtjs]] | Good DX, auto-imports | Vue ecosystem, fewer North American jobs | ❌ Wrong ecosystem for job target |
| Vite + React (SPA) | Lightweight, fast dev server | No SSG/SSR — wiki SEO suffers, need separate API server | ❌ Missing critical features |
| [[htmx]] + FastAPI | Minimal JS, Python-native | Can't do interactive charts/visualizations in browser | ❌ Interactivity insufficient |

## Decision

**Next.js with TypeScript.**

Primary reasons:
1. **Hybrid rendering** — Wiki pages use SSG (fast, no server cost), dashboards use SSR (fresh data), visualizations use CSR (heavy interaction). One app, three strategies.
2. **React ecosystem** — Recharts, D3, Three.js, TensorFlow.js all have React bindings. Critical for our diverse project types.
3. **File-based routing** — Folder structure = URL structure. No router configuration for 10+ pages.
4. **API Routes** — Simple endpoints without a separate server. Complex AI/ML work goes to FastAPI.
5. **Job market** — Next.js + TypeScript is the most in-demand frontend stack in North America.
6. **Single process** — One Node.js server on 8GB MacBook Air.

## Consequences

- **Locked into React paradigm** — If React falls out of favor, migration cost is high. Acceptable risk given React's dominance.
- **Heavier than necessary for wiki** — Astro would serve static content with less JS. But the benefit of one unified app outweighs this.
- **Vercel ecosystem gravity** — Some Next.js features work best on Vercel hosting. We self-host, so some optimizations (ISR, edge functions) may need workarounds.
- **Learning curve** — Need to learn React + Next.js conventions + TypeScript simultaneously. Mitigated by starting simple and adding complexity gradually.
