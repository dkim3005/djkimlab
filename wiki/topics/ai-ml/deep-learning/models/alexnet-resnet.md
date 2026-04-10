---
title: "AlexNet → VGG → ResNet"
category: ai-ml/deep-learning/models
tags: [alexnet, resnet, vgg, imagenet, computer-vision, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want to understand why deep learning suddenly dominated computer vision and
why deeper CNNs stopped collapsing once residual connections arrived. This page
matters when ImageNet-scale vision, feature hierarchies, and ResNet-style skip
connections show up in later models.

## History

AlexNet (Krizhevsky 2012): Won ImageNet, sparked the deep learning revolution. VGG (Simonyan 2014): Showed depth matters. ResNet (He 2015): Skip connections allow 152+ layers, 3.6% error (superhuman).

## Why It Exists

The "why" chain is:

- CNNs already worked for vision, but earlier models were limited in scale.
- AlexNet showed that deeper CNNs plus GPUs could crush ImageNet.
- VGG suggested that more depth could keep improving learned features.
- But eventually deeper networks became harder to optimize and accuracy degraded.
- ResNet solved that by letting layers learn corrections on top of an identity path.

This family exists because vision kept rewarding depth, but depth needed an
architectural trick to remain trainable.

## How It Works

### Visual Intuition

Imagine feature extraction through layers:

- early layers detect edges and color contrasts
- middle layers combine them into textures and motifs
- deeper layers assemble parts like eyes, wheels, or fur
- final layers reason about whole objects

Now imagine a residual block with a shortcut lane:

- one path applies convolutions and nonlinearities
- the other path carries the input forward unchanged
- the two paths are added together

That shortcut makes it easier for the network to preserve useful information
instead of relearning identity mappings from scratch.

The timeline node is here:

-> [MLViz Node: AlexNet / ResNet](/projects/mlviz/alexnet-resnet)

### Step by Step

1. Pass an image through stacks of convolutions, activations, and pooling
2. Let early layers learn simple visual patterns
3. Let deeper layers combine them into more abstract concepts
4. For ResNet, add skip connections so each block learns `F(x)` and outputs `F(x) + x`
5. Train end to end with backprop on large labeled datasets

AlexNet proved scale worked. VGG pushed depth. ResNet made extreme depth stable.

## Code

```python
def residual_block(x):
    out = conv_bn_relu(x)
    out = conv_bn(out)
    return relu(out + x)
```

## The Math Inside

ResNet replaces a plain mapping with:

`y = F(x) + x`

- `x`: input activation
- `F(x)`: learned residual transformation
- `x` shortcut: identity path

If the best mapping is close to identity, it is easier to learn a small residual
`F(x)` than to relearn the entire mapping from zero.

Why this mattered:

- gradients flow more easily through the shortcut path
- deep stacks become easier to optimize
- accuracy keeps improving as depth scales further

AlexNet's contribution was not residual learning, but showing that large CNNs
trained on GPUs could suddenly dominate visual recognition.

## Math Prerequisites

- [CNN](../architectures/cnn.md) - convolution and feature maps
- [MLP & Backprop](../fundamentals/mlp-backprop.md) - how deep nets train
- [Optimization](../../foundations/optimization.md) - why deeper nets are hard to optimize
- [Loss Functions](../../foundations/loss-functions.md) - the training objective on classification tasks

## Related

- [CNN](../architectures/cnn.md) — The base architecture
- [ViT](vit.md) — Transformer-based alternative
- [Timeline](../../history/timeline.md) — The 2012 turning point
