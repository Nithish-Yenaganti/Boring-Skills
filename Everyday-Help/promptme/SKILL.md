---
name: promptme
description: Use this skill when the user wants help improving, rewriting, clarifying, or preparing a prompt or request before it is executed. Refine the user's text, ask only a few necessary confirmation questions, call request_user_input for approval when that tool is available, and execute only after the user approves the refined prompt.
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

When ready for approval, show:

- `Refined prompt:` followed by the proposed prompt.
- `Assumptions:` only if assumptions remain.

Then request approval. Do not execute until the approval response is received.

## User Input Approval

When `request_user_input` is listed in the available tools for the current turn, you must call it after showing the refined prompt. Do not merely print the choices as normal chat text.

Use exactly one approval question with:

- `header`: `Approval`
- `id`: `prompt_approval`
- `question`: `Approve this refined prompt for execution?`
- `options`:
  - `Approve and execute`: proceed with the refined prompt exactly as written.
  - `Revise prompt`: ask the user what to change, then produce a new refined prompt and request approval again.
  - `Cancel`: stop without executing.

If the approval tool requires a recommended option label, mark `Approve and execute` as recommended. Do not set an auto-resolution timer for approval; execution requires an explicit user response.

Handle the response this way:

- `Approve and execute`: proceed with the refined prompt exactly as written.
- `Revise prompt`: ask the user what to change, then produce a new refined prompt and request approval again.
- `Cancel`: stop without executing.

If `request_user_input` is not listed in the available tools, say that UI approval is unavailable in this context and ask in plain text: `Approve this prompt and I will execute it.`

## Execution Rules

- Treat approval as required for execution, not optional.
- Accept clear approvals such as selecting `Approve and execute`, "approved", "yes, execute", "run it", or equivalent wording.
- If the user asks for edits to the refined prompt, revise it and request approval again.
- If the user asks only for prompt refinement, stop after delivering the approved refined prompt and do not execute it.
