---
title: "Diffusion Models"
category: ai-ml/deep-learning/architectures
tags: [diffusion, ddpm, stable-diffusion, image-generation, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Ho, Jain, Abbeel (2020) — DDPM. Built on Sohl-Dickstein et al. (2015). Powers Stable Diffusion, DALL-E 2, Midjourney, Imagen.

## Why It Exists

GANs are unstable to train (mode collapse). Diffusion models take a different approach: learn to reverse a gradual noising process. Simple, stable, high quality.

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

Forward: add Gaussian noise step by step until pure noise. Reverse: neural network learns to denoise one step at a time. `p_θ(x_{t-1}|x_t)` predicts the slightly less noisy version.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [GAN](gan.md) — Adversarial alternative
- [Autoencoder](../../unsupervised/dimensionality-reduction/autoencoder.md) — Variational approach
- [Distributions](../../../math/probability/distributions.md) — Gaussian noise process
