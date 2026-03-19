import { describe, it, expect } from 'vitest';
import { gitCheckout, gitSwitch } from '@/lib/git-engine/commands/checkout';
import { createRepo } from '@/lib/git-engine/engine';

describe('git checkout', () => {
  it('switches to existing branch', () => {
    const repo = createRepo();
    repo.branches['feature'] = repo.branches['main'];
    const result = gitCheckout(repo, ['feature']);
    expect(result.success).toBe(true);
    expect(result.repo.HEAD).toBe('feature');
  });

  it('fails to switch to nonexistent branch', () => {
    const repo = createRepo();
    const result = gitCheckout(repo, ['nope']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('did not match');
  });

  it('creates and switches with -b', () => {
    const repo = createRepo();
    const result = gitCheckout(repo, ['-b', 'feature']);
    expect(result.success).toBe(true);
    expect(result.repo.HEAD).toBe('feature');
    expect(result.repo.branches['feature']).toBe(repo.branches['main']);
  });

  it('fails -b with no branch name', () => {
    const repo = createRepo();
    const result = gitCheckout(repo, ['-b']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('needs a branch name');
  });
});

describe('git switch', () => {
  it('switches to existing branch', () => {
    const repo = createRepo();
    repo.branches['dev'] = repo.branches['main'];
    const result = gitSwitch(repo, ['dev']);
    expect(result.success).toBe(true);
    expect(result.repo.HEAD).toBe('dev');
  });

  it('fails to switch to nonexistent branch', () => {
    const repo = createRepo();
    const result = gitSwitch(repo, ['nope']);
    expect(result.success).toBe(false);
    expect(result.output).toContain('invalid reference');
  });

  it('creates and switches with -c', () => {
    const repo = createRepo();
    const result = gitSwitch(repo, ['-c', 'feature']);
    expect(result.success).toBe(true);
    expect(result.repo.HEAD).toBe('feature');
    expect(result.repo.branches['feature']).toBeDefined();
  });

  it('fails -c with no name', () => {
    const repo = createRepo();
    const result = gitSwitch(repo, ['-c']);
    expect(result.success).toBe(false);
  });
});
