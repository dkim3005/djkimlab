---
title: "Frontend Development — The Complete Map"
category: frontend
tags: [overview, web, frontend]
created: 2026-04-07
updated: 2026-04-07
---

## What Is Frontend?

Frontend is everything the user sees and interacts with in a browser. No matter what framework, library, or tool you use, the browser only understands three things:

```
HTML  → Structure (this is a heading, this is a button, this is a list)
CSS   → Style (color, size, position, animation)
JS    → Behavior (when clicked do X, fetch data from server, update the page)
```

Every frontend technology exists to make producing these three outputs faster, safer, or more maintainable.

## The Layer Model

Frontend technologies stack in layers. Understanding these layers is key to understanding why there are so many tools.

```
Layer 3:  Meta-frameworks     Next.js, Remix, Astro, SvelteKit, Nuxt
             ↑ built on top of
Layer 2:  UI Libraries        React, Vue, Svelte, Angular, SolidJS
             ↑ built on top of
Layer 1:  Languages           JavaScript / TypeScript
             ↑ executed by
Layer 0:  Browser primitives  HTML + CSS + JS engine
```

**Python analogy:**

| Python world | Frontend world |
|-------------|----------------|
| Python (language) | JavaScript (language) |
| Flask (library — you call it) | React (library — you call it) |
| Django (framework — it calls you) | Next.js (framework — it calls you) |

**Library vs Framework:**
- **Library:** You call its functions when you need them. You control the flow.
- **Framework:** It provides the structure. You fill in the blanks. It controls the flow.

## How Pages Get to the Browser — Rendering Strategies

The biggest differentiator between frontend tools is **when and where HTML is generated.** See [Rendering Strategies](fundamentals/rendering.md) for deep dive.

| Strategy | Who makes HTML | When | First load | Server load |
|----------|---------------|------|------------|-------------|
| SSG | Build tool | Before deploy | Fastest | None |
| SSR | Server | On each request | Fast | Yes |
| CSR | Browser (JS) | After page loads | Slow | None |

## The Full Landscape

### Tier 1: Meta-frameworks (SSG + SSR + API + Routing)

Frameworks built on top of UI libraries. They handle routing, rendering strategy, bundling, and often API endpoints — so you don't have to.

| Name | Based on | Current status |
|------|----------|---------------|
| [Next.js](frameworks/nextjs.md) | React | Market leader. Run by Vercel. Most job postings |
| [Remix](frameworks/remix.md) | React | Next.js alternative. Web-standards focused. Acquired by Shopify |
| [Nuxt.js](frameworks/nuxtjs.md) | Vue | Vue ecosystem leader |
| [SvelteKit](frameworks/sveltekit.md) | Svelte | Official Svelte meta-framework |
| [Astro](frameworks/astro.md) | Any (React/Vue/Svelte) | Content-site specialist. Rapid growth |
| Solid Start | SolidJS | New. Performance-extreme |
| Qwik City | Qwik | Experimental. "Resumability" concept |
| Analog | Angular | Angular meta-framework. Early stage |

### Tier 2: UI Libraries (component model, reactivity, rendering)

These define **how you build UI components.** Meta-frameworks are built on top of these.

| Name | Key idea | Current status |
|------|----------|---------------|
| [React](libraries/react.md) | Virtual DOM, JSX, components | Dominant #1. Meta (Facebook) |
| [Vue](libraries/vue.md) | Template-based, low barrier | #2. Strong in China/Asia |
| [Svelte](libraries/svelte.md) | Compiler — no runtime | #3ish. Highest developer satisfaction |
| [Angular](libraries/angular.md) | Full framework, TypeScript-first | Enterprise. Google. Steep learning curve |
| [SolidJS](libraries/solidjs.md) | React syntax + true reactivity | Small but fastest benchmarks |
| Preact | React-compatible, 3KB | Resource-constrained environments |
| Lit | Web Components standard | Google. Framework-agnostic components |
| [htmx](libraries/htmx.md) | Almost no JS. HTML attributes for AJAX | Rising popularity among backend devs |
| Alpine.js | Lightweight jQuery replacement | Simple interactions only |

### Tier 3: Static Site Generators (SSG only)

Build-time HTML generation. No server needed at runtime.

| Name | Language | Notes |
|------|----------|-------|
| Hugo | Go | Fastest build speed |
| Jekyll | Ruby | GitHub Pages default. Aging |
| Gatsby | React | Was popular. Declining |
| Eleventy (11ty) | JS | Simple, flexible |
| Pelican | Python | For Python users |
| MkDocs | Python | Documentation-site specialist |
| Docusaurus | React | Tech docs. Meta (Facebook) |
| VitePress | Vue | Vue docs |

### Tier 4: Alternative Approaches

| Name | Approach |
|------|----------|
| Streamlit | Python-only web apps. Popular for ML demos |
| Gradio | ML model demo specialist |
| Panel / Dash | Python dashboards |
| WordPress | Still 40%+ of the web |
| Webflow / Framer | No-code |

## What Differentiates Them

| Criterion | Examples |
|-----------|---------|
| Rendering strategy | SSG vs SSR vs CSR |
| Base language | JavaScript, TypeScript, Go, Ruby, Python |
| Base UI library | React, Vue, Svelte, none |
| Architecture | Virtual DOM (React) vs Compiler (Svelte) vs Server-centric (htmx) |
| Scope | UI only (React) vs Full-stack (Next.js) vs Static only (Hugo) |
| Runtime size | React ~40KB, Svelte ~2KB, htmx ~14KB |
| Build speed | Hugo (Go) > Vite (esbuild/Go) > Webpack (JS) |

## Related

- [Rendering Strategies](fundamentals/rendering.md) — SSG vs SSR vs CSR deep dive
- [React](libraries/react.md) — The dominant UI library
- [Next.js](frameworks/nextjs.md) — The dominant meta-framework
- [Bundlers](tools/bundlers.md) — Webpack, Vite, esbuild
