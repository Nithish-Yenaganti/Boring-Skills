---
name: senior-mindset
description: Review a project plan or design with a senior-engineer mindset before building. Use when the user asks to pressure-test a plan, find gaps or risks, "plan it completely", or says "senior software mindset". Produces risks, spikes, missing pieces, and decisions needed. Does not write code.
---

# Senior planning review

Goal: find what will break when the plan meets reality, and close the biggest gaps before anything is built. Plan only. Do not write application code. Documents may be updated if the user allows it.

## Steps

1. **Read first.** Read the spec and plan docs (for example `project.md`, `PLAN.md`, `DECISIONS.md`, `ARCHITECTURE.md`). Do not review from memory of the chat.

2. **Trace one thing end to end.** Pick the core flow and follow a single unit of data from the user's first action to the final result: who holds which credential, where each copy of the data lives, what is stored, what is streamed, who can see it. Note every place where two parts of the design disagree (for example a table that assumes structured data while the source produces raw output).

3. **List the assumptions the plan stands on.** For each, mark it: confirmed (with a source), unconfirmed, or risky. Anything unconfirmed that other work depends on is a candidate spike.

4. **Look for what is missing, not only what is written.** Check each area and note gaps:
   - Environment: how does the code run and test (dependencies, env vars, setup)?
   - Realtime and scale: fan-out across instances, reconnects, resume, ordering.
   - Cost and limits: idle timeouts, concurrency caps, orphaned resources, per-user budgets.
   - Security: secrets in logs or transcripts, authorization on every call, network limits, untrusted input, third-party terms of service.
   - Data: size, retention, pagination, backups.
   - Operations: infrastructure as code, environments, migrations, CI/CD, logging, error tracking, local development without cloud costs.
   - API contracts and testing strategy.

5. **Check the plan against its own rules.** Look for decisions that contradict stated principles (for example storing something the docs say is never stored).

6. **Order the work by risk.** Propose, in this order:
   - **Phase 0 spikes:** small throwaway experiments, one risky question each, no product code kept.
   - **Walking skeleton:** the thinnest end-to-end slice, kept and built upon.
   - **Milestones:** the rest, each with a "done when".

7. **Turn gaps into decisions.** For each open choice, give a recommendation with a one-line reason and the trade-off. Ask the user only what they alone can decide.

## Output format

- **Biggest unknowns** (spike candidates), with what would be tested and what failure would change.
- **Missing from the plan**, grouped by the areas above.
- **Rule conflicts** found.
- **Suggested order** (spikes, skeleton, milestones).
- **Decisions needed**, each with a recommendation.

Keep it scannable. Say what was verified (read in the docs or confirmed from a source) versus what is an inference.

## Rules

- Never start building. Respect any build gate the user has set (for example a required phrase).
- Do not re-open decisions the user already made; flag consequences of them instead and let the user decide.
- Be specific to this project. Avoid generic checklists with no link to the actual design.
- If research is needed (vendor terms, tool behavior), check the official source and cite it.
