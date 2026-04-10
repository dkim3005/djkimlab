---
title: "Gradient Boosting / XGBoost / LightGBM"
category: ai-ml/supervised/classification
tags: [classification, boosting, xgboost, lightgbm, kaggle, supervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want a very strong tabular model and I am willing to trade some simplicity for
accuracy. Gradient boosting is often the first serious choice for structured
business data, ranking, risk models, and Kaggle-style prediction tasks.

## History

Friedman (1999) — Gradient Boosting Machines. Chen & Guestrin (2016) — XGBoost. Ke et al. (2017) — LightGBM. Dominated Kaggle for years.

## Why It Exists

The "why" chain is:

- Random forests reduce variance by averaging many trees.
- But averaging does not directly target the remaining systematic errors.
- We want each new learner to focus on what the current ensemble still gets wrong.
- So we build trees sequentially, not independently.

Gradient boosting exists because error correction can be more powerful than
simple averaging.

## How It Works

### Visual Intuition

Imagine fitting one small tree to the data.

- the first tree captures some pattern
- the residual errors are still visible
- a second tree is trained on those mistakes
- a third tree fixes what the first two still miss

The model improves by repeatedly asking, "what errors remain right now?"

The timeline node is here:

-> [MLViz Node: Gradient Boosting](/projects/mlviz/gradient-boosting)

### Step by Step

1. Start with a simple initial prediction
2. Compute residuals or negative gradients of the loss
3. Fit a new tree to those residuals
4. Add that tree to the ensemble with a learning-rate shrinkage factor
5. Repeat for many rounds

Each new tree is small, but the whole ensemble becomes highly expressive.

## Code

```python
F = initial_model()
for _ in range(num_rounds):
    residual = target - F(X)
    tree = fit_tree(X, residual)
    F = F + learning_rate * tree
```

## The Math Inside

Additive model:

`F_m(x) = F_{m-1}(x) + alpha h_m(x)`

- `F_{m-1}`: current ensemble
- `h_m`: new tree
- `alpha`: learning rate

For squared-error intuition, the new tree fits residuals:

`r_i = y_i - F(x_i)`

More generally, boosting can be seen as gradient descent in function space:

- compute the negative gradient of the loss with respect to the current predictions
- fit a weak learner to that signal
- step in that direction

That is why the name is gradient boosting, not just residual correction.

XGBoost and LightGBM add strong engineering and optimization tricks such as
regularization, histogram-based splitting, and second-order approximations.

## Math Prerequisites

- [Decision Tree](decision-tree.md) - the base learner used repeatedly
- [Ensemble Methods](../../foundations/ensemble-methods.md) - sequential ensembles vs bagging
- [Gradient Descent](../../../math/optimization/gradient-descent.md) - why boosting is described as functional gradient descent
- [Loss Functions](../../foundations/loss-functions.md) - what the residual or gradient is derived from

## Related

- [Decision Tree](decision-tree.md) — The building block
- [Random Forest](random-forest.md) — Parallel alternative
- [Gradient Descent](../../../math/optimization/gradient-descent.md) — Boosting is gradient descent in function space
- [Loss Functions](../../foundations/loss-functions.md) — What boosting optimizes
