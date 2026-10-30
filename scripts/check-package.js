import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'yaml';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const skills = JSON.parse(fs.readFileSync('skills.json', 'utf8'));
assert.equal(pkg.license, 'MIT');
assert(fs.readFileSync('LICENSE', 'utf8').includes('MIT License'));
const names = new Set();
for (const skill of skills) {
  assert.match(skill.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert(!names.has(skill.name), `Duplicate skill: ${skill.name}`);
  names.add(skill.name);
  assert(!path.isAbsolute(skill.path) && !skill.path.split('/').includes('..'));
  const text = fs.readFileSync(path.join(skill.path, 'SKILL.md'), 'utf8');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert(frontmatter, `Missing frontmatter: ${skill.name}`);
  const metadata = parse(frontmatter[1], { uniqueKeys: true });
  assert.equal(metadata.name, skill.name);
  assert(typeof metadata.description === 'string' && metadata.description.trim().length > 0);
  assert(skill.path.startsWith('skills/') && pkg.files.includes('skills/'), `Not packaged: ${skill.name}`);
  assert(fs.readFileSync('README.md', 'utf8').includes(`](https://github.com/Nithish-Yenaganti/Boring-Skills/blob/main/${skill.path}/SKILL.md)`), `Missing README link: ${skill.name}`);
  function inspect(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const filename = path.join(dir, entry.name);
      assert(!entry.isSymbolicLink(), `Skill must not contain symlinks: ${filename}`);
      if (entry.isDirectory()) inspect(filename);
      else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(filename, 'utf8');
        for (const [, link] of content.matchAll(/\]\(([^\s)]+)\)/g)) {
          if (/^(?:[a-z]+:|#)/i.test(link)) continue;
          const local = path.resolve(path.dirname(filename), link.split('#')[0]);
          assert(local.startsWith(path.resolve(skill.path) + path.sep), `Reference escapes skill: ${link}`);
          assert(fs.existsSync(local), `Missing reference in ${filename}: ${link}`);
        }
      }
    }
  }
  inspect(skill.path);
}
// Every packaged skill folder must be listed in the catalog.
const folders = fs.readdirSync('skills', { withFileTypes: true }).filter(e => e.isDirectory())
  .flatMap(c => fs.readdirSync(path.join('skills', c.name), { withFileTypes: true }).filter(e => e.isDirectory()).map(e => `skills/${c.name}/${e.name}`));
assert.deepEqual(folders.sort(), skills.map(s => s.path).sort(), 'skills/ must contain exactly the catalog skills.');
console.log(`Checked ${skills.length} skills: YAML metadata, local references, package paths, README links, and MIT license.`);
