# Boring Skills

[![npm version](https://img.shields.io/npm/v/boring-skills.svg)](https://www.npmjs.com/package/boring-skills)
[![license: MIT](https://img.shields.io/npm/l/boring-skills.svg)](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/LICENSE)
[![node](https://img.shields.io/node/v/boring-skills.svg)](https://nodejs.org)

**Eight practical skills for AI coding agents, installed and updated with one `npx` command.**

Boring Skills is a small, curated set of agent skills for everyday work that tends to go wrong: writing that sounds like you, prompts that get executed and checked, job searches against live listings, resumes backed by real evidence, and code explanations, mentoring, and bug reports grounded in your actual project.

Each skill is a plain Markdown `SKILL.md` file, plus any templates or references it needs, so you can read exactly what your agent will do before installing it. Works with **Codex**, **Claude Code**, or any agent that reads a skills directory.

## Quick start

Requires **Node.js 20+**. No global install needed.

```sh
# Claude Code
npx boring-skills@latest install --agent claude

# Codex
npx boring-skills@latest install --agent codex

# Any other agent
npx boring-skills@latest install --dir /path/to/agent/skills
```

Install only some skills by naming them:

```sh
npx boring-skills@latest install humanizer promptme --agent claude
```

Then ask your agent to use one:

```text
Use humanizer to rewrite this paragraph while keeping my meaning: ...
```

## Skills

Click a name to read the skill before installing it.

### Everyday

| Skill | What it does |
| --- | --- |
| [humanizer](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/skills/everyday/humanizer/SKILL.md) | Rewrites text in your own voice while preserving facts and meaning. |
| [promptme](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/skills/everyday/promptme/SKILL.md) | Refines a request using project context, carries it out, and verifies the result. |
| [three-sentence](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/skills/everyday/three-sentence/SKILL.md) | Keeps simple answers to one to three sentences for the rest of the chat. |

### Career

| Skill | What it does |
| --- | --- |
| [job-search](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/skills/career/job-search/SKILL.md) | Verifies live job listings, removes duplicates, and tracks opportunities. |
| [onepage-resume](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/skills/career/onepage-resume/SKILL.md) | Tailors a one-page resume from an evidence-backed achievement library. |

### Development

| Skill | What it does |
| --- | --- |
| [code-understanding](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/skills/development/code-understanding/SKILL.md) | Explains code by tracing real inputs, state changes, and failure paths. |
| [guide-me](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/skills/development/guide-me/SKILL.md) | Mentors you through a project, adapting to what you've shown you understand. |
| [bug-scout](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/skills/development/bug-scout/SKILL.md) | Reproduces suspected bugs with minimal failing tests and prepares evidence for maintainers. |

Run `npx boring-skills@latest list` to see the catalog in your terminal.

## Commands

```text
boring-skills list
boring-skills install [all|skill ...] [--agent codex|claude | --dir PATH] [--force]
boring-skills update  [all|skill ...] [--agent codex|claude | --dir PATH] [--force]
boring-skills --help | --version
```

| Option | Meaning |
| --- | --- |
| `--agent claude` | Installs to `$CLAUDE_HOME/skills`, or `~/.claude/skills` by default. |
| `--agent codex` | Installs to `$CODEX_HOME/skills`, or `~/.codex/skills` by default. |
| `--dir PATH` | Installs to any skills directory. |
| *(none)* | Uses the only existing Codex or Claude skills directory; asks you to choose if there are both or neither. |
| `--force` | Replaces a selected skill folder even if it has local changes. |

`install` with no names installs all skills. `update` with no names refreshes the skills you installed before.

## Updating

```sh
npx boring-skills@latest update --agent claude
```

Use the same `--agent` or `--dir` you installed with. To pick up skills added in a newer release, run `install all` again.

**Your edits are safe.** If an installed skill has local changes, or a folder with the same name came from somewhere else, the command stops before changing anything. Back up your changes, then replace that skill explicitly:

```sh
npx boring-skills@latest install promptme --agent claude --force
```

`--force` replaces only the named skill folders; your other skills are never touched. The installer keeps a `.boring-skills.json` file in the skills directory to track versions and detect edits, so leave it in place. Skills removed from the catalog are skipped and left on disk for you to delete.

Prefer a global install?

```sh
npm install -g boring-skills@latest
boring-skills update --agent claude
```

## Tips

- **promptme** shows the improved prompt and starts working right away. To get only a rewrite, say *"rewrite this prompt only; do not execute it."*
- **three-sentence** only needs to be invoked once per chat. Ask for detail when you want it, or ask it to stop.
- **guide-me** starts with `/guide-me --start` in Claude Code or `$guide-me --start` in Codex.

## What the skills need

These are instructions and templates, not services. Your agent does the work with the tools it already has, and each skill tells it to say when a tool is missing rather than fake a result.

| Skill | Inputs and capabilities |
| --- | --- |
| humanizer | Text to edit; optional writing samples and a voice-profile file. |
| promptme | A request; project files and verification tools for project work. |
| three-sentence | Nothing extra. |
| job-search | Web or browser access; optionally a resume and a tracker file. |
| onepage-resume | Factual resume material and a target role; LaTeX and PDF tools to check the final page. |
| code-understanding | Source code or a diff; a runnable environment for real traces. |
| guide-me | A target project and local file access for its learning notes. |
| bug-scout | A repository and test environment; issue/PR search to check for duplicates. |

Keep personal files (voice profiles, trackers, achievement libraries, learning notes) in your own workspace, outside the installed skill folders, so updates never overwrite them.

## Install from source

```sh
git clone https://github.com/Nithish-Yenaganti/Boring-Skills.git
cd Boring-Skills
node bin/boring-skills.js install --agent claude
```

You can also copy any folder from [`skills/`](https://github.com/Nithish-Yenaganti/Boring-Skills/tree/main/skills) into your agent's skills directory by hand, including its `assets/` and `references/`.

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/Nithish-Yenaganti/Boring-Skills). See [CONTRIBUTING.md](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/CONTRIBUTING.md) for the project layout, checks, and release steps.

## License

[MIT](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/LICENSE)
