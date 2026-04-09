---
title: "Maximum Likelihood Estimation (MLE) & MAP"
category: math/probability
tags: [probability, mle, map, estimation, likelihood]
created: 2026-04-08
updated: 2026-04-08
---

## Why This Matters for ML

Given data, what parameters best explain it? MLE: pick params that maximize the likelihood. MAP: add a prior belief. Nearly every ML training procedure is MLE in disguise.

## Visual Intuition

<!-- 3B1B-style: geometric/visual explanation before formulas -->

## The Math

<!-- Formal definitions, theorems, proofs where helpful -->

## Examples

<!-- Concrete worked examples -->

## Code

```python
# Computation example
```

## Used In

- [Logistic Regression](../../ai-ml/supervised/classification/logistic-regression.md) — MLE for classification
- [GMM](../../ai-ml/unsupervised/clustering/gmm.md) — EM maximizes likelihood
- [Bayes' Theorem](bayes-theorem.md) — MAP uses Bayes
- [Regularization](../../ai-ml/foundations/regularization.md) — L2 = Gaussian prior (MAP)
