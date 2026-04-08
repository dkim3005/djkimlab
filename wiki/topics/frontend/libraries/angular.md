---
title: "Angular"
category: frontend/libraries
tags: [angular, framework, typescript, google, enterprise]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A full-fledged frontend **framework** (not just a library) maintained by Google. Unlike React or Vue which focus on UI rendering only, Angular includes routing, forms, HTTP client, dependency injection, and testing utilities out of the box. TypeScript is mandatory.

## Why It Exists

### History — There are two Angulars

```
2010  AngularJS (v1) — Google releases it. Revolutionary at the time.
                        Two-way data binding was mind-blowing.
                        But: slow, hard to maintain at scale.

2016  Angular (v2+)  — Complete rewrite. Not backwards compatible.
                        Community split. Many migrated to React.
                        Now simply called "Angular."
```

This rewrite burned a lot of trust. Many developers who were on AngularJS moved to React instead of Angular 2+, which is part of why React dominates today.

## How It Works

Angular uses TypeScript classes with decorators and HTML templates:

```typescript
// counter.component.ts
@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count }}</p>
    <button (click)="increment()">+1</button>
  `
})
export class CounterComponent {
  count = 0

  increment() {
    this.count++
  }
}
```

### Key architectural concepts
- **Modules** — Organize code into feature blocks
- **Dependency Injection** — Framework manages object creation
- **RxJS Observables** — Reactive data streams (powerful but complex)
- **Two-way data binding** — Input changes automatically sync with component state

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Everything included — no library hunting | Steepest learning curve of any major framework |
| TypeScript enforced — catches bugs early | Heavy — large bundle, complex build |
| Dependency injection — great for large teams | RxJS is its own learning mountain |
| Google backing — long-term stability | Verbose — lots of boilerplate code |
| Strong in enterprise — banks, insurance, government | Overkill for small/medium projects |

## When to Use / When Not to Use

**Use when:**
- Large enterprise team that needs strict conventions
- Organization already uses Angular
- Building complex, form-heavy business applications

**Don't use when:**
- Small team or solo developer (overhead too high)
- Building a portfolio or content site
- Want rapid prototyping
- Team doesn't already know Angular

## Related

- [React](react.md) — The library many Angular developers migrated to
- [Vue](vue.md) — Created specifically as a lighter alternative to Angular
