---
title: "Random Forest"
category: ai-ml/supervised/classification
tags: [classification, random-forest, ensemble, bagging, supervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

Breiman (2001). Combined bagging with random feature selection. Still one of the most reliable out-of-the-box models 25 years later.

## Why It Exists

A single decision tree overfits. But if you build hundreds of slightly different trees (each seeing different data and features) and let them vote, the errors cancel out.

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

Bagging: train each tree on a bootstrap sample (random subset with replacement). Random subspace: at each split, consider only sqrt(n) features.

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Decision Tree](decision-tree.md) — The building block
- [Gradient Boosting](gradient-boosting.md) — Sequential alternative
- [Bias-Variance Tradeoff](../../foundations/bias-variance.md) — Why bagging reduces variance
- [Ensemble Methods](../../foundations/ensemble-methods.md) — Bagging vs boosting vs stacking
