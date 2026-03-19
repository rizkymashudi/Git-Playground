import type { Repository, GitResult } from '../types';

export function gitTag(repo: Repository, args: string[]): GitResult {
  const r = structuredClone(repo);

  if (!args.length) {
    const tags = Object.keys(r.tags);
    return { repo: r, output: tags.length ? tags.join('\n') : 'No tags', success: true };
  }

  const tagName = args[0];
  r.tags[tagName] = r.branches[r.HEAD];
  return { repo: r, output: `Created tag '${tagName}' at ${r.branches[r.HEAD]}`, success: true };
}
