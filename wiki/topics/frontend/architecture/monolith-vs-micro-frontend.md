---
title: "Frontend Architecture — Monolith vs Micro-Frontend"
category: frontend/architecture
tags: [architecture, monolith, micro-frontend, strategy]
created: 2026-04-07
updated: 2026-04-07
---

## The Question

When a project has multiple sub-projects (wiki, dashboard, visualizations, chatbot), should they all live in one frontend app or be split into separate apps?

## Strategy A: Monolith — One Framework for Everything

```
djkimlab.com (single Next.js app)
├── /                    → Main hub
├── /wiki               → Markdown → SSG
├── /research           → Markdown → SSG
├── /projects/briefing  → SSR (API calls)
├── /projects/infra     → SSR (real-time data)
├── /projects/trading   → CSR (interactive charts)
└── /projects/mlviz     → CSR (visualizations)
```

| Pros | Cons |
|------|------|
| Shared layout (nav, footer, dark mode) — build once | Entire app uses one framework's conventions |
| Single build, single deploy, single process | Heavy libraries (Three.js) bundled with the app |
| Consistent design language | Framework lock-in |
| One server process — low memory | If framework has issues, everything is affected |

**The "heavy library" concern is mostly solved** by modern meta-frameworks: Next.js code-splits per page, so Three.js only loads on the visualization page, not on the wiki page.

## Strategy B: Micro-Frontend — Different Framework per Section

```
djkimlab.com/           → Next.js
djkimlab.com/wiki       → Astro (content-optimized)
djkimlab.com/projects/mlviz → SvelteKit (lightweight)
```

| Pros | Cons |
|------|------|
| Best tool for each job | Navigation bar built N times |
| Independent deploys | Dark mode/theme sync across apps |
| Team autonomy (relevant for large orgs) | N build pipelines, N processes |
| | Design inconsistency between apps |
| | Memory: N server processes on 8GB machine |
| | Nginx path-based routing configuration |

**Who actually uses this:** Large companies with separate teams (Amazon, IKEA, Spotify). Not solo developers.

## Strategy C: Hybrid — Mostly Monolith, Exceptions for Special Cases

```
djkimlab.com (Next.js — main app)
├── /                    → everything here
├── /wiki
├── /projects/briefing
└── /projects/medical-ai → page embeds a Gradio/Streamlit demo via iframe

Separate (if needed):
└── medical-ai model demo → Gradio (Python ML serving)
```

| Pros | Cons |
|------|------|
| Unified app for 95% of features | Embedded demos have different look and feel |
| Special tools where they genuinely help | iframe communication is limited |
| Practical compromise | |

## Our Decision

→ See [ADR: Frontend Architecture](../../decisions/) (to be written)

**Leaning toward Strategy A (Monolith)** because:
1. Solo developer — no team coordination benefit from splitting
2. 8GB server — one process is critical
3. Next.js handles SSG/SSR/CSR per page — no need to split by rendering strategy
4. Shared navigation, theme, and design only built once
5. ML model serving is a backend concern (FastAPI), not a frontend split

## Related

- [Next.js](../frameworks/nextjs.md) — Supports all rendering strategies in one app
- [Rendering Strategies](../fundamentals/rendering.md) — SSG/SSR/CSR mixing
