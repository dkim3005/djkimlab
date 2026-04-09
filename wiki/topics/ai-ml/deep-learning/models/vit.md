---
title: "Vision Transformer (ViT)"
category: ai-ml/deep-learning/models
tags: [vit, vision, transformer, image-classification, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Dosovitskiy et al. (Google, 2020). 'An Image Is Worth 16x16 Words.' Proved Transformers can replace CNNs for vision — if you have enough data.

## Why It Exists

CNNs have inductive bias for local patterns (convolution). ViT asks: what if we just split the image into patches and treat them as tokens? With enough pre-training data, it works better.

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

Split image into 16x16 patches. Flatten each patch → linear projection → add positional embedding. Feed sequence of patch embeddings into standard Transformer encoder.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [CNN](../architectures/cnn.md) — What ViT replaces
- [Transformer](../architectures/transformer.md) — The architecture
- [AlexNet → ResNet](alexnet-resnet.md) — CNN evolution
