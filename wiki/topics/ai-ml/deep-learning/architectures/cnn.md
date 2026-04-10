---
title: "Convolutional Neural Network (CNN)"
category: ai-ml/deep-learning/architectures
tags: [cnn, convolution, image, computer-vision, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need a model that understands spatial structure, especially for images, video
frames, medical scans, or any grid-like signal. CNNs are useful when nearby
patterns matter more than arbitrary long-distance feature interactions.

## History

Yann LeCun (1989) — LeNet for digit recognition. Breakthrough: AlexNet (Krizhevsky, Sutskever, Hinton 2012) — won ImageNet by a landslide using GPU training.

## Why It Exists

The "why" chain is:

- Images are not just unordered lists of pixels.
- Nearby pixels form edges, corners, textures, and shapes.
- Fully connected layers ignore that local structure and waste parameters.
- We want small reusable detectors that can slide across the image.

CNNs exist because vision needs locality and weight sharing, not one giant
fully-connected block.

## How It Works

### Visual Intuition

Imagine a tiny filter moving across an image.

- one filter lights up on vertical edges
- another responds to corners
- deeper layers combine those low-level signals into parts and objects

The same detector is reused everywhere in the image, which is why CNNs can
scale much better than naive fully connected models for vision.

The major timeline breakthrough for this family is here:

-> [MLViz Node: AlexNet](/projects/mlviz/alexnet-resnet)

### Step by Step

1. Start with an image tensor
2. Apply small learnable filters across local neighborhoods
3. Produce feature maps showing where each pattern appears
4. Repeat with deeper layers to build more abstract patterns
5. Optionally use pooling or striding to reduce spatial size
6. Feed the final representation to a classifier or regressor

The architecture progressively turns raw pixels into structured features.

## Code

```python
# concept sketch
# x -> conv -> relu -> pool -> conv -> relu -> pool -> classifier
```

## The Math Inside

In practice, a convolution layer applies a small kernel over local patches.

At each spatial location, the kernel computes a dot product with the input patch
to produce one value in a feature map.

Conceptually:

`feature_map[i, j] = sum_u sum_v K[u, v] * X[i+u, j+v]`

- `X`: input image or feature map
- `K`: learnable kernel
- output value: how strongly that pattern appears at location `(i, j)`

Two core ideas matter:

- local receptive fields: each output sees only a neighborhood
- weight sharing: the same kernel is reused across positions

That combination is what makes CNNs effective for images.

## Math Prerequisites

- [Dot Product](../../../math/linear-algebra/dot-product.md) - what each sliding filter computes locally
- [Vectors & Matrices](../../../math/linear-algebra/vectors-matrices.md) - tensor and feature-map intuition
- [MLP & Backprop](../fundamentals/mlp-backprop.md) - how convolutional weights are trained
- [AlexNet → ResNet](../models/alexnet-resnet.md) - the major CNN breakthrough line

## Related

- [MLP & Backprop](../fundamentals/mlp-backprop.md) — The training method
- [AlexNet → ResNet](../models/alexnet-resnet.md) — Landmark CNN models
- [ViT](../models/vit.md) — Transformer replacing CNN
- [Dot Product](../../../math/linear-algebra/dot-product.md) — What convolution computes
