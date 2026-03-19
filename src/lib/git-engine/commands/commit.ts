import type { Repository, GitResult } from '../types';
import { randomHash } from '../engine';

export function gitCommit(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (r.staged.length === 0 && !args.includes('--allow-empty')) {
    return { repo: r, output: 'nothing to commit (use --allow-empty to override)', success: false };
  }

  const msgIdx = args.indexOf('-m');
  const msg =
    msgIdx >= 0
      ? args
          .slice(msgIdx + 1)
          .join(' ')
          .replace(/['"]/g, '')
      : 'commit';
  const hash = randomHash();
  const parent = r.branches[r.HEAD];

  r.commits.push({
    hash,
    msg,
    branch: r.HEAD,
    parent,
    timestamp: Date.now(),
    files: [...r.staged],
  });
  r.branches[r.HEAD] = hash;
  r.staged = [];

  const fileCount = r.commits[r.commits.length - 1].files?.length || 0;
  return {
    repo: r,
    output: `[${r.HEAD} ${hash}] ${msg}\n ${fileCount} file(s) changed`,
    success: true,
  };
}
