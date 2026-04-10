---
title: "Logistic Regression"
category: ai-ml/supervised/classification
tags: [classification, logistic, sigmoid, probability, supervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to predict a yes/no label and I want a probability, not just a hard
class. It is a strong baseline for spam detection, churn prediction, fraud
flags, click/no-click, medical risk screening, and any tabular binary
classification problem where interpretability still matters.

## History

David Cox (1958). Despite the name, it's a classification algorithm. Uses the logistic (sigmoid) function to output probabilities.

## Why It Exists

The "why" chain is:

- We start from linear regression because a weighted sum is simple and useful.
- But linear regression can output `-3.2` or `4.7`, which are not probabilities.
- Classification needs a number between `0` and `1`.
- We wrap the linear score in the sigmoid function.
- Now the model can say "this looks 87% likely to be class 1."

So logistic regression exists because classification needs confidence, not just
a line.

## How It Works

### Visual Intuition

Imagine two clusters of points: blue on the left, orange on the right. A linear
score `z = wx + b` still draws a boundary, but now that score is passed through
an S-shaped curve.

- very negative `z` becomes a probability near `0`
- very positive `z` becomes a probability near `1`
- values near the boundary become probabilities near `0.5`

That is the key move: keep the simple linear score, but convert it into a valid
probability.

### Step by Step

1. Compute a linear score: `z = w^T x + b`
2. Pass it through sigmoid: `p = sigma(z)`
3. Interpret `p` as `P(y = 1 | x)`
4. Pick a threshold such as `0.5` to make a class decision
5. Train `w` and `b` by minimizing binary cross-entropy

Even though the boundary is linear in feature space, the output is
probabilistic, which makes the model much more useful than simple thresholded
linear regression.

## Code

```python
import math


def sigmoid(z):
    return 1.0 / (1.0 + math.exp(-z))


def predict_prob(x, w, b):
    z = sum(w_i * x_i for w_i, x_i in zip(w, x)) + b
    return sigmoid(z)
```

## The Math Inside

The model:

`p(y = 1 | x) = sigma(w^T x + b)`

where

`sigma(z) = 1 / (1 + e^(-z))`

- `w^T x + b`: linear score
- `sigma(.)`: squashes any real number into `(0, 1)`
- `p(y = 1 | x)`: predicted probability of class 1

For one training example, binary cross-entropy is:

`L = -[y log(p) + (1 - y) log(1 - p)]`

- if `y = 1`, this becomes `-log(p)`
- if `y = 0`, this becomes `-log(1 - p)`

So confident wrong predictions are punished heavily.

There is also a probabilistic interpretation:

- labels are modeled as Bernoulli random variables
- training maximizes the Bernoulli likelihood
- minimizing binary cross-entropy is the same as maximizing log-likelihood

That is why logistic regression lives right at the intersection of linear
models, probability, and optimization.

## Math Prerequisites

- [Probability Distributions](../../../math/probability/distributions.md) - Bernoulli labels and probability outputs
- [Maximum Likelihood Estimation (MLE) & MAP](../../../math/probability/mle-map.md) - why this is likelihood maximization
- [Cross-Entropy](../../../math/information-theory/cross-entropy.md) - why log loss is used
- [Gradient Descent](../../../math/optimization/gradient-descent.md) - how the parameters are trained

## Related

- [Linear Regression](../regression/linear-regression.md) — The regression version
- [Naive Bayes](naive-bayes.md) — Another probabilistic classifier
- [SVM](svm.md) — Geometric approach to classification
- [Cross-Entropy](../../../math/information-theory/cross-entropy.md) — Why this loss function
