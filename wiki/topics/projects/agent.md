---
title: "Autonomous AI Agent — design notes"
category: projects
tags: [agentic, llm, tool-use, sandbox, security]
created: 2026-05-20
status: skeleton
---

Technical companion to [/projects/agent](/projects/agent). For someone
designing tool-using LLM agents and worried about both safety and
debuggability.

## I Use This When...

I want a tool-using agent whose entire reasoning trace I can read —
and where the Python sandbox doesn't crash the box if the LLM goes
off-script.

## Why plan-act-observe instead of a single completion

> TODO: a single completion can't ground itself on a tool output it
> hasn't seen yet. The observation step lets the model self-correct
> on errors.

## Why AST validation before runtime, not only at runtime

> TODO: AST-time rejection of imports, dunder access, exec / eval is
> much harder to bypass than runtime checks alone — list the bypasses
> I tested.

## Why stream the entire trace

> TODO: agents fail in interesting ways. Hiding the trace turns every
> failure into a black box. Streaming it turns failures into evidence.

## Why errors are first-class context, not crashes

> TODO: the recovery loop is the actual capability. An agent that
> can't read its own error messages can't be trusted to take a second
> action.

## What broke first

> TODO: the first version's run_python returned the variable bindings
> but not stdout. LLM wrote `print(answer)` and got `None` back. Fix.

## What I'd rebuild

> TODO: move the sandbox into a separate process with seccomp +
> cgroup limits. Add a planner step that emits a multi-step plan
> first, then executes, for comparison against the single-step loop.

## Related

- [Case study: Autonomous AI Agent](/projects/agent)
