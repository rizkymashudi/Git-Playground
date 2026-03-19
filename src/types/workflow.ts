export interface WorkflowBranch {
  name: string;
  y: number;
  color: string;
  commits: number[];
  from?: { branch: number; at: number };
  to?: { branch: number; at: number };
}

export interface WorkflowVisual {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  branches: WorkflowBranch[];
}
