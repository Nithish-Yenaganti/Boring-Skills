# Boring Skills

<pre style="color:#228B22;"><code>______     ______     ______     __     __   __     ______        ______     __  __     __     __         __         ______
/\  == \   /\  __ \   /\  == \   /\ \   /\ "-.\ \   /\  ___\      /\  ___\   /\ \/ /    /\ \   /\ \       /\ \       /\  ___\
\ \  __<   \ \ \/\ \  \ \  __<   \ \ \  \ \ \-.  \  \ \ \__ \     \ \___  \  \ \  _"-.  \ \ \  \ \ \____  \ \ \____  \ \___  \
 \ \_____\  \ \_____\  \ \_\ \_\  \ \_\  \ \_\\"\_\  \ \_____\     \/\_____\  \ \_\ \_\  \ \_\  \ \_____\  \ \_____\  \/\_____\
  \/_____/   \/_____/   \/_/ /_/   \/_/   \/_/ \/_/   \/_____/      \/_____/   \/_/\/_/   \/_/   \/_____/   \/_____/   \/_____/</code></pre>

Boring Skills is a local repository of focused skill packs for coding agents. Each skill defines a repeatable workflow, clear operating constraints, and validation expectations for a specific task.

The repository is intended for practical agent behavior: fewer broad instructions, more precise execution rules.

## Skills

| Skill | Purpose |
| --- | --- |
| `onepage-resume` | Creates or revises LaTeX resumes that compile to exactly one polished page, with strict source grounding for experience and project content. |
| `hard-feedback` | Provides direct, constructive critique when blunt review is requested. |
| `job-search` | Finds current job opportunities and reports only listings verified from live sources. |
| `promptme` | Refines a user's prompt, confirms the refined version, and executes only after approval. |
| `three-sentence` | Produces concise answers in exactly three clear sentences. |

## Repository Layout

```text
skill-name/
  SKILL.md       # Required skill metadata and instructions
  README.md      # Optional short overview
  assets/        # Optional reusable output assets
  references/    # Optional reference material
  scripts/       # Optional helper scripts
```

## Standards

- Keep each skill narrow and task-specific.
- Put required behavior in `SKILL.md`.
- Add supporting files only when they improve execution.
- State constraints clearly, especially factuality and validation rules.
- Validate generated artifacts when the output can be compiled, rendered, tested, or inspected.

## Notes

This repository is a working local collection. Skill folders may change as workflows are refined.
