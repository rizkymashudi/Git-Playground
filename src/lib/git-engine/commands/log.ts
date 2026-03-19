import type { Repository, GitResult } from '../types';

export function gitLog(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);
  const isOneline = args.includes('--oneline');

  const branchCommits = r.commits.filter((c) => {
    let current: string | null = r.branches[r.HEAD];
    while (current) {
      const commit = r.commits.find((x) => x.hash === current);
      if (commit?.hash === c.hash) return true;
      current = commit?.parent ?? null;
    }
    return false;
  });

  if (isOneline) {
    const out = branchCommits
      .reverse()
      .map((c) => `${c.hash} ${c.msg}`)
      .join('\n');
    return { repo: r, output: out || 'No commits yet', success: true };
  }

  const out = branchCommits
    .reverse()
    .map(
      (c) =>
        `commit ${c.hash}${r.branches[r.HEAD] === c.hash ? ` (HEAD -> ${r.HEAD})` : ''}\n    ${c.msg}`,
    )
    .join('\n\n');

  return { repo: r, output: out || 'No commits yet', success: true };
}

export function gitReflog(repo: Repository): GitResult {
  const r = structuredClone(repo);
  const out = r.commits
    .slice()
    .reverse()
    .map((c, i) => `${c.hash} HEAD@{${i}}: ${c.msg}`)
    .join('\n');
  return { repo: r, output: out, success: true };
}
