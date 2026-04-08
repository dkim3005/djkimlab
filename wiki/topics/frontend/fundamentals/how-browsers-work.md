---
title: "How Browsers Work — HTML, CSS, JS"
category: frontend/fundamentals
tags: [html, css, javascript, browser, core-concept]
created: 2026-04-07
updated: 2026-04-07
---

## The Three Pillars

A browser understands exactly three things. Every website ever made, from 1993 to today, comes down to these:

```
HTML  → Structure    "This is a heading. This is a paragraph. This is a button."
CSS   → Style        "The heading is blue, 24px, centered."
JS    → Behavior     "When the button is clicked, show a message."
```

No matter what framework you use — React, Vue, Svelte, Angular — the final output is always HTML + CSS + JS. The frameworks are just tools to produce these more efficiently.

## HTML — HyperText Markup Language

### What it is
A markup language (not a programming language) that defines the structure and meaning of content.

### Brief history
```
1993  HTML 1.0 — Tim Berners-Lee, basic text and links
1997  HTML 4.0 — Tables, forms, more structure
2008  HTML5 begins — Video, audio, canvas, semantic tags
2014  HTML5 standard — The current standard
```

### Core concept
HTML uses **tags** to wrap content and give it meaning:

```html
<h1>This is a heading</h1>
<p>This is a paragraph with a <a href="/wiki">link</a>.</p>
<button>Click me</button>
<img src="photo.jpg" alt="A photo" />
```

### Semantic HTML
Modern HTML has tags that describe **what content means**, not just how it looks:

```html
<!-- Bad: everything is a div -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main-content">...</div>
<div class="footer">...</div>

<!-- Good: semantic tags -->
<header>
  <nav>...</nav>
</header>
<main>...</main>
<footer>...</footer>
```

Why it matters: screen readers, search engines, and AI all use semantic tags to understand page structure.

## CSS — Cascading Style Sheets

### What it is
A style language that controls how HTML elements look.

### Brief history
```
1996  CSS1 — Fonts, colors, basic layout
1998  CSS2 — Positioning, z-index, media types
2011+ CSS3 — Flexbox, Grid, animations, variables (released in modules)
```

### Core concept
CSS **selects** HTML elements and applies **styles**:

```css
/* Select by tag */
h1 {
  color: blue;
  font-size: 24px;
}

/* Select by class */
.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

/* Select by ID */
#main-nav {
  display: flex;
  gap: 16px;
}
```

### The "Cascading" part
When multiple rules apply to the same element, CSS has a priority system:
```
Inline style (style="...")     → Highest priority
ID selector (#id)              → High
Class selector (.class)        → Medium
Tag selector (h1, p)           → Low
Inherited from parent          → Lowest
```

### Modern CSS layout
Two layout systems dominate modern CSS:

**Flexbox** — One-dimensional (row OR column):
```css
.nav { display: flex; gap: 16px; justify-content: space-between; }
```

**Grid** — Two-dimensional (rows AND columns):
```css
.dashboard { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 16px; }
```

## JavaScript — The Programming Language of the Web

### What it is
The only programming language browsers can execute natively. Despite the name, it has nothing to do with Java.

### Brief history
```
1995  Created in 10 days by Brendan Eich at Netscape
1997  Standardized as ECMAScript (ES)
2009  Node.js — JS runs on servers too, not just browsers
2015  ES6/ES2015 — Modern JS (let/const, arrow functions, classes, modules)
      This was the turning point. JS became a serious language.
2016+ Yearly releases (ES2016, ES2017, ...) — async/await, optional chaining, etc.
```

### What JS does in the browser

```javascript
// 1. Respond to user actions
button.addEventListener('click', () => {
  alert('Clicked!')
})

// 2. Modify the page (DOM manipulation)
document.getElementById('title').textContent = 'New Title'

// 3. Fetch data from servers
const response = await fetch('/api/news')
const news = await response.json()

// 4. Complex logic
const filtered = news.filter(item => item.category === 'tech')
```

### The DOM — Document Object Model
When the browser reads HTML, it builds a tree structure in memory called the DOM:

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── header
        │   └── nav
        ├── main
        │   ├── h1
        │   └── p
        └── footer
```

JavaScript can read and modify this tree. That's how pages become interactive. But directly manipulating the DOM is slow and error-prone — this is the problem that React and other libraries solve.

## TypeScript — JavaScript with Types

### What it is
A **superset** of JavaScript that adds static type checking. Any valid JS is valid TS.

```typescript
// JavaScript — no types, errors at runtime
function add(a, b) {
  return a + b
}
add("hello", 5)  // "hello5" — no error, but probably a bug

// TypeScript — types checked before running
function add(a: number, b: number): number {
  return a + b
}
add("hello", 5)  // Error at compile time: string is not number
```

### Why it exists
As JS projects grew to thousands of files, bugs from wrong types became the #1 problem. TypeScript catches them before the code runs.

### Key fact
TypeScript is **compiled to JavaScript** before the browser runs it. Browsers don't understand TypeScript directly.

```
code.ts  →  TypeScript compiler (tsc)  →  code.js  →  Browser runs it
```

## How It All Fits Together

```
You write:     Framework code (React/Vue/Svelte components)
                    ↓ compiled/bundled by
Build tools:   Webpack, Vite, esbuild
                    ↓ outputs
Browser gets:  HTML + CSS + JS files
                    ↓ parsed into
Browser builds: DOM tree + CSSOM → Render tree → Pixels on screen
```

## Related

- [Rendering Strategies](rendering.md) — SSG vs SSR vs CSR
- [Frontend Overview](../_index.md) — The complete landscape
- [React](../libraries/react.md) — Virtual DOM approach to the DOM problem
- [Svelte](../libraries/svelte.md) — Compiler approach to the DOM problem
