---
title: "Derivatives & Gradients"
category: math/calculus
tags: [calculus, derivative, gradient, slope]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to answer, "if I change this parameter a tiny bit, what happens?" That
question shows up everywhere in ML because learning is just repeated parameter
updates.

## Why It Exists

The "why" chain is:

- A model has parameters.
- Parameters affect predictions.
- Predictions affect loss.
- To reduce loss, we need local sensitivity.
- The derivative is that local sensitivity.

In one dimension you get a derivative. In many dimensions you get a gradient
vector. That vector points uphill, so optimization moves the other way.

## Visual Intuition

For a 1D curve, the derivative is the slope of the tangent line at one point.
Positive means the curve is rising to the right. Negative means it is falling.

For a 2D or higher-dimensional surface, you cannot summarize local change with
one number. You need one partial derivative per axis. Stack those together and
you get the gradient vector.

In the linear regression demo, the two axes of that parameter space are `w` and
`b`. The gradient tells you how changing each one will change loss.

-> [Interactive Demo: Linear Regression](/projects/mlviz/linear-regression)

## The Math Inside

For a scalar function `f(x)`, the derivative is:

`f'(x) = lim(h -> 0) (f(x + h) - f(x)) / h`

This is the instantaneous rate of change.

For a multivariable function `f(x_1, x_2, ..., x_n)`, the gradient is:

`grad(f) = [df/dx_1, df/dx_2, ..., df/dx_n]`

Each component answers a separate question:

- if only `x_1` changes, how fast does `f` change?
- if only `x_2` changes, how fast does `f` change?
- and so on

For linear regression, the loss is a function of `w` and `b`:

`L(w, b) = (1/n) * sum((y_i - (wx_i + b))^2)`

So the gradient is:

`grad(L) = [dL/dw, dL/db]`

That is the object used by gradient descent.

## Examples

If `f(x) = x^2`, then `f'(x) = 2x`.

- at `x = 3`, the slope is `6`
- at `x = 0`, the slope is `0`
- at `x = -2`, the slope is `-4`

So the derivative tells you both direction and steepness.

## Code

```python
def derivative_of_square(x):
    return 2 * x

def gradient_of_quadratic(x, y):
    # f(x, y) = x^2 + 3y^2
    return (2 * x, 6 * y)
```

## Used In

- [Gradient Descent](../optimization/gradient-descent.md) — Following the gradient
- [MLP & Backprop](../../ai-ml/deep-learning/fundamentals/mlp-backprop.md) — Computing gradients
- [Partial Derivatives](partial-derivatives.md) — Gradients are vectors of partials
