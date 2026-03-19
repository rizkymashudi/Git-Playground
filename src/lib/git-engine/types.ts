export interface Commit {
  hash: string;
  msg: string;
  branch: string;
  parent: string | null;
  timestamp: number;
  files?: string[];
  mergeParent?: string;
  cherryPicked?: boolean;
}

export interface StashEntry {
  staged: string[];
  workingDir: string[];
  msg: string;
}

export interface Repository {
  commits: Commit[];
  branches: Record<string, string>;
  HEAD: string;
  staged: string[];
  workingDir: string[];
  stash: StashEntry[];
  tags: Record<string, string>;
  remotes: Record<string, Record<string, string>>;
  log: string[];
}

export interface GitResult {
  repo: Repository;
  output: string;
  success: boolean;
}
