import type { Repository, GitResult } from '../types';

export function gitStash(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (!args.length || args[0] === 'push') {
    if (r.staged.length === 0 && r.workingDir.length === 0) {
      return { repo: r, output: 'No local changes to save', success: false };
    }
    r.stash.push({
      staged: [...r.staged],
      workingDir: [...r.workingDir],
      msg: args.slice(1).join(' ') || `WIP on ${r.HEAD}`,
    });
    r.staged = [];
    r.workingDir = [];
    return { repo: r, output: `Saved working directory and index state: ${r.stash[r.stash.length - 1].msg}`, success: true };
  }

  if (args[0] === 'pop') {
    if (r.stash.length === 0) return { repo: r, output: 'No stash entries found.', success: false };
    const s = r.stash.pop()!;
    r.staged = s.staged;
    r.workingDir = s.workingDir;
    return { repo: r, output: 'Restored changes from stash', success: true };
  }

  if (args[0] === 'list') {
    if (r.stash.length === 0) return { repo: r, output: 'No stash entries.', success: true };
    return { repo: r, output: r.stash.map((s, i) => `stash@{${i}}: ${s.msg}`).join('\n'), success: true };
  }

  return { repo: r, output: `Unknown stash command: ${args[0]}`, success: false };
}
