---
title: "Q-Learning"
category: ai-ml/reinforcement-learning
tags: [reinforcement-learning, q-learning, value-function, bellman]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need an agent to learn from reward instead of labeled answers, especially in
discrete environments like grid worlds, simple games, or control problems with
a manageable state-action space.

## History

Christopher Watkins (1989). Proved convergence to optimal policy. TD-Gammon (Tesauro 1992) showed it could master backgammon via self-play.

## Why It Exists

The "why" chain is:

- In many environments, there is no correct label for each step.
- The only signal is reward, often delayed.
- We need a way to estimate whether taking one action now will pay off later.
- Instead of learning the answer directly, we learn action values.

Q-Learning exists because reward-based decision making needs value estimates,
not labeled targets.

## How It Works

### Visual Intuition

Imagine a grid world with a goal tile and a penalty tile.

- the agent tries actions
- some moves eventually lead to reward
- others lead to dead ends or penalties
- over time, each state-action pair gets a score

Those scores become a map of "how promising is this move from here?"

The reinforcement-learning timeline node is here:

-> [MLViz Node: Q-Learning](/projects/mlviz/q-learning)

### Step by Step

1. Start with a Q-table initialized arbitrarily
2. Observe the current state `s`
3. Choose an action `a`, often with exploration
4. Receive reward `r` and next state `s'`
5. Update `Q(s, a)` toward the observed reward plus future estimate
6. Repeat across many episodes

The agent never sees the true optimal policy directly. It bootstraps toward it
from its own estimates.

## Code

```python
Q[s, a] = Q[s, a] + alpha * (
    r + gamma * max_a_prime(Q[s_next, a_prime]) - Q[s, a]
)
```

## The Math Inside

Bellman optimality target:

`Q*(s, a) = r + gamma max_a' Q*(s', a')`

Q-Learning update:

`Q(s, a) <- Q(s, a) + alpha [r + gamma max_a' Q(s', a') - Q(s, a)]`

- `alpha`: learning rate
- `gamma`: discount factor
- `max_a' Q(s', a')`: best estimated future value

The bracketed term is the temporal-difference error. It measures how surprised
the current estimate is after seeing one more step of experience.

With enough exploration and the right assumptions, tabular Q-Learning converges
to the optimal action-value function.

## Math Prerequisites

- [Gradient Descent](../../math/optimization/gradient-descent.md) - general update intuition, even though tabular Q-Learning is not gradient-based
- [DQN](dqn.md) - what happens when the Q-table no longer scales
- [Policy Gradient / PPO](policy-gradient-ppo.md) - the direct policy alternative

## Related

- [DQN](dqn.md) — Q-Learning + Neural Network
- [Policy Gradient / PPO](policy-gradient-ppo.md) — Alternative: learn policy directly
- [Timeline](../history/timeline.md) — RL in the broader AI story
