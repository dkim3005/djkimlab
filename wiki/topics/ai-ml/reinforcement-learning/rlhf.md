---
title: "RLHF (Reinforcement Learning from Human Feedback)"
category: ai-ml/reinforcement-learning
tags: [reinforcement-learning, rlhf, alignment, chatgpt, llm]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Christiano et al. (2017) — original framework. InstructGPT (Ouyang et al., OpenAI 2022) — applied to GPT-3. ChatGPT (2022) — RLHF at scale, changed everything.

## Why It Exists

Pre-trained LLMs can generate text but don't follow instructions well, can be toxic, or hallucinate. RLHF fine-tunes the model to align with human preferences using reward signals.

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

3 steps: (1) Supervised fine-tuning on human-written examples. (2) Train reward model: humans rank outputs, model learns preference scores. (3) PPO optimization: maximize reward while staying close to base model (KL penalty).

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [GPT](../deep-learning/models/gpt.md) — The model being aligned
- [Policy Gradient / PPO](policy-gradient-ppo.md) — The optimization algorithm
- [KL Divergence](../../math/information-theory/kl-divergence.md) — Constraining the update
