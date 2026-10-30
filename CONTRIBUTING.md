# Contributing

## Layout

```
skills/<category>/<name>/SKILL.md   skill instructions (plus optional assets/, references/)
skills.json                         catalog used by the installer
bin/boring-skills.js                the npx CLI
scripts/, test/                     validation and tests (not published)
```

Keep each skill focused and readable. Put its behavior in `SKILL.md` and keep supporting files inside its folder. To add a skill, create its folder under `skills/`, list it in `skills.json`, and add it to the README catalog.

## Checks

Run `npm ci` once, then:

```sh
npm run check         # metadata, references, catalog, README links
npm test              # installer tests
npm run test:package  # installs the real package archive and verifies every file
npm pack --dry-run    # shows exactly what will be published
```

CI runs these on Linux, macOS, and Windows. Passing checks do not prove the quality of a skill's AI-generated output.

## Releasing

Sign in to npm with an account allowed to publish, then:

```sh
npm login
npm publish --access public
```

For later releases, bump the version, publish, and push the version commit and tag:

```sh
npm version patch   # or minor / major
npm publish --access public
git push origin main --follow-tags
```

`prepublishOnly` runs all checks before publishing. Pushing to GitHub alone does not publish to npm.
