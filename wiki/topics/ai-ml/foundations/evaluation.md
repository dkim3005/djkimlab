---
title: "Model Evaluation"
category: ai-ml/foundations
tags: [evaluation, accuracy, precision, recall, f1, auc, fundamentals]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I already trained a model and now need to answer the only question that really
matters: is it actually good for the task? Evaluation is where we detect
imbalanced-class failure, threshold tradeoffs, overfitting, and whether one
model is truly better than another.

## History

Confusion matrix dates back to Kohavi (1998). ROC curves from WWII radar signal detection. These metrics are how we know if a model actually works.

## Why It Exists

Accuracy alone is misleading — 99% accuracy on cancer detection means nothing if only 1% of patients have cancer (just predict 'no cancer' every time). We need nuanced metrics.

## How It Works

### Visual Intuition

Picture a confusion matrix filling in as predictions arrive:

- true positives
- false positives
- true negatives
- false negatives

Now imagine sliding the decision threshold:

- precision rises when the model becomes conservative
- recall rises when it becomes aggressive

Evaluation is really the language for those tradeoffs.

### Step by Step

1. Keep a validation or test set separate from training
2. Run the model and collect predictions
3. Compare predictions against ground truth
4. Pick metrics that match the task and class balance
5. If the model outputs probabilities, study threshold curves as well
6. Compare train and validation behavior to diagnose overfitting

## Code

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score


accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)
```

## The Math Inside

Core metrics:

`accuracy = (TP + TN) / (TP + TN + FP + FN)`

`precision = TP / (TP + FP)`

`recall = TP / (TP + FN)`

`F1 = 2 * precision * recall / (precision + recall)`

Interpretation:

- precision asks "when we predict positive, how often are we right?"
- recall asks "of the true positives, how many did we catch?"
- F1 balances the two when neither alone is enough
- ROC/AUC studies ranking quality across thresholds rather than at one fixed cutoff

## Math Prerequisites

- [Probability Distributions](../../math/probability/distributions.md) - predicted probabilities
- [Loss Functions](loss-functions.md) - training objective vs evaluation metric
- [Bias-Variance Tradeoff](bias-variance.md) - how evaluation reveals underfit and overfit

## Related

- [Loss Functions](loss-functions.md) — What the model optimizes (not the same as evaluation!)
- [Bias-Variance Tradeoff](bias-variance.md) — Over/underfitting diagnosis
