---
title: "Consulate Chatbot — design notes"
category: projects
tags: [rag, bm25, embeddings, korean, government]
created: 2026-05-20
status: skeleton
---

Technical companion to [/projects/chatbot](/projects/chatbot). For
someone shipping a public-facing RAG chatbot where hallucinations
have real consequences.

## I Use This When...

I want a chatbot that answers strictly from a fixed corpus of official
documents, refuses everything else, and shows the user where each
answer came from.

## Why hybrid BM25 + embeddings, not pure vector

> TODO: government terminology is exact-match-heavy (form numbers,
> statute names, transliterated foreign words). Pure embeddings drift
> on those; BM25 nails them. RRF for the merge.

## Why per-topic sub-indexes when topic is detected

> TODO: passport answers should never come from the military-service
> section, even if vector cosine says they're "close". Topic gate
> upstream of retrieval.

## Why context up to 16,000 characters, not aggressive chunking

> TODO: government posts are short and have a lot of section context.
> Keeping the full top-5 posts in context is cheaper than risking a
> mid-post chunk that loses the disclaimer.

## Why temperature 0.05

> TODO: determinism matters more than fluency variety for a public
> reference bot. Repeated runs should agree.

## Why explicit source links + disclaimer

> TODO: civic-service errors cost the user time and money. The bot
> shows where it got its answer and tells the user to verify.

## What I'd rebuild

> TODO: auto-resync the bulletin scrape on a schedule, version the
> embedding index, surface retrieval confidence (best-hit score) so
> the user knows when retrieval was weak.

## Related

- [Case study: Consulate Chatbot](/projects/chatbot)
