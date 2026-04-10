---
title: "Dot Product & Projection"
category: math/linear-algebra
tags: [linear-algebra, dot-product, cosine-similarity, projection]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to measure alignment between vectors, compute projections, or express a
linear score compactly. The dot product sits inside linear models, SVMs,
attention, cosine similarity, and many matrix operations.

## Why It Exists

The "why" chain is:

- Vectors can point in different directions.
- We want one operation that captures both magnitude and alignment.
- We also want a way to project one vector onto another.
- The dot product gives both.

It exists because geometry in vector space needs a compact notion of
"how much one vector points along another."

## Visual Intuition

Imagine shining vector `a` onto the direction of vector `b`.

- if they point the same way, the dot product is large and positive
- if they are perpendicular, the dot product is `0`
- if they point opposite ways, the dot product is negative

That is why a linear classifier can use `w . x + b` as a score: it measures how
aligned the input `x` is with the learned direction `w`.

## The Math Inside

Coordinate form:

`a . b = sum a_i b_i`

Geometric form:

`a . b = ||a|| ||b|| cos(theta)`

These two formulas describe the same quantity.

Key implications:

- `a . b > 0` -> vectors point in a broadly similar direction
- `a . b = 0` -> vectors are orthogonal
- `a . b < 0` -> vectors point against each other

Projection idea:

If `w` is a classifier direction, then `w . x` tells you how far `x` extends
along `w`. SVM margins and linear boundaries are built on exactly this idea.

## Examples

If `a = [1, 2]` and `b = [3, 4]`, then

`a . b = 1*3 + 2*4 = 11`

If `a = [1, 0]` and `b = [0, 1]`, then

`a . b = 0`

So those vectors are perpendicular.

## Code

```python
def dot(a, b):
    return sum(x * y for x, y in zip(a, b))
```

## Used In

- [Transformer](../../ai-ml/deep-learning/architectures/transformer.md) — Attention = dot product
- [SVM](../../ai-ml/supervised/classification/svm.md) — Kernel = dot product in high-D
- [CNN](../../ai-ml/deep-learning/architectures/cnn.md) — Convolution ≈ sliding dot product
- [k-NN](../../ai-ml/supervised/classification/knn.md) — Distance functions
