'use client';

import { useRef, useEffect } from 'react';
import TerminalLine from './TerminalLine';
import TerminalInput from './TerminalInput';
import type { TerminalEntry } from '@/types/terminal';
import type { Theme } from '@/lib/theme';
import type { ThemeMode } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

interface TerminalProps {
  history: TerminalEntry[];
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  theme: Theme;
  mode: ThemeMode;
}

export default function Terminal({
  history,
  input,
  onInputChange,
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  theme: t,
  mode,
}: TerminalProps) {
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [history]);

  return (
    <div
      ref={termRef}
      onClick={() => inputRef.current?.focus()}
      style={{
        flex: 1,
        overflow: 'auto',
        padding: '12px 16px',
        fontFamily: MONO,
        fontSize: 13,
        lineHeight: 1.6,
        cursor: 'text',
        background: mode === 'light' ? '#ffffff' : 'transparent',
      }}
    >
      {history.map((entry, i) => (
        <TerminalLine key={i} entry={entry} theme={t} />
      ))}
      <TerminalInput
        ref={inputRef}
        value={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        onHistoryUp={onHistoryUp}
        onHistoryDown={onHistoryDown}
        theme={t}
      />
    </div>
  );
}
