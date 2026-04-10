---
title: "Decision Tree"
category: ai-ml/supervised/classification
tags: [classification, decision-tree, entropy, gini, interpretable, supervised]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want a model that reads like a sequence of questions: "Is income above this
threshold?", "Is age below this value?", "Did the user click before?". Decision
trees are useful when interpretability matters and the data is tabular.

## History

Quinlan (1986) — ID3 algorithm, then C4.5. Breiman et al. (1984) — CART. The first widely used interpretable ML model.

## Why It Exists

The "why" chain is:

- Humans naturally reason with yes/no questions.
- A linear boundary is often too rigid.
- We want a model that can carve space with a sequence of local decisions.
- We also want to read the model after training and see why it predicted what it did.

Decision trees exist because rule-based splits are both flexible and
interpretable.

## How It Works

### Visual Intuition

Imagine a scatter plot with mixed classes. One vertical split separates some of
the data. Inside each side, another split separates it further. Each split asks
one simple question, and together those questions form a tree.

Unlike a single line, a tree can produce box-like decision regions by stacking
many local rules.

The corresponding timeline node already exists here:

-> [MLViz Node: Decision Tree](/projects/mlviz/decision-tree)

### Step by Step

1. Start with all training examples at the root
2. Consider many candidate splits such as `feature <= threshold`
3. Score each split by how much it reduces impurity
4. Pick the best split and divide the data
5. Repeat recursively until a stopping rule is met

Leaves become predictions. For classification, a leaf often predicts the
majority class or class probabilities for the samples that reached it.

## Code

```python
def gini(labels):
    counts = {}
    for y in labels:
        counts[y] = counts.get(y, 0) + 1
    n = len(labels)
    return 1.0 - sum((count / n) ** 2 for count in counts.values())


# Sketch:
# for each feature and threshold:
#   split data into left/right
#   compute weighted impurity
# choose split with lowest impurity
```

## The Math Inside

At each node, choose the split that reduces uncertainty the most.

Entropy:

`H = -sum p_i log2(p_i)`

- low entropy: one class dominates
- high entropy: the classes are mixed

Information gain:

`IG = H(parent) - [w_left H(left) + w_right H(right)]`

So a good split makes each child node purer than the parent.

Another common impurity measure is Gini:

`G = 1 - sum p_i^2`

Trees usually optimize one of these impurity scores greedily, one node at a
time.

## Math Prerequisites

- [Entropy](../../../math/information-theory/entropy.md) - why uncertainty matters for splitting
- [Loss Functions](../../foundations/loss-functions.md) - impurity as an objective
- [Ensemble Methods](../../foundations/ensemble-methods.md) - what happens when many trees are combined

## Related

- [Random Forest](random-forest.md) — Many trees combined
- [Gradient Boosting](gradient-boosting.md) — Trees that fix each other
- [Entropy](../../../math/information-theory/entropy.md) — The math of uncertainty
- [Ensemble Methods](../../foundations/ensemble-methods.md) — Why combining works
