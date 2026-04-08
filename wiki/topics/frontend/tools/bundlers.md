---
title: "Bundlers — Webpack, Vite, esbuild"
category: frontend/tools
tags: [bundler, webpack, vite, esbuild, build-tools]
created: 2026-04-07
updated: 2026-04-07
---

## What Is a Bundler?

Browsers can't directly run:
- TypeScript
- JSX (React's HTML-in-JS syntax)
- CSS modules
- `import` statements across hundreds of files

A bundler takes all your source files and **transforms + combines** them into browser-ready HTML, CSS, and JS files.

```
Your code:                          Bundler outputs:
src/
├── App.tsx          ──┐
├── Header.tsx         │
├── Wiki.tsx           ├──→  bundle.js (one optimized file)
├── styles.css         │     styles.css (combined)
└── utils.ts         ──┘     index.html
```

## Why Speed Differs

Bundlers are themselves programs. What language they're written in determines their speed:

```
Tool        Written in    Speed
──────────  ──────────    ──────────
esbuild     Go            100x faster than Webpack
SWC         Rust           ~70x faster than Babel (JS compiler)
Turbopack   Rust           Webpack successor by Vercel
Webpack     JavaScript     Slowest, but most mature/configurable
Rollup      JavaScript     Slower, but produces smaller bundles
```

**Why Go/Rust are faster:** They compile to native machine code and use multiple CPU cores efficiently. JavaScript runs in a single-threaded interpreter (V8/Node.js).

## The Major Bundlers

### Webpack (2014)
```
Status: Still the most used, but declining for new projects
Used by: Next.js (moving away), Create React App (deprecated)
Strengths: Extremely configurable, massive plugin ecosystem
Weaknesses: Slow, complex configuration, steep learning curve
```

### Vite (2020)
```
Status: The new standard for frontend development
Created by: Evan You (also created Vue)
Used by: SvelteKit, Nuxt 3, Astro, Remix (optional)
How: Uses esbuild for dev server (instant), Rollup for production build

Key innovation:
  Webpack:  Bundle everything → Start dev server (slow — 10+ seconds)
  Vite:     Start dev server immediately → Bundle only what's requested (instant)
```

### esbuild (2020)
```
Status: Used inside Vite as the fast compilation layer
Written in: Go
Key fact: 10-100x faster than Webpack for the same task
Limitation: Less configurable than Webpack — used as a building block, not standalone
```

### Turbopack (2022)
```
Status: Next.js's intended Webpack replacement (by Vercel)
Written in: Rust
Key fact: Claims to be faster than Vite in large projects
Limitation: Still maturing, only works with Next.js
```

## How This Affects Us

When we choose Next.js, we get:
- **Dev mode:** Turbopack (fast hot reload)
- **Production build:** Webpack (being replaced by Turbopack gradually)
- **No manual bundler configuration needed** — Next.js handles it

This is another reason meta-frameworks exist: bundler setup is complex, and they abstract it away.

## Related

- [Frontend Overview](../_index.md) — Where bundlers fit in the stack
- [Next.js](../frameworks/nextjs.md) — Bundler configuration handled for you
- [How Browsers Work](../fundamentals/how-browsers-work.md) — What bundlers output to
