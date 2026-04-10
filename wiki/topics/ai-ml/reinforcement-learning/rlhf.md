---
title: "RLHF (Reinforcement Learning from Human Feedback)"
category: ai-ml/reinforcement-learning
tags: [reinforcement-learning, rlhf, alignment, chatgpt, llm]
created: 2026-04-08
updated: 2026-04-09
---

## I Use This When...

I already have a capable pretrained language model, but I need it to behave
more helpfully, more safely, or more in line with human preferences. RLHF is
used when raw pretraining objective quality is not the same thing as useful
assistant behavior.

## History

Christiano et al. (2017) — original framework. InstructGPT (Ouyang et al., OpenAI 2022) — applied to GPT-3. ChatGPT (2022) — RLHF at scale, changed everything.

## Why It Exists

The "why" chain is:

- Pretraining teaches prediction, not preference.
- A model can be fluent and still be unhelpful, evasive, or misaligned with user intent.
- Humans can compare outputs even when they cannot write a perfect reward function directly.
- We can learn a reward model from those comparisons.
- Then we can optimize the policy against that learned reward while staying near the base model.

RLHF exists because "predict text well" is not the same objective as "behave
like a useful assistant."

## How It Works

### Visual Intuition

Imagine one prompt producing several candidate answers.

- humans rank which answer is better
- a reward model learns to score outputs the way those humans ranked them
- the language model is then optimized to produce higher-scoring outputs
- a KL penalty stops it from drifting too far from the pretrained model

So RLHF is not reward from the environment in the classic game sense. It is
reward learned from human preferences.

The alignment milestone is here:

-> [MLViz Node: RLHF](/projects/mlviz/rlhf)

### Step by Step

1. Start with a pretrained base model
2. Do supervised fine-tuning on instruction-response examples
3. Collect ranked comparisons of model outputs
4. Train a reward model on those comparisons
5. Optimize the policy with PPO against that reward
6. Add a KL penalty so the model stays close to the reference policy

The pipeline is really "pretraining + preference modeling + constrained policy
optimization."

## Code

```python
# concept sketch
# reward = reward_model(prompt, response)
# objective = reward - beta * KL(policy || reference_policy)
# optimize policy with PPO
```

## The Math Inside

Typical RLHF objective:

`maximize E[r_theta(x, y)] - beta * KL(pi || pi_ref)`

- `r_theta(x, y)`: reward-model score for prompt `x` and response `y`
- `pi`: current policy
- `pi_ref`: reference or base policy
- `beta`: strength of the stay-close penalty

Three-stage view:

1. supervised fine-tuning
2. reward-model training from ranked preferences
3. PPO optimization with KL regularization

The KL term matters because otherwise the model may exploit weaknesses in the
reward model and drift away from the base model's language competence.

## Math Prerequisites

- [GPT](../deep-learning/models/gpt.md) - the pretrained model family commonly aligned this way
- [Policy Gradient / PPO](policy-gradient-ppo.md) - the optimization step used in many RLHF pipelines
- [KL Divergence](../../math/information-theory/kl-divergence.md) - why the alignment update is constrained

## Related

- [GPT](../deep-learning/models/gpt.md) — The model being aligned
- [Policy Gradient / PPO](policy-gradient-ppo.md) — The optimization algorithm
- [KL Divergence](../../math/information-theory/kl-divergence.md) — Constraining the update
