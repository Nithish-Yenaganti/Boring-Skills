# Boring Skills

<pre style="color:#228B22;"><code>░████████                       ░██                           ░██████   ░██       ░██░██ ░██
░██    ░██                                                   ░██   ░██  ░██          ░██ ░██
░██    ░██   ░███████  ░██░████ ░██░████████   ░████████    ░██         ░██    ░██░██░██ ░██  ░███████
░████████   ░██    ░██ ░███     ░██░██    ░██ ░██    ░██     ░████████  ░██   ░██ ░██░██ ░██ ░██
░██     ░██ ░██    ░██ ░██      ░██░██    ░██ ░██    ░██            ░██ ░███████  ░██░██ ░██  ░███████
░██     ░██ ░██    ░██ ░██      ░██░██    ░██ ░██   ░███     ░██   ░██  ░██   ░██ ░██░██ ░██        ░██
░█████████   ░███████  ░██      ░██░██    ░██  ░█████░██      ░██████   ░██    ░██░██░██ ░██  ░███████
                                                     ░██
                                               ░███████</code></pre>

Boring Skills is a repository of focused skill packs for coding agents. Each skill defines a repeatable workflow, clear operating constraints, and validation expectations for a specific task.

The repository is intended for practical agent behavior: fewer broad instructions, more precise execution rules.

## Skills

### General Help

| Skill | Purpose |
| --- | --- |
| `General-Help/hard-feedback` | Gives candid, constructive critique of ideas, plans, messages, decisions, or work. |
| `General-Help/three-sentence` | Produces concise answers in exactly three clear sentences. |
| `promptme` | Refines a user's prompt, confirms the refined version, and executes only after approval. |

### Job Helper

| Skill | Purpose |
| --- | --- |
| `Job-Helper/job-search` | Finds current job opportunities and reports only listings verified from live sources. |
| `Job-Helper/onepage-resume` | Creates or revises LaTeX resumes that compile to exactly one polished page, with strict source grounding for experience and project content. |

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

This repository is a working local collection. Skill folders may change as workflows are refined.
