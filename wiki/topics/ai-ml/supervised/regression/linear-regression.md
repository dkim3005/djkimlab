---
title: "Linear Regression"
category: ai-ml/supervised/regression
tags: [regression, linear, least-squares, supervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

Legendre (1805) and Gauss (1809) independently developed the method of least squares. The oldest ML algorithm — over 200 years old.

## Why It Exists

The most basic question in data: given X, predict Y. If the relationship is roughly linear, fit a line.

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

Minimize MSE: `L = (1/n) * sum((y_i - (wx_i + b))^2)`. Closed-form solution via normal equation: `w = (X^T X)^(-1) X^T y`

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Polynomial / Ridge / Lasso](polynomial-ridge-lasso.md) — When a line isn't enough
- [Gradient Descent](../../../math/optimization/gradient-descent.md) — Iterative alternative to normal equation
- [Logistic Regression](../classification/logistic-regression.md) — Classification version
