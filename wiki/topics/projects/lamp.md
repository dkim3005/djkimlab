---
title: "Responsive Lamp — design notes"
category: projects
tags: [vision, gaze, yolo, mediapipe, three-js]
created: 2026-05-20
updated: 2026-05-20
---

Technical companion to [/projects/lamp](/projects/lamp). For someone
in HCI / spatial computing thinking about how to close the loop from
perception → action → memory.

## I Use This When...

I want a CV pipeline that doesn't stop at bounding boxes — it drives
a virtual actuator (the lamp), remembers what it saw, and lets an LLM
reason over that memory.

## Why MediaPipe iris landmarks for gaze

MediaPipe is good enough for desktop gaze tracking and has three
properties the rest of the stack benefits from:

- It runs locally, no model deploy step.
- It exposes sub-pixel iris landmarks per frame, which is enough
  precision to point a virtual lamp without filtering noise into
  jitter.
- It's predictable enough latency-wise to push gaze events at 30 Hz
  over WebSocket without dropping frames.

A heavier alternative (e.g. OpenFace) would buy slightly better head-
pose handling and lose all three of those.

## Why YOLOv8 for object detection

Pretrained COCO weights are good enough for a desk scene without any
fine-tuning — the demo doesn't need to recognize anything exotic.
YOLOv8 also has a small variant (`n` / `s`) that runs at reasonable
FPS on CPU, which matters for a homelab deploy.

If this were a real product, I'd swap to a smaller distilled model
tuned to the actual desk-object distribution. 80 generic classes is
expensive overkill.

## Why a typed memory store, not raw frame logs

The LLM should reason over typed events:

```
{object: "mug", first_seen: 17:42:01, last_seen: 17:43:18, position: {...}}
```

not over thousands of unstructured frames. The store collapses the
detection stream into per-object summaries — last-seen time and
position, optional history — so a query like "where did I last see
my keys?" becomes a single lookup, and the LLM's job is to phrase
the answer, not to mine raw data.

## Why GPT-4o-mini, not a larger model

Memory queries are bounded and short ("where is X?", "what was on
the desk an hour ago?"). Latency beats reasoning depth. A larger
model would buy nothing for these queries and would cost noticeable
delay between the question and the answer.

## Why WebSocket end-to-end

Two streams need pub/sub semantics:

- Gaze at 30+ Hz → the Three.js lamp re-aims continuously.
- Detection events → the memory store updates and the UI flags new
  objects.

Polling either over HTTP would either stutter (low rate) or hammer
the server (high rate). WebSocket is the right shape.

## What I'd rebuild

- Persist the memory store beyond process lifetime so "yesterday"
  queries actually work.
- Switch detection to a smaller distilled model tuned to the desk
  scene; the demo doesn't need COCO breadth.
- Add a "gaze fixation" filter so the lamp only commits to a target
  after the user has looked at it for >200 ms — kills jitter from
  scanning saccades.

## Related

- [Case study: Responsive Lamp](/projects/lamp)
