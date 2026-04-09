---
title: "Support Vector Machine (SVM)"
category: ai-ml/supervised/classification
tags: [classification, svm, kernel, margin, supervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

Vapnik & Cortes (1992). Based on statistical learning theory. Dominated ML before deep learning. Mathematically one of the most elegant classifiers.

## Why It Exists

Instead of just finding any boundary between classes, find the one with the maximum margin — the widest gap. This gives the best generalization.

## How It Works

<!-- 3B1B-style explanation: visual intuition first, then mechanics -->

### Visual Intuition

<!-- Animation/diagram description: what the viewer should see -->

### Step by Step

<!-- Algorithm walkthrough -->

## Code

```python
# Implementation sketch
```

## The Math Inside

Maximize margin: `max 2/||w||` subject to `y_i(w·x_i + b) >= 1`. Kernel trick: `K(x, z) = φ(x)·φ(z)` — compute in high dimensions without going there.

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Logistic Regression](logistic-regression.md) — Probabilistic alternative
- [Lagrange Multipliers](../../../math/optimization/lagrange-multipliers.md) — How SVM is solved
- [Dot Product](../../../math/linear-algebra/dot-product.md) — Why kernels work
- [Perceptron](../../deep-learning/fundamentals/perceptron.md) — SVM's simpler ancestor
