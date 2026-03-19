import { describe, it, expect } from 'vitest';
import { gitCommit } from '@/lib/git-engine/commands/commit';
import { createRepo } from '@/lib/git-engine/engine';

describe('git commit', () => {
  it('commits staged files with message', () => {
    const repo = createRepo();
    repo.staged = ['readme.md'];
    const result = gitCommit(repo, ['-m', 'Add readme']);
    expect(result.success).toBe(true);
    expect(result.repo.staged).toHaveLength(0);
    expect(result.repo.commits).toHaveLength(2);
    expect(result.repo.commits[1].msg).toBe('Add readme');
    expect(result.output).toContain('Add readme');
  });

  it('fails with nothing staged', () => {
    const repo = createRepo();
    const result = gitCommit(repo, ['-m', 'empty']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('nothing to commit');
  });

  it('allows empty commit with --allow-empty', () => {
    const repo = createRepo();
    const result = gitCommit(repo, ['--allow-empty', '-m', 'empty']);
    expect(result.success).toBe(true);
    expect(result.repo.commits).toHaveLength(2);
  });

  it('uses default message when no -m flag', () => {
    const repo = createRepo();
    repo.staged = ['file.txt'];
    const result = gitCommit(repo, []);
    expect(result.success).toBe(true);
    expect(result.repo.commits[1].msg).toBe('commit');
  });

  it('updates branch pointer after commit', () => {
    const repo = createRepo();
    repo.staged = ['file.txt'];
    const result = gitCommit(repo, ['-m', 'new']);
    const newHash = result.repo.commits[1].hash;
    expect(result.repo.branches['main']).toBe(newHash);
  });

  it('sets parent to previous branch head', () => {
    const repo = createRepo();
    repo.staged = ['file.txt'];
    const result = gitCommit(repo, ['-m', 'second']);
    expect(result.repo.commits[1].parent).toBe('a1b2c3d');
  });
});
