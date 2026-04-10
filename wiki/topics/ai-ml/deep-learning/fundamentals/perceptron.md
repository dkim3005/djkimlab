---
title: "Perceptron"
category: ai-ml/deep-learning/fundamentals
tags: [perceptron, neuron, binary-classification, history]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want the simplest possible learnable classifier: weighted inputs, one decision
boundary, one yes/no output. It is mostly a teaching model today, but it is the
right place to understand what a neuron is before adding depth, nonlinearities,
and backpropagation.

## History

Frank Rosenblatt (1958) at Cornell. Built a physical machine (Mark I Perceptron) that could learn to recognize shapes. The New York Times headline: 'New Navy Device Learns by Doing.' Killed by Minsky & Papert (1969) proving it can't learn XOR.

## Why It Exists

The "why" chain is:

- We want a machine that can make a yes/no decision from data.
- A weighted sum already gives a score.
- We can turn that score into a hard decision with a threshold.
- If the decision is wrong, adjust the weights toward the correct answer.

That is the perceptron: the smallest possible learning machine that still feels
like a neuron.

## How It Works

### Visual Intuition

Picture points on a plane with two classes. The perceptron draws one straight
line. Everything on one side becomes class `1`, everything on the other side
becomes class `0`.

Each input feature casts a weighted vote. The perceptron adds those votes and
fires only if the total passes a threshold.

This is powerful enough to separate many simple patterns, but not patterns like
XOR, where no single straight line can do the job.

### Step by Step

1. Start with weights `w` and bias `b`
2. Compute the score `z = w . x + b`
3. Apply a step function to get a hard prediction
4. Compare prediction to the true label
5. If wrong, shift the weights toward the correct class

The learning is local and simple: misclassified points push the boundary.

## Code

```python
def step(z):
    return 1 if z >= 0 else 0


def predict(x, w, b):
    z = sum(w_i * x_i for w_i, x_i in zip(w, x)) + b
    return step(z)


def update(x, y_true, w, b, alpha=0.1):
    y_pred = predict(x, w, b)
    error = y_true - y_pred
    w = [w_i + alpha * error * x_i for w_i, x_i in zip(w, x)]
    b = b + alpha * error
    return w, b
```

## The Math Inside

Prediction:

`y_hat = step(w . x + b)`

- `x`: input vector
- `w`: weight vector
- `b`: bias
- `step(.)`: returns `1` if the score is nonnegative, else `0`

Learning rule:

`w <- w + alpha (y - y_hat) x`

`b <- b + alpha (y - y_hat)`

Why does this work?

- if a positive point is predicted as `0`, the update pushes weights toward that point
- if a negative point is predicted as `1`, the update pulls weights away from that point

But there is a hard limit:

- the perceptron only learns linearly separable patterns
- XOR is the famous counterexample
- that limitation is exactly what leads to multi-layer networks

## Math Prerequisites

- [Dot Product](../../../math/linear-algebra/dot-product.md) - what `w . x` means geometrically
- [Logistic Regression](../../supervised/classification/logistic-regression.md) - a probabilistic linear classifier
- [MLP & Backprop](mlp-backprop.md) - what fixes the XOR limitation

## Related

- [MLP & Backprop](mlp-backprop.md) — Solves the XOR limitation
- [SVM](../../supervised/classification/svm.md) — Another linear classifier, but optimal
- [Timeline](../../history/timeline.md) — The full story
