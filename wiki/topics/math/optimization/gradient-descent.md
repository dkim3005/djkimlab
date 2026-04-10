---
title: "Gradient Descent"
category: math/optimization
tags: [optimization, gradient-descent, sgd, learning-rate]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have a loss function I want to minimize, but solving for the minimum directly
is hard, expensive, or impossible. This is the default training loop behind
linear regression, neural networks, and most modern ML systems.

## Why It Exists

The "why" chain is:

- A model is only useful if we can measure how wrong it is.
- Once we have a loss, we need a way to reduce it.
- Closed-form solutions are rare once models get bigger.
- Local slope tells us which small move increases loss.
- So we step in the opposite direction.

Gradient descent exists because "follow the downhill direction" scales farther
than symbolic algebra.

## Visual Intuition

Picture a ball on a smooth bowl. At any point on the bowl, the gradient is the
direction of steepest ascent. If you want the ball to go down instead, move in
the negative gradient direction.

In the linear regression demo, the bowl is not drawn directly. Instead, you see
its effect: the line parameters move in the direction that lowers MSE.

-> [Interactive Demo: Linear Regression](/projects/mlviz/linear-regression)

## How It Works

1. Start with current parameters, for example `w` and `b`
2. Compute the gradient of the loss with respect to those parameters
3. Multiply that gradient by a learning rate
4. Subtract the result from the current parameters
5. Repeat until loss stops improving enough

The learning rate controls step size:

- too small -> slow progress
- too large -> overshoot or diverge

## The Math Inside

Generic update rule:

`theta_next = theta - alpha * grad(L(theta))`

- `theta`: parameter vector
- `L(theta)`: loss as a function of the parameters
- `grad(L(theta))`: gradient, the multi-dimensional slope
- `alpha`: learning rate

For linear regression with `y_hat = wx + b` and MSE:

`dL/dw = (2/n) * sum((wx_i + b - y_i) * x_i)`

`dL/db = (2/n) * sum(wx_i + b - y_i)`

Then update:

`w <- w - alpha * dL/dw`

`b <- b - alpha * dL/db`

This is the core loop of learning: compute error, compute gradient, step
downhill.

## Examples

If the loss surface is a simple bowl, gradient descent walks down to the bottom.
If the surface is long and narrow, it zig-zags. If it is noisy, mini-batches
and optimizer variants like momentum or Adam help smooth the path.

## Code

```python
theta = 5.0
learning_rate = 0.1

for _ in range(20):
    gradient = 2 * (theta - 1)  # derivative of (theta - 1)^2
    theta = theta - learning_rate * gradient
```

## Used In

- [Optimization (SGD → Adam)](../../ai-ml/foundations/optimization.md) — Variants and improvements
- [MLP & Backprop](../../ai-ml/deep-learning/fundamentals/mlp-backprop.md) — Where gradients come from
- [Loss Functions](../../ai-ml/foundations/loss-functions.md) — What we're minimizing
- [Derivatives & Gradients](../calculus/derivatives-gradient.md) — The math behind it
