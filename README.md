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

Use `install.sh` to copy skills into your agent's local skills directory. It fetches only raw `SKILL.md` files and does not clone the repo.

Install all stable skills:

```sh
curl -fsSL https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main/install.sh | sh -s -- --dir /path/to/agent/skills all
```

Install one skill:

```sh
curl -fsSL https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main/install.sh | sh -s -- --dir /path/to/agent/skills hard-feedback
```

```sh
curl -fsSL https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main/install.sh | sh -s -- --dir /path/to/agent/skills three-sentence
```

```sh
curl -fsSL https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main/install.sh | sh -s -- --dir /path/to/agent/skills promptme
```

```sh
curl -fsSL https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main/install.sh | sh -s -- --dir /path/to/agent/skills job-search
```

```sh
curl -fsSL https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main/install.sh | sh -s -- --dir /path/to/agent/skills onepage-resume
```

Replace `/path/to/agent/skills` with your agent's skills directory. If you already have `SKILLS_DIR` set, you can omit `--dir`:

```sh
curl -fsSL https://raw.githubusercontent.com/Nithish-Yenaganti/Boring-Skills/main/install.sh | SKILLS_DIR="$SKILLS_DIR" sh -s -- three-sentence
```

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
