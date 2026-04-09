---
title: "Convolutional Neural Network (CNN)"
category: ai-ml/deep-learning/architectures
tags: [cnn, convolution, image, computer-vision, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Yann LeCun (1989) — LeNet for digit recognition. Breakthrough: AlexNet (Krizhevsky, Sutskever, Hinton 2012) — won ImageNet by a landslide using GPU training.

## Why It Exists

A fully connected network treats every pixel independently — it doesn't understand spatial structure. CNN uses sliding filters to detect local patterns (edges, textures, shapes) that build up hierarchically.

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

Convolution: `(f * g)(t) = sum(f(τ) · g(t-τ))`. In practice: slide a small filter across the image, compute dot product at each position → feature map. Pooling reduces spatial dimensions.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [MLP & Backprop](../fundamentals/mlp-backprop.md) — The training method
- [AlexNet → ResNet](../models/alexnet-resnet.md) — Landmark CNN models
- [ViT](../models/vit.md) — Transformer replacing CNN
- [Dot Product](../../../math/linear-algebra/dot-product.md) — What convolution computes
