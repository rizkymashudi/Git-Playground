'use client';

import type { TerminalEntry } from '@/types/terminal';
import type { Theme } from '@/lib/theme';

interface TerminalLineProps {
  entry: TerminalEntry;
  theme: Theme;
}

export default function TerminalLine({ entry, theme: t }: TerminalLineProps) {
  const colorMap: Record<string, string> = {
    input: t.text,
    error: t.error,
    success: t.success,
    system: t.textMuted,
    output: t.textSecondary,
  };

  return (
    <div
      style={{
        color: colorMap[entry.type] || t.textSecondary,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {entry.type === 'input' && <span style={{ color: t.prompt }}>&#10095; </span>}
      {entry.text}
    </div>
  );
}
