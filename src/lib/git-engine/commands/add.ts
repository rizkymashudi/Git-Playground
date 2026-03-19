import type { Repository, GitResult } from '../types';

export function gitAdd(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (args[0] === '.') {
    r.staged = [...r.staged, ...r.workingDir];
    r.workingDir = [];
    return { repo: r, output: 'Added all files to staging area', success: true };
  }

  const file = args[0] || 'file.txt';
  if (r.workingDir.includes(file)) {
    r.workingDir = r.workingDir.filter((f) => f !== file);
    r.staged.push(file);
  } else {
    r.staged.push(file);
  }

  return { repo: r, output: `Added '${file}' to staging area`, success: true };
}
