import type { Repository, GitResult } from '../types';

export function gitBranch(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (args.length === 0) {
    const out = Object.keys(r.branches)
      .map((b) => `${b === r.HEAD ? '* ' : '  '}${b}`)
      .join('\n');
    return { repo: r, output: out, success: true };
  }

  if (args[0] === '-d' || args[0] === '-D') {
    const name = args[1];
    if (!name) return { repo: r, output: 'error: branch name required', success: false };
    if (name === r.HEAD)
      return {
        repo: r,
        output: `error: Cannot delete branch '${name}' checked out`,
        success: false,
      };
    if (!r.branches[name])
      return { repo: r, output: `error: branch '${name}' not found`, success: false };
    delete r.branches[name];
    return { repo: r, output: `Deleted branch ${name}`, success: true };
  }

  const name = args[0];
  if (r.branches[name])
    return { repo: r, output: `fatal: branch '${name}' already exists`, success: false };
  r.branches[name] = r.branches[r.HEAD];
  return { repo: r, output: `Created branch '${name}' at ${r.branches[r.HEAD]}`, success: true };
}
