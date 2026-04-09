---
title: "Optimization: SGD → Momentum → Adam"
category: ai-ml/foundations
tags: [optimization, sgd, adam, momentum, learning-rate, fundamentals]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

SGD is the oldest (Robbins & Monro, 1951). Momentum (Polyak, 1964). Adam (Kingma & Ba, 2015). Adam is now the default for most deep learning.

## Why It Exists

Gradient descent is slow in practice — ravines, saddle points, noisy gradients. Each successor adds a trick to navigate the loss landscape faster.

## How It Works

### Visual Intuition

<!-- 3B1B-style animation description -->

### Step by Step

<!-- Algorithm walkthrough -->

## Code

```python
# Implementation sketch
```

## The Math Inside

SGD: `θ = θ - α·∇L`. Momentum: `v = βv + ∇L; θ = θ - αv` (accumulate velocity). Adam: adaptive learning rate per parameter using 1st and 2nd moment estimates.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Gradient Descent](../../math/optimization/gradient-descent.md) — The foundation
- [Loss Functions](loss-functions.md) — What we're optimizing
- [MLP & Backprop](../deep-learning/fundamentals/mlp-backprop.md) — Where optimization happens
