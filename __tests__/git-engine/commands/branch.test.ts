import { describe, it, expect } from 'vitest';
import { gitBranch } from '@/lib/git-engine/commands/branch';
import { createRepo } from '@/lib/git-engine/engine';

describe('git branch', () => {
  it('lists branches with current marked', () => {
    const repo = createRepo();
    const result = gitBranch(repo, []);
    expect(result.success).toBe(true);
    expect(result.output).toContain('* main');
  });

  it('creates a new branch', () => {
    const repo = createRepo();
    const result = gitBranch(repo, ['feature']);
    expect(result.success).toBe(true);
    expect(result.repo.branches['feature']).toBe(repo.branches['main']);
    expect(result.output).toContain("Created branch 'feature'");
  });

  it('fails to create duplicate branch', () => {
    const repo = createRepo();
    const result = gitBranch(repo, ['main']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('already exists');
  });

  it('deletes a branch with -d', () => {
    const repo = createRepo();
    repo.branches['feature'] = repo.branches['main'];
    const result = gitBranch(repo, ['-d', 'feature']);
    expect(result.success).toBe(true);
    expect(result.repo.branches['feature']).toBeUndefined();
  });

  it('deletes a branch with -D', () => {
    const repo = createRepo();
    repo.branches['feature'] = repo.branches['main'];
    const result = gitBranch(repo, ['-D', 'feature']);
    expect(result.success).toBe(true);
    expect(result.repo.branches['feature']).toBeUndefined();
  });

  it('fails to delete current branch', () => {
    const repo = createRepo();
    const result = gitBranch(repo, ['-d', 'main']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('Cannot delete');
  });

  it('fails to delete nonexistent branch', () => {
    const repo = createRepo();
    const result = gitBranch(repo, ['-d', 'nope']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('not found');
  });

  it('fails when -d has no branch name', () => {
    const repo = createRepo();
    const result = gitBranch(repo, ['-d']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('branch name required');
  });
});
