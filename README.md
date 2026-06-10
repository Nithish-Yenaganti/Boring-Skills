# Boring Skills

```text
+------------------------------------------------------------+
|                         BORING SKILLS                       |
|          Small Codex skills for repeatable workflows         |
+------------------------------------------------------------+
```

Boring Skills is a local collection of Codex skills designed for narrow, practical tasks that should run the same way every time. Each folder contains one focused skill with its own `SKILL.md`, so Codex can load only the instructions it needs for the current request.

The goal is not to make broad assistants. The goal is to capture useful working habits: concise answers, direct feedback, and reliable artifact generation.

## Available Skills

- `onepage-resume`: Creates or revises LaTeX resumes that compile to exactly one polished, full page. It emphasizes dense professional layout, compile-and-page-count validation, and strict source grounding for experience and project details.
- `hard-feedback`: Provides direct, constructive critique when blunt feedback is more useful than soft phrasing.
- `three-sentence`: Produces concise answers in exactly three clear sentences, with enough explanation to be useful and no filler.

## Repository Structure

Each skill should live in its own directory:

```text
skill-name/
  SKILL.md       # Required skill metadata and operating instructions
  README.md      # Optional short human-facing summary
  assets/        # Optional templates or reusable output assets
  references/    # Optional detailed reference material
  scripts/       # Optional deterministic helper scripts
```

## Skill Principles

- Keep each skill focused on one repeatable workflow.
- Put the operational rules in `SKILL.md`.
- Avoid unnecessary files unless they directly help the skill work better.
- Prefer clear constraints over long explanations.
- Validate outputs when the skill produces files, documents, code, or rendered artifacts.

## Current Status

This repo is a working local skills collection. Skills may be added, tightened, or split as workflows become clearer.
