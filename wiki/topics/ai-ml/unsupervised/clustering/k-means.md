---
title: "k-Means Clustering"
category: ai-ml/unsupervised/clustering
tags: [clustering, k-means, unsupervised, centroid]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Stuart Lloyd (1957, published 1982). Originally designed for pulse-code modulation at Bell Labs. One of the most widely used algorithms in all of ML.

## Why It Exists

You have data with no labels. You want to discover natural groups. k-Means assigns each point to the nearest centroid, then moves centroids to the center of their cluster. Repeat.

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

Minimize within-cluster sum of squares: `J = sum_k sum_{x in C_k} ||x - μ_k||^2`. Update: `μ_k = (1/|C_k|) * sum(x in C_k)`.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [GMM](gmm.md) — Soft/probabilistic version
- [DBSCAN](dbscan.md) — Density-based alternative
- [PCA](../dimensionality-reduction/pca.md) — Often used before k-Means
