import { useState, useCallback } from 'react';
import { createRepo, executeGitCommand, handleNonGit } from '@/lib/git-engine';
import type { Repository } from '@/lib/git-engine';
import type { TerminalEntry } from '@/types/terminal';
import { useCommandHistory } from './useCommandHistory';

const WELCOME: TerminalEntry = {
  type: 'system',
  text: "Welcome to Git Playground\nType 'git help' for commands, or choose a scenario to begin.\n",
};

export function useGitTerminal() {
  const [repo, setRepo] = useState<Repository>(createRepo);
  const [history, setHistory] = useState<TerminalEntry[]>([WELCOME]);
  const [input, setInput] = useState('');
  const cmdHistory = useCommandHistory();

  const runCommand = useCallback(
    (raw: string) => {
      if (!raw.trim()) return;
      cmdHistory.push(raw);
      const newHistory: TerminalEntry[] = [...history, { type: 'input', text: raw }];

      if (raw.trim() === 'clear') {
        setHistory([{ type: 'system', text: 'Terminal cleared.\n' }]);
        setInput('');
        return;
      }

      // Support && chaining
      const commands = raw.split('&&').map((c) => c.trim());
      let currentRepo = repo;

      for (const cmd of commands) {
        let result;
        if (cmd.startsWith('git')) {
          result = executeGitCommand(currentRepo, cmd);
        } else {
          result = handleNonGit(cmd, currentRepo);
        }

        if (result.output === '__CLEAR__') {
          setHistory([{ type: 'system', text: 'Terminal cleared.\n' }]);
          setInput('');
          return;
        }

        newHistory.push({
          type: result.success ? 'output' : 'error',
          text: result.output,
        });

        if (result.repo) currentRepo = result.repo;
      }

      setRepo(currentRepo);
      setHistory(newHistory);
      setInput('');

      return { repo: currentRepo, history: newHistory };
    },
    [history, repo, cmdHistory],
  );

  const resetTerminal = useCallback(
    (entries?: TerminalEntry[]) => {
      const freshRepo = createRepo();
      setRepo(freshRepo);
      setHistory(entries || [WELCOME]);
      setInput('');
    },
    [],
  );

  const handleHistoryUp = useCallback(() => {
    const prev = cmdHistory.up();
    if (prev !== null) setInput(prev);
  }, [cmdHistory]);

  const handleHistoryDown = useCallback(() => {
    const next = cmdHistory.down();
    if (next !== null) setInput(next);
  }, [cmdHistory]);

  return {
    repo,
    setRepo,
    history,
    setHistory,
    input,
    setInput,
    runCommand,
    resetTerminal,
    handleHistoryUp,
    handleHistoryDown,
  };
}
