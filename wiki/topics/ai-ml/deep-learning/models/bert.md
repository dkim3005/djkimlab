---
title: "BERT"
category: ai-ml/deep-learning/models
tags: [bert, nlp, transformer, pre-training, deep-learning]
created: 2026-04-08
updated: 2026-04-08
---

## I Use This When...

<!-- Practical use case -->

## History

Devlin et al. (Google, 2018). 'Bidirectional Encoder Representations from Transformers.' Changed NLP overnight — every benchmark was broken within months.

## Why It Exists

Previous models read text left-to-right. BERT reads both directions simultaneously. Pre-train on massive text (masked language model), then fine-tune on any task with a small labeled dataset.

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

Masked LM: randomly mask 15% of tokens, predict them. NSP: predict if sentence B follows sentence A. Architecture: Transformer encoder stack (12 or 24 layers).

## Math Prerequisites

<!-- Links to math wiki -->

## Related

- [Transformer](../architectures/transformer.md) — The architecture
- [GPT](gpt.md) — Decoder-only alternative
- [Timeline](../../history/timeline.md) — The NLP revolution
