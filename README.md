# Boring Skills

**Practical skills for AI agents. Install once, update with one command.**

Get clearer writing, better prompts, verified job searches, useful code explanations, and more deliberate project decisions. Each skill is a readable Markdown guide that tells your agent how to handle a particular task.

The installer includes **13 skills**, with their reference files and templates. It supports Codex, Claude Code, and custom skill directories.

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

Use `--agent claude` or the same `--dir` you used when installing if appropriate. Updates apply to skills previously managed by this installer; to add skills introduced in later releases, run `install all` again.

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
| [humanizer](Everyday-Help/humanizer/SKILL.md) | Make writing sound natural while keeping your meaning and voice. |
| [promptme](Everyday-Help/promptme/SKILL.md) | Improve your request, show the refined prompt, and execute it automatically. |
| [three-sentence](Everyday-Help/three-sentence/SKILL.md) | Get a clear answer in exactly three sentences. |
| [hard-feedback](Everyday-Help/hard-feedback/SKILL.md) | Get direct, constructive criticism and practical corrections. |

### Careers

| Skill | What it helps you do |
| --- | --- |
| [job-search](Career-Help/job-search/SKILL.md) | Find current opportunities verified against live sources. |
| [job-search-browser](job-search-browser/SKILL.md) | Check job listings directly in a live browser. |
| [onepage-resume](Career-Help/onepage-resume/SKILL.md) | Create a polished one-page LaTeX resume grounded in your experience. |

### Development and planning

| Skill | What it helps you do |
| --- | --- |
| [code-understanding](Developer-Help/code-understanding/SKILL.md) | Understand what changed, why, what happens without it, and a real-world example. |
| [guide-me](Developer-Help/guide-me/SKILL.md) | Learn while shipping a project, with guided mentoring and project-specific memory. |
| [bug-scout](Developer-Help/bug-scout/SKILL.md) | Find and verify repository bugs that have not already been reported. |
| [senior-mindset](senior-mindset/SKILL.md) | Review a project plan for missing pieces, risks, and weak assumptions. |
| [stick-to](stick-to/SKILL.md) | Make project decisions and preserve a clear record of agreements. |

### Visual explanations

| Skill | What it helps you do |
| --- | --- |
| [html-artifacts](Design/html-artifacts/SKILL.md) | Turn an explanation into polished HTML, a dashboard, or an interactive tool. |

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

For guided project mentoring, use `$guide-me --start` in Codex or `/guide-me --start` in Claude Code. Refer to each linked skill for its specific workflow.

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

You can also manually copy a complete skill folder into your agent's skills directory. Include its `references/`, `assets/`, and `scripts/` when present. To move an older manual or shell installation under npm management, run `install` against the same target; identical copies are adopted, while differing copies require an explicit `--force` after backing them up.

The older [shell installer](install.sh) remains available for its original eight skills and copies only `SKILL.md`; use the new CLI for all skills and supporting resources.

## How installation works

- `--agent codex` uses `$CODEX_HOME/skills` when configured, otherwise `~/.codex/skills`.
- `--agent claude` uses `$CLAUDE_HOME/skills` when configured, otherwise `~/.claude/skills`.
- `--dir PATH` uses your chosen directory.
- With no target option, the CLI uses the sole existing Codex or Claude skills directory; if both or neither exist, it asks you to specify a target.
- Downloads come from the npm release selected by `npx`; the installer copies the bundled skills without fetching individual files from GitHub.

The empty `tts-agent` placeholder is excluded from the package.

## Contributing and releases

Keep each skill focused and readable. Put its behavior in `SKILL.md` and keep supporting resources inside its folder. For a new skill, add it to `skills.json`, the `files` list in `package.json`, and the catalog above.

Validate changes and inspect the exact package contents:

```sh
npm run check
npm test
npm pack --dry-run
```

Before the first public release, choose a license and confirm ownership or availability of the npm package name. Sign in to npm with an account authorized to publish; direct publishing requires the authentication described in the [npm publishing guide](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages/).

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
