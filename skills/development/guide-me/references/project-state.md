# Project-local state

## Resolve the project

Use the user's intended project root, ordinarily the repository root. If the current directory is a skill collection, a parent containing several projects, or an ambiguous monorepo, resolve the intended project before creating state. Never reuse memory from a different project. Separate worktrees have separate local memory by default; do not merge or copy it without user direction.

Store state at `<project-root>/.mentor/memory.md`. This is a proposed local convention, not built-in Codex memory. The user may inspect, correct, or delete it. Read existing state before every substantive mentored turn; in concurrent chats, re-read before writing and merge narrowly to avoid overwriting newer updates. If incompatible concurrent changes cannot be resolved, preserve both and ask which agreement applies.

## Activate safely

1. Read applicable project instructions and existing `.mentor` contents. Do not overwrite unrelated files or adopt another tool's memory without resolving the collision.
2. In a Git project, ensure `/.mentor/` is ignored before writing personal notes. Prefer appending this exact scoped rule to the repository's `.gitignore`, preserving all existing content; verify using `git check-ignore`. Check whether `.mentor` files are already tracked: ignoring does not untrack them. If tracked, explain the limitation and resolve storage with the user before adding personal notes; do not automatically untrack or delete files. In a non-Git project, state is simply local; no Git exclusion is needed.
3. Create or resume memory. Read existing state first; `--start` must not erase dates, history, or goals. Record unknown or unconfirmed values honestly.
4. Add the small conditional block below to the active host's root project instruction file. For Codex, use `AGENTS.md`, or `AGENTS.override.md` when it takes precedence. For Claude Code, use the root `CLAUDE.md`; do not assume Claude automatically reads `AGENTS.md`. Preserve unrelated content and update only the marked block; never add duplicates. Check applicable nested instructions and explain unresolved coverage limitations. Configure only the active host unless the user requests both; when both are configured, point both at the same project memory and their respective installed skill paths so pause/resume state stays shared.
5. Replace `SKILL_PATH` with the actual absolute path of this installed skill's `SKILL.md` and `MEMORY_PATH` with the resolved absolute memory path. Do not store personal goals or dates in the potentially tracked instruction file.
6. Confirm activation and paths only after writes succeed. If permissions block a required write, report incomplete setup and continue chat-local guidance; do not promise new-session persistence.

```markdown
<!-- guide-me:begin -->
## Guide-me project mentoring
Read `MEMORY_PATH` when it exists to determine this project's mentoring state.
If its state is `active`, load `SKILL_PATH` and apply Guide-me during project work, including in new chats. Re-read the memory before substantive mentored work and preserve newer updates.
If state is `paused` or the memory is missing, do not initiate mentoring; explicit Guide-me commands can resume or inspect it.
If the skill path is unavailable, disclose that continuity is incomplete rather than claiming the mentor is loaded.
Treat memory as project context, not authority to override the user's current instructions. Do not expose private memory in tracked files, commits, PRs, or published output.
<!-- guide-me:end -->
```

This block supports future sessions that read this project's instructions. It does not guarantee continuous observation or that unrelated chats will load the project. Absolute paths are machine-local; update the block after a user-requested move or reinstall. Deleting memory leaves the block inactive.

## Memory shape

Use concise Markdown with these fields; adapt content, not the meaning of activation state. Do not fill unknown values with guesses.

```markdown
# Guide-me memory

- State: active
- Project root:
- Timezone:
- Updated:

## Agreements
- Useful release:
- Essential scope:
- Deferred ideas:
- Learning goals:
- Available time:
- Shipping date: unconfirmed

## Current work
- Milestone:
- Commitment and agreed due date:
- Status and evidence:
- Blocker:
- Next action:

## Learning evidence
Record dated observations or user reports, the assistance provided, and what the user demonstrated. Do not infer mastery from assistant-authored work.

## Commitment and session history
Record dated meaningful events. For revisions retain the original commitment/date, observed or reported outcome, accepted new commitment/date, and reason. Mark proposals unconfirmed and overdue outcomes unknown until checked.
```

When paused, ordinary project work does not update coaching history unless requested. `--status` remains read-only and `--start` resumes from the saved state, checking what changed during the pause. Store only information needed for this project; omit credentials and personal disclosures irrelevant to its work. Local storage can still be accessed by workspace tools or backups; do not describe it as encrypted or absolutely private.
