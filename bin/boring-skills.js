#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'skills.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const stateName = '.boring-skills.json';
const help = `Boring Skills ${pkg.version}

Usage:
  boring-skills list
  boring-skills install [all|skill ...] [--agent codex|claude | --dir PATH]
  boring-skills update [all|skill ...] [--agent codex|claude | --dir PATH]

Install defaults to all ${catalog.length} skills. Update defaults to previously managed skills.
Use install all to include newly added skills. Use --force to replace changed or
unmanaged skill folders (including local additions). Other skills are untouched.

Targets: --agent codex, --agent claude, or --dir /path/to/skills.
With no target, use the sole existing Codex/Claude skills directory.
If neither or both exist, specify a target explicitly.

Get the newest release and update installed skills in one step:
  npx boring-skills@latest update --agent codex

Options: --force, --help, --version
`;

function exists(p) {
  try { return fs.lstatSync(p); } catch (e) { if (e.code === 'ENOENT') return null; throw e; }
}

// Never follow links while reading or replacing a skill tree.
function digest(dir) {
  const hash = crypto.createHash('sha256');
  function walk(p, rel = '') {
    const stat = fs.lstatSync(p);
    if (stat.isSymbolicLink()) throw new Error(`Symbolic links are not supported inside skill folders: ${p}`);
    if (stat.isDirectory()) {
      hash.update(`directory:${rel}\0`);
      for (const name of fs.readdirSync(p).sort()) walk(path.join(p, name), `${rel}/${name}`);
    } else if (stat.isFile()) {
      hash.update(`file:${rel}\0${stat.size}\0`);
      hash.update(fs.readFileSync(p));
    } else throw new Error(`Unsupported file type: ${p}`);
  }
  walk(dir);
  return hash.digest('hex');
}

function targetFor(options) {
  if (options.dir && options.agent) throw new Error('Choose either --dir or --agent.');
  if (options.dir) return path.resolve(options.dir);
  const targets = {
    codex: path.join(process.env.CODEX_HOME || path.join(os.homedir(), '.codex'), 'skills'),
    claude: path.join(process.env.CLAUDE_HOME || path.join(os.homedir(), '.claude'), 'skills'),
  };
  if (options.agent) {
    if (!targets[options.agent]) throw new Error('Supported agents: codex, claude.');
    return path.resolve(targets[options.agent]);
  }
  const candidates = [...new Set(Object.values(targets).map(p => path.resolve(p)))].filter(p => exists(p)?.isDirectory());
  if (candidates.length !== 1) throw new Error('Specify --agent codex, --agent claude, or --dir PATH to choose where skills go.');
  return candidates[0];
}

function main(args) {
  if (args.includes('--help') || args.includes('-h') || !args.length) return console.log(help);
  if (args.length === 1 && args[0] === '--version') return console.log(pkg.version);
  const command = args.shift();
  if (!['list', 'install', 'update'].includes(command)) throw new Error(`Unknown command: ${command}. Use --help.`);
  const options = {};
  const names = [];
  while (args.length) {
    const arg = args.shift();
    if (arg === '--force') options.force = true;
    else if (arg === '--dir' || arg === '--agent') {
      const value = args.shift();
      if (!value || value.startsWith('--')) throw new Error(`${arg} requires a value.`);
      options[arg.slice(2)] = value;
    } else if (arg.startsWith('-')) throw new Error(`Unknown option: ${arg}`);
    else names.push(arg);
  }
  if (command === 'list') {
    if (names.length || Object.keys(options).length) throw new Error('list takes no arguments.');
    for (const s of catalog) console.log(`${s.name.padEnd(20)} ${s.description}`);
    return;
  }
  const target = targetFor(options);
  // Installing into the package itself would destroy the source for later updates.
  if (target === root || target.startsWith(root + path.sep)) throw new Error('Choose a skills directory outside this package.');
  const stateFile = path.join(target, stateName);
  if (exists(stateFile)?.isSymbolicLink()) throw new Error(`Refusing symbolic-link state file: ${stateFile}`);
  const state = exists(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : { schema: 1, skills: {} };
  if (state.schema !== 1 || !state.skills || typeof state.skills !== 'object' || Array.isArray(state.skills)) throw new Error('Invalid installation record; restore .boring-skills.json before updating.');
  if (names.includes('all') && names.length > 1) throw new Error('Use all by itself, or specify individual skill names.');
  const selected = !names.length || names[0] === 'all'
    ? (command === 'install' ? catalog.map(s => s.name) : Object.keys(state.skills)) : [...new Set(names)];
  const plans = selected.map(name => {
    const skill = catalog.find(s => s.name === name);
    if (!skill) throw new Error(`Unknown skill: ${name}. Use list to see available skills.`);
    if (command === 'update' && !Object.hasOwn(state.skills, name)) throw new Error(`${name} is not managed yet; run install ${name} first.`);
    const source = path.join(root, skill.path);
    const dest = path.join(target, name);
    if (exists(dest) && !exists(dest).isDirectory()) throw new Error(`Skill destination must be a real directory: ${dest}`);
    const wanted = digest(source);
    const current = exists(dest) ? digest(dest) : null;
    const previous = state.skills[name]?.hash;
    if (current && current !== wanted && current !== previous && !options.force) {
      throw new Error(`${name} contains local changes or was installed separately. Nothing was changed. Back it up, then use --force to replace that skill folder.`);
    }
    return { name, source, dest, wanted, current };
  });
  if (!plans.length) return console.log('No managed skills found. Run install all with the same target first.');
  // Preflight all skills before writing any of them.
  fs.mkdirSync(target, { recursive: true });
  const lock = path.join(target, '.boring-skills.lock');
  let lockFd;
  try { lockFd = fs.openSync(lock, 'wx'); }
  catch (e) { if (e.code === 'EEXIST') throw new Error(`Another installation may be running. If it stopped unexpectedly, remove ${lock} and retry.`); throw e; }
  try {
    // Detect another writer that completed while this invocation was planning.
    const now = exists(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : { schema: 1, skills: {} };
    if (JSON.stringify(now) !== JSON.stringify(state)) throw new Error('Installation record changed; rerun the command.');
    for (const plan of plans) {
      if ((exists(plan.dest) ? digest(plan.dest) : null) !== plan.current) throw new Error(`${plan.name} changed during installation; rerun the command.`);
      if (plan.current !== plan.wanted) {
        const temp = fs.mkdtempSync(path.join(target, '.boring-skills-'));
        const staged = path.join(temp, 'new');
        const backup = path.join(temp, 'old');
        try {
          fs.cpSync(plan.source, staged, { recursive: true });
          if (plan.current) fs.renameSync(plan.dest, backup);
          try { fs.renameSync(staged, plan.dest); }
          catch (e) { if (exists(backup)) fs.renameSync(backup, plan.dest); throw e; }
        } finally {
          // Keep the backup if an exceptional rollback failure left no destination.
          if (!exists(backup) || exists(plan.dest)) fs.rmSync(temp, { recursive: true, force: true });
          else console.error(`Backup preserved at ${backup}`);
        }
      }
      state.skills[plan.name] = { version: pkg.version, hash: plan.wanted };
      // Save after each successful skill so interrupted runs can be resumed.
      const temporaryState = path.join(target, `.boring-skills-state-${crypto.randomUUID()}.tmp`);
      try {
        fs.writeFileSync(temporaryState, JSON.stringify(state, null, 2) + '\n', { flag: 'wx' });
        fs.renameSync(temporaryState, stateFile);
      } finally { fs.rmSync(temporaryState, { force: true }); }
      console.log(`${plan.current === plan.wanted ? 'Current' : 'Installed'} ${plan.name} (${pkg.version})`);
    }
    console.log(`Skills directory: ${target}`);
  } finally {
    fs.closeSync(lockFd);
    fs.unlinkSync(lock);
  }
}

try { main(process.argv.slice(2)); }
catch (error) { console.error(`Error: ${error.message}`); process.exitCode = 1; }
