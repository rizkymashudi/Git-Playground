import { describe, it, expect } from 'vitest';
import { gitStash } from '@/lib/git-engine/commands/stash';
import { createRepo } from '@/lib/git-engine/engine';

describe('git stash', () => {
  it('stashes staged and working dir changes', () => {
    const repo = createRepo();
    repo.staged = ['a.txt'];
    repo.workingDir = ['b.txt'];
    const result = gitStash(repo, []);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toHaveLength(0);
    expect(result.repo.workingDir).toHaveLength(0);
    expect(result.repo.stash).toHaveLength(1);
    expect(result.output).toContain('Saved working directory');
  });

  it('fails with no changes to stash', () => {
    const repo = createRepo();
    const result = gitStash(repo, []);
    expect(result.success).toBe(false);
    expect(result.output).toContain('No local changes');
  });

  it('pops stash and restores changes', () => {
    const repo = createRepo();
    repo.stash = [{ staged: ['a.txt'], workingDir: ['b.txt'], msg: 'WIP on main' }];
    const result = gitStash(repo, ['pop']);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toEqual(['a.txt']);
    expect(result.repo.workingDir).toEqual(['b.txt']);
    expect(result.repo.stash).toHaveLength(0);
  });

  it('fails to pop empty stash', () => {
    const repo = createRepo();
    const result = gitStash(repo, ['pop']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('No stash entries');
  });

  it('lists stash entries', () => {
    const repo = createRepo();
    repo.stash = [
      { staged: ['a.txt'], workingDir: [], msg: 'WIP on main' },
      { staged: [], workingDir: ['b.txt'], msg: 'WIP on feature' },
    ];
    const result = gitStash(repo, ['list']);
    expect(result.success).toBe(true);
    expect(result.output).toContain('stash@{0}');
    expect(result.output).toContain('stash@{1}');
  });

  it('lists empty stash', () => {
    const repo = createRepo();
    const result = gitStash(repo, ['list']);
    expect(result.success).toBe(true);
    expect(result.output).toContain('No stash entries');
  });

  it('handles push subcommand same as default', () => {
    const repo = createRepo();
    repo.staged = ['file.txt'];
    const result = gitStash(repo, ['push']);
    expect(result.success).toBe(true);
    expect(result.repo.stash).toHaveLength(1);
  });

  it('fails with unknown subcommand', () => {
    const repo = createRepo();
    const result = gitStash(repo, ['drop']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('Unknown stash command');
  });
});
