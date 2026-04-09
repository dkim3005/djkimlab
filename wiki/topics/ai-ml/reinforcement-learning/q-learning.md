---
title: "Q-Learning"
category: ai-ml/reinforcement-learning
tags: [reinforcement-learning, q-learning, value-function, bellman]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Christopher Watkins (1989). Proved convergence to optimal policy. TD-Gammon (Tesauro 1992) showed it could master backgammon via self-play.

## Why It Exists

Supervised learning needs labeled data. But in games, robotics, and control, there are no labels — only rewards. Q-Learning learns which actions are valuable by trial and error.

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

Q-value update: `Q(s,a) = Q(s,a) + α[r + γ·max_a' Q(s',a') - Q(s,a)]`. Bellman equation: `Q*(s,a) = r + γ·max_a' Q*(s',a')`. Converges to optimal Q with enough exploration.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [DQN](dqn.md) — Q-Learning + Neural Network
- [Policy Gradient / PPO](policy-gradient-ppo.md) — Alternative: learn policy directly
- [Timeline](../history/timeline.md) — RL in the broader AI story
