---
title: "DBSCAN"
category: ai-ml/unsupervised/clustering
tags: [clustering, dbscan, density, noise, unsupervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Ester, Kriegel, Sander, Xu (1996). Awarded 'Test of Time' award at KDD 2014. Handles arbitrary shapes and noise.

## Why It Exists

k-Means assumes round clusters. Real data is messier — irregular shapes, noise points that belong to no cluster. DBSCAN finds dense regions of any shape.

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

Core point: has >= minPts within eps radius. Border point: within eps of a core point. Noise: neither. Clusters = connected components of core points.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [k-Means](k-means.md) — Centroid-based alternative
- [GMM](gmm.md) — Probabilistic alternative
