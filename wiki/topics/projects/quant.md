---
title: "Quant Trading Platform — design notes"
category: projects
tags: [quant, hmm, finbert, ibkr, timescaledb]
created: 2026-05-20
updated: 2026-05-20
---

Technical companion to [/projects/quant](/projects/quant). For someone
who wants to see the infrastructure under a strategy, not just a
backtest curve.

## I Use This When...

I want the full loop: ingestion → factor ranking → regime detection →
sentiment overlay → paper execution → scheduled cycle → audit.

## Why HMM for regime detection, not a trend filter

Trend filters (e.g. price > 200-day MA) work but lag at turning
points by design — they need the trend to have already broken before
they switch sides. An HMM over return features captures the *latent
state* directly, so the regime flip can be detected earlier than the
price has confirmed.

The trade is sensitivity to inputs: an HMM with too few features will
chatter; with too many it overfits the calibration window. The current
choice is a small feature set anchored to FRED macro inputs (rates,
breadth) so the regime is grounded in macro context, not just price.

## Why FinBERT as an overlay, not a primary signal

News sentiment over the swing-trading horizon mostly averages out —
big-news spikes are short-lived noise compared to the multi-day
multifactor signal. FinBERT therefore lives as an overlay that can
tip a tie or de-risk a position when sentiment is broadly negative,
not as a driver in its own right.

A higher-frequency strategy could push sentiment into the primary
signal stack; for swing it would dominate the noise floor.

## Why paper, not live

The project is for learning and showing infra quality. Going live
would change the work from "build the loop" to "prove the edge" —
a different project entirely, and one where being wrong has actual
cost. Paper through the IBKR API gets all the plumbing-level lessons
(order types, fills, slippage simulation, scheduling) without the
risk surface.

## Why Streamlit + FastAPI both

Streamlit is excellent for the dashboard (fast iteration on charts,
no manual front-end build) and bad as an API (poor request semantics,
no clean machine-callable surface).

Splitting the project gives:

- FastAPI for everything programmatic (paper cycle endpoints,
  historical queries, signal probes).
- Streamlit for the human-facing dashboard.

Both speak to the same backing data, neither pretends to do the
other's job.

## Why the 15-minute cycle, not real-time

For US-equities swing trading the signal moves at the speed of
daily / multi-hour data, not tick. A 15-minute cycle is fast enough
to react to intraday regime flips without burning compute on noise.
The cycle re-ingests prices, re-ranks the watchlist, re-checks the
regime, re-overlays sentiment, and emits any order adjustments.

## What broke first

> TODO: my recollection is the 15-min cycle's first cron offset
> missed market-open by enough that regime-flip detection lagged a
> full bar. Add the timezone / alignment fix.

## What I'd rebuild

- Persist cycle results into TimescaleDB so every past decision can
  be replayed against the inputs it actually saw — turns the system
  into an audit trail, not just a runtime.
- Surface Sharpe / max-drawdown vs SPY directly in the dashboard so
  the "is this strategy working?" question has a one-glance answer.
- Walk-forward retraining cadence for the HMM so the regime model
  doesn't drift on stale calibration windows.

## Related

- [Case study: Quant Trading Platform](/projects/quant)
