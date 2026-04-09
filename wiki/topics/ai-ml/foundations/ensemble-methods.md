---
title: "Ensemble Methods"
category: ai-ml/foundations
tags: [ensemble, bagging, boosting, stacking, fundamentals]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Bagging (Breiman 1996). Boosting (Freund & Schapire 1997 — AdaBoost). Stacking (Wolpert 1992). 'The wisdom of crowds' applied to models.

## Why It Exists

No single model is perfect. Combining multiple models cancels individual errors. Three strategies: parallel (bagging), sequential (boosting), hierarchical (stacking).

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

Bagging: train N models on random subsets, average predictions (reduces variance). Boosting: train sequentially, each model focuses on previous errors (reduces bias). Stacking: use model predictions as features for a meta-model.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Random Forest](../supervised/classification/random-forest.md) — Bagging + trees
- [Gradient Boosting](../supervised/classification/gradient-boosting.md) — Boosting + trees
- [Bias-Variance Tradeoff](bias-variance.md) — Why ensembles work
