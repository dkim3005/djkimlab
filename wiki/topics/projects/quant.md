---
title: "Quant Trading Platform — design notes"
category: projects
tags: [quant, hmm, finbert, ibkr, timescaledb]
created: 2026-05-20
status: skeleton
---

Technical companion to [/projects/quant](/projects/quant). For someone
who wants to see the infrastructure under a strategy, not just a
backtest curve.

## I Use This When...

I want the full loop: ingestion → factor ranking → regime detection →
sentiment overlay → paper execution → scheduled cycle → audit.

## Why HMM for regime detection, not a trend filter

> TODO: trend filters lag at turning points. HMM captures the latent
> state and de-risks earlier. Show the regime-flip example where the
> HMM cut exposure two days before the trend filter did.

## Why FinBERT as an overlay, not a primary signal

> TODO: news sentiment moves in pulses that mostly average out at
> swing-trading horizons. Overlay weights it as a tiebreaker, not a
> driver.

## Why paper, not live

> TODO: the project is for learning + showing infra quality. Real
> capital changes the work from "build the loop" to "prove the edge".

## Why Streamlit + FastAPI both

> TODO: Streamlit is great for the dashboard, bad as an API. The
> split keeps a clean machine-callable interface.

## What broke first

> TODO: the 15-min cycle missed market-open by enough to make
> regime-flip detection lag a full bar. Cron alignment vs market clock
> needed care.

## What I'd rebuild

> TODO: persist cycle results into TimescaleDB so every past decision
> can be replayed against the inputs it actually saw. Sharpe / max
> drawdown vs SPY in the dashboard.

## Related

- [Case study: Quant Trading Platform](/projects/quant)
