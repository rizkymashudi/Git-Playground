import type { Repository, GitResult } from '../types';
import { randomHash } from '../engine';

export function gitRemote(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (args[0] === '-v' || !args.length) {
    const out = Object.keys(r.remotes)
      .map((name) => `${name}\t<url> (fetch)\n${name}\t<url> (push)`)
      .join('\n');
    return { repo: r, output: out, success: true };
  }

  if (args[0] === 'add') {
    r.remotes[args[1]] = {};
    return { repo: r, output: `Added remote '${args[1]}'`, success: true };
  }

  return { repo: r, output: 'Unknown remote subcommand', success: false };
}

export function gitPush(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);
  const remote = args[0] || 'origin';
  const branch = args[1] || r.HEAD;

  if (!r.remotes[remote]) r.remotes[remote] = {};
  r.remotes[remote][branch] = r.branches[r.HEAD];

  return {
    repo: r,
    output: `To ${remote}\n   ${r.branches[r.HEAD].substring(0, 7)}..${r.branches[r.HEAD]} ${branch} -> ${branch}`,
    success: true,
  };
}

export function gitPull(repo: Repository): GitResult {
  const r = structuredClone(repo);
  const hash = randomHash();
  r.commits.push({
    hash,
    msg: 'Pulled latest from remote',
    branch: r.HEAD,
    parent: r.branches[r.HEAD],
    timestamp: Date.now(),
  });
  r.branches[r.HEAD] = hash;
  return { repo: r, output: 'Already up to date.\nFrom origin\n   Fast-forward', success: true };
}

export function gitFetch(repo: Repository): GitResult {
  return {
    repo: structuredClone(repo),
    output: 'Fetching origin\nFrom origin\n   * [new branch] main -> origin/main',
    success: true,
  };
}
