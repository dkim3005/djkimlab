---
title: "Decision Tree"
category: ai-ml/supervised/classification
tags: [classification, decision-tree, entropy, gini, interpretable, supervised]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case: when and why you'd reach for this model -->

## History

Quinlan (1986) — ID3 algorithm, then C4.5. Breiman et al. (1984) — CART. The first widely used interpretable ML model.

## Why It Exists

Humans naturally think in if-then rules. Decision trees learn these rules from data. You can read the tree and understand exactly why a prediction was made.

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

At each node, choose the split that maximizes information gain. Entropy: `H = -sum(p_i * log2(p_i))`. Gini: `G = 1 - sum(p_i^2)`.

## Math Prerequisites

<!-- Links to math wiki articles needed to understand this -->

## Related

- [Random Forest](random-forest.md) — Many trees combined
- [Gradient Boosting](gradient-boosting.md) — Trees that fix each other
- [Entropy](../../../math/information-theory/entropy.md) — The math of uncertainty
- [Ensemble Methods](../../foundations/ensemble-methods.md) — Why combining works
