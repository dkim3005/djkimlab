---
title: "Generative Adversarial Network (GAN)"
category: ai-ml/deep-learning/architectures
tags: [gan, generative, adversarial, image-generation, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Ian Goodfellow (2014). Supposedly conceived during a bar argument about generative models. Yann LeCun called it 'the most interesting idea in the last 10 years in ML.'

## Why It Exists

How do you teach a network to generate realistic data? Pit two networks against each other: a Generator that creates fakes, and a Discriminator that tries to catch them. Both improve.

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

Minimax game: `min_G max_D E[log D(x)] + E[log(1 - D(G(z)))]`. Generator maps noise z → fake image. Discriminator classifies real vs fake. Nash equilibrium: D can't tell the difference.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Diffusion Models](diffusion.md) — Modern alternative
- [Autoencoder](../../unsupervised/dimensionality-reduction/autoencoder.md) — Another generative approach
- [MLP & Backprop](../fundamentals/mlp-backprop.md) — How both networks train
