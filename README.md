# Boring Skills

**Eight practical skills for AI coding agents, installed and updated with one `npx` command.**

Boring Skills is a small, curated set of agent skills for everyday work that tends to go wrong: writing that sounds like you, prompts that get executed and checked, job searches against live listings, resumes backed by real evidence, and code explanations, mentoring, and bug reports grounded in your actual project.

Each skill is a plain Markdown `SKILL.md` file, plus any templates or references it needs, so you can read exactly what your agent will do before installing it. The npm CLI copies the skills into **Codex**, **Claude Code**, or any agent's skills directory. It tracks installed versions and won't overwrite your local edits.

| Category | Skills |
| --- | --- |
| Everyday | humanizer, promptme, three-sentence |
| Career | job-search, onepage-resume |
| Development | code-understanding, guide-me, bug-scout |

All skills live in [`skills/`](skills), grouped by category.

## Install

Requires **Node.js 20 or newer** with npm.

> The npm package is prepared for its first release but is not published yet. The `npx` commands below will work after publication; use [Install from source](#install-from-source) today.

For Codex:

```sh
npx boring-skills@latest install --agent codex
```

For Claude Code:

```sh
npx boring-skills@latest install --agent claude
```

Want only a few skills? Name them:

```sh
npx boring-skills@latest install humanizer promptme --agent codex
```

For another agent, point to its skills directory:

```sh
npx boring-skills@latest install --dir /path/to/agent/skills
```

The installer copies complete skill folders. It does not install models, browser integrations, or tools that an individual skill may need.

## Update

Get the latest published release and refresh your installed skills:

```sh
npx boring-skills@latest update --agent codex
```

Use `--agent claude` or the same `--dir` you used when installing if appropriate. Updates apply to skills previously managed by this installer that remain in the current catalog; retired skills are left on disk and skipped. To remove a retired skill locally, delete its folder yourself. To add skills introduced in later releases, run `install all` again.

**Your edits are preserved.** If a skill has local changes or a conflicting installation from another source, the command stops before replacing any skill. Back up your changes, then explicitly replace a selected skill if desired:

```sh
npx boring-skills@latest install promptme --agent codex --force
```

`--force` replaces the entire selected skill folder, including local additions. Unrelated skill folders are untouched. The installer keeps `.boring-skills.json` in the target directory to track versions and detect edits; retain this file for future updates.

You can also install the CLI globally after publication:

```sh
npm install -g boring-skills
boring-skills install --agent codex
```

To update a global installation, refresh both the CLI package and the copied skills:

```sh
npm install -g boring-skills@latest
boring-skills update --agent codex
```

## Choose a skill

Click a skill name to read its instructions before installing it.

### Writing and everyday work

| Skill | What it helps you do |
| --- | --- |
| [humanizer](skills/everyday/humanizer/SKILL.md) | Match your own writing voice while preserving facts and meaning. |
| [promptme](skills/everyday/promptme/SKILL.md) | Ground a refined request in project context, execute, and verify it. |
| [three-sentence](skills/everyday/three-sentence/SKILL.md) | Keep simple answers short for the rest of the chat, with detail when needed. |

### Careers

| Skill | What it helps you do |
| --- | --- |
| [job-search](skills/career/job-search/SKILL.md) | Verify live jobs, track opportunities, and highlight new matches. |
| [onepage-resume](skills/career/onepage-resume/SKILL.md) | Tailor a one-page resume from an evidence-backed achievement library. |

### Development

| Skill | What it helps you do |
| --- | --- |
| [code-understanding](skills/development/code-understanding/SKILL.md) | Explain code and trace real inputs, state changes, and failure points. |
| [guide-me](skills/development/guide-me/SKILL.md) | Adapt mentoring and project tasks to demonstrated learning gaps. |
| [bug-scout](skills/development/bug-scout/SKILL.md) | Reproduce bugs with minimal failing tests and prepare maintainer evidence. |

Prefer the terminal? Run `npx boring-skills@latest list` for the complete catalog or add `--help` for command usage.

## Use a skill

Ask your agent to use the skill by name and describe the task:

```text
Use humanizer to rewrite this paragraph while keeping my meaning: ...
```

```text
Use code-understanding to explain the changes in this diff: ...
```

```text
Use promptme to improve and carry out this request: review this project and explain the three most important improvements.
```

`promptme` displays the improved prompt and starts the work without waiting for prompt approval. If you only want a rewrite, say **“rewrite this prompt only; do not execute it.”** Essential clarification questions and required permissions for the underlying actions still apply.

`three-sentence` only needs to be invoked once in a chat: later simple answers stay within one to three short sentences, without repeated skill announcements. Complex tasks and explicit requests for detail can be longer, after which brief answers resume; ask to stop the style to turn it off for that chat.

For guided project mentoring, use `$guide-me --start` in Codex or `/guide-me --start` in Claude Code. Refer to each linked skill for its specific workflow.

## What the upgraded skills need

The npm package contains agent instructions and reusable templates, not autonomous services. Your agent carries out the work using the tools available in its environment.

| Skill | Useful inputs and required capabilities |
| --- | --- |
| humanizer | Text to edit; optional writing samples and a chosen local voice-profile file. |
| promptme | A request; relevant project files and verification tools for project work. |
| three-sentence | Invoke once per chat; simple replies stay brief, while complex tasks get the detail they need. |
| job-search | Live web or browser access; optional resume and a workspace tracker for repeated searches. |
| onepage-resume | Factual resume material and target role; LaTeX compilation, PDF page inspection, and text extraction to validate a final PDF. |
| code-understanding | Source code or a diff; a runnable environment for observed execution traces. |
| guide-me | A target project and local file access for project memory and its learning map. |
| bug-scout | Repository and test environment, plus issue/PR search access for duplicate checks. |

When a tool is missing, the skill must describe the limitation rather than invent verification. Job tracking and mentoring run when invoked; they do not create background monitoring. Personal profiles, trackers, achievement libraries, and learning records belong in the user's workspace, outside installed skill folders, so package updates preserve them. Only save reusable personal records when requested and keep them out of version control unless sharing is intended.

## Install from source

No npm release is needed for this route:

```sh
git clone https://github.com/Nithish-Yenaganti/Boring-Skills.git
cd Boring-Skills
node bin/boring-skills.js install --agent codex
```

To update from source:

```sh
git pull --ff-only
node bin/boring-skills.js update --agent codex
```

You can also manually copy a complete skill folder into your agent's skills directory. Include its `references/`, `assets/`, and `scripts/` when present. To move an older manual installation under npm management, run `install` against the same target; identical copies are adopted, while differing copies require an explicit `--force` after backing them up.

## How installation works

- `--agent codex` uses `$CODEX_HOME/skills` when configured, otherwise `~/.codex/skills`.
- `--agent claude` uses `$CLAUDE_HOME/skills` when configured, otherwise `~/.claude/skills`.
- `--dir PATH` uses your chosen directory.
- With no target option, the CLI uses the sole existing Codex or Claude skills directory; if both or neither exist, it asks you to specify a target.
- Downloads come from the npm release selected by `npx`; the installer copies the bundled skills without fetching individual files from GitHub.

## Contributing and releases

Keep each skill focused and readable. Put its behavior in `SKILL.md` and keep supporting resources inside its folder. Skills live in `skills/<category>/<name>/`. For a new skill, add its folder there, list it in `skills.json`, and add it to the catalog above.

Run `npm ci` once to install development dependencies, then validate changes and inspect the exact package contents:

```sh
npm run check
npm test
npm run test:package
npm pack --dry-run
```

This package uses the [MIT license](LICENSE). Before the first public release, confirm ownership or availability of the npm package name. Sign in to npm with an account authorized to publish; direct publishing requires the authentication described in the [npm publishing guide](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages/).

Publish the initial `0.1.0` release with:

```sh
npm login
npm publish --access public
```

After confirming the release is live, remove the unpublished notice above. For later releases, commit the changes, bump the version, publish, and push the version commit and tag:

```sh
npm version patch
npm publish --access public
git push origin main --follow-tags
```

Use `minor` or `major` instead of `patch` when the changes warrant it. Pushing to GitHub alone does not publish a new npm release.

The prepublish check validates metadata and references, runs installer tests, and installs the actual release archive into a temporary directory to verify every bundled resource. CI runs these checks on Linux, macOS, and Windows; a passing packaging check does not by itself prove the quality of AI-generated outputs.
