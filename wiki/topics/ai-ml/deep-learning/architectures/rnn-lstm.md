---
title: "RNN / LSTM / GRU"
category: ai-ml/deep-learning/architectures
tags: [rnn, lstm, gru, sequence, time-series, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need a model for ordered data such as text, audio, logs, or time series, and
the order itself matters. RNNs and LSTMs are the classic way to carry state
through a sequence step by step.

## History

RNN: Rumelhart (1986). LSTM: Hochreiter & Schmidhuber (1997). GRU: Cho et al. (2014). Dominated sequence tasks until Transformers replaced them.

## Why It Exists

The "why" chain is:

- MLPs assume fixed-size inputs and no ordering.
- Sequence tasks need memory of what came before.
- A hidden state can carry context forward one token or timestep at a time.
- Plain RNNs struggle to remember far-away information.
- LSTM and GRU add gates to control memory explicitly.

These models exist because ordered data needs recurrence and memory, not just
static feature processing.

## How It Works

### Visual Intuition

Imagine reading a sentence word by word.

- at each step, the model sees the new token
- it updates an internal memory state
- that state carries forward what it thinks still matters

LSTM adds gates so the model can decide what to forget, what to keep, and what
to expose.

The sequence-memory era is represented here:

-> [MLViz Node: LSTM](/projects/mlviz/rnn-lstm)

### Step by Step

1. Start with an initial hidden state
2. Read one token or timestep at a time
3. Combine the current input with the previous hidden state
4. Produce a new hidden state
5. For LSTM/GRU, use gates to control memory flow
6. Repeat through the sequence and train with backpropagation through time

The recurrent state is the key mechanism: information can survive across many
steps if the architecture keeps it alive.

## Code

```python
# concept sketch
# for token in sequence:
#     h = rnn_cell(token, h)
# output = decoder(h)
```

## The Math Inside

Vanilla RNN update:

`h_t = tanh(W_h h_{t-1} + W_x x_t + b)`

- `x_t`: current input
- `h_{t-1}`: previous hidden state
- `h_t`: new hidden state

Problem:

- gradients must pass through many repeated steps
- repeated multiplication can make them vanish or explode

LSTM addresses this with gated memory:

- forget gate `f_t`
- input gate `i_t`
- output gate `o_t`
- cell state `c_t`

The core idea is not the exact formula set, but controlled memory flow. GRU
keeps the same spirit with fewer gates.

## Math Prerequisites

- [Chain Rule](../../../math/calculus/chain-rule.md) - why gradients pass repeatedly through time
- [MLP & Backprop](../fundamentals/mlp-backprop.md) - recurrent nets are trained with the same gradient logic
- [Transformer](transformer.md) - the architecture that replaced recurrence for many tasks

## Related

- [MLP & Backprop](../fundamentals/mlp-backprop.md) — Base architecture
- [Transformer](transformer.md) — What replaced RNNs
- [BERT](../models/bert.md) — Transformer for understanding
- [Chain Rule](../../../math/calculus/chain-rule.md) — Why gradients vanish
