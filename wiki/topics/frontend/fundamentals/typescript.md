---
title: "TypeScript — JavaScript with Types"
category: frontend/fundamentals
tags: [typescript, javascript, types, core-concept]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A superset of JavaScript created by Microsoft (2012) that adds static type checking. Any valid JavaScript is valid TypeScript. TypeScript code is compiled to JavaScript before browsers or Node.js can run it.

```
code.ts  →  TypeScript compiler (tsc)  →  code.js  →  Browser/Node runs it
```

## Why It Exists

As JavaScript projects grew from small scripts to applications with thousands of files, a category of bugs became dominant: **type errors.**

```javascript
// JavaScript — runs fine, but is a bug
function calculateTotal(price, quantity) {
  return price * quantity
}

calculateTotal("hello", 5)
// Returns "hellohellohellohellohello" — no error, silent bug
// You discover this in production when a user sees garbage data
```

```typescript
// TypeScript — caught before running
function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

calculateTotal("hello", 5)
// ❌ Compile error: Argument of type 'string' is not assignable to parameter of type 'number'
// You see this immediately in your editor, with a red underline
```

## How It Works

### Type annotations
You declare what type a variable, parameter, or return value should be:

```typescript
// Primitive types
let name: string = "Dongjin"
let age: number = 30
let isActive: boolean = true

// Arrays
let scores: number[] = [95, 87, 92]

// Objects — define a shape with an interface
interface Project {
  title: string
  description: string
  url: string
  tags: string[]
  isPublished: boolean
}

// Function with typed parameters and return
function getProject(slug: string): Project {
  // TypeScript ensures this function returns a valid Project shape
}
```

### Type inference — you don't always need to write types
```typescript
// TypeScript figures out the type automatically
let count = 0            // inferred as number
let name = "Dongjin"     // inferred as string
let items = [1, 2, 3]    // inferred as number[]

// You only need explicit types when TypeScript can't infer
function add(a: number, b: number) {  // parameters need types
  return a + b                         // return type inferred as number
}
```

### The IDE experience — the biggest practical benefit

```typescript
// With TypeScript, your editor knows everything:
const response = await fetch('/api/projects')
const projects: Project[] = await response.json()

projects[0].   // Editor shows: title, description, url, tags, isPublished
               // With autocomplete, documentation, and error checking

// With JavaScript:
projects[0].   // Editor shows: nothing. You're on your own.
```

## Why It Became the Industry Standard

```
Timeline:
2012  Microsoft releases TypeScript. Skepticism from JS community.
2015  Angular 2 adopts TypeScript (mandatory). First major framework.
2016  VS Code (written in TypeScript) gains popularity. Shows the tooling benefits.
2018  Large projects start migrating: Slack, Airbnb, Stripe.
2020  Most new React/Next.js projects use TypeScript by default.
2023  Next.js, Vite, SvelteKit all default to TypeScript on project creation.
2024+ De facto standard. Job postings list "TypeScript" not "JavaScript."
```

### Adoption stats (approximate, 2025)
- ~78% of JavaScript developers use TypeScript
- All major frameworks have first-class TypeScript support
- Most npm libraries ship TypeScript type definitions

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Catches bugs before running code | Learning curve on top of JavaScript |
| Powerful editor autocomplete and refactoring | Type gymnastics can get complex |
| Types serve as documentation | Configuration file (tsconfig.json) needed |
| Easier to maintain large codebases | Compile step adds build time |
| Industry standard — expected in job market | Some valid JS patterns are hard to type |

## Gradual Adoption — You Don't Have to Go All-In

TypeScript is designed to be adopted incrementally:

```typescript
// Start: just rename .js to .ts, add types gradually
// This is valid TypeScript — no types, works fine
function greet(name) {
  return `Hello, ${name}`
}

// Later: add types as you learn
function greet(name: string): string {
  return `Hello, ${name}`
}

// Even later: use advanced features
function greet<T extends { name: string }>(user: T): string {
  return `Hello, ${user.name}`
}
```

You can set `strict: false` in tsconfig.json to start lenient, then tighten over time.

## Related

- [How Browsers Work](how-browsers-work.md) — TypeScript compiles to JavaScript for the browser
- [Next.js](../frameworks/nextjs.md) — Defaults to TypeScript
- [Angular](../libraries/angular.md) — First major framework to mandate TypeScript
