---
title: "Support Vector Machine (SVM)"
category: ai-ml/supervised/classification
tags: [classification, svm, kernel, margin, supervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need a strong classifier with a clean geometric interpretation, especially on
small or medium-sized structured datasets. SVMs are useful when the boundary
should be robust, not just merely correct on the training data.

## History

Vapnik & Cortes (1992). Based on statistical learning theory. Dominated ML before deep learning. Mathematically one of the most elegant classifiers.

## Why It Exists

The "why" chain is:

- A perceptron can find a separating boundary if one exists.
- But many separating boundaries may exist.
- Some boundaries pass dangerously close to the data.
- We want the boundary with the widest safety margin.

SVM exists because "any separator" is weaker than "the separator with the best
margin."

## How It Works

### Visual Intuition

Imagine two classes separated by many possible lines. The SVM does not choose
the first line that works. It chooses the line that leaves the widest empty band
between the classes.

Only a few training points actually touch that band. Those points are the
support vectors. They are the examples that define the boundary.

The timeline node for this era is already wired here:

-> [MLViz Node: SVM](/projects/mlviz/svm)

### Step by Step

1. Represent the boundary as `w . x + b = 0`
2. Require positive examples to be on one side and negative examples on the other
3. Among all valid separators, choose the one with maximum margin
4. Solve the resulting constrained optimization problem
5. For nonlinear cases, replace dot products with a kernel

The key shift is from "fit a classifier" to "solve a geometry problem under
constraints."

## Code

```python
# Concept sketch:
# model = SVC(kernel="linear", C=1.0)
# model.fit(X_train, y_train)
# y_pred = model.predict(X_test)
```

## The Math Inside

Hard-margin SVM:

maximize the margin

`margin = 2 / ||w||`

subject to

`y_i (w . x_i + b) >= 1`

- `w`: normal vector to the boundary
- `b`: bias
- `y_i in {-1, +1}`: class labels
- the constraints force every point to be on the correct side of the margin

Equivalent optimization form:

`min (1/2) ||w||^2`

subject to the same constraints.

Why minimize `||w||^2`? Because a smaller `||w||` means a larger margin.

Kernel trick:

`K(x, z) = phi(x) . phi(z)`

This lets SVM behave as if it mapped points into a higher-dimensional feature
space without explicitly constructing that space.

## Math Prerequisites

- [Dot Product](../../../math/linear-algebra/dot-product.md) - why hyperplanes and kernels are written with `w . x`
- [Lagrange Multipliers](../../../math/optimization/lagrange-multipliers.md) - how the constrained problem is solved
- [Constrained Optimization](../../../math/optimization/constrained-optimization.md) - margin constraints and dual form
- [Convex Optimization](../../../math/optimization/convex-optimization.md) - why SVM has a clean global optimum

## Related

- [Logistic Regression](logistic-regression.md) — Probabilistic alternative
- [Lagrange Multipliers](../../../math/optimization/lagrange-multipliers.md) — How SVM is solved
- [Dot Product](../../../math/linear-algebra/dot-product.md) — Why kernels work
- [Perceptron](../../deep-learning/fundamentals/perceptron.md) — SVM's simpler ancestor
