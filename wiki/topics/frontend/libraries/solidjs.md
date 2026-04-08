---
title: "SolidJS"
category: frontend/libraries
tags: [solidjs, ui-library, fine-grained-reactivity, performance]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A reactive UI library that looks like React (JSX, components, hooks-like API) but works fundamentally differently under the hood. Created by Ryan Carniato in 2018. Consistently tops performance benchmarks.

## Why It Exists

SolidJS asks: **what if you could have React's developer experience without the virtual DOM overhead?**

### React's trade-off
React re-renders entire components when state changes, then diffs virtual DOM to find what actually changed. This is wasteful — most of the component didn't change.

### SolidJS's approach
Components run **once**. Only the specific DOM nodes that depend on changed data get updated. No virtual DOM, no diffing, no re-rendering.

```jsx
// Looks like React, but only runs once
function Counter() {
  const [count, setCount] = createSignal(0)
  
  console.log("This prints ONCE, not on every update")
  
  return <button onClick={() => setCount(count() + 1)}>
    Count: {count()}  {/* Only this text node updates */}
  </button>
}
```

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Fastest benchmarks of any framework | Small community |
| React-like syntax — easy to learn from React | Very few job postings |
| No virtual DOM overhead | Ecosystem is tiny |
| Truly reactive — surgical DOM updates | Solid Start (meta-framework) is immature |

## When to Use / When Not to Use

**Use when:** Performance is the absolute top priority, team is willing to adopt a niche tool.

**Don't use when:** Need ecosystem breadth, hiring ease, or battle-tested meta-framework.

## Related

- [React](react.md) — Similar syntax, different architecture
- [Svelte](svelte.md) — Similar "no virtual DOM" philosophy, different approach
