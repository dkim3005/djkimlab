---
title: "Loss Functions"
category: ai-ml/foundations
tags: [loss, mse, cross-entropy, hinge, fundamentals]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to define what "wrong" means for a model. The same prediction can be
judged differently depending on whether I care about numeric distance,
probability calibration, margin, or robustness to outliers.

## History

Each loss function encodes an assumption about the problem. Choosing the right one is as important as choosing the right model.

## Why It Exists

A model cannot train on vague feedback. It needs one scalar objective.

The "why" chain is:

- We need predictions.
- We need a way to score predictions.
- Different tasks define mistakes differently.
- So the model learns by minimizing a task-specific loss.

Loss functions exist because learning needs a target, not just a model.

## How It Works

### Visual Intuition

Imagine several candidate lines on the same scatter plot.

- A line with many small misses should score better than a line with a few huge misses.
- MSE makes huge misses hurt much more because the error is squared.
- That gives you a smooth surface gradient descent can follow.

See that directly in the linear regression demo:

-> [Interactive Demo: Linear Regression](/projects/mlviz/linear-regression)

### Step by Step

1. Make a prediction
2. Compare it to the true answer
3. Convert that comparison into a number
4. Average across the batch or dataset
5. Use the gradient of that loss to update parameters

## Code

```python
def mse(y_true, y_pred):
    errors = [(yt - yp) ** 2 for yt, yp in zip(y_true, y_pred)]
    return sum(errors) / len(errors)

def cross_entropy(y_true, y_prob):
    eps = 1e-9
    terms = [
        -(yt * math.log(yp + eps) + (1 - yt) * math.log(1 - yp + eps))
        for yt, yp in zip(y_true, y_prob)
    ]
    return sum(terms) / len(terms)
```

## The Math Inside

Common losses:

`MSE = (1/n) * sum((y_i - y_hat_i)^2)`

- best for many regression problems
- smooth and easy to differentiate
- large errors get punished heavily

`CrossEntropy = -(1/n) * sum(y_i * log(p_i))`

- common for probabilistic classification
- heavily punishes confident wrong predictions

`Hinge = max(0, 1 - y * score)`

- used in max-margin methods like SVM
- only cares once points violate the margin

For the first wiki bundle, the key object is MSE. It answers:

- which line fits best?
- how wrong is the current line?
- what gradient should training follow?

## Math Prerequisites

- [Derivatives and Gradients](../../math/calculus/derivatives-gradient.md) - how loss becomes a direction
- [Gradient Descent](../../math/optimization/gradient-descent.md) - how minimization happens in practice
- [Cross-Entropy](../../math/information-theory/cross-entropy.md) - deeper view for classification tasks

## Related

- [Cross-Entropy](../../math/information-theory/cross-entropy.md) — Information-theoretic view
- [Gradient Descent](../../math/optimization/gradient-descent.md) — How loss is minimized
- [Optimization (SGD → Adam)](optimization.md) — Which optimizer to use
