---
title: "Gaussian Mixture Model (GMM)"
category: ai-ml/unsupervised/clustering
tags: [clustering, gmm, gaussian, em-algorithm, unsupervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

EM algorithm formalized by Dempster, Laird, Rubin (1977). GMM applies it to clustering with Gaussian distributions.

## Why It Exists

k-Means assigns each point to exactly one cluster (hard assignment). GMM says each point has a probability of belonging to each cluster (soft assignment).

## How It Works

### Visual Intuition

<!-- 3B1B-style animation description -->

### Step by Step

<!-- Algorithm walkthrough -->

## Code

```python
# Implementation sketch
```

## The Math Inside

Model: `p(x) = sum_k π_k * N(x | μ_k, Σ_k)`. EM algorithm alternates: E-step (compute responsibilities) → M-step (update parameters).

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [k-Means](k-means.md) — Hard assignment version (GMM with identity covariance)
- [Distributions](../../../math/probability/distributions.md) — Gaussian distribution
- [MLE](../../../math/probability/mle-map.md) — What EM maximizes
