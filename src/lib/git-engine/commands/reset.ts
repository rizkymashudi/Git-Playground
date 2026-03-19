import type { Repository, GitResult } from '../types';

export function gitReset(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (args[0] === '--hard') {
    r.staged = [];
    r.workingDir = [];
    return { repo: r, output: `HEAD is now at ${r.branches[r.HEAD]}`, success: true };
  }

  if (args[0] === '--soft') {
    return {
      repo: r,
      output: `HEAD is now at ${r.branches[r.HEAD]} (staged changes preserved)`,
      success: true,
    };
  }

  r.staged = [];
  return { repo: r, output: 'Unstaged changes after reset', success: true };
}
