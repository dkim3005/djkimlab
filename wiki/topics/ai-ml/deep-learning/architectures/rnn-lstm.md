---
title: "RNN / LSTM / GRU"
category: ai-ml/deep-learning/architectures
tags: [rnn, lstm, gru, sequence, time-series, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

RNN: Rumelhart (1986). LSTM: Hochreiter & Schmidhuber (1997). GRU: Cho et al. (2014). Dominated sequence tasks until Transformers replaced them.

## Why It Exists

MLPs process fixed-size inputs. But language, audio, and time series are sequences of variable length. RNNs have a hidden state that carries information forward through time.

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

RNN: `h_t = tanh(W_h · h_{t-1} + W_x · x_t)`. Problem: vanishing gradients. LSTM adds gates: forget `f_t`, input `i_t`, output `o_t`, cell state `c_t`. GRU simplifies to 2 gates: reset, update.

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [MLP & Backprop](../fundamentals/mlp-backprop.md) — Base architecture
- [Transformer](transformer.md) — What replaced RNNs
- [BERT](../models/bert.md) — Transformer for understanding
- [Chain Rule](../../../math/calculus/chain-rule.md) — Why gradients vanish
