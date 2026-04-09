---
title: "Polynomial Regression, Ridge & Lasso"
category: ai-ml/supervised/regression
tags: [regression, regularization, ridge, lasso, polynomial]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

Polynomial regression is a natural extension. Ridge (Hoerl 1970) and Lasso (Tibshirani 1996) added penalty terms to prevent overfitting.

## Why It Exists

Linear regression overfits with many features. Regularization adds a cost for complexity — the model must justify each feature it uses.

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

Ridge: `L = MSE + λ * sum(w_i^2)` (L2). Lasso: `L = MSE + λ * sum(|w_i|)` (L1). Lasso can zero out features → feature selection.

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Linear Regression](linear-regression.md) — The base
- [Bias-Variance Tradeoff](../../foundations/bias-variance.md) — Why regularization works
- [Regularization](../../foundations/regularization.md) — The bigger picture
