---
title: "Multi-Layer Perceptron & Backpropagation"
category: ai-ml/deep-learning/fundamentals
tags: [mlp, backpropagation, neural-network, gradient, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Backprop: Rumelhart, Hinton, Williams (1986). The key insight: use the chain rule to compute gradients layer by layer, from output back to input. This made deep networks trainable.

## Why It Exists

A single perceptron can't learn XOR. Stack multiple layers → can learn any function (universal approximation theorem). But how to train? Backpropagation.

## How It Works

### Visual Intuition

<!-- 3B1B-style animation description -->

### Step by Step

<!-- Algorithm walkthrough -->

## Code

```python
# Implementation sketch
```

## The Math Inside

Forward: `z = Wx + b, a = σ(z)`. Loss: `L = f(y, ŷ)`. Backward: `∂L/∂W = ∂L/∂a · ∂a/∂z · ∂z/∂W` (chain rule). Update: `W = W - α · ∂L/∂W`.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Perceptron](perceptron.md) — The single-layer predecessor
- [Chain Rule](../../../math/calculus/chain-rule.md) — The math that makes backprop work
- [Gradient Descent](../../../math/optimization/gradient-descent.md) — The optimization method
- [CNN](../architectures/cnn.md) — Backprop applied to images
- [Transformer](../architectures/transformer.md) — Modern architecture, same training principle
