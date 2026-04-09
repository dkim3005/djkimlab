---
title: "Hierarchical Clustering"
category: ai-ml/unsupervised/clustering
tags: [clustering, hierarchical, dendrogram, unsupervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

One of the earliest clustering methods (1960s). Produces a tree (dendrogram) of nested clusters rather than a flat partition.

## Why It Exists

k-Means requires you to choose k upfront. Hierarchical clustering builds a tree — you can cut it at any level to get any number of clusters.

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

Agglomerative (bottom-up): start with each point as its own cluster, merge the closest pair repeatedly. Linkage: single, complete, average, Ward's.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [k-Means](k-means.md) — Flat alternative
- [DBSCAN](dbscan.md) — Density-based alternative
