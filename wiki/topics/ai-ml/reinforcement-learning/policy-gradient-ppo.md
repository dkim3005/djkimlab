---
title: "Policy Gradient & PPO"
category: ai-ml/reinforcement-learning
tags: [reinforcement-learning, policy-gradient, ppo, actor-critic]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I want to optimize the policy directly, especially when the action space is
continuous, large, or awkward for value-based methods. PPO is a common default
when stable on-policy reinforcement learning is needed.

## History

REINFORCE: Williams (1992). Actor-Critic: Sutton (1999). PPO: Schulman (OpenAI, 2017). PPO became the default RL algorithm — used in ChatGPT's RLHF.

## Why It Exists

The "why" chain is:

- Value-based methods estimate how good actions are.
- But some problems care more about directly improving the action distribution itself.
- Continuous actions make argmax over actions awkward.
- Direct policy optimization can be simpler conceptually.
- PPO exists because naive policy updates are unstable and can move too far.

Policy gradients exist to learn behavior directly. PPO exists to keep those
updates under control.

## How It Works

### Visual Intuition

Imagine a policy as a probability distribution over actions.

- if a trajectory leads to good outcomes, the policy should make those actions more likely
- if outcomes are bad, it should make them less likely
- but if updates are too large, the policy can collapse or become unstable

PPO adds a trust-region-like clip so the new policy cannot move too far from the
old one in one step.

### Step by Step

1. Roll out trajectories using the current policy
2. Estimate returns or advantages from those trajectories
3. Compute how the new policy differs from the old policy
4. Improve the policy using the policy-gradient objective
5. In PPO, clip the update ratio to prevent overly aggressive changes
6. Repeat

The clip is the key stabilizer that made PPO popular in practice.

## Code

```python
# concept sketch
# ratio = pi_theta(a|s) / pi_theta_old(a|s)
# objective = min(ratio * A, clip(ratio, 1-eps, 1+eps) * A)
```

## The Math Inside

Policy-gradient core idea:

`grad J(theta) = E[grad log pi_theta(a|s) * R]`

In practice, we replace raw return `R` with an advantage estimate `A_t` to
reduce variance.

PPO objective:

`L = min(r_t A_t, clip(r_t, 1 - eps, 1 + eps) A_t)`

where

`r_t = pi_theta(a_t|s_t) / pi_theta_old(a_t|s_t)`

The clip prevents the new policy from drifting too far from the old one in one
optimization round.

That small design choice is why PPO became a practical default in many RL
systems, including RLHF pipelines.

## Math Prerequisites

- [Q-Learning](q-learning.md) - value-based alternative
- [Gradient Descent](../../math/optimization/gradient-descent.md) - optimization step intuition
- [RLHF](rlhf.md) - major modern use of PPO

## Related

- [Q-Learning](q-learning.md) — Value-based alternative
- [DQN](dqn.md) — Value-based + neural net
- [RLHF](rlhf.md) — PPO applied to LLM alignment
