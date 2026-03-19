import type { Repository, GitResult } from './types';
import { gitInit } from './commands/init';
import { gitAdd } from './commands/add';
import { gitCommit } from './commands/commit';
import { gitBranch } from './commands/branch';
import { gitCheckout, gitSwitch } from './commands/checkout';
import { gitMerge } from './commands/merge';
import { gitRebase } from './commands/rebase';
import { gitStash } from './commands/stash';
import { gitRemote, gitPush, gitPull, gitFetch } from './commands/remote';
import { gitReset } from './commands/reset';
import { gitTag } from './commands/tag';
import { gitLog, gitReflog } from './commands/log';
import { gitDiff } from './commands/diff';
import { gitCherryPick } from './commands/cherry-pick';
import { gitHelp } from './commands/help';

export function randomHash(): string {
  return Math.random().toString(16).substring(2, 9);
}

export function createRepo(): Repository {
  return {
    commits: [
      { hash: 'a1b2c3d', msg: 'Initial commit', branch: 'main', parent: null, timestamp: Date.now() },
    ],
    branches: { main: 'a1b2c3d' },
    HEAD: 'main',
    staged: [],
    workingDir: [],
    stash: [],
    tags: {},
    remotes: { origin: { main: 'a1b2c3d' } },
    log: [],
  };
}

function gitStatus(repo: Repository): GitResult {
  const r = structuredClone(repo);
  let out = `On branch ${r.HEAD}\n`;
  if (r.staged.length) out += `\nChanges to be committed:\n${r.staged.map(f => `  new file: ${f}`).join('\n')}\n`;
  if (r.workingDir.length) out += `\nUntracked files:\n${r.workingDir.map(f => `  ${f}`).join('\n')}\n`;
  if (!r.staged.length && !r.workingDir.length) out += '\nnothing to commit, working tree clean';
  return { repo: r, output: out, success: true };
}

export function executeGitCommand(repo: Repository, input: string): GitResult {
  const r = structuredClone(repo);
  const parts = input.trim().split(/\s+/);

  if (parts[0] !== 'git') {
    return { repo: r, output: `Command not found: ${parts[0]}. Try 'git <command>'`, success: false };
  }

  const cmd = parts[1];
  const args = parts.slice(2);

  switch (cmd) {
    case 'init':
      return gitInit();
    case 'status':
      return gitStatus(r);
    case 'add':
      return gitAdd(r, args);
    case 'commit':
      return gitCommit(r, args);
    case 'log':
      return gitLog(r, args);
    case 'branch':
      return gitBranch(r, args);
    case 'checkout':
      return gitCheckout(r, args);
    case 'switch':
      return gitSwitch(r, args);
    case 'merge':
      return gitMerge(r, args);
    case 'rebase':
      return gitRebase(r, args);
    case 'stash':
      return gitStash(r, args);
    case 'tag':
      return gitTag(r, args);
    case 'remote':
      return gitRemote(r, args);
    case 'push':
      return gitPush(r, args);
    case 'pull':
      return gitPull(r);
    case 'fetch':
      return gitFetch(r);
    case 'reset':
      return gitReset(r, args);
    case 'cherry-pick':
      return gitCherryPick(r, args);
    case 'diff':
      return gitDiff(r);
    case 'reflog':
      return gitReflog(r);
    case 'help':
      return gitHelp(r);
    default:
      return { repo: r, output: `git: '${cmd}' is not a git command. See 'git help'.`, success: false };
  }
}

export function handleNonGit(input: string, repo: Repository): GitResult {
  const parts = input.trim().split(/\s+/);

  if (parts[0] === 'touch') {
    const file = parts[1] || 'file.txt';
    const r = structuredClone(repo);
    if (!r.workingDir.includes(file) && !r.staged.includes(file)) {
      r.workingDir.push(file);
    }
    return { repo: r, output: `Created file '${file}'`, success: true };
  }

  if (parts[0] === 'clear') {
    return { repo: structuredClone(repo), output: '__CLEAR__', success: true };
  }

  if (parts[0] === 'help') {
    return gitHelp(repo);
  }

  return {
    repo: structuredClone(repo),
    output: `Command not found: ${parts[0]}. Try 'git help' for available commands.`,
    success: false,
  };
}
