---
title: "UMAP"
category: ai-ml/unsupervised/dimensionality-reduction
tags: [dimensionality-reduction, umap, topology, unsupervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Leland McInnes, John Healy (2018). Based on topological data analysis. Faster than t-SNE, better at preserving global structure.

## Why It Exists

t-SNE is slow on large datasets and doesn't preserve global structure well. UMAP is faster, scales better, and maintains both local and global relationships.

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

Builds a weighted k-nearest-neighbor graph in high-D. Optimizes a low-D layout that preserves the topological structure (fuzzy simplicial set).

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [t-SNE](t-sne.md) — Predecessor
- [PCA](pca.md) — Linear baseline
