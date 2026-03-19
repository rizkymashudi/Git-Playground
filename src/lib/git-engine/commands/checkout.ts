import type { Repository, GitResult } from '../types';

export function gitCheckout(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (args[0] === '-b') {
    const name = args[1];
    if (!name) return { repo: r, output: 'error: switch needs a branch name', success: false };
    r.branches[name] = r.branches[r.HEAD];
    r.HEAD = name;
    return { repo: r, output: `Switched to a new branch '${name}'`, success: true };
  }

  const name = args[0];
  if (!r.branches[name])
    return { repo: r, output: `error: pathspec '${name}' did not match`, success: false };
  r.HEAD = name;
  return { repo: r, output: `Switched to branch '${name}'`, success: true };
}

export function gitSwitch(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (args[0] === '-c') {
    const name = args[1];
    if (!name) return { repo: r, output: 'error: switch needs a branch name', success: false };
    r.branches[name] = r.branches[r.HEAD];
    r.HEAD = name;
    return { repo: r, output: `Switched to a new branch '${name}'`, success: true };
  }

  const name = args[0];
  if (!r.branches[name])
    return { repo: r, output: `error: invalid reference: ${name}`, success: false };
  r.HEAD = name;
  return { repo: r, output: `Switched to branch '${name}'`, success: true };
}
