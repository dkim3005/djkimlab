---
title: "Transformer"
category: ai-ml/deep-learning/architectures
tags: [transformer, attention, self-attention, llm, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Vaswani et al. (2017) — 'Attention Is All You Need.' Google Brain. Originally for machine translation. Turned out to be the universal architecture for almost everything.

## Why It Exists

RNNs process sequences one token at a time — slow and forgets long-range dependencies. The Transformer processes all tokens in parallel using self-attention: every token can directly attend to every other token.

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

Self-Attention: `Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) · V`. Q=query, K=key, V=value — all linear projections of the input. Multi-head: run attention h times with different projections. Positional encoding adds sequence order.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [RNN / LSTM](rnn-lstm.md) — What Transformer replaced
- [BERT](../models/bert.md) — Encoder-only Transformer
- [GPT](../models/gpt.md) — Decoder-only Transformer
- [ViT](../models/vit.md) — Transformer for images
- [Dot Product](../../../math/linear-algebra/dot-product.md) — QK^T is a dot product
