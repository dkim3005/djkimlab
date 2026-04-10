---
title: "Probability Distributions"
category: math/probability
tags: [probability, gaussian, bernoulli, poisson, distribution]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need a mathematical description of uncertainty, noise, or repeated outcomes.
In this bundle, the two key distributions are Bernoulli for yes/no labels and
Gaussian for continuous values around an average.

## Why It Exists

The "why" chain is:

- Raw data looks messy.
- We still want a compact description of how outcomes behave.
- A distribution says which outcomes are likely and which are rare.
- Once we have that, we can estimate parameters, compute likelihoods, and train models.

Distributions exist because ML needs a language for randomness, not just fixed
numbers.

## Visual Intuition

Think of two pictures:

- Bernoulli: a biased coin with only two outcomes, `0` or `1`
- Gaussian: a bell curve centered around a typical value, with fewer points far from the center

Those two shapes cover a surprising amount of ML:

- logistic regression treats labels as Bernoulli outcomes
- Gaussian noise shows up in regression, sensor error, and many generative models

## The Math Inside

### Bernoulli

If `X` can only be `0` or `1`, and `P(X = 1) = p`, then

`P(X = x) = p^x (1 - p)^(1 - x)`

for `x in {0, 1}`.

- mean: `p`
- variance: `p(1 - p)`

This is the right model when the target is binary.

### Gaussian

If a variable clusters around a mean `mu` with spread `sigma^2`, the density is

`p(x) = (1 / sqrt(2 pi sigma^2)) * exp(- (x - mu)^2 / (2 sigma^2))`

- `mu`: center
- `sigma^2`: variance

The Gaussian matters because many natural measurement errors and aggregated
effects look approximately bell-shaped.

## Examples

- Spam or not spam: Bernoulli
- Click or no click: Bernoulli
- Height, temperature, sensor noise: often approximated by Gaussian
- Gaussian Naive Bayes: assumes each feature is Gaussian within each class

## Code

```python
import math


def bernoulli_pmf(x, p):
    return (p ** x) * ((1 - p) ** (1 - x))


def gaussian_pdf(x, mu, sigma):
    coef = 1.0 / math.sqrt(2 * math.pi * sigma * sigma)
    exp_term = math.exp(-((x - mu) ** 2) / (2 * sigma * sigma))
    return coef * exp_term
```

## Used In

- [Logistic Regression](../../ai-ml/supervised/classification/logistic-regression.md) — Bernoulli likelihood for binary labels
- [GMM](../../ai-ml/unsupervised/clustering/gmm.md) — Mixture of Gaussians
- [Naive Bayes](../../ai-ml/supervised/classification/naive-bayes.md) — Gaussian NB
- [Diffusion Models](../../ai-ml/deep-learning/architectures/diffusion.md) — Gaussian noise process
- [t-SNE](../../ai-ml/unsupervised/dimensionality-reduction/t-sne.md) — Student's t-distribution
