---
title: "Audio Intelligence — design notes"
category: projects
tags: [whisper, distilbert, nlp, pipeline]
created: 2026-05-20
status: skeleton
---

Technical companion to [/projects/audio](/projects/audio). For someone
shipping a voice product that needs more than a transcript.

## I Use This When...

I want one upload → transcript + sentiment + keywords + speaking rate,
not four round-trips.

## Why Whisper tiny, not a larger variant

> TODO: CPU latency on a homelab beats the last point of WER for a
> short clip. What the WER actually is on the test samples.

## Why one /analyze endpoint instead of four

> TODO: the analyses share the same transcript. Four endpoints would
> have meant either repeating Whisper inference or asking the client
> to coordinate state.

## What broke first

> TODO: sentence-level sentiment was averaging across a whole long
> file, which made everything look "neutral". Sentence segmentation
> from the timestamps fixed it.

## What I'd rebuild

> TODO: speaker diarization for multi-voice clips, streaming the
> transcript word-by-word from Whisper instead of waiting.

## Related

- [Case study: Audio Intelligence](/projects/audio)
