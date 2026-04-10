---
title: "The History of AI/ML — A Timeline"
category: ai-ml/history
tags: [history, timeline, overview]
created: 2026-04-08
updated: 2026-04-08
---

## The Big Picture

Every major model was born from frustration with the previous one. This is the story of that chain.

For a click-through version of that chain, open the [interactive timeline](/projects/mlviz).

## 1800s — The Statistical Roots

**Least Squares (Legendre 1805, Gauss 1809)**
The idea that you can fit a line to data by minimizing error. This single concept underpins nearly everything in ML.

## 1950s — The Birth of AI

**Perceptron (Rosenblatt 1958)**
Inspired by biological neurons. A single artificial neuron that can learn to classify. Media hype: "the machine that thinks."

**The XOR Problem (Minsky & Papert 1969)**
Proved a single perceptron cannot learn XOR (a simple non-linear pattern). This one paper killed neural network funding for a decade.

## 1970s — The First AI Winter

Funding dried up. "Neural networks are a dead end." Researchers moved to symbolic AI and expert systems.

## 1980s — The Quiet Revival

**Backpropagation (Rumelhart, Hinton, Williams 1986)**
The algorithm that makes multi-layer neural networks trainable. Existed since the 1960s but wasn't applied to neural nets until now.

**Decision Trees (Quinlan 1986 — ID3, C4.5)**
A completely different approach: learn rules, not weights. Human-readable. Became the go-to for interpretable ML.

## 1990s — The Math Gets Serious

**SVM (Vapnik 1992)**
Support Vector Machines. Mathematically elegant — finds the provably optimal decision boundary. Dominated ML research for a decade.

**Q-Learning (Watkins 1989) → TD-Gammon (Tesauro 1992)**
Reinforcement learning enters the scene. A program teaches itself backgammon by playing millions of games against itself.

**LSTM (Hochreiter & Schmidhuber 1997)**
Solves the vanishing gradient problem in RNNs. Makes it possible for neural networks to remember long sequences.

## 2000s — Ensemble Power

**Random Forest (Breiman 2001)**
Combine many weak decision trees → one strong model. Simple, robust, hard to beat.

**Gradient Boosting (Friedman 1999 → XGBoost 2016)**
Build trees sequentially, each one fixing the previous one's mistakes. Would come to dominate Kaggle competitions.

## 2012 — The Deep Learning Big Bang

**AlexNet (Krizhevsky, Sutskever, Hinton 2012)**
CNN + GPU training destroys the ImageNet competition. Error rate drops from 26% to 16%. The moment everything changed.

From here, progress accelerates exponentially:

## 2014-2016 — The Deep Learning Gold Rush

**GAN (Goodfellow 2014)**
Two networks compete: one generates fakes, one detects them. Both get better. "The most interesting idea in ML in the last 10 years" — Yann LeCun.

**ResNet (He et al. 2015)**
Skip connections allow networks with 152+ layers. Solved the degradation problem. Won ImageNet with 3.6% error (better than humans).

**AlphaGo (DeepMind 2016)**
Beats world champion Go player Lee Sedol. Uses deep RL (policy networks + Monte Carlo tree search). A cultural moment for AI.

## 2017 — The Transformer Revolution

**"Attention Is All You Need" (Vaswani et al. 2017)**
Replaces RNNs entirely with self-attention mechanism. Parallelizable, scalable, and more effective. The architecture behind every modern LLM.

## 2018-2020 — The NLP Revolution

**BERT (Devlin, Google 2018)**
Bidirectional Transformer. Pre-train on massive text, fine-tune on tasks. Changed NLP overnight.

**GPT-2 (OpenAI 2019)**
"Too dangerous to release." Showed that just predicting the next word creates surprisingly capable text generation.

**GPT-3 (OpenAI 2020)**
175 billion parameters. Few-shot learning emerges — the model can do tasks it wasn't explicitly trained for.

## 2020-2022 — Generative AI

**DDPM / Diffusion Models (Ho et al. 2020)**
Learn to denoise. Reverse a noise process to generate images. Basis for Stable Diffusion, DALL-E 2, Midjourney.

**ChatGPT / InstructGPT (OpenAI 2022)**
GPT-3.5 + RLHF. The moment AI went mainstream. 100M users in 2 months.

## 2023-Present — The LLM Era

**GPT-4, Claude, Gemini, Llama**
Multimodal, reasoning, tool use, agents. The frontier is moving monthly.

**Key themes:**
- Scale (more data, more compute, more parameters)
- Alignment (RLHF, Constitutional AI)
- Efficiency (MoE, quantization, distillation)
- Agents (tool use, multi-step reasoning)

## The Pattern

Every breakthrough follows the same arc:
1. Theoretical idea (often decades old)
2. Computational power catches up
3. Someone demonstrates it works at scale
4. Explosion of applications
5. Limitations discovered → next breakthrough needed

## Related

- [AI/ML Overview](../_index.md)
- [Perceptron](../deep-learning/fundamentals/perceptron.md) — Where it started
- [Transformer](../deep-learning/architectures/transformer.md) — Where it is now
