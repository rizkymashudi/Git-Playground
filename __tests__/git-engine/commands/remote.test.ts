import { describe, it, expect } from 'vitest';
import { gitRemote, gitPush, gitPull, gitFetch } from '@/lib/git-engine/commands/remote';
import { createRepo } from '@/lib/git-engine/engine';

describe('git remote', () => {
  it('lists remotes with -v', () => {
    const repo = createRepo();
    const result = gitRemote(repo, ['-v']);
    expect(result.success).toBe(true);
    expect(result.output).toContain('origin');
  });

  it('lists remotes with no args', () => {
    const repo = createRepo();
    const result = gitRemote(repo, []);
    expect(result.success).toBe(true);
    expect(result.output).toContain('origin');
  });

  it('adds a new remote', () => {
    const repo = createRepo();
    const result = gitRemote(repo, ['add', 'upstream']);
    expect(result.success).toBe(true);
    expect(result.repo.remotes['upstream']).toBeDefined();
  });

  it('fails with unknown subcommand', () => {
    const repo = createRepo();
    const result = gitRemote(repo, ['remove']);
    expect(result.success).toBe(false);
  });
});

describe('git push', () => {
  it('pushes current branch to origin', () => {
    const repo = createRepo();
    const result = gitPush(repo, []);
    expect(result.success).toBe(true);
    expect(result.repo.remotes['origin']['main']).toBeDefined();
  });

  it('pushes specified branch to specified remote', () => {
    const repo = createRepo();
    repo.branches['feature'] = 'abc1234';
    const result = gitPush(repo, ['origin', 'feature']);
    expect(result.success).toBe(true);
    expect(result.repo.remotes['origin']['feature']).toBeDefined();
  });
});

describe('git pull', () => {
  it('creates a new commit simulating pull', () => {
    const repo = createRepo();
    const result = gitPull(repo);
    expect(result.success).toBe(true);
    expect(result.repo.commits).toHaveLength(2);
    expect(result.output).toContain('Fast-forward');
  });
});

describe('git fetch', () => {
  it('simulates fetching from origin', () => {
    const repo = createRepo();
    const result = gitFetch(repo);
    expect(result.success).toBe(true);
    expect(result.output).toContain('Fetching origin');
  });
});
