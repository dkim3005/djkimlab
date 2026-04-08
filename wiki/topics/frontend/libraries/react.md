---
title: "React"
category: frontend/libraries
tags: [react, ui-library, virtual-dom, meta]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A JavaScript library for building user interfaces through **components**. Created by Meta (Facebook) in 2013. Currently the most widely used UI library in the world.

React is a **library, not a framework** — it handles UI rendering only. Routing, SSR, data fetching, and build tooling are not included; that's why meta-frameworks like [Next.js](../frameworks/nextjs.md) exist on top of it.

## Why It Exists

### The problem before React

In 2011, Facebook's notification system was a mess. When a new message arrived, the code had to:
1. Find the notification counter in the DOM
2. Read the current number
3. Increment it
4. Update the text
5. Also update the tab title
6. Also update the chat badge
7. Hope nothing else changed the DOM in between

This **imperative DOM manipulation** was fragile and hard to maintain.

### React's insight

Instead of telling the browser *how* to update ("find element X, change its text to Y"), just describe *what* the UI should look like for any given state, and let React figure out the updates.

```javascript
// Imperative (before React) — HOW to update
document.getElementById('count').textContent = messages.length
document.getElementById('badge').classList.toggle('visible', messages.length > 0)

// Declarative (React) — WHAT it should look like
function NotificationBadge({ messages }) {
  return (
    <div>
      <span>{messages.length}</span>
      {messages.length > 0 && <Badge />}
    </div>
  )
}
// React handles the DOM updates automatically
```

## How It Works

### Components
Everything in React is a component — a function that returns UI:

```jsx
function ProjectCard({ title, description, link }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>View project</a>
    </div>
  )
}

// Use it like HTML
<ProjectCard title="AI Briefing" description="News pipeline" link="/projects/briefing" />
```

### JSX
The HTML-like syntax inside JavaScript. It's not real HTML — it gets compiled to JavaScript function calls:

```jsx
// What you write (JSX)
<h1 className="title">Hello</h1>

// What it compiles to (JS)
React.createElement('h1', { className: 'title' }, 'Hello')
```

### Virtual DOM
React's core mechanism for efficient updates:

```
1. State changes (e.g., new message arrives)
2. React builds a NEW virtual DOM tree (JS objects, not real DOM)
3. React DIFFS the new tree against the old tree
4. React applies ONLY the changed parts to the real DOM

Real DOM:  [header] [nav] [main] [counter: 3] [footer]
                                      ↑
Virtual DOM diff says:          only this changed
                                      ↓
React updates:                 [counter: 4]
                               (everything else untouched)
```

**Why not just update the real DOM directly?**
Real DOM operations are expensive — the browser has to recalculate layout, repaint, etc. By batching changes and minimizing real DOM touches, React keeps the UI fast.

**The trade-off:** The virtual DOM itself uses memory (~40KB runtime) and CPU for diffing. For simple pages, this overhead is unnecessary. This is why [Svelte](svelte.md) took a different approach (no virtual DOM, compile-time optimization).

### State and Reactivity

```jsx
function Counter() {
  const [count, setCount] = useState(0)  // state: data that changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
// When setCount is called → React re-renders this component
// → Virtual DOM diff → Only the <p> text gets updated in real DOM
```

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Massive ecosystem — library for everything | Virtual DOM overhead (runtime ~40KB) |
| Most job postings require React | JSX learning curve for beginners |
| Huge community, answers to every problem | "Just a library" — need to pick your own router, state manager, etc. |
| Meta-frameworks (Next.js, Remix) built on it | Frequent paradigm shifts (classes → hooks → server components) |
| React Native for mobile apps | Can be overkill for simple sites |

## When to Use / When Not to Use

**Use when:**
- Building complex, interactive UIs
- Need a large ecosystem of compatible libraries
- Team members likely know it
- Want access to Next.js/Remix meta-framework features

**Don't use when:**
- Simple static site with minimal interactivity → [Hugo](../frameworks/hugo.md) or [Astro](../frameworks/astro.md)
- Performance-critical with minimal bundle size → [Svelte](svelte.md) or [SolidJS](solidjs.md)
- Backend developer wanting simple interactivity → [htmx](htmx.md)

## Related

- [Next.js](../frameworks/nextjs.md) — The most popular React meta-framework
- [Svelte](svelte.md) — Alternative approach: compiler instead of virtual DOM
- [Vue](vue.md) — Template-based alternative, lower learning curve
- [Virtual DOM vs Compiler](../fundamentals/rendering.md) — Why speed differs
