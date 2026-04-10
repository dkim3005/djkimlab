---
title: "Principal Component Analysis (PCA)"
category: ai-ml/unsupervised/dimensionality-reduction
tags: [dimensionality-reduction, pca, eigenvalue, unsupervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have many features and I want a smaller representation that still preserves
most of the structure. PCA is useful for 2D/3D visualization, noise reduction,
feature compression, and preprocessing before clustering or other models.

## History

Karl Pearson (1901), Harold Hotelling (1933). Over 120 years old and still one of the most used techniques in data science.

## Why It Exists

The "why" chain is:

- High-dimensional data is hard to see and hard to compute with.
- Some directions in feature space matter much more than others.
- We want to keep the informative directions and discard the weak ones.
- Variance gives a way to measure which directions are carrying structure.

PCA exists because projection is only useful if we project onto the right axes.

## How It Works

### Visual Intuition

Imagine a cloud of points stretched diagonally across a plane.

- the original x-axis and y-axis are not the best summary
- PCA rotates to a new axis that follows the longest spread
- projecting onto that axis keeps most of the information with fewer dimensions

The timeline node is already wired here:

-> [MLViz Node: PCA](/projects/mlviz/pca)

### Step by Step

1. Center the data by subtracting the mean
2. Compute the covariance matrix
3. Find eigenvectors and eigenvalues of that covariance matrix
4. Sort directions by eigenvalue size
5. Project data onto the top `k` directions

Those top directions are the principal components.

## Code

```python
X_centered = X - X.mean(axis=0)
C = X_centered.T @ X_centered / len(X_centered)
eigenvalues, eigenvectors = eig(C)
X_reduced = X_centered @ eigenvectors[:, :k]
```

## The Math Inside

If `X` is mean-centered data, the covariance matrix is

`C = (1/n) X^T X`

Then solve

`C v = lambda v`

- `v`: eigenvector, a direction in feature space
- `lambda`: eigenvalue, how much variance lies along that direction

The principal components are the eigenvectors with the largest eigenvalues.

Projection onto the top `k` components:

`X_reduced = X V_k`

Explained variance ratio:

`lambda_i / sum_j lambda_j`

So PCA is really "find the directions where the data varies most, then keep
those directions."

## Math Prerequisites

- [Vectors & Matrices](../../../math/linear-algebra/vectors-matrices.md) - data matrix representation
- [Eigenvalues & Eigenvectors](../../../math/linear-algebra/eigenvalues.md) - the core idea behind principal directions
- [Matrix Decomposition](../../../math/linear-algebra/matrix-decomposition.md) - PCA can also be computed via SVD

## Related

- [Eigenvalues](../../../math/linear-algebra/eigenvalues.md) — The core math
- [t-SNE](t-sne.md) — Non-linear alternative
- [Autoencoder](autoencoder.md) — Neural network version
