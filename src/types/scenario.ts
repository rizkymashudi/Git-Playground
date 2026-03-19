import type { Repository } from '@/lib/git-engine/types';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Step {
  instruction: string;
  hint: string;
  check: (repo: Repository) => boolean;
}

export interface Scenario {
  id: string;
  title: string;
  difficulty: Difficulty;
  industry: string;
  description: string;
  steps: Step[];
}

export interface Category {
  id: string;
  icon: string;
  title: string;
  color: string;
  scenarios: Scenario[];
}
