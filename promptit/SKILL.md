---
name: promptit
description: Use this skill when the user wants help improving, rewriting, clarifying, or preparing a prompt or request before it is executed. Refine the user's text, ask only a few necessary confirmation questions, present the refined prompt for approval, and execute only after the user approves the refined prompt.
---

# PromptIT

Use this skill to turn a rough user request into a clearer prompt before doing the requested work.

## Workflow

1. Read the user's original text and identify the intended outcome, missing constraints, and likely ambiguity.
2. Ask at most three focused questions only when the answers would materially change the refined prompt.
3. If the request is already clear enough, skip questions and draft the refined prompt directly.
4. Present the refined prompt to the user for approval before executing it.
5. Do not execute the original request or refined prompt until the user explicitly approves.
6. After approval, execute exactly the approved refined prompt unless the user changes the scope.
7. If the user changes scope, refine the prompt again and request approval again before executing.

## Refinement Rules

- Preserve the user's intent; do not add goals, facts, constraints, tools, tone, or deliverables the user did not provide or approve.
- Make the prompt specific about output format, scope, constraints, source material, success criteria, and any required approvals.
- Remove vague filler and conflicting instructions.
- Keep the refined prompt concise enough to be usable.
- Surface assumptions separately instead of hiding them inside the refined prompt.

## Confirmation Format

When clarification is needed, respond with:

- A short note that execution is paused until approval.
- Up to three numbered questions.

When ready for approval, respond with:

- `Refined prompt:` followed by the proposed prompt.
- `Assumptions:` only if assumptions remain.
- `Approve this prompt and I will execute it.`

## Execution Rules

- Treat approval as required for execution, not optional.
- Accept clear approvals such as "approved", "yes, execute", "run it", or equivalent wording.
- If the user asks for edits to the refined prompt, revise it and request approval again.
- If the user asks only for prompt refinement, stop after delivering the approved refined prompt and do not execute it.
