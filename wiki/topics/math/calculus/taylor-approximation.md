---
title: "Taylor Approximation"
category: math/calculus
tags: [calculus, taylor, approximation, second-order]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want a simple local approximation of a complicated function near one point.
First-order Taylor gives a line, second-order gives a parabola, and that is why
it shows up in gradient methods, Newton-style optimization, and XGBoost's
second-order objective approximations.

## Why It Exists

The "why" chain is:

- Real functions can be messy.
- But locally, smooth curves often look much simpler.
- If we know derivatives at one point, we know local slope and curvature.
- So we replace a hard function with an easier polynomial nearby.

Taylor approximation exists because local shape is often enough to choose a good
step, estimate a change, or simplify optimization.

## Visual Intuition

Imagine zooming in on a smooth curve.

- from far away, it looks complicated
- zoom in once, and it starts to look like a straight line
- zoom in more, and a simple parabola may capture the bend

That is the core idea:

- first derivative captures tilt
- second derivative captures curvature

In ML, that local picture is often enough to guide an optimizer.

## How It Works

1. Pick an expansion point `a`
2. Compute derivatives of the function at `a`
3. Build a polynomial using those derivatives
4. Use that polynomial only near `a`

The more terms you keep, the more accurate the approximation can become near the
expansion point.

## The Math

Taylor expansion around `a`:

`f(x) ~= f(a) + f'(a)(x-a) + (1/2)f''(a)(x-a)^2 + ...`

- `f(a)`: value at the anchor point
- `f'(a)`: slope
- `f''(a)`: curvature

Important special cases:

- first-order Taylor: `f(x) ~= f(a) + f'(a)(x-a)`
- second-order Taylor: add the quadratic curvature term

Why ML cares:

- gradient descent uses the first-order local slope
- Newton's method uses curvature information too
- XGBoost uses second-order Taylor expansion of the loss for fast tree updates

## Examples

For `e^x` around `x = 0`:

- `e^0 = 1`
- `(e^x)' at 0 = 1`
- `(e^x)'' at 0 = 1`

So near zero:

`e^x ~= 1 + x + x^2/2`

That approximation is not exact everywhere, but it is very useful near the
expansion point.

## Code

```python
import math


def taylor_exp_near_zero(x):
    return 1 + x + (x**2) / 2


approx = taylor_exp_near_zero(0.1)
exact = math.exp(0.1)
```

## Used In

- [Gradient Boosting](../../ai-ml/supervised/classification/gradient-boosting.md) — XGBoost uses 2nd order
- [Convex Optimization](../optimization/convex-optimization.md) — Newton's method
