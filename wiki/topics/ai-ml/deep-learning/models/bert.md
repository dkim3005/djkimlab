---
title: "BERT"
category: ai-ml/deep-learning/models
tags: [bert, nlp, transformer, pre-training, deep-learning]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I need strong language understanding rather than free-form generation. BERT-style
models are useful for classification, tagging, retrieval, semantic matching,
question answering, and other tasks where reading both left and right context
helps.

## History

Devlin et al. (Google, 2018). 'Bidirectional Encoder Representations from Transformers.' Changed NLP overnight — every benchmark was broken within months.

## Why It Exists

The "why" chain is:

- Many NLP tasks depend on full context, not just the prefix.
- Left-to-right language models are not ideal for pure understanding tasks.
- We want a model that can use both left and right context at once.
- We also want pretraining so downstream tasks need less labeled data.

BERT exists because understanding language often needs bidirectional context and
task transfer.

## How It Works

### Visual Intuition

Imagine a sentence with one token hidden.

- the model sees the words before and after the blank
- it uses both directions of context to infer the missing token
- repeating this across huge corpora teaches rich contextual representations

Instead of learning to continue text like GPT, BERT learns to reconstruct and
understand context from all sides.

The timeline node is here:

-> [MLViz Node: BERT](/projects/mlviz/bert)

### Step by Step

1. Tokenize text and add special tokens
2. Randomly mask some input tokens during pretraining
3. Run the whole sequence through a Transformer encoder stack
4. Predict the masked tokens from bidirectional context
5. Fine-tune the pretrained encoder on downstream tasks

The pretrained encoder becomes a reusable language understanding backbone.

## Code

```python
# concept sketch
# mask some tokens
# encoded = bert_encoder(tokens_with_masks)
# loss = masked_lm_loss(encoded, masked_targets)
```

## The Math Inside

Core pretraining objective:

- randomly mask a subset of tokens
- predict the original masked tokens from the full surrounding context

Architecture:

- encoder-only Transformer stack
- every token can attend to every other token
- no causal mask, because bidirectional context is allowed

Historically, BERT also used next sentence prediction (NSP), but the larger
lesson is the masked-language-model objective plus fine-tuning paradigm.

That design made pretrained language understanding reusable across many tasks
without training a new architecture from scratch each time.

## Math Prerequisites

- [Transformer](../architectures/transformer.md) - the encoder architecture underneath
- [Cross-Entropy](../../../math/information-theory/cross-entropy.md) - masked token prediction loss
- [GPT](gpt.md) - the autoregressive alternative for generation

## Related

- [Transformer](../architectures/transformer.md) — The architecture
- [GPT](gpt.md) — Decoder-only alternative
- [Timeline](../../history/timeline.md) — The NLP revolution
