---
title: "Audio Intelligence — design notes"
category: projects
tags: [whisper, distilbert, nlp, pipeline]
created: 2026-05-20
updated: 2026-05-20
---

Technical companion to [/projects/audio](/projects/audio). For someone
shipping a voice product that needs more than a transcript.

## I Use This When...

I want one upload → transcript + sentiment + keywords + speaking rate,
not four round trips.

## Why one `/analyze` endpoint, not four

Three of the analyses (sentiment, keywords, speaking rate) all need
the transcript first. Splitting them into separate endpoints would
mean either:

- repeating Whisper inference per call (the expensive step), or
- making the client coordinate state — store the transcript, pass it
  back on the next request.

Either way, more round-trips and worse latency for no UX gain. The
API is two endpoints:

```
POST /api/transcribe   # just the transcript, when that's what you need
POST /api/analyze      # transcript + sentiment + keywords + rate, one shot
```

`/analyze` is the demo path; `/transcribe` is the "I already have a
client doing the downstream work" path.

## Why Whisper tiny, not a larger variant

CPU latency on a homelab beats the last point of WER for short clips.
For the demo audio used in the UI, tiny still produces transcripts
good enough for sentence-level sentiment to be meaningful.

The trade is intentional: a 30-second clip in single-digit seconds
beats a 30-second clip in a minute, even if the second one is more
accurate. For a longer-clip product the model size choice would
flip — Whisper small or medium is cheap enough on GPU.

## Why sentence-level sentiment, not whole-file

Whole-file sentiment over a long clip averages everything to "neutral"
and tells the user nothing. Sentence segmentation comes for free
from Whisper's word timestamps, so per-sentence DistilBERT scores
reveal the actual contour ("starts neutral, gets frustrated, ends
positive") rather than the flat average.

## What broke first

> TODO: my recollection is sentiment scoring at the whole-file level
> was the first version and looked broken. Add the exact moment of
> switching to per-sentence segmentation.

## What I'd rebuild

- Speaker diarization so per-speaker sentiment is meaningful in
  multi-voice clips (right now the speaker is implicit).
- Stream the transcript word-by-word from Whisper as it emits,
  instead of waiting for full completion before showing anything.
- Pre-warm the Whisper model at boot — first call after a cold
  start is currently slower than it needs to be.

## Related

- [Case study: Audio Intelligence](/projects/audio)
