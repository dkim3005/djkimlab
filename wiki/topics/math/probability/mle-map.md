---
title: "Maximum Likelihood Estimation (MLE) & MAP"
category: math/probability
tags: [probability, mle, map, estimation, likelihood]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have chosen a probabilistic model, but I still need to choose its parameters.
MLE uses only the observed data. MAP uses the data plus a prior belief about
which parameter values are more plausible.

## Why It Exists

The "why" chain is:

- A model family by itself is not enough.
- We still need actual parameter values.
- Some parameter values explain the observed data better than others.
- MLE picks the values that make the data most likely.
- MAP adds a prior so the data is not the only voice.

Nearly every ML training loop can be read as "fit parameters by maximizing a
likelihood" or "maximize likelihood plus a prior."

## Visual Intuition

Imagine a curve over parameter space.

- the likelihood creates one hill
- the prior creates another preference
- MLE picks the top of the likelihood hill
- MAP picks the top after the prior reshapes the landscape

So MAP is not a different universe from MLE. It is MLE with an extra bias
toward certain parameter values.

## How It Works

1. Choose a probabilistic model `p(D | theta)`
2. Write the likelihood of the observed data
3. For MLE, maximize that likelihood
4. For MAP, multiply by a prior `p(theta)` or add `log p(theta)`
5. Solve directly or optimize numerically

In practice, we almost always work with log-likelihood because sums are easier
than products.

## The Math Inside

For data `D = {x_1, ..., x_n}`, MLE is

`theta_MLE = argmax_theta prod p(x_i | theta)`

Taking logs gives the equivalent objective

`theta_MLE = argmax_theta sum log p(x_i | theta)`

MAP adds a prior:

`theta_MAP = argmax_theta [sum log p(x_i | theta) + log p(theta)]`

This matters for ML because many regularized objectives are MAP in disguise.
For example:

- L2 regularization corresponds to a Gaussian prior on parameters
- maximizing Bernoulli likelihood leads to logistic regression training
- minimizing negative log-likelihood becomes a standard loss function

## Examples

If you flip a coin 10 times and see 7 heads:

- MLE says `p = 0.7`
- MAP with a prior that prefers fair coins pulls that estimate closer to `0.5`

So MLE trusts the observed sample completely, while MAP balances sample evidence
with prior structure.

## Code

```python
import math


def bernoulli_log_likelihood(p, data):
    total = 0.0
    for x in data:
        total += x * math.log(p) + (1 - x) * math.log(1 - p)
    return total
```

## Used In

- [Logistic Regression](../../ai-ml/supervised/classification/logistic-regression.md) — MLE for classification
- [GMM](../../ai-ml/unsupervised/clustering/gmm.md) — EM maximizes likelihood
- [Bayes' Theorem](bayes-theorem.md) — MAP uses Bayes
- [Regularization](../../ai-ml/foundations/regularization.md) — L2 = Gaussian prior (MAP)
