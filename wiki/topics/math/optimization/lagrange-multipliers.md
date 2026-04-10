---
title: "Lagrange Multipliers"
category: math/optimization
tags: [optimization, lagrange, constrained, svm]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to optimize an objective, but I am not free to move anywhere. Equality
constraints such as `g(x, y) = c` define an allowed surface, and I need the best
point on that surface.

## Why It Exists

The "why" chain is:

- Optimization often has rules or constraints.
- Solving only the objective ignores those rules.
- Solving only the constraint ignores the objective.
- We need a way to make both speak at once.

Lagrange multipliers exist to encode "optimize this, but only along that
constraint."

## Visual Intuition

Imagine contour lines of an objective function touching a constraint curve.
At the best constrained point, you cannot improve the objective by moving along
the constraint anymore.

Geometrically, that means the gradient of the objective and the gradient of the
constraint line up. One pushes against the other.

## How It Works

1. Write the objective `f(x)`
2. Write the constraint `g(x) = c`
3. Build the Lagrangian
4. Differentiate with respect to both the original variables and the multiplier
5. Solve the resulting system

The multiplier `lambda` acts like the price of satisfying the constraint.

## The Math Inside

For objective `f(x, y)` with equality constraint `g(x, y) = c`, define

`L(x, y, lambda) = f(x, y) - lambda (g(x, y) - c)`

Then solve

`dL/dx = 0`

`dL/dy = 0`

`dL/dlambda = 0`

Equivalent geometric statement:

`grad(f) = lambda grad(g)`

This means the objective gradient is parallel to the constraint gradient at the
optimum.

That pattern is the gateway to dual optimization, which is exactly what SVM
uses.

## Examples

Maximize `f(x, y) = xy` subject to `x + y = 10`.

Lagrangian:

`L = xy - lambda (x + y - 10)`

Differentiating gives:

- `dL/dx = y - lambda = 0`
- `dL/dy = x - lambda = 0`
- `x + y = 10`

So `x = y = 5`, which gives the constrained optimum.

## Code

```python
# symbolic sketch:
# L = f(x, y) - lambda * (g(x, y) - c)
# solve dL/dx = 0, dL/dy = 0, dL/dlambda = 0
```

## Used In

- [SVM](../../ai-ml/supervised/classification/svm.md) — The main application
- [Constrained Optimization](constrained-optimization.md) — The general framework
- [Convex Optimization](convex-optimization.md) — SVM is convex
