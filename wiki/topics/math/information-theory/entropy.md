---
title: "Entropy"
category: math/information-theory
tags: [information-theory, entropy, uncertainty, decision-tree]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to quantify uncertainty in a probability distribution. In ML, entropy
shows up directly in decision trees, cross-entropy loss, and many places where
we ask how mixed or how surprising a distribution is.

## Why It Exists

The "why" chain is:

- Some probability distributions are predictable.
- Others are highly uncertain.
- We want one number that summarizes that uncertainty.
- Entropy is that number.

Entropy exists because probability alone does not tell us how concentrated or
spread out the uncertainty is.

## Visual Intuition

Compare three class distributions:

- `[1.0, 0.0]` -> fully certain
- `[0.9, 0.1]` -> mostly certain
- `[0.5, 0.5]` -> maximally uncertain for two classes

Entropy is smallest in the first case and largest in the last. Decision trees
use that fact to decide which split makes class labels less mixed.

## How It Works

1. Start with a probability distribution over outcomes
2. For each outcome, measure its surprise with `-log p`
3. Average that surprise using the probabilities themselves

Rare events are more surprising than common events, so they contribute more to
the uncertainty measure.

## The Math Inside

For discrete outcomes:

`H(X) = - sum p_i log2(p_i)`

- `p_i`: probability of outcome `i`
- higher entropy: more uncertainty
- lower entropy: more predictability

For binary classification with class probability `p`:

`H(p) = -p log2(p) - (1 - p) log2(1 - p)`

Some useful cases:

- `p = 0` or `1` -> entropy is `0`
- `p = 0.5` -> entropy is maximal

In a decision tree, a split is good if it lowers the weighted average entropy
of the child nodes. That drop is information gain.

## Examples

- a pure node in a decision tree has entropy `0`
- a 50/50 mixed node has high entropy
- cross-entropy compares a predicted distribution to the true one using the same idea of surprise

## Code

```python
import math


def entropy(probs):
    total = 0.0
    for p in probs:
        if p > 0:
            total -= p * math.log2(p)
    return total
```

## Used In

- [Decision Tree](../../ai-ml/supervised/classification/decision-tree.md) — Information Gain = entropy reduction
- [Cross-Entropy](cross-entropy.md) — Classification loss
- [KL Divergence](kl-divergence.md) — Distance between distributions
