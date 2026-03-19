import { useRef, useCallback } from 'react';

export function useCommandHistory() {
  const history = useRef<string[]>([]);
  const index = useRef(-1);

  const push = useCallback((command: string) => {
    history.current.unshift(command);
    index.current = -1;
  }, []);

  const up = useCallback((): string | null => {
    if (history.current.length === 0) return null;
    const next = Math.min(index.current + 1, history.current.length - 1);
    index.current = next;
    return history.current[next];
  }, []);

  const down = useCallback((): string | null => {
    if (index.current > 0) {
      index.current--;
      return history.current[index.current];
    }
    index.current = -1;
    return '';
  }, []);

  return { push, up, down };
}
