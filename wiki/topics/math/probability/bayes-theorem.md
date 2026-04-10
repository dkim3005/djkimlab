---
title: "Bayes' Theorem"
category: math/probability
tags: [probability, bayes, posterior, prior, likelihood]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have a prior belief about a hypothesis, then I observe evidence and want to
update that belief rationally. Bayes' theorem is the backbone of probabilistic
reasoning, Bayesian modeling, Naive Bayes, and MAP estimation.

## Why It Exists

The "why" chain is:

- We often want `P(hypothesis | evidence)`.
- But that direct quantity is hard to estimate.
- The reverse direction `P(evidence | hypothesis)` is often easier to model.
- So we flip the problem using a normalization rule.

Bayes' theorem exists because learning from data is really belief updating, and
it gives the exact rule for that update.

## Visual Intuition

Imagine you are classifying an email.

- before reading it, you have a prior belief about whether it is spam
- then you observe words like "discount" or "free"
- those words change the probability of the spam hypothesis

Bayes tells you how to combine:

- prior belief
- evidence under each hypothesis
- overall evidence frequency

So it is the bridge from "what I believed before" to "what I believe now."

## How It Works

1. Choose a hypothesis `H`
2. Write your prior `P(H)`
3. Model the evidence likelihood `P(E | H)`
4. Compute the overall evidence probability `P(E)`
5. Update to the posterior `P(H | E)`

The result is a reweighted belief after seeing the data.

## The Math

Bayes' theorem:

`P(A | B) = P(B | A) P(A) / P(B)`

- `P(A)`: prior
- `P(B | A)`: likelihood
- `P(B)`: evidence or normalization term
- `P(A | B)`: posterior

Interpretation:

- posterior = likelihood times prior, then normalized

Why ML cares:

- MAP estimation is Bayes plus "pick the best posterior parameter"
- Naive Bayes applies it directly for classification
- probabilistic models constantly update beliefs from evidence

## Examples

Suppose only 1% of emails are spam overall, but the word "lottery" appears much
more often in spam than non-spam emails.

- the prior keeps you from calling everything spam
- the likelihood boosts the spam hypothesis when the word appears
- the posterior balances both

## Code

```python
def bayes(p_b_given_a, p_a, p_b):
    return (p_b_given_a * p_a) / p_b
```

## Used In

- [Naive Bayes](../../ai-ml/supervised/classification/naive-bayes.md) — Direct application
- [GMM](../../ai-ml/unsupervised/clustering/gmm.md) — EM algorithm
- [MLE & MAP](mle-map.md) — Parameter estimation
- [RLHF](../../ai-ml/reinforcement-learning/rlhf.md) — Reward modeling
