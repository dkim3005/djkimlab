---
title: "Responsive Lamp — design notes"
category: projects
tags: [vision, gaze, yolo, mediapipe, three-js]
created: 2026-05-20
status: skeleton
---

Technical companion to [/projects/lamp](/projects/lamp). For someone
in HCI / spatial computing thinking about how to close the loop from
perception to action to memory.

## I Use This When...

I want a CV pipeline that doesn't stop at bounding boxes — it drives
a virtual actuator (the lamp), remembers what it saw, and lets an LLM
reason over that memory.

## Why MediaPipe iris landmarks for gaze

> TODO: MediaPipe runs in-browser, gives sub-pixel iris landmarks, and
> doesn't require shipping a tracker model. Compare vs OpenFace.

## Why YOLOv8 for object detection

> TODO: 80 COCO classes is overkill for a desk scene, but pretrained
> weights are good enough that there was no need to fine-tune for a
> demo. What I'd swap for production.

## Why a typed memory store, not raw frame logs

> TODO: the LLM should reason over typed events (object, time, last
> position), not over thousands of frames. Schema details.

## Why GPT-4o-mini and not a larger model

> TODO: memory queries are bounded and short. Latency wins over
> reasoning depth here.

## Why WebSocket for everything

> TODO: gaze at 30+ Hz over HTTP polling would either stutter or
> hammer the server. WebSocket is the right shape for the pub/sub
> pattern this app needs.

## What I'd rebuild

> TODO: persist memory beyond process lifetime so "yesterday" queries
> work. Swap YOLO for a smaller / faster variant tuned to the desk
> scene, not COCO.

## Related

- [Case study: Responsive Lamp](/projects/lamp)
