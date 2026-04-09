---
title: "t-SNE"
category: ai-ml/unsupervised/dimensionality-reduction
tags: [dimensionality-reduction, t-sne, visualization, unsupervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Laurens van der Maaten & Geoffrey Hinton (2008). Designed specifically for visualizing high-dimensional data in 2D/3D.

## Why It Exists

PCA preserves global structure but often fails to show local clusters. t-SNE preserves local neighborhoods — similar points stay close.

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

Convert distances to probabilities in high-D (Gaussian) and low-D (t-distribution). Minimize KL divergence between the two distributions via gradient descent.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [PCA](pca.md) — Linear alternative
- [UMAP](umap.md) — Faster alternative
- [KL Divergence](../../../math/information-theory/kl-divergence.md) — What t-SNE minimizes
