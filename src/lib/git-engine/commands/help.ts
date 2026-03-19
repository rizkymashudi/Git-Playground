import type { Repository, GitResult } from '../types';

export function gitHelp(repo: Repository): GitResult {
  return {
    repo: structuredClone(repo),
    success: true,
    output: `Available commands:
  git init          Initialize a new repository
  git add <file>    Stage changes (use '.' for all)
  git commit -m ""  Record changes
  git status        Show working tree status
  git log           Show commit history (--oneline)
  git branch        List/create/delete branches
  git checkout      Switch branches (-b to create)
  git switch        Switch branches (-c to create)
  git merge         Merge branches
  git rebase        Rebase current branch
  git stash         Stash changes (push/pop/list)
  git tag           Create tags
  git remote        Manage remotes (-v to list)
  git push          Push to remote
  git pull          Pull from remote
  git fetch         Fetch from remote
  git reset         Reset changes (--soft/--hard)
  git cherry-pick   Apply specific commits
  git diff          Show changes
  git reflog        Show reference log

  touch <file>      Create a new file
  clear             Clear terminal
  help              Show this help`,
  };
}
