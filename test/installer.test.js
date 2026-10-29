import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'skills.json')));
function setup(t) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-skills-test-'));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const target = path.join(temp, 'skills');
  const run = (...args) => spawnSync(process.execPath, [path.join(root, 'bin/boring-skills.js'), ...args, '--dir', target], { encoding: 'utf8' });
  return { temp, target, run };
}
function ok(result) { assert.equal(result.status, 0, result.stderr); }

test('install all includes supporting resources and repeat runs are idempotent', t => {
  const { target, run } = setup(t);
  ok(run('install'));
  const state = fs.readFileSync(path.join(target, '.boring-skills.json'), 'utf8');
  assert.equal(Object.keys(JSON.parse(state).skills).length, 8);
  for (const s of catalog) assert.equal(fs.readFileSync(path.join(target, s.name, 'SKILL.md'), 'utf8'), fs.readFileSync(path.join(root, s.path, 'SKILL.md'), 'utf8'));
  assert(fs.existsSync(path.join(target, 'guide-me/references/project-state.md')));
  assert.deepEqual(fs.readdirSync(target).filter(name => !name.startsWith('.')).sort(), catalog.map(skill => skill.name).sort());
  ok(run('install', 'all'));
  assert.equal(fs.readFileSync(path.join(target, '.boring-skills.json'), 'utf8'), state);
});

test('update follows the installed selection and repairs a missing managed folder', t => {
  const { target, run } = setup(t);
  ok(run('install', 'humanizer', 'promptme'));
  fs.rmSync(path.join(target, 'promptme'), { recursive: true });
  ok(run('update'));
  assert(fs.existsSync(path.join(target, 'promptme/SKILL.md')));
  assert(!fs.existsSync(path.join(target, 'guide-me')));
});

test('updates preserve local edits; explicit force replaces them and leaves other skills alone', t => {
  const { target, run } = setup(t);
  ok(run('install', 'promptme'));
  const edited = path.join(target, 'promptme/SKILL.md');
  fs.writeFileSync(edited, 'my edits');
  fs.mkdirSync(path.join(target, 'my-skill'));
  fs.writeFileSync(path.join(target, 'my-skill/SKILL.md'), 'keep');
  const result = run('update');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /local changes/);
  assert.equal(fs.readFileSync(edited, 'utf8'), 'my edits');
  ok(run('update', '--force'));
  assert.match(fs.readFileSync(edited, 'utf8'), /# Promptme/);
  assert.equal(fs.readFileSync(path.join(target, 'my-skill/SKILL.md'), 'utf8'), 'keep');
});

test('conflicting unmanaged folders block the entire install before writes', t => {
  const { target, run } = setup(t);
  fs.mkdirSync(path.join(target, 'humanizer'), { recursive: true });
  fs.writeFileSync(path.join(target, 'humanizer/SKILL.md'), 'custom');
  assert.equal(run('install', 'promptme', 'humanizer').status, 1);
  assert(!fs.existsSync(path.join(target, 'promptme')));
  assert.equal(fs.readFileSync(path.join(target, 'humanizer/SKILL.md'), 'utf8'), 'custom');
});

test('unknown skills and missing option values fail without creating a target', t => {
  const { target, run } = setup(t);
  assert.equal(run('install', '../escape').status, 1);
  assert.equal(run('install', '--agent').status, 1);
  assert(!fs.existsSync(target));
});

test('symlinks cannot redirect an installation, even with force', t => {
  const { target, temp, run } = setup(t);
  fs.mkdirSync(target);
  const outside = path.join(temp, 'outside');
  fs.mkdirSync(outside);
  fs.writeFileSync(path.join(outside, 'SKILL.md'), 'keep');
  fs.symlinkSync(outside, path.join(target, 'promptme'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.equal(run('install', 'promptme', '--force').status, 1);
  assert.equal(fs.readFileSync(path.join(outside, 'SKILL.md'), 'utf8'), 'keep');
});

test('agent selection respects configured homes and rejects ambiguous detection', t => {
  const { temp } = setup(t);
  const env = { ...process.env, CODEX_HOME: path.join(temp, 'codex'), CLAUDE_HOME: path.join(temp, 'claude') };
  const run = (...args) => spawnSync(process.execPath, [path.join(root, 'bin/boring-skills.js'), ...args], { encoding: 'utf8', env });
  ok(run('install', 'promptme', '--agent', 'codex'));
  assert(fs.existsSync(path.join(env.CODEX_HOME, 'skills/promptme/SKILL.md')));
  ok(run('update'));
  ok(run('install', 'humanizer', '--agent', 'claude'));
  assert.equal(run('update').status, 1);
});

test('a newer package replaces old managed files and removes retired resources', t => {
  const { target, temp, run } = setup(t);
  ok(run('install', 'promptme'));
  const newer = path.join(temp, 'release');
  for (const file of ['bin', 'skills.json', 'package.json', 'Everyday-Help/promptme']) {
    fs.mkdirSync(path.dirname(path.join(newer, file)), { recursive: true });
    fs.cpSync(path.join(root, file), path.join(newer, file), { recursive: true });
  }
  const skill = path.join(newer, 'Everyday-Help/promptme');
  fs.writeFileSync(path.join(skill, 'example.txt'), 'new resource');
  fs.appendFileSync(path.join(skill, 'SKILL.md'), '\nNew release.\n');
  const pkg = JSON.parse(fs.readFileSync(path.join(newer, 'package.json')));
  pkg.version = '0.2.0';
  fs.writeFileSync(path.join(newer, 'package.json'), JSON.stringify(pkg));
  const update = () => spawnSync(process.execPath, [path.join(newer, 'bin/boring-skills.js'), 'update', '--dir', target], { encoding: 'utf8' });
  ok(update());
  assert.match(fs.readFileSync(path.join(target, 'promptme/SKILL.md'), 'utf8'), /New release/);
  assert(fs.existsSync(path.join(target, 'promptme/example.txt')));
  fs.unlinkSync(path.join(skill, 'example.txt'));
  ok(update());
  assert(!fs.existsSync(path.join(target, 'promptme/example.txt')));
  assert.equal(JSON.parse(fs.readFileSync(path.join(target, '.boring-skills.json'))).skills.promptme.version, '0.2.0');
});

test('retired skills do not block updates and remain untouched on disk', t => {
  const { target, run } = setup(t);
  ok(run('install', 'promptme'));
  const stateFile = path.join(target, '.boring-skills.json');
  const state = JSON.parse(fs.readFileSync(stateFile));
  state.skills['retired-skill'] = { version: '0.0.1', hash: 'old' };
  fs.writeFileSync(stateFile, JSON.stringify(state));
  fs.mkdirSync(path.join(target, 'retired-skill'));
  fs.writeFileSync(path.join(target, 'retired-skill/SKILL.md'), 'keep local copy');
  const result = run('update');
  ok(result);
  assert.match(result.stdout, /Skipped retired skills/);
  assert.equal(fs.readFileSync(path.join(target, 'retired-skill/SKILL.md'), 'utf8'), 'keep local copy');
});

test('shell installer includes every supporting resource', { skip: process.platform === 'win32' }, t => {
  const { temp, target } = setup(t);
  const mock = path.join(temp, 'curl');
  fs.writeFileSync(mock, `#!/usr/bin/env node\nconst fs = require('node:fs');\nconst path = require('node:path');\nconst relative = process.argv.at(-1).split('/main/')[1];\nprocess.stdout.write(fs.readFileSync(path.join(${JSON.stringify(root)}, relative)));\n`);
  fs.chmodSync(mock, 0o755);
  const result = spawnSync('sh', [path.join(root, 'install.sh'), '--dir', target, 'all'], { encoding: 'utf8', env: { ...process.env, PATH: temp + path.delimiter + process.env.PATH } });
  ok(result);
  function compare(source, destination) {
    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
      if (entry.name === '.DS_Store') continue;
      const src = path.join(source, entry.name);
      const dst = path.join(destination, entry.name);
      if (entry.isDirectory()) compare(src, dst);
      else assert.deepEqual(fs.readFileSync(dst), fs.readFileSync(src), `Shell install differs: ${dst}`);
    }
  }
  for (const skill of catalog) compare(path.join(root, skill.path), path.join(target, skill.name));
});
