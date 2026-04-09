---
title: "k-Nearest Neighbors (k-NN)"
category: ai-ml/supervised/classification
tags: [classification, knn, distance, non-parametric, supervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

Cover & Hart (1967). One of the oldest and simplest ML algorithms. No training phase — just memorize the data.

## Why It Exists

Sometimes the simplest approach works: to classify a new point, look at the k closest points in the training data and take a vote.

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

No explicit model — prediction is: `y = majority_vote(k nearest neighbors)`. Distance: Euclidean `d = sqrt(sum((x_i - y_i)^2))`.

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Decision Tree](decision-tree.md) — Another interpretable classifier
- [Curse of Dimensionality](../../foundations/bias-variance.md) — Why k-NN fails in high dimensions
- [Vectors & Distance](../../../math/linear-algebra/dot-product.md) — Distance functions
