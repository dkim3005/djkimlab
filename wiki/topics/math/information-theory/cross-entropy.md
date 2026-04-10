---
title: "Cross-Entropy"
category: math/information-theory
tags: [information-theory, cross-entropy, loss-function, classification]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have a classifier that outputs probabilities and I need a loss that rewards
high confidence when correct and punishes high confidence when wrong.

## Why It Exists

The "why" chain is:

- Classification models often output probabilities, not just labels.
- We need to compare those predicted probabilities to the true answer.
- A model that says `0.99` for the right class should score better than one that says `0.51`.
- A model that says `0.99` for the wrong class should be punished hard.
- Cross-entropy does exactly that.

It is the standard loss for classification because it aligns naturally with
probabilistic modeling and likelihood maximization.

## Visual Intuition

Suppose the true class is `1`.

- predicting `0.9` should incur a small loss
- predicting `0.6` should incur a larger loss
- predicting `0.01` should incur a huge loss

Cross-entropy behaves this way because it uses the negative log of the
probability assigned to the correct answer.

## How It Works

1. The model outputs a probability distribution
2. Look at the probability assigned to the true class
3. Take the negative log of that value
4. Average across examples

That is why confident wrong predictions explode in loss: `-log(small number)` is
large.

## The Math Inside

General cross-entropy between true distribution `p` and predicted distribution
`q` is

`H(p, q) = - sum p(x) log q(x)`

For binary classification, this becomes

`L = -[y log(p) + (1 - y) log(1 - p)]`

where

- `y` is the true label, `0` or `1`
- `p` is the predicted probability of class `1`

For one-hot multiclass labels, the loss simplifies to

`L = -log(q_true_class)`

Cross-entropy is related to other information-theoretic quantities:

`CrossEntropy = Entropy + KL Divergence`

When the true distribution is fixed, minimizing cross-entropy is the same as
minimizing KL divergence to that target.

## Examples

- true label `1`, predicted `0.9` -> loss about `0.105`
- true label `1`, predicted `0.5` -> loss about `0.693`
- true label `1`, predicted `0.01` -> loss about `4.605`

This is exactly the behavior we want from a classifier loss.

## Code

```python
import math


def binary_cross_entropy(y, p):
    eps = 1e-9
    p = min(max(p, eps), 1 - eps)
    return -(y * math.log(p) + (1 - y) * math.log(1 - p))
```

## Used In

- [Logistic Regression](../../ai-ml/supervised/classification/logistic-regression.md) — Binary cross-entropy
- [Loss Functions](../../ai-ml/foundations/loss-functions.md) — All loss functions compared
- [Entropy](entropy.md) — Foundation
- [KL Divergence](kl-divergence.md) — CE = H(p) + KL(p||q)
