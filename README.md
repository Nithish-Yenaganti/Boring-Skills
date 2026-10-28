# Boring Skills

```
░████████                       ░██                           ░██████   ░██       ░██░██ ░██
░██    ░██                                                   ░██   ░██  ░██          ░██ ░██
░██    ░██   ░███████  ░██░████ ░██░████████   ░████████    ░██         ░██    ░██░██░██ ░██  ░███████
░████████   ░██    ░██ ░███     ░██░██    ░██ ░██    ░██     ░████████  ░██   ░██ ░██░██ ░██ ░██
░██     ░██ ░██    ░██ ░██      ░██░██    ░██ ░██    ░██            ░██ ░███████  ░██░██ ░██  ░███████
░██     ░██ ░██    ░██ ░██      ░██░██    ░██ ░██   ░███     ░██   ░██  ░██   ░██ ░██░██ ░██        ░██
░█████████   ░███████  ░██      ░██░██    ░██  ░█████░██      ░██████   ░██    ░██░██░██ ░██  ░███████
                                                     ░██
                                               ░███████
```

Boring Skills is a small collection of focused skill packs for AI agents that support `SKILL.md`-style instructions. Each skill defines a repeatable workflow, clear operating constraints, and validation expectations for a specific task.

The goal is practical agent behavior: fewer broad instructions, more precise execution rules, and useful outcomes for everyday work.

## Skills

### Everyday Help

| Skill                          | Purpose                                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| `Everyday-Help/hard-feedback`  | Gives candid, constructive critique of ideas, plans, messages, decisions, or work.       |
| `Everyday-Help/three-sentence` | Produces concise answers in exactly three clear sentences.                               |
| `Everyday-Help/humanizer`      | Removes formulaic AI wording while preserving meaning, detail, and the writer's voice.   |
| `Everyday-Help/promptme`       | Refines and displays a user's prompt, then executes it automatically without a prompt-approval step. |

### Career Help

| Skill                        | Purpose                                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Career-Help/job-search`     | Finds current job opportunities and reports only listings verified from live sources.                                                        |
| `Career-Help/onepage-resume` | Creates or revises LaTeX resumes that compile to exactly one polished page, with strict source grounding for experience and project content. |

### Design

| Skill                   | Purpose                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `Design/html-artifacts` | Creates polished HTML artifacts, visual responses, and interactive mini pages when prose is weak. |

### Developer Help

| Skill | Purpose |
| --- | --- |
| `Developer-Help/code-understanding` | Explains each code change or decision through What, Why, If skipped, and Real-life example, with one sentence per part. |
| `Developer-Help/guide-me` | Mentors a project through guided learning, shipping commitments, and separate local project memory. |
| `senior-mindset` | Reviews project plans before building: traces the core flow, checks assumptions and risks, identifies missing pieces, and recommends decisions and milestones. |

## Quick Install

Paste one sentence into your coding agent:

Install all stable skills:

```text
Install all stable skills from https://github.com/Nithish-Yenaganti/Boring-Skills by fetching each SKILL.md and saving them into my agent skills directory under their skill names.
```

Install one skill:

```text
Install the three-sentence skill from https://github.com/Nithish-Yenaganti/Boring-Skills by fetching its SKILL.md and saving it to my agent skills directory as three-sentence/SKILL.md.
```

Replace `three-sentence` with `hard-feedback`, `humanizer`, `promptme`, `job-search`, `onepage-resume`, or `html-artifacts`.

Use `code-understanding` to install the coding explanation skill.

To install the planning review skill, copy the local `senior-mindset/` folder into your agent's skills directory (for Codex, `~/.codex/skills/senior-mindset/`). Invoke it in Codex with `$senior-mindset` and point it to your project spec or plan; it reviews the design without writing application code.

For project mentoring, copy the complete `Developer-Help/guide-me/` folder, including `references/`, into your agent's skills directory as `guide-me/`. Start it in the target project with `$guide-me --start` in Codex or `/guide-me --start` in Claude Code.

Terminal install is also available:

```sh
curl -fsSL https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main/install.sh | sh -s -- --dir /path/to/agent/skills three-sentence
```

## Using promptme

Ask your agent to use `promptme` with your request. It displays the refined prompt and then executes it in the same turn, without waiting for prompt approval.

```text
Use promptme to improve and carry out this request: review this project and explain the three most important improvements.
```

For a rewrite without execution, say so explicitly:

```text
Use promptme to rewrite this prompt only; do not execute it: review this project and explain the three most important improvements.
```

The skill asks clarification questions when essential information is missing. Required permissions for the underlying actions still apply.

## Manual Install

Copy any skill folder into the skills directory used by your agent. Each skill is self-contained. The required file is `SKILL.md`; supporting files such as `assets/`, `references/`, or `scripts/` are optional and should stay inside the skill folder when present. Exact installation paths depend on the agent or tool you use.

## Repository Layout

```text
install.sh            # Optional installer for stable skills

category-name/
  skill-name/
    SKILL.md       # Required skill metadata and instructions
    README.md      # Optional short overview
    assets/        # Optional reusable output assets
    references/    # Optional reference material
    scripts/       # Optional helper scripts

skill-name/
  SKILL.md         # Top-level skills are allowed when no category is needed
```

## Standards

- Keep each skill narrow and task-specific.
- Put required behavior in `SKILL.md`.
- Add supporting files only when they improve execution.
- State constraints clearly, especially factuality and validation rules.
- Validate generated artifacts when the output can be compiled, rendered, tested, or inspected.

## Notes

This repository is a working collection. Skill folders may change as workflows are refined.
