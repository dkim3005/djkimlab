---
title: "Naive Bayes"
category: ai-ml/supervised/classification
tags: [classification, bayes, probability, text, supervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

Applied to ML in the 1960s. Famously used for email spam filtering (late 1990s). 'Naive' because it assumes features are independent.

## Why It Exists

Given evidence (words in an email), what's the probability it's spam? Bayes' theorem gives us a principled way to update beliefs.

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

Bayes: `P(class|data) = P(data|class) * P(class) / P(data)`. Naive assumption: `P(data|class) = product(P(feature_i|class))`.

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Bayes' Theorem](../../../math/probability/bayes-theorem.md) — The foundation
- [Logistic Regression](logistic-regression.md) — Discriminative vs generative comparison
- [Distributions](../../../math/probability/distributions.md) — Gaussian Naive Bayes
