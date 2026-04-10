---
title: "Diffusion Models"
category: ai-ml/deep-learning/architectures
tags: [diffusion, ddpm, stable-diffusion, image-generation, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want a generative model for high-quality images, audio, or multimodal outputs,
and I care about training stability and sample quality. Diffusion became the
default generative image family behind many modern image systems.

## History

Ho, Jain, Abbeel (2020) — DDPM. Built on Sohl-Dickstein et al. (2015). Powers Stable Diffusion, DALL-E 2, Midjourney, Imagen.

## Why It Exists

The "why" chain is:

- GANs can generate sharp samples but are unstable.
- We want a generative process with a smoother training signal.
- Gradually adding noise is easy to define.
- If we can learn to reverse that process, generation becomes denoising.

Diffusion models exist because reversing a simple noising process turned out to
be much more stable than adversarial generation.

## How It Works

### Visual Intuition

Imagine taking a real image and adding a tiny bit of Gaussian noise over and
over until it becomes pure static.

- the forward process destroys structure step by step
- the model learns the reverse process
- starting from noise, repeated denoising reconstructs a coherent image

So generation becomes "start from noise and clean it up."

The timeline node is here:

-> [MLViz Node: Diffusion](/projects/mlviz/diffusion)

### Step by Step

1. Define a forward process that adds Gaussian noise over many timesteps
2. Train a neural network to predict the noise or denoised sample at each step
3. At inference time, start from random noise
4. Repeatedly apply the learned reverse step
5. End with a final generated sample

The model is not trying to jump from noise to image in one leap. It learns many
small denoising moves.

## Code

```python
# concept sketch
# x_t = add_noise(x_0, t)
# pred_noise = model(x_t, t)
# loss = mse(pred_noise, true_noise)
```

## The Math Inside

Forward process:

- start with data sample `x_0`
- sample `x_t` by gradually adding Gaussian noise

Reverse process:

`p_theta(x_{t-1} | x_t)`

The model learns a reverse transition that makes the sample slightly less noisy
at each step.

A common training view is noise prediction:

- sample a timestep `t`
- corrupt a data sample with known Gaussian noise
- train the model to predict that noise

That objective is simple, differentiable, and stable, which is a major reason
diffusion models became so successful.

## Math Prerequisites

- [Probability Distributions](../../../math/probability/distributions.md) - Gaussian noise process
- [Loss Functions](../../foundations/loss-functions.md) - noise-prediction objective
- [GAN](gan.md) - the adversarial alternative diffusion displaced in many image tasks

## Related

- [GAN](gan.md) — Adversarial alternative
- [Autoencoder](../../unsupervised/dimensionality-reduction/autoencoder.md) — Variational approach
- [Distributions](../../../math/probability/distributions.md) — Gaussian noise process
