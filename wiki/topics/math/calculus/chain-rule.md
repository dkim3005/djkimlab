---
title: "Chain Rule"
category: math/calculus
tags: [calculus, chain-rule, backpropagation, composition]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

One quantity depends on another quantity, which depends on another one again.
That nested dependency structure appears everywhere in neural networks because
each layer is a function of the previous layer.

## Why It Exists

The "why" chain is:

- Real systems are built from stages, not one flat equation.
- If the output changes, we want to know which earlier stage caused it.
- A derivative through one stage is not enough.
- We need a rule for composed functions.

The chain rule exists to let local changes flow through a pipeline of
transformations.

## Visual Intuition

Imagine a pipeline:

`x -> u -> y`

If changing `x` changes `u`, and changing `u` changes `y`, then changing `x`
must change `y` through both links. The total effect is the product of those
local effects.

That is exactly what backprop does in a neural net: the output error flows back
through one layer, then the one before it, then the one before that.

## How It Works

1. Break the computation into intermediate variables
2. Differentiate each local step
3. Multiply the local derivatives along the path
4. If multiple paths contribute, add those contributions

This is why neural-network implementations store intermediate values from the
forward pass: the backward pass needs them.

## The Math Inside

For one-variable composition

`y = f(g(x))`

the derivative is

`dy/dx = (dy/dg) * (dg/dx)`

For a slightly bigger example, if

`u = 3x + 1`

`y = u^2`

then

`dy/du = 2u`

`du/dx = 3`

so

`dy/dx = 2u * 3 = 2(3x + 1) * 3`

In multivariable settings, the same logic applies with partial derivatives.
That is the version used by backpropagation.

## Examples

Suppose

`z = sigmoid(w x + b)`

and the loss depends on `z`. To find `dL/dw`, you do not differentiate the whole
expression from scratch every time. You chain the parts:

`dL/dw = dL/dz * dz/d(wx+b) * d(wx+b)/dw`

That pattern is the core of deep learning.

## Code

```python
def chain_rule_example(x):
    u = 3 * x + 1
    y = u ** 2
    dy_du = 2 * u
    du_dx = 3
    return dy_du * du_dx
```

## Used In

- [MLP & Backprop](../../ai-ml/deep-learning/fundamentals/mlp-backprop.md) — Backprop = chain rule
- [RNN / LSTM](../../ai-ml/deep-learning/architectures/rnn-lstm.md) — Vanishing gradients = chain rule applied too many times
- [Derivatives & Gradients](derivatives-gradient.md) — Prerequisites
