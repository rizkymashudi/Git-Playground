'use client';

import { forwardRef } from 'react';
import type { Theme } from '@/lib/theme';

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  theme: Theme;
}

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ value, onChange, onSubmit, onHistoryUp, onHistoryDown, theme: t }, ref) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: t.prompt, marginRight: 6 }}>&#10095;</span>
        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit(value);
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              onHistoryUp();
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              onHistoryDown();
            }
          }}
          autoFocus
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: t.text,
            fontSize: 13,
            fontFamily: MONO,
            padding: 0,
            caretColor: t.prompt,
          }}
          placeholder="Type a git command..."
          spellCheck={false}
        />
      </div>
    );
  },
);

TerminalInput.displayName = 'TerminalInput';

export default TerminalInput;
