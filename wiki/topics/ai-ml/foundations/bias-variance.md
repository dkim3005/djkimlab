---
title: "Bias-Variance Tradeoff"
category: ai-ml/foundations
tags: [bias, variance, overfitting, underfitting, fundamentals]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Geman, Bienenstock, Doursat (1992) formalized it. The fundamental tension in all of machine learning.

## Why It Exists

Every model makes two types of errors. Bias: the model is too simple to capture the pattern (underfitting). Variance: the model memorizes noise (overfitting). You can't minimize both — you must balance.

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

Expected error = Bias^2 + Variance + Irreducible noise. High bias: model too simple. High variance: model too complex. Sweet spot in the middle.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Regularization](regularization.md) — Techniques to manage the tradeoff
- [Ensemble Methods](ensemble-methods.md) — Bagging reduces variance, boosting reduces bias
- [Polynomial / Ridge / Lasso](../supervised/regression/polynomial-ridge-lasso.md) — Concrete example
