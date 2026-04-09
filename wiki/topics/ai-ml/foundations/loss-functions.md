---
title: "Loss Functions"
category: ai-ml/foundations
tags: [loss, mse, cross-entropy, hinge, fundamentals]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Each loss function encodes an assumption about the problem. Choosing the right one is as important as choosing the right model.

## Why It Exists

A model learns by minimizing a number — the loss. Different tasks need different loss functions because 'wrong' means different things.

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

MSE: `(1/n)Σ(y-ŷ)^2` (regression). Cross-Entropy: `-Σy·log(ŷ)` (classification). Hinge: `max(0, 1-y·ŷ)` (SVM). Huber: MSE near 0, MAE far away (robust regression).

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Cross-Entropy](../../math/information-theory/cross-entropy.md) — Information-theoretic view
- [Gradient Descent](../../math/optimization/gradient-descent.md) — How loss is minimized
- [Optimization (SGD → Adam)](optimization.md) — Which optimizer to use
