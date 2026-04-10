---
title: "Partial Derivatives"
category: math/calculus
tags: [calculus, partial-derivative, multivariable]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have a function with many inputs or many model parameters, and I need to know
how the output changes with respect to just one of them while the others stay
fixed.

## Why It Exists

The "why" chain is:

- ML losses depend on many parameters at once.
- One total derivative is no longer enough.
- We need one local rate of change per parameter.
- Those local rates become the entries of the gradient.

Partial derivatives exist because modern models live in multivariable parameter
spaces, not on one-dimensional curves.

## Visual Intuition

Think of a surface over two axes, such as weight `w` and bias `b`.

- if you move only along the `w` direction, the slope you feel is `dL/dw`
- if you move only along the `b` direction, the slope you feel is `dL/db`

So a partial derivative is just "the slope in one chosen direction while the
other coordinates are frozen."

## How It Works

1. Choose one variable to differentiate with respect to
2. Treat all other variables as constants
3. Differentiate normally
4. Repeat for every variable you care about

Once you collect those partial derivatives into a vector, you have the
gradient.

## The Math Inside

If `f(x, y)` depends on two variables, then

`df/dx` means differentiate with respect to `x` while treating `y` as constant

`df/dy` means differentiate with respect to `y` while treating `x` as constant

Example:

`f(x, y) = x^2 y + 3y`

Then

`df/dx = 2xy`

`df/dy = x^2 + 3`

In linear regression, if

`L(w, b) = (y - (wx + b))^2`

then

`dL/dw = -2x (y - (wx + b))`

`dL/db = -2 (y - (wx + b))`

These are exactly the pieces gradient descent uses to update `w` and `b`.

## Examples

Neural networks may have millions or billions of parameters. Backpropagation is
just an efficient way to compute the partial derivative of the loss with respect
to each one.

## Code

```python
def partials(x, y):
    dfdx = 2 * x * y
    dfdy = x * x + 3
    return dfdx, dfdy
```

## Used In

- [Gradient Descent](../optimization/gradient-descent.md) — Gradient = vector of partial derivatives
- [Derivatives & Gradients](derivatives-gradient.md) — Single-variable version
- [MLP & Backprop](../../ai-ml/deep-learning/fundamentals/mlp-backprop.md) — One partial derivative per parameter
