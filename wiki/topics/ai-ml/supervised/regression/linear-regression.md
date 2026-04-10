---
title: "Linear Regression"
category: ai-ml/supervised/regression
tags: [regression, linear, least-squares, supervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have input features and want to predict a number: price, temperature, demand,
delivery time, score, or trend. The relationship does not need to be perfectly
linear, but it should be linear enough that "one weighted sum plus a bias" is a
useful first approximation.

## History

Legendre (1805) and Gauss (1809) independently developed the method of least squares. The oldest ML algorithm — over 200 years old.

## Why It Exists

You look at a scatter plot and think, "there is a pattern here." The problem is
that eyeballing a line is inconsistent.

The "why" chain is:

- Data has a trend, but hand-drawn rules are vague.
- We need one line that summarizes the trend.
- We need a score for "how wrong" that line is.
- That score becomes **Mean Squared Error (MSE)**.
- Once the score exists, we can search for the line that minimizes it.

That is why linear regression is the entry point for so much of ML: it turns a
visual guess into an optimization problem.

## How It Works

### Visual Intuition

Imagine twelve points scattered across a chart. A line starts out badly tilted,
missing almost every point. Each point has a vertical residual: how far the
line's prediction is from reality. Training means nudging the slope and
intercept so those residuals shrink together.

See that process live here:

-> [Interactive Demo: Linear Regression](/projects/mlviz/linear-regression)

### Step by Step

1. Assume the model is a line: `y_hat = wx + b`
2. For each data point, compare the prediction `y_hat` to the true value `y`
3. Square each error so large misses hurt more
4. Average them to get MSE
5. Adjust `w` and `b` to reduce that MSE

For small textbook cases, you can solve this directly with the normal equation.
For bigger models and modern ML, the same idea is optimized iteratively with
[Gradient Descent](../../../math/optimization/gradient-descent.md).

## Code

```python
xs = [1, 2, 3, 4]
ys = [2, 3, 5, 7]

w = 0.0
b = 0.0
lr = 0.01

for _ in range(1000):
    dw = 0.0
    db = 0.0
    n = len(xs)
    for x, y in zip(xs, ys):
        y_hat = w * x + b
        error = y_hat - y
        dw += (2 / n) * error * x
        db += (2 / n) * error
    w -= lr * dw
    b -= lr * db
```

## The Math Inside

The model:

`y_hat = wx + b`

- `x`: input feature
- `w`: slope or weight
- `b`: intercept or bias
- `y_hat`: predicted value

The loss:

`L(w, b) = (1/n) * sum((y_i - (wx_i + b))^2)`

- `n`: number of data points
- `y_i`: true target for point `i`
- `wx_i + b`: prediction for point `i`
- squaring: punishes bigger misses and keeps the objective smooth

Why does this formula matter?

- It converts "fit the best line" into "minimize one scalar value"
- Its derivatives tell us how to change `w` and `b`
- Those derivatives are exactly what gradient descent follows

Closed-form least squares also exists:

`w = (X^T X)^(-1) X^T y`

That formula is elegant, but the bigger lesson is not the formula itself. The
bigger lesson is that learning can be framed as minimizing a loss.

## Math Prerequisites

- [Loss Functions](../../foundations/loss-functions.md) - why MSE is the score
- [Derivatives and Gradients](../../../math/calculus/derivatives-gradient.md) - how slope becomes a direction
- [Gradient Descent](../../../math/optimization/gradient-descent.md) - how the line is adjusted iteratively

## Related

- [Polynomial / Ridge / Lasso](polynomial-ridge-lasso.md) — When a line isn't enough
- [Gradient Descent](../../../math/optimization/gradient-descent.md) — Iterative alternative to normal equation
- [Logistic Regression](../classification/logistic-regression.md) — Classification version
