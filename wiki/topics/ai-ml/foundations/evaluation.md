---
title: "Model Evaluation"
category: ai-ml/foundations
tags: [evaluation, accuracy, precision, recall, f1, auc, fundamentals]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Confusion matrix dates back to Kohavi (1998). ROC curves from WWII radar signal detection. These metrics are how we know if a model actually works.

## Why It Exists

Accuracy alone is misleading — 99% accuracy on cancer detection means nothing if only 1% of patients have cancer (just predict 'no cancer' every time). We need nuanced metrics.

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

Precision: TP/(TP+FP) — 'of predicted positives, how many are real?' Recall: TP/(TP+FN) — 'of actual positives, how many did we find?' F1: harmonic mean. AUC-ROC: threshold-independent.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Loss Functions](loss-functions.md) — What the model optimizes (not the same as evaluation!)
- [Bias-Variance Tradeoff](bias-variance.md) — Over/underfitting diagnosis
