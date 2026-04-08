---
title: "CSS Approaches — Pure CSS, Modules, Tailwind, and More"
category: frontend/tools
tags: [css, tailwind, css-modules, bootstrap, styling]
created: 2026-04-07
updated: 2026-04-07
---

## The Problem CSS Frameworks Solve

CSS itself is simple. The problems arise at scale:

```
1. Name collisions — Two files both define .card, they conflict
2. Inconsistency — One dev uses 14px, another uses 16px, another uses 1rem
3. Responsiveness — Writing media queries for every breakpoint is repetitive
4. Dark mode — Doubling every color definition
5. Maintenance — CSS files grow, dead rules accumulate, nobody dares delete
```

Different CSS approaches solve different subsets of these problems.

## The Approaches

### 1. Pure CSS — Write it yourself

```css
/* styles.css */
.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
```

```jsx
import './styles.css'

<div className="card">
  <h3 className="card-title">Project</h3>
</div>
```

| Pros | Cons |
|------|------|
| No dependencies | Class name collisions across files |
| Full control | No built-in design system |
| No learning curve | Dark mode / responsive = manual work |

### 2. CSS Modules — Scoped by file

The `.module.css` extension tells the build tool to make class names unique per file.

```css
/* Card.module.css */
.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}
```

```jsx
import styles from './Card.module.css'

<div className={styles.card}>
  <h3 className={styles.title}>Project</h3>
</div>

// Rendered HTML: <div class="Card_card_x7ks2">
// The class name is auto-generated — no collisions possible
```

| Pros | Cons |
|------|------|
| No class name collisions | Separate .module.css file per component |
| Standard CSS syntax | Dark mode / responsive still manual |
| Built into Next.js, no setup | No design system — consistency is your job |
| Easy to understand | Switching between .tsx and .css files |

### 3. Tailwind CSS — Utility classes in HTML

Instead of writing CSS rules, you compose pre-defined utility classes directly in your HTML/JSX.

```jsx
// No CSS file needed

<div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project</h3>
  <p className="text-gray-600 dark:text-gray-300 mt-2">Description here</p>
</div>
```

Each class does one thing:
```
bg-white        → background: white
dark:bg-gray-800 → in dark mode: background: gray-800
rounded-lg      → border-radius: 0.5rem
p-4             → padding: 1rem
shadow-md       → box-shadow: medium
text-xl         → font-size: 1.25rem
font-bold       → font-weight: 700
mt-2            → margin-top: 0.5rem
hover:shadow-lg → on hover: larger shadow
md:grid-cols-2  → at medium screen: 2 columns
```

| Pros | Cons |
|------|------|
| No CSS files to manage | className strings get long |
| Built-in design system (colors, spacing, typography) | Need to learn class names (editor helps) |
| Dark mode: `dark:` prefix | HTML looks cluttered at first |
| Responsive: `md:` `lg:` prefixes | Harder to read for CSS-experienced devs |
| Only ships CSS you actually use | Reusing styles requires components or @apply |
| Massive community and plugin ecosystem | |

### 4. CSS-in-JS — Write CSS in JavaScript

Libraries like styled-components or Emotion:

```jsx
import styled from 'styled-components'

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
`

<Card>
  <Title>Project</Title>
</Card>
```

| Pros | Cons |
|------|------|
| CSS scoped to component automatically | Runtime overhead (generates CSS in browser) |
| Dynamic styles based on props | Larger bundle size |
| Co-located with component code | Not compatible with React Server Components |
| | Falling out of favor in React ecosystem |

**Note:** CSS-in-JS was popular 2018-2022 but is declining because React Server Components (Next.js 13+) don't support runtime CSS-in-JS. The ecosystem is moving toward Tailwind and CSS Modules.

### 5. Component Libraries — Pre-built UI

Libraries that give you ready-made components (buttons, modals, forms):

```jsx
// shadcn/ui (currently most popular, built on Tailwind)
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Project</CardTitle>
  </CardHeader>
  <Button variant="outline">View</Button>
</Card>
```

| Library | Based on | Notes |
|---------|----------|-------|
| shadcn/ui | Tailwind + Radix | Most popular in 2024+. Copy-paste, not npm install |
| Material UI (MUI) | CSS-in-JS | Google's Material Design. Heavy |
| Ant Design | CSS | Popular in China. Enterprise-focused |
| Bootstrap | CSS | The original. Still used, feels dated |
| Chakra UI | CSS-in-JS | Developer-friendly API. Declining |
| DaisyUI | Tailwind | Tailwind component classes |

## Comparison Matrix

```
                Pure CSS    CSS Modules   Tailwind    CSS-in-JS
────────────    ────────    ───────────   ────────    ─────────
Collision-free  ❌          ✅            ✅          ✅
Design system   ❌ manual   ❌ manual     ✅ built-in ❌ manual
Dark mode       😰 manual   😰 manual     ✅ easy     ✅ possible
Responsive      😰 manual   😰 manual     ✅ easy     😰 manual
Bundle size     ✅ minimal  ✅ minimal    ✅ purged   ❌ runtime
Server Comp.    ✅          ✅            ✅          ❌
Learning curve  ✅ none     ✅ minimal    ⚠️ medium   ⚠️ medium
File management ❌ grows    ⚠️ many files ✅ none     ✅ co-located
Next.js support ✅          ✅ built-in   ✅ official ⚠️ limited
```

## The Current Trend (2025-2026)

```
Rising:    Tailwind CSS + shadcn/ui (component library built on Tailwind)
Stable:    CSS Modules (safe, boring, works)
Declining: CSS-in-JS (styled-components, Emotion) — killed by Server Components
Legacy:    Bootstrap, pure CSS at scale
```

## Related

- [How Browsers Work](../fundamentals/how-browsers-work.md) — CSS fundamentals
- [Next.js](../frameworks/nextjs.md) — Supports CSS Modules and Tailwind natively
- [Bundlers](bundlers.md) — How CSS gets processed and optimized
