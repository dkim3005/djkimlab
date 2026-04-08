---
title: "htmx"
category: frontend/libraries
tags: [htmx, server-centric, minimal-js, alternative]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A library (~14KB) that lets you make modern, interactive web pages using **HTML attributes instead of JavaScript**. Instead of building a JS-heavy frontend that calls APIs, htmx lets the server return HTML fragments that get swapped into the page.

## Why It Exists

### The "JavaScript fatigue" problem

Modern frontend development:
```
Learn React → Learn JSX → Learn hooks → Learn state management (Redux? Zustand?) →
Learn a meta-framework (Next.js?) → Learn TypeScript → Learn a bundler (Webpack? Vite?) →
Configure build pipeline → ...finally start building your actual feature
```

htmx asks: **what if most of this complexity is unnecessary?**

The original web already had a pattern that worked:
1. Browser sends request to server
2. Server returns HTML
3. Browser displays it

The only problem was that the **entire page** reloaded. htmx fixes just that one problem — it lets you replace **part of the page** without a full reload.

## How It Works

```html
<!-- Traditional: full page reload -->
<a href="/contacts">View Contacts</a>

<!-- htmx: load into a specific div, no page reload -->
<button hx-get="/contacts" hx-target="#content" hx-swap="innerHTML">
  View Contacts
</button>
<div id="content">
  <!-- contacts HTML will appear here -->
</div>
```

The server returns **HTML**, not JSON. No JavaScript needed on the client side.

```python
# Server (FastAPI example)
@app.get("/contacts")
def get_contacts():
    contacts = db.query(Contact).all()
    return HTMLResponse(render_template("contacts_partial.html", contacts=contacts))
```

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Almost no JavaScript to write | Server does all rendering work |
| Backend developers can build full apps | Not suited for complex client-side interactions |
| Tiny (~14KB), no build step | Ecosystem is tiny vs React |
| Works with any backend (Python, Go, etc.) | Limited interactivity (animations, drag-drop, etc.) |
| Conceptually simple | Fewer developers know it → harder to hire |

## When to Use / When Not to Use

**Use when:**
- You're primarily a backend developer (Python, Go, etc.)
- Building CRUD apps, admin panels, simple dashboards
- Want minimal frontend complexity
- Server rendering is fine for your use case

**Don't use when:**
- Need rich client-side interactions (drag-and-drop, real-time collaboration)
- Building interactive visualizations or animations
- Need offline functionality
- Want to use React ecosystem libraries (charting, 3D, etc.)

## Why it matters for our context

htmx represents a valid alternative philosophy: **"most websites don't need a JavaScript framework."** Even if we don't use htmx for djkimlab (we need interactive charts and ML visualizations), understanding this approach is valuable for making an informed technology choice.

For an infrastructure-focused engineer, knowing when NOT to use React is as important as knowing React.

## Related

- [React](react.md) — The opposite philosophy (client-heavy)
- [Rendering Strategies](../fundamentals/rendering.md) — htmx is essentially enforced SSR
- [Frontend Overview](../_index.md) — Where htmx fits in the landscape
