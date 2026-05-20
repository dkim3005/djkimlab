---
title: "Autonomous AI Agent — design notes"
category: projects
tags: [agentic, llm, tool-use, sandbox, security]
created: 2026-05-20
updated: 2026-05-20
---

Technical companion to [/projects/agent](/projects/agent). For someone
designing tool-using LLM agents and worried about both safety and
debuggability.

## I Use This When...

I want a tool-using agent whose entire reasoning trace I can read —
and a Python sandbox that doesn't crash the box when the LLM goes
off-script.

## Why plan-act-observe, not single completion

A single completion can't ground itself on output it hasn't seen yet.
The observation step lets the model self-correct on errors — if
`run_python` returned a `NameError`, the next step's prompt includes
that error, so the LLM rewrites and retries instead of giving up.

The loop has a hard ceiling (`MAX_STEPS = 8` in `api.py`) so a runaway
LLM can't burn the rate-limit on a single task. When the model
responds without a tool call, that response is the final answer.

## Why AST validation before runtime, not only at runtime

`sandbox.py` validates the user's Python at parse time, before any
code runs:

- Imports outside an allowlist (`math`, `random`, `statistics`,
  `datetime`, `itertools`, `json`, `re`, `collections`, `fractions`,
  `decimal`) are rejected.
- `import from` is checked the same way.
- Any attribute access starting with `_` is rejected — that kills
  the classic `().__class__.__base__.__subclasses__()` escape chain.
- A name allowlist + a banned-names list (`exec`, `eval`, `compile`,
  `open`, `__import__`, `globals`, `locals`, `vars`, `getattr`,
  `setattr`, `delattr`, `breakpoint`, `memoryview`, `object`,
  `super`) blocks reflection and IO primitives.

Runtime-only checks are easier to bypass — e.g. monkey-patching
builtins before they're called. AST-time rejection is the layer
that has to *parse-fail* every escape attempt before runtime gets a
chance to recover.

## Why two layers of defence in depth on `run_python`

The sandbox is invoked as a subprocess (`subprocess`/`SANDBOX_PATH`)
so even if the in-process restrictions are escaped, the agent's
process tree limits — wall-clock timeout, CPU time, address space
when run as `__main__` — bound the blast radius. The agent process
also runs the validation; the subprocess re-validates. Two layers
mean the threat model is "find a bypass that works against the AST
validator *and* the restricted builtins *and* the OS-level limits".

## Why stream the entire reasoning trace

Agents fail in interesting ways. Hiding the trace turns every failure
into a black box that the developer has to reproduce. Streaming
each reasoning step, tool call, and observation as they happen turns
failures into evidence — the reviewer sees exactly which step went
sideways and what observation followed.

## Why errors are first-class context, not crashes

A tool error becomes the next observation, not an exception. That
forces the agent to actually read what went wrong before its next
move. "Can the agent recover from being told its last code raised
`NameError: name 'answer' is not defined`?" is the capability worth
demonstrating; "does the agent never make mistakes?" is not.

## What broke first

> TODO: the first version's `run_python` returned variable bindings
> but not stdout. The LLM wrote `print(answer)` and the observation
> was `None`. Add the exact fix (probably `contextlib.redirect_stdout`
> over an `io.StringIO`).

## What I'd rebuild

- Move the sandbox into a separate process with `seccomp` filters
  and `cgroup` resource limits, not just in-process restricted
  builtins.
- Add a planner step that emits a multi-step plan first, then
  executes — useful comparison against the current single-step loop.
- Cap tool output length explicitly so a runaway print can't blow
  the next prompt's context window.

## Related

- [Case study: Autonomous AI Agent](/projects/agent)
