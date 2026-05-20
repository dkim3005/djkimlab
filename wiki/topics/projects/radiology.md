---
title: "Radiology AI — design notes"
category: projects
tags: [medical-ai, densenet, clip, gradcam, fhir]
created: 2026-05-20
updated: 2026-05-20
---

Technical companion to the [case study at /projects/radiology](/projects/radiology).
For someone evaluating how a multi-label classifier and a retrieval
model should sit inside one product, not three.

## I Use This When...

I want one model artifact to serve triage, region explanation, and
similar-case retrieval — without three separate inference paths.

## Why one DenseNet shared by triage + explainability

Triage and explainability literally consume the same forward pass.

- **Triage** uses the final logits over the 14 NIH ChestX-ray14 labels.
- **Explainability** uses the same network's last conv feature map plus
  the classifier's weight vector for the chosen class — that's exactly
  the Class Activation Map construction.

Splitting them into two services would have meant two copies of the
weights in memory, two warm starts, and two sources of drift if the
model gets retrained. One shared instance, two endpoints, one source
of truth.

## Why torchxrayvision DenseNet121, not a from-scratch model

ChestX-ray14 is a known benchmark and the field already has a strong
shared baseline (`densenet121-res224-nih` in torchxrayvision). The
project's differentiating work is the workflow integration — FHIR
context wrapping, the CAM + retrieval composition, the multi-workflow
UI — not yet another classifier card.

If I were grading my own model card I'd still want to publish per-class
AUC numbers on a held-out split, but those would be a *follow-up*
metric, not the project's reason for existing.

## Why CLIP for retrieval, separate from DenseNet

Two reasons retrieval is a separate model:

1. **Generalization to free-text queries.** A user types "left
   pleural effusion in elderly patient" — DenseNet's labels are
   single-token disease classes; CLIP's text encoder reaches that
   query shape natively.
2. **Embedding-space quality.** I tried using DenseNet's penultimate
   layer for retrieval and the nearest neighbors clustered by camera
   manufacturer / image preprocessing artifacts, not by disease. CLIP
   ViT-B/32 embeddings hold up better because they were trained on a
   semantic objective, not a classification one.

The startup of `api.py` reflects this: `lifespan()` kicks off a CLIP
embedding-corpus build on a background thread so the triage endpoint
is available immediately while the search index warms.

## Why FHIR-style patient context

Hospital IT teams already speak `Patient` + `ImagingStudy`. Custom
JSON wrapping the same fields is a foreign-object barrier in any
clinical demo — every stakeholder has to mentally translate. FHIR
shape costs nothing extra and shaves the integration story to "swap
your real source for ours".

## What broke first

> TODO: my recollection is the first CAM rendering picked the wrong
> feature map (logits instead of the pre-softmax conv map), giving
> heatmaps that highlighted background rather than the lesion. Add
> the actual fix once I re-check the commit.

## What I'd rebuild

- Per-prediction uncertainty / temperature scaling so triage shows
  calibrated confidence bands, not raw logits.
- Persist CLIP embeddings to disk keyed by dataset snapshot version
  so warm starts skip the expensive corpus build (`CACHE_FILE` is
  already there for embeddings — extend the same pattern to the rest).
- Wire the FHIR context to a real test FHIR server so the integration
  story is demonstrable end-to-end.

## Related

- [Case study: Radiology AI](/projects/radiology)
- [Wiki: CNN](/wiki/topics/ai-ml/deep-learning/architectures/cnn)
- [Wiki: Cross-Entropy](/wiki/topics/math/information-theory/cross-entropy)
