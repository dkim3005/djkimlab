---
title: "Reinforcement Learning Lab — design notes"
category: projects
tags: [rl, dqn, mcts, alphazero, websocket]
created: 2026-05-20
status: skeleton
---

Technical companion to [/projects/rl](/projects/rl). For someone who
wants to know why DQN training and a Connect-4 arena live in the same UI.

## I Use This When...

I want one workbench where I can watch a DQN agent learn live, then
play against three different game-AI styles back-to-back to feel the
difference.

## Why DQN + game arena in one app, not two

> TODO: two RL strands (value-based control, search-based game AI)
> usually live in different repos. Putting them together makes the
> conceptual map easier to walk for a new student.

## Why WebSocket for training telemetry, not polling

> TODO: reward / loss climbing out of a flat region is the
> pedagogical point. Polling at 1Hz smooths the very dynamics you
> wanted to show.

## Why three Connect-4 agents (minimax, MCTS, AlphaZero-style)

> TODO: same board, three opponents — feels the difference between
> brute search, sample-based search, and a trained policy without
> reading three papers.

## What broke first

> TODO: epsilon decay bug — agent stayed exploratory forever and
> reward curve never converged. How the bug was visible in the live
> stream before it was visible in code.

## What I'd rebuild

> TODO: PPO alongside DQN (on-policy comparison), persisted session
> history so a recruiter can browse a run they didn't start.

## Related

- [Case study: RL Lab](/projects/rl)
- [Wiki: Q-Learning](/wiki/topics/ai-ml/reinforcement-learning/q-learning)
