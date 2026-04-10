---
title: "Generative Adversarial Network (GAN)"
category: ai-ml/deep-learning/architectures
tags: [gan, generative, adversarial, image-generation, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want a model that generates realistic samples such as faces, textures, or
images, and I care about sharp perceptual quality. GANs were especially
important when image generation quality mattered more than training simplicity.

## History

Ian Goodfellow (2014). Supposedly conceived during a bar argument about generative models. Yann LeCun called it 'the most interesting idea in the last 10 years in ML.'

## Why It Exists

The "why" chain is:

- Generative modeling is hard because "make realistic samples" is a vague target.
- Explicit likelihood models can be difficult or blurry in practice.
- We want a sharp learning signal that says whether generated outputs look real.
- A discriminator can provide that signal.

GANs exist because a learned critic can teach a generator what realism looks
like.

## How It Works

### Visual Intuition

Imagine a forger and a detective.

- the generator tries to make fake samples
- the discriminator tries to spot which samples are fake
- the generator improves by learning to fool the discriminator
- the discriminator improves by catching better fakes

The two models co-evolve, and that adversarial pressure pushes the generator
toward realistic outputs.

The timeline node is here:

-> [MLViz Node: GAN](/projects/mlviz/gan)

### Step by Step

1. Sample random noise `z`
2. Use the generator `G(z)` to create a fake sample
3. Show real and fake samples to the discriminator
4. Train the discriminator to classify real vs fake
5. Train the generator to fool the discriminator
6. Alternate these updates

The generator never sees "ground truth output" directly. It learns through the
discriminator's judgment.

## Code

```python
# concept sketch
# z -> G(z) -> fake
# D(real) -> should be 1
# D(fake) -> should be 0
# update D, then update G
```

## The Math Inside

Classic minimax objective:

`min_G max_D E[log D(x)] + E[log(1 - D(G(z)))]`

- `G`: generator
- `D`: discriminator
- `x`: real data
- `z`: random noise input

Interpretation:

- discriminator wants high scores for real samples and low scores for fake ones
- generator wants fake samples that the discriminator cannot distinguish from real ones

At an ideal equilibrium, generated and real distributions become hard to tell
apart.

In practice, GANs are famous for instability issues such as:

- mode collapse
- training imbalance between `G` and `D`
- sensitive hyperparameter tuning

Those issues are a large part of why diffusion models later became so dominant.

## Math Prerequisites

- [MLP & Backprop](../fundamentals/mlp-backprop.md) - both generator and discriminator are trained with gradients
- [Loss Functions](../../foundations/loss-functions.md) - adversarial objective interpretation
- [Diffusion Models](diffusion.md) - the more stable generative alternative that followed

## Related

- [Diffusion Models](diffusion.md) — Modern alternative
- [Autoencoder](../../unsupervised/dimensionality-reduction/autoencoder.md) — Another generative approach
- [MLP & Backprop](../fundamentals/mlp-backprop.md) — How both networks train
