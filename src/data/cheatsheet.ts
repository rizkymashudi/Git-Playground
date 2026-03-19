export interface CheatSheetSection {
  cat: string;
  cmds: [string, string][];
}

export const CHEAT_SHEET: CheatSheetSection[] = [
  {
    cat: 'Setup',
    cmds: [
      ['git init', 'New repo'],
      ['git clone <url>', 'Clone remote'],
    ],
  },
  {
    cat: 'Changes',
    cmds: [
      ['git status', 'Show status'],
      ['git add <f>', 'Stage file'],
      ['git add .', 'Stage all'],
      ["git commit -m ''", 'Commit'],
      ['git diff', 'Show diff'],
    ],
  },
  {
    cat: 'Branch',
    cmds: [
      ['git branch', 'List'],
      ['git branch <n>', 'Create'],
      ['git checkout <n>', 'Switch'],
      ['git checkout -b <n>', 'Create+switch'],
      ['git branch -d <n>', 'Delete'],
    ],
  },
  {
    cat: 'Merge',
    cmds: [
      ['git merge <b>', 'Merge branch'],
      ['git rebase <b>', 'Rebase onto'],
    ],
  },
  {
    cat: 'Remote',
    cmds: [
      ['git push', 'Push'],
      ['git pull', 'Pull'],
      ['git fetch', 'Fetch'],
    ],
  },
  {
    cat: 'Undo',
    cmds: [
      ['git reset', 'Unstage'],
      ['git reset --hard', 'Discard all'],
      ['git stash', 'Stash WIP'],
      ['git stash pop', 'Restore stash'],
    ],
  },
  {
    cat: 'History',
    cmds: [
      ['git log', 'Full log'],
      ['git log --oneline', 'Short log'],
      ['git reflog', 'All movements'],
    ],
  },
];
