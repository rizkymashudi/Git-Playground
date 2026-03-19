import type { Repository, GitResult } from '../types';

export function gitDiff(repo: Repository): GitResult {
  const r = structuredClone(repo);

  if (r.staged.length || r.workingDir.length) {
    const files = [...r.staged, ...r.workingDir];
    const out = `diff --git\n${files.map((f) => `+++ b/${f}\n@@ -0,0 +1 @@\n+<file content>`).join('\n')}`;
    return { repo: r, output: out, success: true };
  }

  return { repo: r, output: 'No changes to diff', success: true };
}
