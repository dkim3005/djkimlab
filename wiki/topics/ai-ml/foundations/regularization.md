---
title: "Regularization"
category: ai-ml/foundations
tags: [regularization, l1, l2, dropout, overfitting, fundamentals]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

My model fits the training set too well and fails to generalize. Regularization
is what I reach for when I need to control model complexity, reduce overfitting,
or make parameter estimates more stable.

## History

L2 (Ridge): Hoerl 1970. L1 (Lasso): Tibshirani 1996. Dropout: Hinton 2012. Early stopping, data augmentation, batch normalization.

## Why It Exists

Models with many parameters can memorize training data. Regularization penalizes complexity — the model must justify its parameters, keeping only what truly matters.

## How It Works

### Visual Intuition

Imagine two curves on noisy data:

- one bends wildly to hit every training point
- the other ignores tiny fluctuations and keeps the larger pattern

Regularization is the pressure that prefers the second curve unless the extra
complexity truly pays for itself.

### Step by Step

1. Start with a training loss
2. Add a penalty or structural constraint
3. Train the model with that modified objective
4. Tune the regularization strength on validation data
5. Keep the strongest setting that still preserves useful signal

## Code

```python
loss = data_loss + lambda_l2 * (weights**2).sum()
```

## The Math Inside

Common forms:

`L_total = L_data + lambda sum w_i^2` for L2

`L_total = L_data + lambda sum |w_i|` for L1

Interpretation:

- L2 shrinks weights smoothly and prefers smaller parameter magnitudes
- L1 encourages sparsity and can drive some weights exactly to zero
- dropout randomly removes units during training so the network cannot rely too much on one path
- early stopping is another form of capacity control in practice

There is also a Bayesian reading:

- L2 regularization corresponds to a Gaussian prior
- L1 regularization corresponds to a Laplace prior

So regularization is not just a hack. It is one way of expressing a preference
for simpler explanations.

## Math Prerequisites

- [Bias-Variance Tradeoff](bias-variance.md) - why reducing variance helps
- [MLE & MAP](../../math/probability/mle-map.md) - regularization as a prior
- [Loss Functions](loss-functions.md) - where penalties are added

## Related

- [Bias-Variance Tradeoff](bias-variance.md) — Why regularization is needed
- [Polynomial / Ridge / Lasso](../supervised/regression/polynomial-ridge-lasso.md) — Regularization in regression
- [MLP & Backprop](../deep-learning/fundamentals/mlp-backprop.md) — Where dropout lives
