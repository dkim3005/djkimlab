---
title: "Autoencoder"
category: ai-ml/unsupervised/dimensionality-reduction
tags: [dimensionality-reduction, autoencoder, neural-network, unsupervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Hinton & Salakhutdinov (1986/2006). The idea: compress data through a bottleneck, then reconstruct it. What survives the bottleneck is the essential information.

## Why It Exists

PCA can only find linear relationships. An autoencoder uses neural networks for non-linear compression — it can learn much richer representations.

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

Encoder: `z = f(x)`, Decoder: `x' = g(z)`. Loss: `L = ||x - x'||^2`. Bottleneck z has fewer dimensions than x. Variational Autoencoder adds: `z ~ N(μ, σ)`.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [PCA](pca.md) — Linear version
- [MLP & Backprop](../../deep-learning/fundamentals/mlp-backprop.md) — How it trains
- [GAN](../../deep-learning/architectures/gan.md) — Alternative generative approach
- [Diffusion](../../deep-learning/architectures/diffusion.md) — Modern generative approach
