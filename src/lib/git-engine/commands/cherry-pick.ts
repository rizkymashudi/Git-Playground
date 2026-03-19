import type { Repository, GitResult } from '../types';
import { randomHash } from '../engine';

export function gitCherryPick(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);
  const target = args[0];

  const found = r.commits.find((c) => c.hash.startsWith(target));
  if (!found) return { repo: r, output: `fatal: bad object ${target}`, success: false };

  const hash = randomHash();
  r.commits.push({
    hash,
    msg: found.msg,
    branch: r.HEAD,
    parent: r.branches[r.HEAD],
    timestamp: Date.now(),
    cherryPicked: true,
  });
  r.branches[r.HEAD] = hash;

  return {
    repo: r,
    output: `[${r.HEAD} ${hash}] ${found.msg}\nCherry-picked from ${found.hash}`,
    success: true,
  };
}
