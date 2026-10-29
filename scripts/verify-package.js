import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'boring-skills-release-'));
const npmCli = process.env.npm_execpath;
assert(npmCli, 'Run this check with npm run test:package.');
const npm = (...args) => execFileSync(process.execPath, [npmCli, ...args, '--dry-run=false', '--cache', path.join(temp, 'cache')], { encoding: 'utf8', cwd: root });
const skills = JSON.parse(fs.readFileSync('skills.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
function files(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.name !== '.DS_Store').flatMap(e => {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    return e.isDirectory() ? files(path.join(dir, e.name), rel) : [rel];
  });
}
try {
  const packed = JSON.parse(npm('pack', '--json', '--ignore-scripts', '--pack-destination', temp))[0];
  const expected = ['package.json', 'README.md', 'LICENSE', 'skills.json', ...files('bin').map(f => `bin/${f}`), ...skills.flatMap(s => files(s.path).map(f => `${s.path}/${f}`))].sort();
  assert.deepEqual(packed.files.map(f => f.path).sort(), expected, 'Release must contain exactly the public files and complete skill folders.');
  const prefix = path.join(temp, 'installed');
  npm('install', '--prefix', prefix, path.join(temp, packed.filename), '--offline', '--ignore-scripts', '--omit=dev', '--no-audit', '--no-fund');
  const installed = path.join(prefix, 'node_modules', pkg.name);
  const cli = path.join(installed, pkg.bin['boring-skills']);
  const target = path.join(temp, 'user-skills');
  const run = (...args) => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
  assert.equal(run('--version').trim(), pkg.version);
  assert(run('list').includes('promptme'));
  run('install', '--dir', target);
  for (const s of skills) {
    for (const file of files(s.path)) {
      assert.deepEqual(fs.readFileSync(path.join(target, s.name, file)), fs.readFileSync(path.join(root, s.path, file)), `Installed resource differs: ${s.name}/${file}`);
    }
  }
  run('update', '--dir', target);
  assert.equal(Object.keys(JSON.parse(fs.readFileSync(path.join(target, '.boring-skills.json'))).skills).length, skills.length);
  console.log(`Release archive verified: ${packed.entryCount} files, ${skills.length} skills, all resources installed byte-for-byte, update passed.`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
