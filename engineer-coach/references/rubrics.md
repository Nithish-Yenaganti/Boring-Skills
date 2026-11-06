# Review rubrics

Score each criterion 0 (missing) / 1 (weak) / 2 (strong). Report the total, then lead with the single lowest-scoring criterion that matters most, and **rewrite** the weakest passage yourself as an example.

## Design doc / RFC
1. **Problem first** — states the problem and who has it before any solution; includes the current baseline number.
2. **Goals & non-goals** — explicit non-goals (the "what not" list).
3. **Options** — 2–3 real alternatives, including "do nothing", each with costs.
4. **Decision & rationale** — why this option wins; what would change the decision.
5. **Risks & failure modes** — what breaks, how it's detected, rollback plan.
6. **Success metric** — how we'll know it worked, measured when.
7. **Readable in 5 minutes** — TL;DR at the top; a skimmer gets the decision.
Common mistakes: `no-tradeoffs`, `overengineering`, `buries-the-lede`, `no-baseline-metric`.

## Impact statement / status update / promo packet
1. **Outcome, not activity** — every bullet has a result.
2. **Quantified** — numbers (latency, $, %, users, hours saved) with before→after.
3. **Scope** — who/what was affected (team, org, customers).
4. **Your role** — clear what *they* did vs. the team.
5. **BLUF** — headline result first.
Rewrite template: *"[Verb] [what] for [who], [before → after metric], by [how]."*
Common mistakes: `tasks-not-outcomes`, `no-baseline-metric`, `invisible-work`.

## Pull request
1. **Small** — reviewable in ≤15 min (<~400 lines of real code).
2. **Description explains why** — the problem, not just the diff summary.
3. **Tests** — covers the change; for bugs, a test that failed before.
4. **One concern** — no drive-by refactors mixed with features.
5. **Risk noted** — rollout/rollback, flags, migrations called out.
Common mistakes: `giant-changes`, `vague-commits`, `no-tests`, `ai-autopilot`.

## Postmortem
1. **Timeline** — with detection and mitigation times.
2. **Root cause** — goes past the trigger to *why the system allowed it* (5 whys).
3. **Blameless** — systems, not people.
4. **Action items** — owned, dated, preventing the *class* of failure.
Common mistakes: `shallow-debugging`, `cargo-cult`.

## Blog post / README / talk
1. **Hook** — first 2 lines say why the reader should care.
2. **One idea** — a single clear takeaway.
3. **Concrete** — real code, numbers, or story, not generic claims.
4. **Shipped** — it's published (or has a publish date this week).
Common mistakes: `perfectionism`, `buries-the-lede`.

## Career / learning plan
1. **One mission** — not five parallel goals.
2. **Measurable outcome** — externally verifiable.
3. **Explicit not-doing list.**
4. **Weekly milestones** with a deadline in 4–8 weeks.
5. **Tied to goal** — clearly moves them toward their target role.
Common mistakes: `scattered-focus`, `tutorial-hopping`, `low-impact-work`.
