'use client';

import type { Theme, ThemeMode } from '@/lib/theme';

interface ThemeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
  theme: Theme;
}

export default function ThemeToggle({ mode, onToggle, theme: t }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '6px 12px',
        fontSize: 14,
        lineHeight: 1,
        background: t.tabActiveBg,
        border: `1px solid ${t.tabActiveBorder}`,
        borderRadius: 6,
        cursor: 'pointer',
        color: t.textMuted,
        transition: 'all .15s',
        marginRight: 4,
      }}
      title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {mode === 'dark' ? '\u2600' : '\u263E'}
    </button>
  );
}
