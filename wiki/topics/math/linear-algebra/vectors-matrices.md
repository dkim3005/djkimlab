---
title: "Vectors & Matrices"
category: math/linear-algebra
tags: [linear-algebra, vector, matrix, transformation]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need a basic language for representing data, parameters, and transformations.
One row of data is a vector. A whole dataset is often a matrix. Almost every ML
algorithm starts from that representation.

## Why It Exists

The "why" chain is:

- Real data has many features at once.
- One number is not enough to describe a data point.
- We need a compact object for many numbers together.
- We also need a way to transform many points at once.

Vectors and matrices exist because ML is mostly geometry and linear algebra
written in compact form.

## Visual Intuition

Think of a vector as one point or one arrow in space.

- one customer profile can be a vector
- one image can be a long vector of pixel values
- a full dataset can be stacked into a matrix

A matrix can also be viewed as a machine that transforms vectors: rotate them,
scale them, project them, or mix their coordinates.

## The Math Inside

A vector is an ordered list of numbers:

`x = [x_1, x_2, ..., x_n]`

A matrix is a rectangular grid of numbers:

`X in R^(m x n)`

- `m`: number of rows, often samples
- `n`: number of columns, often features

Common interpretations:

- one row of `X`: one sample
- one column of `X`: one feature across all samples

Matrix-vector multiplication:

`y = A x`

This means the matrix `A` transforms vector `x` into a new vector `y`.

That single pattern covers linear regression, neural-network layers, PCA, and
many other models.

## Examples

- tabular dataset with 100 rows and 5 features -> matrix of shape `100 x 5`
- one embedding with 768 numbers -> vector in `R^768`
- one dense layer in a neural network -> matrix multiply plus bias

## Code

```python
import numpy as np

X = np.array([[1.0, 2.0], [3.0, 4.0]])
x = np.array([5.0, 6.0])
y = X @ x
```

## Used In

- [MLP & Backprop](../../ai-ml/deep-learning/fundamentals/mlp-backprop.md) — Forward pass = matrix multiply
- [PCA](../../ai-ml/unsupervised/dimensionality-reduction/pca.md) — Covariance matrix
- [Dot Product](dot-product.md) — The most important operation
