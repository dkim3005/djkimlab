---
title: "CSS Approach — Tailwind CSS"
date: 2026-04-07
status: accepted
category: frontend
project: djkimlab
superseded_by:
---

## Context

We need a CSS approach for djkimlab.com that supports:
- Dark mode (portfolio should look modern)
- Responsive design (mobile-friendly)
- Consistent design language across 10+ pages
- Minimal file management overhead (solo developer)

## Options Considered

| Option | Pros | Cons | Fit |
|--------|------|------|-----|
| [[css-frameworks\|Tailwind CSS]] | Built-in design system, dark mode via `dark:` prefix, responsive via `md:` prefix, no CSS files to manage, largest community | Long className strings, need to learn utility names | ✅ |
| [[css-frameworks\|CSS Modules]] | No class collisions, standard CSS, built into Next.js | Dark mode/responsive is manual, separate .module.css per component, no design system | ⚠️ Safe but more work |
| Pure CSS | No dependencies, full control | Class collisions, no design system, everything manual | ❌ Too much manual work |
| CSS-in-JS (styled-components) | Co-located with components, dynamic styles | Runtime overhead, incompatible with React Server Components, declining | ❌ Ecosystem moving away |
| Bootstrap | Pre-built components, fast prototyping | Looks generic, heavy, dated feel | ❌ Wrong signal for portfolio |

## Decision

**Tailwind CSS.**

Primary reasons:
1. **Dark mode** — `dark:bg-gray-800` prefix. No separate theme system to build. Critical for a modern portfolio.
2. **Responsive design** — `md:grid-cols-2 lg:grid-cols-3` prefixes. No media query boilerplate.
3. **Design consistency** — Pre-defined scales for colors, spacing, typography. Hard to accidentally use inconsistent values.
4. **No file switching** — Style and structure in the same .tsx file. Faster iteration for a solo developer.
5. **Ecosystem** — shadcn/ui (component library) is built on Tailwind. Gives us pre-built, customizable components (buttons, cards, modals) without heavy dependencies.
6. **Bundle efficiency** — Tailwind purges unused classes. Only CSS that's actually used ships to production.
7. **Current standard** — Most popular CSS framework in the React/Next.js ecosystem (2024-2026).

## Consequences

- **Long classNames** — HTML will look cluttered with utility classes. Extract common patterns into components to keep it manageable.
- **Learning class names** — Need to learn Tailwind's naming conventions. Mitigated by excellent editor extensions (Tailwind CSS IntelliSense) that provide autocomplete.
- **Not "real CSS" knowledge** — Could create a gap in understanding raw CSS. Mitigated by documenting CSS fundamentals in wiki.
