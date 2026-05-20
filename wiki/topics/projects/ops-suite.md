---
title: "Investment Operations Suite — design notes"
category: projects
tags: [ops, fintech, fastapi, simulation]
created: 2026-05-20
status: skeleton
---

This wiki entry is the technical companion to the
[case study at /projects/ops](/projects/ops). The case study is for a
recruiter scan; this page is for someone who actually wants to copy a
decision or argue with one.

## I Use This When...

I need a sandbox where the *same* book of trades flows through
reconciliation, NAV, data quality, document extraction, and the ledger —
and they have to agree.

## Why one simulator, not five fixtures

> TODO: write up the failure mode I was trying to surface — reconciliation
> agreeing with NAV but disagreeing with the ledger after a corporate
> action. Per-module fixtures would have hidden it.

## Why FastAPI single backend, not microservices

> TODO: describe the trade — one repo, one deploy, shared in-memory book
> beat the operational cost of five microservices at portfolio scale.

## Why anchor the simulator to FRED data

> TODO: synthetic random walks look fake during a demo. Real macro
> series make regime changes plausible and force the NAV module to
> handle them.

## What broke first

> TODO: notes on the first time the recon module reported zero breaks
> while NAV reported a 3% discrepancy. Root cause.

## What I'd rebuild

> TODO: persistent ledger, combined event log, trial-balance endpoint.

## Related

- [Case study: Investment Operations Suite](/projects/ops)
- [Wiki: Linear Regression](/wiki/topics/ai-ml/supervised/regression/linear-regression)
