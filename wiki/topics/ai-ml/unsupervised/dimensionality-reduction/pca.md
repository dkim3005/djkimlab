---
title: "Principal Component Analysis (PCA)"
category: ai-ml/unsupervised/dimensionality-reduction
tags: [dimensionality-reduction, pca, eigenvalue, unsupervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Karl Pearson (1901), Harold Hotelling (1933). Over 120 years old and still one of the most used techniques in data science.

## Why It Exists

High-dimensional data is hard to visualize and expensive to process. PCA finds the directions of maximum variance and projects data onto them.

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

Compute covariance matrix `C = (1/n) X^T X`. Find eigenvalues/eigenvectors. Project onto top-k eigenvectors. Variance explained = eigenvalue / sum(eigenvalues).

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Eigenvalues](../../../math/linear-algebra/eigenvalues.md) — The core math
- [t-SNE](t-sne.md) — Non-linear alternative
- [Autoencoder](autoencoder.md) — Neural network version
