---
title: "Regularization"
category: ai-ml/foundations
tags: [regularization, l1, l2, dropout, overfitting, fundamentals]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

L2 (Ridge): Hoerl 1970. L1 (Lasso): Tibshirani 1996. Dropout: Hinton 2012. Early stopping, data augmentation, batch normalization.

## Why It Exists

Models with many parameters can memorize training data. Regularization penalizes complexity — the model must justify its parameters, keeping only what truly matters.

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

L2: add `λΣw^2` to loss (shrink weights). L1: add `λΣ|w|` (zero out weights). Dropout: randomly disable neurons during training (forces redundancy). All reduce overfitting.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Bias-Variance Tradeoff](bias-variance.md) — Why regularization is needed
- [Polynomial / Ridge / Lasso](../supervised/regression/polynomial-ridge-lasso.md) — Regularization in regression
- [MLP & Backprop](../deep-learning/fundamentals/mlp-backprop.md) — Where dropout lives
