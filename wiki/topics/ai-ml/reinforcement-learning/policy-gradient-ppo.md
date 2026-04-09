---
title: "Policy Gradient & PPO"
category: ai-ml/reinforcement-learning
tags: [reinforcement-learning, policy-gradient, ppo, actor-critic]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

REINFORCE: Williams (1992). Actor-Critic: Sutton (1999). PPO: Schulman (OpenAI, 2017). PPO became the default RL algorithm — used in ChatGPT's RLHF.

## Why It Exists

DQN learns value (how good is this state?), then derives policy. Policy gradient directly learns the policy (what action to take). More natural for continuous action spaces.

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

REINFORCE: `∇J(θ) = E[∇log π(a|s;θ) · R]`. High variance → add baseline (advantage). PPO clips the update: `L = min(r_t·A_t, clip(r_t, 1±ε)·A_t)` — prevents too-large updates.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Q-Learning](q-learning.md) — Value-based alternative
- [DQN](dqn.md) — Value-based + neural net
- [RLHF](rlhf.md) — PPO applied to LLM alignment
