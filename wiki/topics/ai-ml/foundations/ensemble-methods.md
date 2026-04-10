---
title: "Ensemble Methods"
category: ai-ml/foundations
tags: [ensemble, bagging, boosting, stacking, fundamentals]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I have a decent base model, but one model alone is too noisy, too biased, or
too limited. Ensembles help when diversity across models can be turned into
better overall performance.

## History

Bagging (Breiman 1996). Boosting (Freund & Schapire 1997 — AdaBoost). Stacking (Wolpert 1992). 'The wisdom of crowds' applied to models.

## Why It Exists

The "why" chain is:

- One model can be noisy.
- One model can also be systematically too simple.
- Different models make different errors.
- If those errors are not perfectly aligned, combining models can help.

Ensemble methods exist because a collection of imperfect learners can outperform
one learner when their mistakes are diverse enough.

## How It Works

### Visual Intuition

Imagine asking many analysts the same question.

- if each analyst is noisy but unbiased, averaging helps
- if each analyst can correct the previous analyst's blind spots, sequential training helps
- if different analysts have different strengths, a meta-analyst can combine them

Those are the three main ensemble patterns: bagging, boosting, and stacking.

### Step by Step

1. Choose a base learner or several base learners
2. Generate diversity across models
3. Combine their predictions
4. Evaluate whether the combined model improves stability or accuracy

Three major strategies:

- bagging: train models independently on resampled data, then average or vote
- boosting: train models sequentially so later models focus on earlier mistakes
- stacking: train a meta-model on the outputs of other models

## Code

```python
# bagging sketch
models = [train(base_learner, sample(data)) for _ in range(10)]
# prediction = average(model.predict(x) for model in models)
```

## The Math Inside

Bagging:

- reduces variance
- best when the base learner is unstable, like a decision tree

Boosting:

- often reduces bias by building a sequence of corrective learners
- each new learner focuses on what the current ensemble still gets wrong

Stacking:

- learns how to combine multiple model outputs
- the meta-model can learn when each base model is trustworthy

The entire idea is bias-variance management plus diversity.

## Math Prerequisites

- [Bias-Variance Tradeoff](bias-variance.md) - why bagging and boosting help in different ways
- [Decision Tree](../supervised/classification/decision-tree.md) - a common base learner
- [Random Forest](../supervised/classification/random-forest.md) - bagging with trees

## Related

- [Random Forest](../supervised/classification/random-forest.md) — Bagging + trees
- [Gradient Boosting](../supervised/classification/gradient-boosting.md) — Boosting + trees
- [Bias-Variance Tradeoff](bias-variance.md) — Why ensembles work
