---
title: "Constrained Optimization"
category: math/optimization
tags: [optimization, constrained, kkt, dual]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need to optimize an objective under rules such as budgets, positivity,
probability constraints, or geometric margins. In ML, many elegant models are
really constrained optimization problems in disguise.

## Why It Exists

The "why" chain is:

- Real optimization is rarely unconstrained.
- Some solutions are mathematically good but invalid.
- Constraints define which solutions are feasible.
- We need methods that optimize without leaving the feasible set.

Constrained optimization exists because "best possible" only matters inside the
allowed region.

## Visual Intuition

Imagine a landscape where only one region is legal. The objective may want to go
downhill somewhere outside that region, but the optimizer must stay within the
constraint boundary.

So the solution is often on the boundary itself, where objective pressure and
constraint pressure balance out.

## How It Works

1. Write the objective `f(x)`
2. Write equality constraints `g_i(x) = 0` and inequality constraints `h_j(x) <= 0`
3. Define the feasible set
4. Use Lagrange multipliers or KKT conditions
5. Solve the primal problem directly or move to a dual problem

The dual view is often easier and more revealing in ML.

## The Math Inside

Generic constrained problem:

`min f(x)`

subject to

`g_i(x) = 0`

`h_j(x) <= 0`

For inequality constraints, the Karush-Kuhn-Tucker conditions extend the
Lagrange multiplier idea.

Core KKT ingredients:

- stationarity
- primal feasibility
- dual feasibility
- complementary slackness

Complementary slackness is the especially important one:

- if a constraint is inactive, its multiplier is zero
- if a multiplier is positive, the constraint is active at the solution

This is exactly the logic behind support vectors in SVM: only the active margin
constraints matter in the final solution.

## Examples

- SVM: maximize margin subject to every point staying outside the margin band
- Portfolio optimization: maximize return under risk and budget constraints
- Probability models: probabilities must sum to `1`

## Code

```python
# generic recipe:
# define objective
# define constraints
# solve primal or derive dual/KKT system
```

## Used In

- [Lagrange Multipliers](lagrange-multipliers.md) — Equality constraints
- [SVM](../../ai-ml/supervised/classification/svm.md) — Inequality constraints (margin)
- [RLHF](../../ai-ml/reinforcement-learning/rlhf.md) — KL constraint
