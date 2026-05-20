---
title: "Radiology AI — design notes"
category: projects
tags: [medical-ai, densenet, clip, gradcam, fhir]
created: 2026-05-20
status: skeleton
---

Technical companion to the [case study at /projects/radiology](/projects/radiology).
This page is for someone evaluating how a multi-label classifier and a
retrieval model should sit inside a single product, not three.

## I Use This When...

I want one model artifact to serve triage, region explanation, and
similar-case retrieval — without three separate inference paths.

## Why one DenseNet shared by triage + explainability

> TODO: triage and explainability are literally the same forward pass.
> Splitting them into two services would have doubled inference cost
> and forced two copies of weights in memory for no gain.

## Why torchxrayvision instead of training from scratch

> TODO: ChestX-ray14 is a known benchmark; the differentiating work
> is the workflow integration, not yet another classifier card. What
> torchxrayvision gives you out of the box and what it doesn't.

## Why CLIP for retrieval, separate from DenseNet

> TODO: CLIP's embedding space generalizes to free-text queries; the
> DenseNet's penultimate-layer embeddings don't. Tried both — note
> the failure mode where the DenseNet embedding clustered by camera
> manufacturer.

## Why FHIR-style patient context, not raw fields

> TODO: hospital IT teams immediately recognize a `Patient` + `ImagingStudy`
> shape. Custom JSON is a foreign-object barrier in clinical demos.

## What broke first

> TODO: the first CAM rendering picked the wrong feature map (logits
> instead of pre-softmax). The fix was checking what `forward` returns.

## What I'd rebuild

> TODO: per-image uncertainty / temperature scaling, on-disk CLIP
> embedding cache versioned per dataset snapshot.

## Related

- [Case study: Radiology AI](/projects/radiology)
- [Wiki: CNN](/wiki/topics/ai-ml/deep-learning/architectures/cnn)
