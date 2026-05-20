---
title: "Consulate Chatbot — design notes"
category: projects
tags: [rag, bm25, embeddings, korean, government]
created: 2026-05-20
updated: 2026-05-20
---

Technical companion to [/projects/chatbot](/projects/chatbot). For
someone shipping a public-facing RAG chatbot where hallucinations
have real consequences.

## I Use This When...

I want a chatbot that answers strictly from a fixed corpus of official
documents, refuses everything else, and shows the user exactly where
each answer came from.

## Why hybrid BM25 + embeddings, not pure vector

Korean civil-service language is exact-match-heavy:

- Form numbers (e.g. specific 신청서 codes).
- Statute names referenced by exact title.
- Transliterated foreign words (passport / visa terms).
- Procedure-specific nouns that look almost-but-not-quite identical
  across topics (긴급여권 vs 단수여권).

Pure cosine-similarity over embeddings drifts on those — it groups
by topic, not by token. BM25 nails the exact-match cases. The system
runs both:

- If the topic detector matches a known topic, query only that
  topic's BM25 sub-index.
- Otherwise, run full BM25 and OpenAI embeddings, then merge with
  Reciprocal Rank Fusion (RRF).

## Why per-topic sub-indexes when topic is detected

The topic gate is upstream of retrieval, not downstream. The
`_TOPIC_KEYWORDS` table in `app.py` maps user keywords to topic IDs:

```
긴급여권 / 단수여권 / 여권     → 여권 (passport)
비자 / 사증 / visa / 재입국    → 비자 (visa)
공증                            → 공증
병역 / 병무                    → 병역
공동인증서 / 금융인증서          → 공동인증서
가족관계 / 출생신고 ...          → 가족관계등록
국적 / 귀화 / 시민권            → 국적
재외국민                       → 재외국민등록
해외이주                       → 해외이주신고
증명서                         → 각종 증명서 발급
```

Passport answers should never come from the military-service section
just because vector cosine says they're "close". Sub-indexes per
topic mean a 여권 query physically cannot retrieve a 병역 post.

## Why TOP-K=5 and 16,000-character context

Government posts are short (~2,000 chars average) and self-contained.
Keeping the top 5 posts in full context is cheaper than aggressive
chunking, because:

- Mid-post chunks can split the disclaimer from the procedure.
- Mid-post chunks lose the section headings that anchor the content.
- 5 full posts at ~2,000 chars each fits cleanly inside the 16,000-
  char window (constants: `TOP_K = 5`, `MAX_POST_CHARS = 4000`,
  `MAX_CONTEXT_CHARS = 16000`).

The first 3 hits are the answer; the remaining 2 are listed as
"추가 링크" so the user can self-verify edges the answer didn't cover.

## Why temperature 0.05

Determinism matters more than fluency variety for a public reference
bot. Repeated runs of the same question should give the same answer
— that's the consistency contract a civic-service tool has to keep.

## Why explicit source links + disclaimer on every response

The system prompt is uncompromising:

- "제공된 영사관 게시글 원문에 있는 내용만 답변" (answer only from
  the provided official posts)
- "원문에 없는 내용은 절대 추가하지 않습니다" (never add anything
  not in the source)
- Every answer ends with a disclaimer linking to the official site
  and the consulate contact.

Wrong civic-service information costs the user time, money, and
sometimes their immigration status. "I don't know — here's the
official source" is always the right fallback.

## What I'd rebuild

- Auto-resync the bulletin scrape on a schedule, and version the
  embedding index so old answers can be traced to old content.
- Surface retrieval confidence (best-hit BM25 score / RRF rank)
  alongside answers so the user knows when retrieval was weak.
- Add an "I don't know" gate that fires *before* generation when
  `LOW_CONFIDENCE_THRESHOLD` isn't met — cheaper than generating
  a hedge and disclaiming it.

## Related

- [Case study: Consulate Chatbot](/projects/chatbot)
