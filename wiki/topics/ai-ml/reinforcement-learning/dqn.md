---
title: "Deep Q-Network (DQN)"
category: ai-ml/reinforcement-learning
tags: [reinforcement-learning, dqn, atari, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Mnih et al. (DeepMind, 2013/2015). Played Atari games from raw pixels. Published in Nature. DeepMind acquired by Google for $500M shortly after.

## Why It Exists

Q-table doesn't scale — can't store Q-values for every possible state (e.g., every possible screen pixel combination). Replace the table with a neural network.

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

Neural net approximates Q: `Q(s,a;θ) ≈ Q*(s,a)`. Key tricks: experience replay (store transitions, sample randomly) + target network (stabilize training by updating slowly).

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Q-Learning](q-learning.md) — The tabular foundation
- [Policy Gradient / PPO](policy-gradient-ppo.md) — Policy-based alternative
- [MLP & Backprop](../deep-learning/fundamentals/mlp-backprop.md) — The neural network inside
