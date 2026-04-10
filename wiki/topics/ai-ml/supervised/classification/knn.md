---
title: "k-Nearest Neighbors (k-NN)"
category: ai-ml/supervised/classification
tags: [classification, knn, distance, non-parametric, supervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want a simple local classifier with almost no training phase, especially on
small tabular or low-dimensional problems where neighborhoods are meaningful. It
is also one of the clearest ways to visualize what classification means.

## History

Cover & Hart (1967). One of the oldest and simplest ML algorithms. No training phase — just memorize the data.

## Why It Exists

The "why" chain is:

- maybe global decision boundaries are too rigid
- maybe local neighborhoods already tell us the label
- if similar points tend to share labels, nearby examples can vote
- so instead of fitting parameters, we store data and reason locally

k-NN exists because sometimes classification can be reduced to "who lives near
this point?"

## How It Works

### Visual Intuition

Imagine a scatter plot with colored points.

- a new point appears
- we draw a circle around its nearest neighbors
- those neighbors cast votes
- the local majority decides the class

As `k` changes, the boundary changes too:

- small `k` makes the boundary very flexible
- larger `k` smooths the boundary

The timeline node is here:

-> [MLViz Node: k-NN](/projects/mlviz/knn)

### Step by Step

1. Store the labeled training points
2. Choose a distance metric such as Euclidean distance
3. For a new point, compute distance to all training points
4. Select the `k` closest neighbors
5. Predict by majority vote or distance-weighted vote

## Code

```python
def knn_predict(neighbors):
    votes = {}
    for label in neighbors:
        votes[label] = votes.get(label, 0) + 1
    return max(votes, key=votes.get)
```

## The Math Inside

There is no parametric model to fit.

Prediction rule:

`y_hat = majority_vote(labels of k nearest neighbors)`

A common distance is Euclidean:

`d(x, z) = sqrt(sum (x_i - z_i)^2)`

Important tradeoff:

- small `k` -> low bias, high variance
- large `k` -> higher bias, lower variance

Why k-NN struggles in high dimension:

- distances become less informative
- everything starts to look far from everything else

So k-NN works best when neighborhoods are genuinely meaningful.

## Math Prerequisites

- [Vectors & Matrices](../../../math/linear-algebra/vectors-matrices.md) - points as vectors
- [Dot Product](../../../math/linear-algebra/dot-product.md) - geometry and similarity intuition
- [Bias-Variance Tradeoff](../../foundations/bias-variance.md) - how `k` changes smoothness

## Related

- [Decision Tree](decision-tree.md) — Another interpretable classifier
- [Curse of Dimensionality](../../foundations/bias-variance.md) — Why k-NN fails in high dimensions
- [Vectors & Distance](../../../math/linear-algebra/dot-product.md) — Distance functions
