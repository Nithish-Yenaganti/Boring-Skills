import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const skills = JSON.parse(fs.readFileSync('skills.json', 'utf8'));
const names = new Set();
for (const skill of skills) {
  assert.match(skill.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert(!names.has(skill.name), `Duplicate skill: ${skill.name}`);
  names.add(skill.name);
  assert(!path.isAbsolute(skill.path) && !skill.path.split('/').includes('..'));
  const text = fs.readFileSync(path.join(skill.path, 'SKILL.md'), 'utf8');
  assert(text.startsWith('---\n'), `Missing frontmatter: ${skill.name}`);
  assert.match(text, new RegExp(`^name: ${skill.name}$`, 'm'));
  assert.match(text, /^description: .+/m);
  assert(pkg.files.includes(`${skill.path}/`), `Not packaged: ${skill.name}`);
  assert(fs.readFileSync('README.md', 'utf8').includes(`](${skill.path}/SKILL.md)`), `Missing README link: ${skill.name}`);
}
console.log(`Checked ${skills.length} skill entries, package paths, and README links.`);
