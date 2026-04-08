---
title: "Svelte"
category: frontend/libraries
tags: [svelte, ui-library, compiler, no-virtual-dom]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A UI framework that takes a fundamentally different approach: instead of running a framework in the browser, Svelte is a **compiler** that converts your components into optimized vanilla JavaScript at build time. Created by Rich Harris (New York Times interactive team) in 2016.

## Why It Exists

### The problem with React's approach
React ships a ~40KB runtime (the virtual DOM engine) to every user's browser. On every state change, React:
1. Re-renders the component (builds new virtual DOM)
2. Diffs old vs new virtual DOM
3. Patches the real DOM

This works, but it's overhead — the diffing step is work that could be avoided if you knew at build time exactly what would change.

### Svelte's insight
**The compiler knows at build time which parts of the DOM depend on which variables.** So instead of shipping a diffing engine, compile direct DOM update instructions.

```
React approach:
  Ship virtual DOM engine → Runtime diffing → Update real DOM

Svelte approach:
  Compiler analyzes code → Generates direct DOM update instructions → No runtime needed
```

## How It Works

```svelte
<!-- Counter.svelte -->
<script>
  let count = 0

  function increment() {
    count += 1  // just assign — Svelte detects this at compile time
  }
</script>

<button on:click={increment}>
  Clicked {count} times
</button>

<style>
  button { font-size: 16px; }
</style>
```

What the compiler outputs (simplified):

```javascript
// Svelte generates code that directly updates the specific text node
// No virtual DOM, no diffing
function update() {
  button.textContent = `Clicked ${count} times`
}
```

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Smallest bundle size (~2KB vs React's ~40KB) | Smaller ecosystem — fewer libraries |
| No virtual DOM overhead | Fewer job postings |
| Most intuitive syntax — closest to plain HTML/JS | Smaller community for troubleshooting |
| Built-in animations and transitions | SvelteKit is newer/less battle-tested than Next.js |
| Consistently highest developer satisfaction in surveys | Richer Harris moved to Vercel (potential conflict with Next.js priorities?) |

## When to Use / When Not to Use

**Use when:**
- Performance and bundle size are critical
- Building for slow networks or low-power devices
- Want the most enjoyable developer experience
- Project doesn't need a huge library ecosystem

**Don't use when:**
- Need maximum library compatibility (charting, 3D, etc.)
- Hiring — React developers are easier to find
- Need battle-tested enterprise patterns

## Related

- [React](react.md) — Virtual DOM approach (different trade-offs)
- [SvelteKit](../frameworks/sveltekit.md) — Svelte's meta-framework
- [SolidJS](solidjs.md) — Another non-virtual-DOM approach
