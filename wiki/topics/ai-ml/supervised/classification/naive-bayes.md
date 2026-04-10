---
title: "Naive Bayes"
category: ai-ml/supervised/classification
tags: [classification, bayes, probability, text, supervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want a fast probabilistic baseline for text or count-like features, especially
when data is sparse and interpretability matters. Spam filtering and simple
document classification are classic Naive Bayes territory.

## History

Applied to ML in the 1960s. Famously used for email spam filtering (late 1990s). 'Naive' because it assumes features are independent.

## Why It Exists

The "why" chain is:

- classification can be phrased as "which label is most probable given the evidence?"
- Bayes' theorem tells us how to update belief from evidence
- but modeling the full joint feature distribution is expensive
- assuming features are conditionally independent makes the model tractable

Naive Bayes exists because a strong simplifying assumption can turn probability
theory into a very practical classifier.

## How It Works

### Visual Intuition

Imagine classifying an email.

- start with a prior spam probability
- inspect words like "lottery", "discount", or "meeting"
- each word nudges the posterior toward one class or the other

The model does not learn a geometric boundary directly. It compares how
plausible the observed features are under each class.

### Step by Step

1. Estimate class priors such as `P(spam)` and `P(not spam)`
2. Estimate per-feature likelihoods such as `P(word | class)`
3. For a new example, multiply or sum log-likelihoods across features
4. Combine them with the class prior
5. Predict the class with the largest posterior score

## Code

```python
import math


def naive_bayes_score(log_prior, feature_log_probs):
    return log_prior + sum(feature_log_probs)
```

## The Math Inside

Bayes gives:

`P(class | x) proportional to P(x | class) P(class)`

The naive assumption is:

`P(x | class) = product P(x_i | class)`

So the classifier becomes:

`argmax_c P(c) product P(x_i | c)`

In practice we usually use logs:

`argmax_c [log P(c) + sum log P(x_i | c)]`

Why this matters:

- very fast to train
- works surprisingly well on bag-of-words text
- can struggle when feature dependence is strong

## Math Prerequisites

- [Bayes' Theorem](../../../math/probability/bayes-theorem.md) - posterior from prior and likelihood
- [Conditional Independence](../../../math/probability/conditional-independence.md) - the key simplifying assumption
- [Distributions](../../../math/probability/distributions.md) - Bernoulli, multinomial, or Gaussian variants

## Related

- [Bayes' Theorem](../../../math/probability/bayes-theorem.md) — The foundation
- [Logistic Regression](logistic-regression.md) — Discriminative vs generative comparison
- [Distributions](../../../math/probability/distributions.md) — Gaussian Naive Bayes
