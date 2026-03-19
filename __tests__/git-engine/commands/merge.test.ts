import { describe, it, expect } from 'vitest';
import { gitMerge } from '@/lib/git-engine/commands/merge';
import { createRepo, randomHash } from '@/lib/git-engine/engine';

describe('git merge', () => {
  it('merges a branch into current', () => {
    const repo = createRepo();
    const featureHash = randomHash();
    repo.branches['feature'] = featureHash;
    repo.commits.push({
      hash: featureHash,
      msg: 'Feature work',
      branch: 'feature',
      parent: 'a1b2c3d',
      timestamp: Date.now(),
    });

    const result = gitMerge(repo, ['feature']);
    expect(result.success).toBe(true);
    expect(result.output).toContain('Merge made');
    expect(result.repo.commits[result.repo.commits.length - 1].msg).toContain(
      "Merge branch 'feature'",
    );
    expect(result.repo.commits[result.repo.commits.length - 1].mergeParent).toBe(featureHash);
  });

  it('returns up to date when branches point to same commit', () => {
    const repo = createRepo();
    repo.branches['feature'] = repo.branches['main'];
    const result = gitMerge(repo, ['feature']);
    expect(result.success).toBe(true);
    expect(result.output).toContain('Already up to date');
  });

  it('fails with no branch specified', () => {
    const repo = createRepo();
    const result = gitMerge(repo, []);
    expect(result.success).toBe(false);
    expect(result.output).toContain('specify branch');
  });

  it('fails with nonexistent branch', () => {
    const repo = createRepo();
    const result = gitMerge(repo, ['nope']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('not something we can merge');
  });
});
