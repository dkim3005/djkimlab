---
title: "Math for ML — The Complete Map"
category: math
tags: [overview, math, foundations]
created: 2026-04-08
updated: 2026-04-08
---

## Why Math?

Every ML algorithm is an equation being optimized. Understanding the math lets you:
- Debug models (why is loss not decreasing?)
- Choose the right algorithm (what assumptions does it make?)
- Read papers (the field communicates in math)
- Invent new approaches (you can't improve what you don't understand)

## The Four Pillars

```
Probability & Statistics     "How certain are we?"
  → Bayes, distributions, MLE
  → Used in: Naive Bayes, GMM, Bayesian methods

Linear Algebra               "How do we represent and transform data?"
  → Vectors, matrices, eigenvalues
  → Used in: PCA, neural networks, SVD

Calculus & Optimization      "How do we find the best parameters?"
  → Gradients, chain rule, gradient descent
  → Used in: literally everything that trains

Information Theory           "How do we measure uncertainty?"
  → Entropy, KL divergence, cross-entropy
  → Used in: decision trees, loss functions, VAEs
```

## Topics

### Probability & Statistics
- [Bayes' Theorem](probability/bayes-theorem.md) — Updating beliefs with evidence
- [Probability Distributions](probability/distributions.md) — Gaussian, Bernoulli, Poisson, etc.
- [MLE & MAP](probability/mle-map.md) — Finding the most likely parameters
- [Conditional Independence](probability/conditional-independence.md) — The 'naive' in Naive Bayes

### Linear Algebra
- [Vectors & Matrices](linear-algebra/vectors-matrices.md) — The language of data
- [Eigenvalues & Eigenvectors](linear-algebra/eigenvalues.md) — Directions that don't change
- [Dot Product & Projection](linear-algebra/dot-product.md) — Similarity and shadows
- [Matrix Decomposition (SVD)](linear-algebra/matrix-decomposition.md) — Breaking matrices apart

### Calculus & Optimization
- [Derivatives & Gradients](calculus/derivatives-gradient.md) — Slope in multiple dimensions
- [Chain Rule](calculus/chain-rule.md) — Why backpropagation works
- [Partial Derivatives](calculus/partial-derivatives.md) — Changing one variable at a time
- [Taylor Approximation](calculus/taylor-approximation.md) — Local approximations (used in XGBoost)
- [Gradient Descent](optimization/gradient-descent.md) — Walking downhill
- [Convex Optimization](optimization/convex-optimization.md) — When there's one global minimum
- [Lagrange Multipliers](optimization/lagrange-multipliers.md) — Optimization with constraints (SVM)
- [Constrained Optimization](optimization/constrained-optimization.md) — The general framework

### Information Theory
- [Entropy](information-theory/entropy.md) — Measuring surprise
- [KL Divergence](information-theory/kl-divergence.md) — Distance between distributions
- [Cross-Entropy](information-theory/cross-entropy.md) — The most common classification loss
