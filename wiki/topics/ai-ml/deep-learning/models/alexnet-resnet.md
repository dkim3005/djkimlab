---
title: "AlexNet → VGG → ResNet"
category: ai-ml/deep-learning/models
tags: [alexnet, resnet, vgg, imagenet, computer-vision, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

AlexNet (Krizhevsky 2012): Won ImageNet, sparked the deep learning revolution. VGG (Simonyan 2014): Showed depth matters. ResNet (He 2015): Skip connections allow 152+ layers, 3.6% error (superhuman).

## Why It Exists

CNNs worked but were shallow. Going deeper helped but hit the degradation problem — very deep networks performed worse. ResNet's skip connections solved this: layers learn residuals instead of full mappings.

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

ResNet: `F(x) + x` instead of `F(x)`. If the optimal mapping is close to identity, learning `F(x) = 0` is easier than learning `F(x) = x`.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [CNN](../architectures/cnn.md) — The base architecture
- [ViT](vit.md) — Transformer-based alternative
- [Timeline](../../history/timeline.md) — The 2012 turning point
