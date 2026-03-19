import { describe, it, expect } from 'vitest';
import { gitAdd } from '@/lib/git-engine/commands/add';
import { createRepo } from '@/lib/git-engine/engine';

describe('git add', () => {
  it('stages a specific file from working dir', () => {
    const repo = createRepo();
    repo.workingDir = ['readme.md', 'app.ts'];
    const result = gitAdd(repo, ['readme.md']);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toContain('readme.md');
    expect(result.repo.workingDir).not.toContain('readme.md');
    expect(result.repo.workingDir).toContain('app.ts');
  });

  it('stages all files with dot', () => {
    const repo = createRepo();
    repo.workingDir = ['a.txt', 'b.txt', 'c.txt'];
    const result = gitAdd(repo, ['.']);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toHaveLength(3);
    expect(result.repo.workingDir).toHaveLength(0);
  });

  it('adds file not in working dir to staged', () => {
    const repo = createRepo();
    const result = gitAdd(repo, ['new-file.txt']);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toContain('new-file.txt');
  });

  it('uses default filename when no arg given', () => {
    const repo = createRepo();
    const result = gitAdd(repo, []);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toContain('file.txt');
  });
});
