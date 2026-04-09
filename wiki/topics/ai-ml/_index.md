---
title: "AI/ML — The Complete Map"
category: ai-ml
tags: [overview, ai, ml, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## What Is AI/ML?

Machine Learning is a subset of AI where systems learn patterns from data instead of being explicitly programmed. Deep Learning is a subset of ML using neural networks with many layers.

```
AI (Artificial Intelligence)
 └── ML (Machine Learning)
      ├── Supervised Learning      labeled data → predict
      │    ├── Regression          predict a number
      │    └── Classification      predict a category
      ├── Unsupervised Learning    no labels → find structure
      │    ├── Clustering          group similar data
      │    └── Dimensionality Reduction   compress data
      ├── Deep Learning            neural networks with depth
      │    ├── CNN                 images
      │    ├── RNN / LSTM         sequences
      │    ├── Transformer        attention-based (LLMs)
      │    ├── GAN                generate data
      │    └── Diffusion          generate images
      └── Reinforcement Learning   learn by trial and error
           ├── Q-Learning         value-based
           ├── Policy Gradient    policy-based
           └── RLHF              align AI with humans
```

## The Historical Arc

Every model exists because the previous one had a limitation. See [Timeline](history/timeline.md) for the full story.

```
Statistics (1800s)
  → Perceptron (1958) — "mimic the brain"
    → AI Winter — "it doesn't work"
      → Decision Trees, SVM (1980-90s) — "try something else"
        → Backprop revival (1986) — "neural nets can learn"
          → Deep Learning (2012) — "GPUs change everything"
            → Transformer (2017) — "attention is all you need"
              → LLMs (2020s) — "scale is all you need"
```

## Learning Path

Start from what you use, drill down to why it works:

1. **I use it** — What does this model do in practice?
2. **Why it exists** — What problem did it solve that others couldn't?
3. **Visualize** — Interactive demo, see it work
4. **Code** — Implement it yourself
5. **Math inside** — The equation it optimizes
6. **Math foundations** — The prerequisite knowledge

## Topics

### Supervised Learning
- [Linear Regression](supervised/regression/linear-regression.md) — Where it all began
- [Polynomial / Ridge / Lasso](supervised/regression/polynomial-ridge-lasso.md) — When a straight line isn't enough
- [Logistic Regression](supervised/classification/logistic-regression.md) — Classification with probabilities
- [k-NN](supervised/classification/knn.md) — Simplest classifier: follow your neighbors
- [Naive Bayes](supervised/classification/naive-bayes.md) — Bayes' theorem in action
- [Decision Tree](supervised/classification/decision-tree.md) — Human-readable rules
- [Random Forest](supervised/classification/random-forest.md) — Wisdom of crowds
- [Gradient Boosting / XGBoost](supervised/classification/gradient-boosting.md) — Kaggle's weapon of choice
- [SVM](supervised/classification/svm.md) — The mathematically optimal boundary

### Unsupervised Learning
- [k-Means](unsupervised/clustering/k-means.md) — Find groups without labels
- [Hierarchical Clustering](unsupervised/clustering/hierarchical.md) — Tree-shaped grouping
- [DBSCAN](unsupervised/clustering/dbscan.md) — Density-based clustering
- [GMM](unsupervised/clustering/gmm.md) — Probabilistic clustering
- [PCA](unsupervised/dimensionality-reduction/pca.md) — Compress dimensions
- [t-SNE](unsupervised/dimensionality-reduction/t-sne.md) — Visualize high dimensions
- [UMAP](unsupervised/dimensionality-reduction/umap.md) — Faster, better t-SNE
- [Autoencoder](unsupervised/dimensionality-reduction/autoencoder.md) — Neural compression

### Deep Learning
- [Perceptron](deep-learning/fundamentals/perceptron.md) — The first neuron
- [MLP & Backpropagation](deep-learning/fundamentals/mlp-backprop.md) — Learning to learn
- [CNN](deep-learning/architectures/cnn.md) — See like a machine
- [RNN / LSTM / GRU](deep-learning/architectures/rnn-lstm.md) — Remember sequences
- [Transformer](deep-learning/architectures/transformer.md) — Attention is all you need
- [GAN](deep-learning/architectures/gan.md) — Create by competing
- [Diffusion Models](deep-learning/architectures/diffusion.md) — Create from noise
- [AlexNet → ResNet](deep-learning/models/alexnet-resnet.md) — The ImageNet revolution
- [BERT](deep-learning/models/bert.md) — Understanding language
- [GPT](deep-learning/models/gpt.md) — Generating language
- [ViT](deep-learning/models/vit.md) — Transformer meets vision

### Reinforcement Learning
- [Q-Learning](reinforcement-learning/q-learning.md) — Learn by reward
- [DQN](reinforcement-learning/dqn.md) — Q-Learning + Neural Network
- [Policy Gradient / PPO](reinforcement-learning/policy-gradient-ppo.md) — Learn the strategy directly
- [RLHF](reinforcement-learning/rlhf.md) — Aligning AI with humans

### Foundations (Cross-cutting)
- [Bias-Variance Tradeoff](foundations/bias-variance.md)
- [Loss Functions](foundations/loss-functions.md)
- [Optimization (SGD → Adam)](foundations/optimization.md)
- [Regularization](foundations/regularization.md)
- [Model Evaluation](foundations/evaluation.md)
- [Ensemble Methods](foundations/ensemble-methods.md)

### Math Foundations → [Math Wiki](../math/_index.md)
