import type { Repository, GitResult } from '../types';
import { createRepo } from '../engine';

export function gitInit(): GitResult {
  return {
    repo: createRepo(),
    output: 'Initialized empty Git repository in .git/',
    success: true,
  };
}
