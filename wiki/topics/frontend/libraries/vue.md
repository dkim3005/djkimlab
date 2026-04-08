---
title: "Vue.js"
category: frontend/libraries
tags: [vue, ui-library, template-based]
created: 2026-04-07
updated: 2026-04-07
---

## What It Is

A progressive JavaScript framework for building UIs. Created by Evan You in 2014 after working on Angular at Google. Currently the #2 UI library globally, with especially strong adoption in China and Asia.

"Progressive" means you can use as little or as much of Vue as you need — from enhancing a single HTML page to building a full single-page application.

## Why It Exists

Evan You liked parts of Angular (data binding, templates) but found it too heavy and opinionated. Vue takes the good parts and wraps them in a simpler, more approachable API.

## How It Works

### Single-File Components
Vue uses `.vue` files that combine template, logic, and style in one file:

```vue
<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button @click="count++">Clicked {{ count }} times</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['title', 'description'])
const count = ref(0)
</script>

<style scoped>
.card {
  padding: 16px;
  border-radius: 8px;
}
</style>
```

### Key difference from React
- **React:** Uses JSX — JavaScript that looks like HTML
- **Vue:** Uses templates — HTML that includes special directives

```jsx
// React — logic and markup mixed in JS
function Card({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
}

// Vue — HTML template with directives
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

Vue's template approach feels more natural to people coming from HTML/backend backgrounds.

## Strengths and Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Gentlest learning curve among major frameworks | Smaller ecosystem than React |
| Excellent documentation | Fewer job postings in North America |
| Single-file components are clean | Community split between Options API and Composition API |
| Vue devtools are excellent | Strong in Asia, less dominant in US/EU markets |
| Can be adopted incrementally | Fewer meta-framework options (mainly Nuxt) |

## When to Use / When Not to Use

**Use when:**
- Want the easiest on-ramp to a modern framework
- Team is coming from HTML/jQuery/backend backgrounds
- Building for Chinese/Asian markets where Vue dominates

**Don't use when:**
- Targeting North American job market (React has more demand)
- Need the largest possible library ecosystem
- Want the most meta-framework options

## Related

- [React](react.md) — The main alternative, larger ecosystem
- [Nuxt.js](../frameworks/nuxtjs.md) — Vue's meta-framework (like Next.js for React)
- [Angular](angular.md) — What Vue simplified
