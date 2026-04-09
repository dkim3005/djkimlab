---
title: "Gradient Boosting / XGBoost / LightGBM"
category: ai-ml/supervised/classification
tags: [classification, boosting, xgboost, lightgbm, kaggle, supervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

Friedman (1999) — Gradient Boosting Machines. Chen & Guestrin (2016) — XGBoost. Ke et al. (2017) — LightGBM. Dominated Kaggle for years.

## Why It Exists

Random Forest builds trees independently. Gradient Boosting builds them sequentially — each new tree specifically targets what the previous ones got wrong.

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

Fit tree to residuals: `r_i = y_i - F(x_i)`. Update: `F(x) = F(x) + α * h(x)`. XGBoost adds L1/L2 regularization and second-order Taylor approximation.

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Decision Tree](decision-tree.md) — The building block
- [Random Forest](random-forest.md) — Parallel alternative
- [Gradient Descent](../../../math/optimization/gradient-descent.md) — Boosting is gradient descent in function space
- [Loss Functions](../../foundations/loss-functions.md) — What boosting optimizes
