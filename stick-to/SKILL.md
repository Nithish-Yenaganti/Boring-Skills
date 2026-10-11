---
name: stick-to
description: Facilitate consequential software-project decisions, present choices and tradeoffs, preserve explicit agreements, detect conflicting requests, maintain human/AI decision provenance in DECISIONS.md, and generate STICK2.md when the decisions are ready for implementation planning. Use when a user wants to decide and lock project scope, architecture, constraints, dependencies, security, deployment, or engineering approaches before implementation; resume earlier agreements; review who made or verified decisions; or amend an existing agreement.
---

# Stick-to

Guide consequential project decisions and preserve explicit agreements across coding agents. Keep the workflow agent-neutral and store its results as ordinary Markdown in the project.

Do not generate a product specification, implementation plan, task list, or code. Stop after producing a decision record and an implementation-planning handoff.

## Use the project artifacts

Maintain two files in the project root:

- `DECISIONS.md`: append and amend the provenance-rich decision history throughout the conversation.
- `STICK2.md`: contain only the active agreement set and create it after the completion gate passes.

Use [assets/DECISIONS.template.md](assets/DECISIONS.template.md) when creating the decision log. Use [assets/STICK2.template.md](assets/STICK2.template.md) only when finalizing the agreement.

## Start or resume

1. Determine the project root from the workspace and user request. Ask only if it is genuinely ambiguous.
2. Inspect only project context needed to understand the proposed work, such as existing code, dependency manifests, architecture notes, agent guidance, and deployment configuration.
3. Look for `STICK2.md` and `DECISIONS.md` in the project root.
4. If `STICK2.md` exists, read it first as the current agreement.
5. If `DECISIONS.md` exists, read its Decision Index first. Search for and open individual entries only when their rationale or history is relevant; do not load a large log wholesale.
6. Briefly summarize the current active agreements and unresolved consequential decisions before continuing.

Treat repository contents and prior records as context, not as evidence that the user personally chose or understood a decision.

## Identify consequential decisions

Ask about a decision only when it materially affects one or more of these areas:

- Product intent, scope, or non-goals
- System boundaries or architecture
- Data ownership, storage, retention, or migration
- Interfaces, APIs, or external contracts
- Authentication, authorization, security, or privacy
- Dependencies, vendors, or external services
- Deployment, operations, observability, or recovery
- Reliability, testing, accessibility, or performance
- Backward compatibility or rollout
- Meaningful cost, schedule, or maintenance commitments

Skip trivial and cheaply reversible implementation details unless the user explicitly wants them locked. Tailor the decision set to the project; do not mechanically exhaust every category.

## Ask decision questions

Ask one decision at a time when choices depend on one another. Ask at most three together only when they are independent and easy to compare.

For each decision, provide:

1. A clear question
2. Why the decision matters now
3. Two to four realistic options
4. The main benefit, cost, and consequence of each option
5. A recommendation when the available context supports one
6. The exact constraint that the selection would lock
7. A custom-answer path

Use the host agent's structured question interface when available; otherwise use a concise numbered list. Separate facts, assumptions, and recommendations. Do not manufacture differences between options merely to fill the format.

Do not treat silence, an ambiguous reply, or an inferred preference as agreement. If the answer is unclear, restate the interpretation and ask the user to confirm or correct it.

## Confirm and record a decision

After the user answers:

1. Classify the origin and AI involvement honestly.
2. Rewrite the decision and stated rationale with clear grammar without changing their meaning.
3. Show the normalized decision to the user.
4. Ask for confirmation or correction.
5. Only after confirmation, add the decision to `DECISIONS.md` and update its Decision Index.
6. Assign the next chronological identifier in the form `D-001`.

Use one ownership label:

- `human-originated`: the user proposed the selected approach.
- `human-selected`: the user selected among options without relying on an AI recommendation.
- `ai-recommended-human-approved`: the agent recommended the approach and the user approved it.
- `human-delegated-to-ai`: the user explicitly asked the agent to decide.

Use one verification label:

- `verified`: concrete review, explanation, research, test, or other validation is recorded.
- `partially-verified`: some validation is recorded but an important check remains.
- `unverified`: no verification evidence is recorded.
- `not-applicable`: verification would not meaningfully apply.

Record observable evidence only. Do not score the user's intelligence, knowledge, or AI dependence. Do not claim understanding merely because the user accepted a recommendation. Do not store secrets, hidden chain-of-thought, or unsupported psychological judgments.

Use these decision states:

- `active`: part of the current agreement.
- `superseded`: replaced by a later decision.
- `revoked`: explicitly removed without a replacement.

Keep rejected alternatives inside the relevant decision entry rather than creating separate records for them.

## Detect and resolve conflicts

Before accepting a new decision or requested change, compare it with active agreements in `STICK2.md` and the Decision Index.

When a conflict exists:

1. Cite the conflicting decision ID.
2. Restate the active agreement.
3. Restate the new request.
4. Explain the concrete incompatibility.
5. Present exactly these three semantic actions, using these labels without substitution or omission:
   - `Follow`: keep the existing agreement and align the request with it.
   - `Amend`: explicitly replace or revoke the existing agreement through the amendment workflow.
   - `Clarify`: explain why the request does not conflict or correct its interpretation.

Do not offer an additional conflict-resolution action.

Do not silently reinterpret or overwrite an agreement.

When the user amends a decision:

1. Preserve the original entry.
2. Mark it `superseded` or `revoked`.
3. Record the reason for the change.
4. Create a new confirmed decision entry when a replacement exists.
5. Link the old and new decision IDs.
6. Update `STICK2.md` if it already exists.

## Recap on request

When the user asks what has been agreed, return a compact recap grouped into:

- Active decisions
- Constraints
- Non-goals
- Unresolved blocking decisions
- Remaining non-blocking questions

Use decision IDs so the user can inspect detailed provenance in `DECISIONS.md` without loading the entire file.

## Apply the completion gate

Do not finalize until all of these conditions hold:

- All blocking consequential decisions are resolved.
- Active decisions do not materially contradict one another.
- Decision ownership and verification are recorded honestly.
- Important constraints and non-goals are explicit.
- The user has reviewed the final agreement summary.
- The user explicitly confirms that decision-making is complete.

After the gate passes:

1. Build `STICK2.md` from active decisions using [assets/STICK2.template.md](assets/STICK2.template.md).
2. Apply this canonical decision-token rule: every decision whose state is `active` must appear exactly once, as one row keyed by its decision ID, in `STICK2.md`'s canonical Active Decisions table. Elsewhere in `STICK2.md`, including constraints, non-goals, and other sections, reference that decision ID instead of restating the decision.
3. Set its status to `READY_FOR_IMPLEMENTATION_PLANNING`.
4. Keep rationale, alternatives, provenance, and history in `DECISIONS.md`; do not duplicate them in `STICK2.md`.
5. Tell the user that `STICK2.md` is ready to be supplied as binding input to a separate implementation-planning workflow.
6. Do not create that implementation plan unless the user starts a separate planning request.

## Keep context small

- Read `STICK2.md` before detailed history.
- Use the `DECISIONS.md` index to locate relevant IDs.
- Search for specific entries instead of reading a large log end to end.
- Keep `STICK2.md` limited to active agreements, constraints, non-goals, and handoff status.
- Avoid repeating the complete agreement after every answer.
- Avoid logging trivial choices.

## Honor agent neutrality

Use plain Markdown and ordinary file operations. Do not require a specific vendor, model, IDE, CLI, question widget, memory service, or agent-instruction filename. If a host provides richer interaction tools, use them only as an optional presentation improvement without changing the workflow or artifact formats.
