import type { Repository, GitResult } from '../types';
import { randomHash } from '../engine';

export function gitRebase(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);
  const target = args[0];

  if (!target) return { repo: r, output: 'error: specify upstream branch', success: false };
  if (!r.branches[target]) return { repo: r, output: `fatal: invalid upstream '${target}'`, success: false };

  const hash = randomHash();
  r.commits.push({
    hash,
    msg: `Rebased ${r.HEAD} onto ${target}`,
    branch: r.HEAD,
    parent: r.branches[target],
    timestamp: Date.now(),
  });
  r.branches[r.HEAD] = hash;

  return { repo: r, output: `Successfully rebased and updated refs/heads/${r.HEAD}.`, success: true };
}
