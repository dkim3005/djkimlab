---
title: "Matrix Decomposition (SVD, Eigendecomposition)"
category: math/linear-algebra
tags: [linear-algebra, svd, eigendecomposition, factorization]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want to break a complicated matrix into simpler, interpretable parts. This is
useful in PCA, latent-factor models, numerical stability, and any setting where
I want to understand a transformation as "rotate, scale, rotate" rather than as
one opaque block of numbers.

## Why It Exists

The "why" chain is:

- A matrix can hide a lot of structure.
- Raw entries do not tell us which directions matter.
- Simpler pieces can reveal principal directions, scales, and low-rank structure.
- So we factor the matrix into parts with clearer meaning.

Matrix decomposition exists because understanding the pieces is often much
easier than understanding the full matrix directly.

## Visual Intuition

Imagine applying a matrix to a shape in space.

- first the shape rotates
- then it stretches differently along special axes
- then it rotates again

SVD turns that intuition into algebra.

For symmetric matrices like covariance matrices, eigendecomposition plays a
similar role by identifying the natural directions of the transformation.

## How It Works

1. Start with a matrix `A`
2. Choose the right decomposition family for the matrix type
3. Interpret the factors as directions and scales
4. Keep only the most important components if compression is the goal

Two common cases:

- eigendecomposition for square matrices with enough eigenvectors
- SVD for any real matrix

## The Math

Eigendecomposition:

`A = Q Lambda Q^-1`

- `Q`: eigenvectors
- `Lambda`: diagonal matrix of eigenvalues

SVD:

`A = U Sigma V^T`

- `U`: left singular vectors
- `Sigma`: singular values
- `V^T`: right singular vectors

Why ML cares:

- PCA can be computed with eigendecomposition of covariance or directly with SVD
- low-rank approximation keeps only the largest singular values
- latent factors in recommendation systems often come from matrix factorization

## Examples

If a data matrix mostly varies along two strong directions, SVD will produce:

- two large singular values
- many much smaller ones

That immediately tells us the data can be compressed well into two dimensions.

## Code

```python
import numpy as np


A = np.array([[3.0, 1.0], [1.0, 3.0]])
U, S, VT = np.linalg.svd(A)
```

## Used In

- [PCA](../../ai-ml/unsupervised/dimensionality-reduction/pca.md) — PCA via SVD
- [Eigenvalues](eigenvalues.md) — The building blocks
