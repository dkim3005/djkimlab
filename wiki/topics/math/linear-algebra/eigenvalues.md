---
title: "Eigenvalues & Eigenvectors"
category: math/linear-algebra
tags: [linear-algebra, eigenvalue, eigenvector, decomposition]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to understand which directions of a transformation are special. In ML,
this matters most in PCA, where eigenvectors define the principal directions and
eigenvalues measure how much variance each direction captures.

## Why It Exists

The "why" chain is:

- A matrix can rotate, stretch, or squash space.
- Most directions get mixed together under that transformation.
- But a few directions may stay on the same line.
- Those special directions reveal the matrix's structure.

Eigenvalues and eigenvectors exist because transformations become much easier to
understand when you find their natural directions.

## Visual Intuition

Imagine a cloud of vectors transformed by a matrix.

- most arrows change both length and direction
- a few rare arrows only stretch or shrink without turning

Those rare arrows are eigenvectors. Their stretch factors are eigenvalues.

That is exactly why PCA cares about them: PCA wants the directions where data
spread is largest, and those directions fall out of the covariance matrix as
eigenvectors.

## The Math Inside

For a square matrix `A`, an eigenvector `v` and eigenvalue `lambda` satisfy

`A v = lambda v`

- `v != 0`
- applying `A` to `v` only rescales it

Interpretation:

- if `lambda > 1`, the direction is stretched
- if `0 < lambda < 1`, it is shrunk
- if `lambda < 0`, it flips direction as well

In PCA, `A` is the covariance matrix.

- eigenvectors -> principal directions
- eigenvalues -> variance captured along those directions

Sorting eigenvalues from largest to smallest tells us which components are most
important.

## Examples

If

`A = [[3, 0], [0, 1]]`

then the x-axis and y-axis are already eigenvector directions.

- `[1, 0]` is scaled by `3`
- `[0, 1]` is scaled by `1`

So this matrix stretches one axis more than the other.

## Code

```python
import numpy as np

A = np.array([[3.0, 0.0], [0.0, 1.0]])
eigenvalues, eigenvectors = np.linalg.eig(A)
```

## Used In

- [PCA](../../ai-ml/unsupervised/dimensionality-reduction/pca.md) — Eigenvectors = principal components
- [Matrix Decomposition](matrix-decomposition.md) — Eigendecomposition, SVD
- [Vectors & Matrices](vectors-matrices.md) — Prerequisites
