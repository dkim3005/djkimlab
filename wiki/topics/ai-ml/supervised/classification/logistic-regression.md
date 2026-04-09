---
title: "Logistic Regression"
category: ai-ml/supervised/classification
tags: [classification, logistic, sigmoid, probability, supervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

David Cox (1958). Despite the name, it's a classification algorithm. Uses the logistic (sigmoid) function to output probabilities.

## Why It Exists

Linear regression outputs any number. But for classification, we need a probability between 0 and 1. The sigmoid function squishes the linear output into this range.

## How It Works

<!-- 3B1B-style explanation: visual intuition first, then mechanics -->

### Visual Intuition

<!-- Animation/diagram description: what the viewer should see -->

### Step by Step

<!-- Algorithm walkthrough -->

## Code

```python
# Implementation sketch
```

## The Math Inside

Sigmoid: `σ(z) = 1 / (1 + e^(-z))`. Loss: Binary Cross-Entropy `L = -[y*log(p) + (1-y)*log(1-p)]`. Optimized via gradient descent.

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Linear Regression](../regression/linear-regression.md) — The regression version
- [Naive Bayes](naive-bayes.md) — Another probabilistic classifier
- [SVM](svm.md) — Geometric approach to classification
- [Cross-Entropy](../../../math/information-theory/cross-entropy.md) — Why this loss function
