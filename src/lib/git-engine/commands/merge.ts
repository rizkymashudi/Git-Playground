import type { Repository, GitResult } from '../types';
import { randomHash } from '../engine';

export function gitMerge(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);
  const source = args[0];

  if (!source) return { repo: r, output: 'error: specify branch to merge', success: false };
  if (!r.branches[source])
    return { repo: r, output: `merge: ${source} - not something we can merge`, success: false };
  if (r.branches[source] === r.branches[r.HEAD])
    return { repo: r, output: 'Already up to date.', success: true };

  const hash = randomHash();
  r.commits.push({
    hash,
    msg: `Merge branch '${source}' into ${r.HEAD}`,
    branch: r.HEAD,
    parent: r.branches[r.HEAD],
    mergeParent: r.branches[source],
    timestamp: Date.now(),
  });
  r.branches[r.HEAD] = hash;

  return {
    repo: r,
    output: `Merge made by the 'ort' strategy.\nMerge commit: ${hash}`,
    success: true,
  };
}
