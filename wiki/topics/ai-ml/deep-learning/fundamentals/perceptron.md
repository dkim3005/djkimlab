---
title: "Perceptron"
category: ai-ml/deep-learning/fundamentals
tags: [perceptron, neuron, binary-classification, history]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Frank Rosenblatt (1958) at Cornell. Built a physical machine (Mark I Perceptron) that could learn to recognize shapes. The New York Times headline: 'New Navy Device Learns by Doing.' Killed by Minsky & Papert (1969) proving it can't learn XOR.

## Why It Exists

Can a machine learn like a brain? The perceptron mimics a single neuron: take weighted inputs, sum them, fire if above threshold. The simplest possible learning machine.

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

Output: `y = step(w·x + b)`. Learning rule: `w = w + α(y_true - y_pred) * x`. Can only learn linearly separable functions.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [MLP & Backprop](mlp-backprop.md) — Solves the XOR limitation
- [SVM](../../supervised/classification/svm.md) — Another linear classifier, but optimal
- [Timeline](../../history/timeline.md) — The full story
