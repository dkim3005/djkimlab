---
title: "KL Divergence"
category: math/information-theory
tags: [information-theory, kl-divergence, distribution-distance]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to compare one probability distribution against another, especially when I
care about how costly it is to use the wrong distribution to explain data. KL
divergence shows up in RLHF, variational methods, t-SNE, and cross-entropy
analysis.

## Why It Exists

The "why" chain is:

- A model often predicts a distribution, not just one label.
- We need a way to say how far that predicted distribution is from the target.
- Simple subtraction of probabilities misses the information cost.
- We want a measure of how much extra surprise we pay when using `Q` instead of `P`.

KL divergence exists because "wrong probabilities" are not all equally wrong.
Being confidently wrong should cost much more.

## Visual Intuition

Imagine `P` is the real distribution and `Q` is your model.

- if `Q` puts high probability where `P` also does, the mismatch is small
- if `Q` ignores outcomes that `P` thinks are likely, the mismatch becomes large

So KL measures a directional penalty:

- `KL(P || Q)` asks how expensive it is to approximate `P` using `Q`
- reversing the order changes the answer

That asymmetry is why KL is not a true geometric distance.

## How It Works

1. Choose the reference distribution `P`
2. Choose the approximating distribution `Q`
3. Compare their probabilities outcome by outcome
4. Weight the log-ratio by how much `P` cares about each outcome
5. Sum or integrate over all outcomes

This means KL pays most attention to regions where the true distribution assigns
substantial mass.

## The Math

Discrete case:

`KL(P || Q) = sum P(x) log(P(x) / Q(x))`

- `P(x)`: true or target probability
- `Q(x)`: model or approximate probability

Important facts:

- `KL(P || Q) >= 0`
- `KL(P || Q) = 0` only when `P = Q`
- in general `KL(P || Q) != KL(Q || P)`

Connection to cross-entropy:

`H(P, Q) = H(P) + KL(P || Q)`

So minimizing cross-entropy is equivalent to minimizing KL divergence when the
target entropy `H(P)` is fixed.

## Examples

Suppose the target distribution is:

- `P(cat) = 0.9`
- `P(dog) = 0.1`

If a model predicts:

- `Q(cat) = 0.6`
- `Q(dog) = 0.4`

the model is not just slightly off. It is assigning too much weight to the
wrong outcome, so KL becomes noticeably positive.

## Code

```python
import math


def kl_divergence(p, q):
    total = 0.0
    for pi, qi in zip(p, q):
        total += pi * math.log(pi / qi)
    return total
```

## Used In

- [t-SNE](../../ai-ml/unsupervised/dimensionality-reduction/t-sne.md) — Minimizes KL divergence
- [RLHF](../../ai-ml/reinforcement-learning/rlhf.md) — KL penalty prevents model drift
- [Cross-Entropy](cross-entropy.md) — Related: CE = Entropy + KL
- [Entropy](entropy.md) — Foundation
