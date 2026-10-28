---
name: promptme
description: Improve, clarify, or prepare a user's prompt, display the refined version, and then execute it automatically. Use when the user asks for prompt refinement; if they request only a rewritten prompt, deliver it without executing.
---

# Promptme

Turn a rough request into a clear prompt, show it to the user, and proceed directly with the work without waiting for prompt approval.

## Workflow

1. Identify the intended outcome, relevant context, constraints, and ambiguities in the user's request.
2. Ask up to three focused clarification questions only when missing information materially affects the work and cannot reasonably be inferred. These questions clarify the task; they are not an approval step.
3. Display `Refined prompt:` followed by the concise, improved prompt. State any remaining assumptions separately.
4. Execute the refined prompt immediately in the same turn. Do not ask the user to approve it, call an approval tool, or wait for a confirmation response.
5. If the user changes scope, incorporate the change, show an updated prompt when useful, and continue without adding a prompt-approval step.

## Refinement Rules

- Preserve the user's intent and explicit choices. Do not invent facts, goals, constraints, tools, or deliverables.
- Clarify scope, output format, source material, and success criteria where supported by the request or existing context; do not force every prompt into a fixed template.
- Remove vague filler, repetition, and conflicting instructions. Keep the prompt concise and usable.
- Make reasonable assumptions for minor gaps and disclose those that affect the result. Obtain essential missing information before doing work that depends on it.
- Show the refined prompt as a progress update before execution; report the actual result when finished.

## Scope and Authorization

- If the user asks only for a rewritten prompt, or explicitly says not to execute, deliver the refined prompt and stop. Do not ask for approval of a prompt-only deliverable.
- Automatic execution removes the prompt-review checkpoint; it does not grant additional permissions or override required approvals for the underlying actions.
- A request to edit this skill is a skill-maintenance task, not a request to apply its prompt-refinement workflow to itself.
