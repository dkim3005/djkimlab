---
title: "Investment Operations Suite — design notes"
category: projects
tags: [ops, fintech, fastapi, simulation]
created: 2026-05-20
updated: 2026-05-20
---

Technical companion to the [case study at /projects/ops](/projects/ops).
The case study is for a recruiter scan; this page is for someone who
actually wants to copy a decision or argue with one.

## I Use This When...

I need a sandbox where the *same* book of trades flows through
reconciliation, NAV, data quality, document extraction, and the
ledger — and they have to agree.

## Why one simulator, not five fixtures

Each of the five modules is interesting on its own, but the failures
worth surfacing live in the *seams between them*:

- A break in the recon module that the NAV module silently smoothed over
  because it used end-of-day positions.
- A multi-leg trade extracted from a PDF that the ledger module rejected
  because it expected a different settlement schema.
- A data-quality alert that triggered five minutes *after* the reporting
  module had already published.

Per-module fixtures hide every one of those. They also force the demo
to lie about consistency. A single backing simulator means recon and
NAV have to agree on the same trade or they don't agree at all.

## Why FastAPI single backend, not microservices

The architecture is a single FastAPI process exposing the five module
groups under one OpenAPI surface (see `api.py`):

```
GET  /api/health
GET  /api/market/context
GET  /api/recon                 # recon module
GET  /api/reporting/mandates    # reporting module
GET  /api/reporting/report/{mandate_id}
GET  /api/dataquality           # data quality module
GET  /api/documents/info        # documents module
POST /api/documents/extract
POST /api/documents/ask
GET  /api/ledger                # ledger module
GET  /api/overview              # cross-cutting summary
```

Microservices would buy independent deploys, scaling, and team
ownership — none of which a one-person back-office demo needs. They
would *cost* shared book access (network hop per query), 5× container
overhead on a homelab, and 5 separate deploy stories. So: one process,
clear route prefixes, fast iteration.

## Why anchor the simulator to FRED data

Random walks look fake during a demo. A reviewer sees flat-vol prices
and assumes the breaks are scripted. Anchoring to real macro series
from FRED — interest rates, breadth, regime proxies — makes the
simulator behave plausibly when the market would be moving, so the
recon and NAV outputs feel like they came from a real session, not a
seed.

## What broke first

> TODO: notes on the first time the recon module reported zero breaks
> while NAV reported a discrepancy. Root cause was a position-ledger
> timing mismatch (need to confirm exact details).

## What I'd rebuild

- Persist the ledger to a real DB instead of in-memory, then expose a
  `GET /api/ledger/trial-balance` endpoint as a clean integration target.
- A single combined event log keyed by trade-id so a break can be
  traced from market tick → recon flag → ledger journal in one query.
- Wire the SOP-grounded documents assistant into the reporting module so
  "explain this NAV move" can pull from policy docs without leaving the
  module.

## Related

- [Case study: Investment Operations Suite](/projects/ops)
- [Wiki: Linear Regression](/wiki/topics/ai-ml/supervised/regression/linear-regression)
