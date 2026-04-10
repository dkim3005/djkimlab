---
title: "GPT (Generative Pre-trained Transformer)"
category: ai-ml/deep-learning/models
tags: [gpt, llm, autoregressive, openai, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need a model that generates text, code, or structured tokens one step at a
time. GPT-style models are the standard choice when the task is completion,
dialogue, generation, tool calling, or open-ended reasoning through token
prediction.

## History

GPT-1 (Radford, OpenAI 2018). GPT-2 (2019) — 'too dangerous to release.' GPT-3 (2020) — 175B params, few-shot learning emerges. GPT-4 (2023) — multimodal. ChatGPT (2022) — GPT-3.5 + RLHF, 100M users in 2 months.

## Why It Exists

The "why" chain is:

- We want a model that can continue text coherently.
- Bidirectional encoders are strong at understanding but not natural generators.
- If we predict the next token repeatedly, generation becomes a unified training objective.
- Scaling that objective turns out to produce broad language competence.

GPT exists because next-token prediction is a simple objective that unlocks
general-purpose generation.

## How It Works

### Visual Intuition

Imagine text being written one token at a time.

- the model sees the prefix so far
- it predicts a distribution over the next token
- one token is chosen
- that token is appended to the context
- the process repeats

The model is always solving the same local task, but the repeated loop creates
paragraphs, code, dialogue, and reasoning traces.

The timeline node is here:

-> [MLViz Node: GPT](/projects/mlviz/gpt)

### Step by Step

1. Tokenize the input sequence
2. Embed the tokens and their positions
3. Run them through a decoder-only Transformer
4. Use a causal mask so each position only attends to earlier positions
5. Predict the next-token distribution
6. Train by minimizing cross-entropy on the true next token

Inference just repeats the next-token step autoregressively.

## Code

```python
# concept sketch
# for t in range(len(tokens) - 1):
#     probs = model(tokens[: t + 1])
#     loss += cross_entropy(probs[-1], tokens[t + 1])
```

## The Math Inside

Autoregressive factorization:

`P(x_1, ..., x_n) = product_t P(x_t | x_1, ..., x_{t-1})`

This turns sequence modeling into repeated conditional prediction.

GPT uses:

- decoder-only Transformer blocks
- causal attention mask so token `t` cannot look ahead
- cross-entropy loss on the next true token

Why this matters:

- one training objective covers many text tasks
- pretraining on huge corpora builds reusable representations
- instruction tuning and RLHF can then reshape the behavior for assistant use

The surprising part historically is that scale made this simple objective far
more capable than many people expected.

## Math Prerequisites

- [Transformer](../architectures/transformer.md) - the architecture GPT is built on
- [Cross-Entropy](../../../math/information-theory/cross-entropy.md) - the next-token training loss
- [RLHF](../../reinforcement-learning/rlhf.md) - how assistant behavior is aligned after pretraining

## Related

- [Transformer](../architectures/transformer.md) — The architecture
- [BERT](bert.md) — Encoder-only alternative
- [RLHF](../../reinforcement-learning/rlhf.md) — How ChatGPT was aligned
- [Timeline](../../history/timeline.md) — The LLM era
