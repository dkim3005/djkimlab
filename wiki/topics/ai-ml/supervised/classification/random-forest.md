---
title: "Random Forest"
category: ai-ml/supervised/classification
tags: [classification, random-forest, ensemble, bagging, supervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want a strong tabular baseline with minimal tuning, and I care more about
reliable performance than perfect interpretability. Random forests are often a
safe first model when a single tree is too unstable.

## History

Breiman (2001). Combined bagging with random feature selection. Still one of the most reliable out-of-the-box models 25 years later.

## Why It Exists

The "why" chain is:

- A single decision tree is easy to understand, but it overfits easily.
- Small data changes can produce a very different tree.
- We want the flexibility of trees without that instability.
- So we train many trees on different random views of the data.
- Then we average or vote across them.

Random forests exist because many unstable but diverse trees together are much
more reliable than one tree alone.

## How It Works

### Visual Intuition

Imagine cloning the training process hundreds of times.

- each tree sees a bootstrap sample of the rows
- each split only sees a random subset of the features
- each tree makes its own prediction
- the forest takes a vote

One tree may be wrong for noisy reasons, but many trees tend to wash out those
individual quirks.

The corresponding timeline node already exists here:

-> [MLViz Node: Decision Tree / Forest Era](/projects/mlviz/decision-tree)

### Step by Step

1. Draw a bootstrap sample from the training set
2. Train a decision tree on that sample
3. At each split, consider only a random subset of features
4. Repeat to build many trees
5. Aggregate predictions by majority vote or averaging

The randomness is not a bug. It is how the forest creates diversity across
trees.

## Code

```python
forest = []
for _ in range(num_trees):
    sample = bootstrap_sample(train_data)
    tree = train_tree(sample, max_features="sqrt")
    forest.append(tree)

# classification prediction:
# vote across tree.predict(x)
```

## The Math Inside

Two key ingredients:

Bagging:

- train each tree on a bootstrap sample, meaning rows are sampled with replacement
- averaging predictions reduces variance

Random subspace:

- at each split, only a subset of features is allowed to compete
- this prevents all trees from making the same early split

If all trees were identical, averaging would not help much. Random feature
selection keeps them diverse enough for aggregation to matter.

## Math Prerequisites

- [Decision Tree](decision-tree.md) - the base learner inside the forest
- [Ensemble Methods](../../foundations/ensemble-methods.md) - why bagging works
- [Bias-Variance Tradeoff](../../foundations/bias-variance.md) - random forest mostly attacks variance

## Related

- [Decision Tree](decision-tree.md) — The building block
- [Gradient Boosting](gradient-boosting.md) — Sequential alternative
- [Bias-Variance Tradeoff](../../foundations/bias-variance.md) — Why bagging reduces variance
- [Ensemble Methods](../../foundations/ensemble-methods.md) — Bagging vs boosting vs stacking
