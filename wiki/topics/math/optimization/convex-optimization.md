---
title: "Convex Optimization"
category: math/optimization
tags: [optimization, convex, global-minimum]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want optimization problems that are mathematically well-behaved. Convex
objectives matter because local improvements are trustworthy: if the problem is
convex, a local minimum is already the global minimum. That is why this topic is
central for linear models, logistic regression, and SVMs.

## Why It Exists

The "why" chain is:

- Training usually means minimizing a loss.
- But many losses have many hills and valleys.
- If the landscape is convex, there is no deceptive local valley.
- Then optimization becomes much easier to reason about.

Convex optimization exists because not all minimization problems are equally
hard, and convexity marks the ones where the theory becomes clean.

## Visual Intuition

Picture a smooth bowl.

- anywhere you stand, downhill leads toward the same bottom
- there are no fake valleys that trap you away from the best answer

That is the geometric comfort convexity gives you.

By contrast, deep neural networks usually look more like a mountain range than a
single bowl.

## How It Works

1. Define an objective `f(x)` to minimize
2. Check whether the objective is convex
3. If there are constraints, check whether the feasible set is convex too
4. Use optimization methods such as gradient descent, projected methods, or dual methods

When objective and constraints are convex, theory becomes much stronger:

- local minimum = global minimum
- many algorithms have convergence guarantees

## The Math

Convexity means that for any `x`, `y`, and `0 <= lambda <= 1`:

`f(lambda x + (1-lambda)y) <= lambda f(x) + (1-lambda)f(y)`

Interpretation:

- the function lies below the straight line connecting two points on its graph

Key consequence:

- any local minimum is also a global minimum

Examples in ML:

- least squares is convex
- logistic regression negative log-likelihood is convex
- hard and soft-margin SVM formulations are convex

## Examples

`f(x) = x^2` is convex.

- if you move away from zero in either direction, the value rises
- there is only one minimum, at `x = 0`

That is why gradient descent on this function is boring in a good way.

## Code

```python
def f(x):
    return x * x


def grad_f(x):
    return 2 * x
```

## Used In

- [Gradient Descent](gradient-descent.md) — The main algorithm
- [SVM](../../ai-ml/supervised/classification/svm.md) — Convex optimization problem
- [Linear Regression](../../ai-ml/supervised/regression/linear-regression.md) — Convex loss
