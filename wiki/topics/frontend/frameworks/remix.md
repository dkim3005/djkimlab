---
title: "Remix"
category: frontend/frameworks
tags: [remix, react, meta-framework, shopify, web-standards]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A React-based meta-framework (2021) that emphasizes web standards (native fetch, FormData, HTTP caching) over custom abstractions. Created by the React Router team, acquired by Shopify in 2023.

## Why It Exists

Next.js invented many custom APIs (getServerSideProps, getStaticProps, API Routes) that work well but aren't standard web patterns. Remix argues: **use the web platform's built-in features instead of reinventing them.**

## Key Difference from Next.js

```
Next.js approach:
  Custom data loading (getServerSideProps) → Custom API routes → Custom caching

Remix approach:
  Standard web Request/Response → Standard HTTP headers for caching → Standard HTML forms
```

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Web-standards aligned — skills transfer outside Remix | Smaller ecosystem than Next.js |
| Excellent data loading patterns (nested routes) | Fewer tutorials and resources |
| Great error handling (per-route error boundaries) | Shopify acquisition — uncertain direction |
| No client-side state needed for many cases | Less SSG support than Next.js |

## When to Use / When Not to Use

**Use when:** Building data-heavy apps, want web-standard patterns, team values progressive enhancement.

**Don't use when:** Need strong SSG support, want largest community, or already invested in Next.js patterns.

## Related

- [Next.js](nextjs.md) — The main competitor
- [React](../libraries/react.md) — Both are built on React
