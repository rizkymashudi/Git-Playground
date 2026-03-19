import { describe, it, expect } from 'vitest';
import { executeGitCommand, handleNonGit, createRepo } from '@/lib/git-engine/engine';

describe('executeGitCommand dispatcher', () => {
  it('dispatches git init', () => {
    const repo = createRepo();
    const result = executeGitCommand(repo, 'git init');
    expect(result.success).toBe(true);
    expect(result.output).toContain('Initialized');
  });

  it('dispatches git status', () => {
    const repo = createRepo();
    const result = executeGitCommand(repo, 'git status');
    expect(result.success).toBe(true);
    expect(result.output).toContain('On branch main');
  });

  it('dispatches git add', () => {
    const repo = createRepo();
    repo.workingDir = ['file.txt'];
    const result = executeGitCommand(repo, 'git add file.txt');
    expect(result.success).toBe(true);
    expect(result.repo.staged).toContain('file.txt');
  });

  it('dispatches git commit', () => {
    const repo = createRepo();
    repo.staged = ['file.txt'];
    const result = executeGitCommand(repo, 'git commit -m test');
    expect(result.success).toBe(true);
    expect(result.repo.commits).toHaveLength(2);
  });

  it('dispatches git branch', () => {
    const result = executeGitCommand(createRepo(), 'git branch feature');
    expect(result.success).toBe(true);
    expect(result.repo.branches['feature']).toBeDefined();
  });

  it('dispatches git checkout', () => {
    const repo = createRepo();
    repo.branches['dev'] = repo.branches['main'];
    const result = executeGitCommand(repo, 'git checkout dev');
    expect(result.success).toBe(true);
    expect(result.repo.HEAD).toBe('dev');
  });

  it('dispatches git switch', () => {
    const repo = createRepo();
    const result = executeGitCommand(repo, 'git switch -c new-branch');
    expect(result.success).toBe(true);
    expect(result.repo.HEAD).toBe('new-branch');
  });

  it('dispatches git tag', () => {
    const result = executeGitCommand(createRepo(), 'git tag v1.0');
    expect(result.success).toBe(true);
    expect(result.repo.tags['v1.0']).toBeDefined();
  });

  it('dispatches git log', () => {
    const result = executeGitCommand(createRepo(), 'git log --oneline');
    expect(result.success).toBe(true);
    expect(result.output).toContain('Initial commit');
  });

  it('dispatches git reflog', () => {
    const result = executeGitCommand(createRepo(), 'git reflog');
    expect(result.success).toBe(true);
    expect(result.output).toContain('HEAD@{0}');
  });

  it('dispatches git diff', () => {
    const result = executeGitCommand(createRepo(), 'git diff');
    expect(result.success).toBe(true);
    expect(result.output).toContain('No changes');
  });

  it('dispatches git help', () => {
    const result = executeGitCommand(createRepo(), 'git help');
    expect(result.success).toBe(true);
    expect(result.output).toContain('Available commands');
  });

  it('rejects non-git commands', () => {
    const result = executeGitCommand(createRepo(), 'npm install');
    expect(result.success).toBe(false);
    expect(result.output).toContain('Command not found');
  });

  it('rejects unknown git subcommands', () => {
    const result = executeGitCommand(createRepo(), 'git bisect');
    expect(result.success).toBe(false);
    expect(result.output).toContain('is not a git command');
  });
});

describe('handleNonGit', () => {
  it('handles touch command', () => {
    const repo = createRepo();
    const result = handleNonGit('touch readme.md', repo);
    expect(result.success).toBe(true);
    expect(result.repo.workingDir).toContain('readme.md');
  });

  it('does not duplicate existing files with touch', () => {
    const repo = createRepo();
    repo.workingDir = ['readme.md'];
    const result = handleNonGit('touch readme.md', repo);
    expect(result.repo.workingDir.filter((f) => f === 'readme.md')).toHaveLength(1);
  });

  it('handles clear command', () => {
    const result = handleNonGit('clear', createRepo());
    expect(result.output).toBe('__CLEAR__');
  });

  it('handles help command', () => {
    const result = handleNonGit('help', createRepo());
    expect(result.success).toBe(true);
    expect(result.output).toContain('Available commands');
  });

  it('rejects unknown commands', () => {
    const result = handleNonGit('ls', createRepo());
    expect(result.success).toBe(false);
    expect(result.output).toContain('Command not found');
  });
});
