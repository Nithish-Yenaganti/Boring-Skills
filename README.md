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
| `Everyday-Help/promptme`       | Refines a user's prompt, confirms the refined version, and executes only after approval. |

### Career Help

| Skill                        | Purpose                                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Career-Help/job-search`     | Finds current job opportunities and reports only listings verified from live sources.                                                        |
| `Career-Help/onepage-resume` | Creates or revises LaTeX resumes that compile to exactly one polished page, with strict source grounding for experience and project content. |

## Quick Install

Paste one of these into Codex, Claude Code, or another coding agent that can edit files.

Install all stable skills:

```text
Install all stable skills from https://github.com/Nithish-Yenaganti/Boring-Skills into my agent's skills directory: hard-feedback, three-sentence, promptme, job-search, and onepage-resume.
```

Install one skill:

```text
Install the hard-feedback skill from https://github.com/Nithish-Yenaganti/Boring-Skills into my agent's skills directory.
```

```text
Install the three-sentence skill from https://github.com/Nithish-Yenaganti/Boring-Skills into my agent's skills directory.
```

```text
Install the promptme skill from https://github.com/Nithish-Yenaganti/Boring-Skills into my agent's skills directory.
```

```text
Install the job-search skill from https://github.com/Nithish-Yenaganti/Boring-Skills into my agent's skills directory.
```

```text
Install the onepage-resume skill from https://github.com/Nithish-Yenaganti/Boring-Skills into my agent's skills directory.
```

The agent should detect its own skills directory, clone or download this repository, and copy the matching folder that contains `SKILL.md`.

## Manual Install

Copy any skill folder into the skills directory used by your agent. Each skill is self-contained. The required file is `SKILL.md`; supporting files such as `assets/`, `references/`, or `scripts/` are optional and should stay inside the skill folder when present. Exact installation paths depend on the agent or tool you use.

## Repository Layout

```text
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
