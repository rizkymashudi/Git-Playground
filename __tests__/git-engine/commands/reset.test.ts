import { describe, it, expect } from 'vitest';
import { gitReset } from '@/lib/git-engine/commands/reset';
import { createRepo } from '@/lib/git-engine/engine';

describe('git reset', () => {
  it('unstages with mixed reset (default)', () => {
    const repo = createRepo();
    repo.staged = ['a.txt', 'b.txt'];
    const result = gitReset(repo, []);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toHaveLength(0);
    expect(result.output).toContain('Unstaged');
  });

  it('discards everything with --hard', () => {
    const repo = createRepo();
    repo.staged = ['a.txt'];
    repo.workingDir = ['b.txt'];
    const result = gitReset(repo, ['--hard']);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toHaveLength(0);
    expect(result.repo.workingDir).toHaveLength(0);
    expect(result.output).toContain('HEAD is now at');
  });

  it('preserves staged with --soft', () => {
    const repo = createRepo();
    repo.staged = ['a.txt'];
    const result = gitReset(repo, ['--soft']);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toEqual(['a.txt']);
    expect(result.output).toContain('staged changes preserved');
  });
});
