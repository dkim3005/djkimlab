---
title: "GPT (Generative Pre-trained Transformer)"
category: ai-ml/deep-learning/models
tags: [gpt, llm, autoregressive, openai, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

GPT-1 (Radford, OpenAI 2018). GPT-2 (2019) — 'too dangerous to release.' GPT-3 (2020) — 175B params, few-shot learning emerges. GPT-4 (2023) — multimodal. ChatGPT (2022) — GPT-3.5 + RLHF, 100M users in 2 months.

## Why It Exists

BERT understands language but can't generate. GPT flips it: predict the next token, autoregressively. Turns out that next-token prediction at scale produces emergent capabilities nobody predicted.

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

Autoregressive: `P(x_1...x_n) = product(P(x_t | x_1...x_{t-1}))`. Causal attention mask: each token can only attend to previous tokens. Scale: more params + more data = emergent abilities.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Transformer](../architectures/transformer.md) — The architecture
- [BERT](bert.md) — Encoder-only alternative
- [RLHF](../../reinforcement-learning/rlhf.md) — How ChatGPT was aligned
- [Timeline](../../history/timeline.md) — The LLM era
