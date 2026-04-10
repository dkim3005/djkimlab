---
title: "Transformer"
category: ai-ml/deep-learning/architectures
tags: [transformer, attention, self-attention, llm, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need a model for text or other sequences where long-range relationships
matter, and I want training to scale in parallel. This is the default
architecture behind modern language models and many multimodal systems.

## History

Vaswani et al. (2017) — 'Attention Is All You Need.' Google Brain. Originally for machine translation. Turned out to be the universal architecture for almost everything.

## Why It Exists

The "why" chain is:

- RNNs process one step at a time.
- That serial bottleneck makes training slow.
- Long-range dependencies are hard when information must hop through many steps.
- We want every token to access every other token directly.

The Transformer exists because attention gives direct context access and much
better parallelism than recurrence.

## How It Works

### Visual Intuition

Imagine a sentence as a table of tokens.

- each token asks, "which other tokens matter for me?"
- attention scores determine how strongly it should look at them
- the token builds a new representation by mixing information from the important tokens

Unlike an RNN, the model does not march left to right just to create context.
Context is available directly through attention.

The main timeline node is here:

-> [MLViz Node: Transformer](/projects/mlviz/transformer)

### Step by Step

1. Embed the tokens
2. Add positional information so order is not lost
3. Compute queries, keys, and values from the inputs
4. Use attention scores to mix information across tokens
5. Apply feed-forward layers to each position
6. Stack many layers to build richer representations

Encoder-only, decoder-only, and encoder-decoder variants all reuse this core
attention pattern.

## Code

```python
# concept sketch
# Q = X @ W_Q
# K = X @ W_K
# V = X @ W_V
# attention = softmax(Q @ K.T / sqrt(d_k)) @ V
```

## The Math Inside

Self-attention:

`Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V`

- `Q`: queries
- `K`: keys
- `V`: values
- `Q K^T`: similarity scores between tokens
- `sqrt(d_k)`: scale factor for stability

Multi-head attention repeats this with different learned projections so the
model can capture different types of relationships simultaneously.

Because attention itself is permutation-invariant, positional encodings or
positional embeddings are added so sequence order is still represented.

## Math Prerequisites

- [Dot Product](../../../math/linear-algebra/dot-product.md) - attention scores come from vector similarity
- [Vectors & Matrices](../../../math/linear-algebra/vectors-matrices.md) - token batches and projections
- [RNN / LSTM](rnn-lstm.md) - what the Transformer replaced
- [GPT](../models/gpt.md) and [BERT](../models/bert.md) - major model families built from the same core

## Related

- [RNN / LSTM](rnn-lstm.md) — What Transformer replaced
- [BERT](../models/bert.md) — Encoder-only Transformer
- [GPT](../models/gpt.md) — Decoder-only Transformer
- [ViT](../models/vit.md) — Transformer for images
- [Dot Product](../../../math/linear-algebra/dot-product.md) — QK^T is a dot product
