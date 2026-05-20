---
title: "Reinforcement Learning Lab — design notes"
category: projects
tags: [rl, dqn, mcts, alphazero, websocket]
created: 2026-05-20
updated: 2026-05-20
---

Technical companion to [/projects/rl](/projects/rl). For someone who
wants to know why DQN training and a Connect-4 arena share a UI.

## I Use This When...

I want one workbench where I can watch a DQN agent learn live, then
play against three different game-AI styles back-to-back — without
juggling three repos.

## Why DQN + game arena in one app, not two

Two strands of RL teaching usually live in different code:

- Value-based control on Gym environments (CartPole, Acrobot).
- Search-based game AI (minimax, MCTS, AlphaZero).

Putting them together makes the *conceptual map* easier to walk for a
new student. The DQN training loop and the AlphaZero Connect-4 network
both end up as "a network that estimates value", and watching the same
person flip between them surfaces the family resemblance.

## Why session-based training, not one global run

The API is explicitly session-scoped:

```
POST /api/train/start             -> { session_id }
GET  /api/train/{session_id}/status
POST /api/train/{session_id}/stop
WS   /ws/train/{session_id}
```

Each `POST /api/train/start` opens an independent training run with
its own hyperparams, replay buffer, env instance, and WS feed. Several
runs can proceed in parallel from different starting LRs without
contaminating each other's experience.

Sessions also make the demo *recoverable*. A bad hyperparam choice
doesn't poison the workbench — you stop that session and start a new
one. A single global run would have forced a full server restart.

## Why WebSocket for training telemetry, not polling

Reward / loss / epsilon climbing out of a flat region is the
pedagogical point of the live demo. Polling at 1 Hz smooths the very
dynamics you wanted to show, and polling at 10 Hz turns the metric
endpoint into an internal DOS. WebSocket is the right shape: push
each episode's summary the moment it lands, let the browser draw.

## Why three Connect-4 agents in one arena

Same board, three opponents:

- **alpha-beta minimax** — deterministic brute search, depth-limited.
- **MCTS** — sample-based search, exploration-exploitation via UCT.
- **AlphaZero-style self-play network** — a policy + value network
  trained by self-play.

You feel the difference between the three by playing them, not by
reading three papers. Minimax plays opaquely strong inside its depth
and silly outside it. MCTS plays "human-ish" — sometimes brilliant,
sometimes mid. The trained network plays with an opening preference.

## What broke first

> TODO: epsilon decay bug — the agent stayed exploratory forever and
> reward never converged. The WS stream made the bug visible *before*
> the code was — flat-with-noise instead of climb-with-noise. Fill in
> the exact decay schedule and the fix.

## What I'd rebuild

- PPO alongside DQN so the comparison covers on-policy vs off-policy.
- Persist past sessions to disk (currently in-memory) so a recruiter
  can browse a run they didn't start themselves.
- Auto-checkpoint the AlphaZero network at intervals and ship a
  "play this checkpoint vs that checkpoint" toggle.

## Related

- [Case study: RL Lab](/projects/rl)
- [Wiki: Q-Learning](/wiki/topics/ai-ml/reinforcement-learning/q-learning)
