---
title: "Optimization: SGD → Momentum → Adam"
category: ai-ml/foundations
tags: [optimization, sgd, adam, momentum, learning-rate, fundamentals]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I know my model and loss already. The next question is how to move the
parameters efficiently through a noisy high-dimensional loss surface. This page
is about the practical optimizers that turn gradients into trainable systems.

## History

SGD is the oldest (Robbins & Monro, 1951). Momentum (Polyak, 1964). Adam (Kingma & Ba, 2015). Adam is now the default for most deep learning.

## Why It Exists

Gradient descent is slow in practice — ravines, saddle points, noisy gradients. Each successor adds a trick to navigate the loss landscape faster.

## How It Works

### Visual Intuition

Imagine descending a long ravine:

- plain SGD jitters because each minibatch gives a noisy slope
- momentum acts like velocity that smooths the path
- Adam rescales each parameter step using running estimates of past gradients

All three are still "go downhill," but they disagree on how to trust the local
signal.

### Step by Step

1. Sample a minibatch of training data
2. Compute the gradient of the loss
3. Update running state if the optimizer has one
4. Convert gradient plus state into a parameter step
5. Repeat across many minibatches and epochs

## Code

```python
for x_batch, y_batch in loader:
    loss = model(x_batch, y_batch)
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
```

## The Math Inside

SGD:

`theta = theta - alpha grad(L)`

Momentum:

`v_t = beta v_{t-1} + grad(L)`

`theta = theta - alpha v_t`

Adam keeps moving averages of first and second moments:

`m_t = beta_1 m_{t-1} + (1-beta_1) g_t`

`v_t = beta_2 v_{t-1} + (1-beta_2) g_t^2`

Then it scales each parameter step by roughly `m_t / sqrt(v_t)`.

Interpretation:

- SGD is the clean baseline
- momentum remembers direction
- Adam adapts step sizes per parameter and usually works better out of the box

## Math Prerequisites

- [Gradient Descent](../../math/optimization/gradient-descent.md) - the core update rule
- [Derivatives & Gradients](../../math/calculus/derivatives-gradient.md) - where the update direction comes from
- [MLP & Backprop](../deep-learning/fundamentals/mlp-backprop.md) - how deep models produce gradients

## Related

- [Gradient Descent](../../math/optimization/gradient-descent.md) — The foundation
- [Loss Functions](loss-functions.md) — What we're optimizing
- [MLP & Backprop](../deep-learning/fundamentals/mlp-backprop.md) — Where optimization happens
