---
title: "Language Selection — TypeScript over JavaScript"
date: 2026-04-07
status: accepted
category: frontend
project: djkimlab
superseded_by:
---

## Context

With Next.js selected as our frontend framework, we need to decide between JavaScript and TypeScript. Both are fully supported by Next.js.

## Options Considered

| Option | Pros | Cons | Fit |
|--------|------|------|-----|
| [[typescript]] | Catches bugs before runtime, powerful autocomplete, industry standard, types serve as documentation | Learning curve, compile step, config file needed | ✅ |
| JavaScript | No setup, shorter code, zero learning curve | Runtime bugs, weak autocomplete, falling behind in industry adoption | ❌ |

## Decision

**TypeScript.**

Primary reasons:
1. **Industry standard** — ~78% of JS developers use TypeScript (2025). Job postings list TypeScript, not JavaScript. For a portfolio targeting North American jobs, this matters.
2. **Next.js defaults to it** — `create-next-app` sets up TypeScript automatically. No extra configuration burden.
3. **Gradual adoption** — We can start writing JavaScript-style code in .tsx files and add types progressively. No need to learn advanced TypeScript upfront.
4. **Portfolio signal** — TypeScript in a portfolio project demonstrates awareness of production-grade practices.
5. **Editor experience** — Autocomplete and inline documentation make working with unfamiliar libraries much faster.

## Consequences

- **Learning overhead** — TypeScript adds concepts (interfaces, generics, type narrowing) on top of JavaScript. Mitigated by starting with basic types and learning as needed.
- **Occasional type fights** — Some third-party libraries have poor type definitions, requiring `any` escape hatches. Acceptable for a portfolio project.
