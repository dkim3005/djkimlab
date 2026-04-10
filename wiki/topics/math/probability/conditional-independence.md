---
title: "Conditional Independence"
category: math/probability
tags: [probability, independence, conditional, naive-bayes]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want to simplify a probabilistic model by saying two variables stop informing
each other once a third variable is known. This assumption is what makes Naive
Bayes tractable and what lets larger graphical models factorize cleanly.

## Why It Exists

The "why" chain is:

- Joint distributions become hard very quickly.
- Modeling every interaction between variables is expensive.
- Sometimes a hidden or known variable explains the correlation.
- Once that variable is known, the remaining dependence disappears.

Conditional independence exists because many complicated distributions become
manageable when you know what common cause or label variable to condition on.

## Visual Intuition

Imagine two observations:

- whether a person carries an umbrella
- whether the street is wet

These two are related overall. But if you also know whether it rained, much of
that dependence is explained away.

That is the basic intuition:

- marginally dependent
- conditionally independent once a third variable is known

Naive Bayes uses this idea in a strong form: features are assumed independent
once you know the class label.

## How It Works

1. Start with variables `A`, `B`, and `C`
2. Ask whether the link between `A` and `B` remains after conditioning on `C`
3. If not, factorize the joint distribution using that simplification
4. Use the simpler factorization for inference or learning

This can dramatically reduce the number of parameters you need to estimate.

## The Math

Conditional independence means:

`P(A, B | C) = P(A | C) P(B | C)`

Equivalent statement:

`P(A | B, C) = P(A | C)`

Interpretation:

- once `C` is known, `B` gives no extra information about `A`

Why ML cares:

- Naive Bayes factorizes `P(x_1, ..., x_n | y)` into a product of per-feature terms
- graphical models rely on conditional independence structure to stay tractable

## Examples

In Naive Bayes sentiment classification:

- `C` = sentiment label
- `A` = whether the word "great" appears
- `B` = whether the word "amazing" appears

These words are not truly independent in raw language, but the model assumes
they are conditionally independent given the sentiment label so the classifier
stays simple.

## Code

```python
def naive_bayes_likelihood(feature_probs):
    total = 1.0
    for prob in feature_probs:
        total *= prob
    return total
```

## Used In

- [Naive Bayes](../../ai-ml/supervised/classification/naive-bayes.md) — The 'naive' assumption
- [Bayes' Theorem](bayes-theorem.md) — The framework
