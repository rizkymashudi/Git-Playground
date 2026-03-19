'use client';

import ThemeToggle from '@/components/ui/ThemeToggle';
import type { Theme, ThemeMode } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

type ViewId = 'scenarios' | 'terminal' | 'workflows' | 'reference';

const TABS: { id: ViewId; label: string; icon: string }[] = [
  { id: 'scenarios', label: 'Scenarios', icon: '\u25C6' },
  { id: 'terminal', label: 'Terminal', icon: '\u25B8' },
  { id: 'workflows', label: 'Workflows', icon: '\u2B22' },
  { id: 'reference', label: 'Reference', icon: '\u2261' },
];

interface HeaderProps {
  view: ViewId;
  onViewChange: (view: ViewId) => void;
  mode: ThemeMode;
  onToggleTheme: () => void;
  theme: Theme;
}

export default function Header({ view, onViewChange, mode, onToggleTheme, theme: t }: HeaderProps) {
  return (
    <div
      style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${t.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: t.bgGrad,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: t.logoGrad,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 800,
            color: t.logoText,
            fontFamily: MONO,
          }}
        >
          G
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Git Playground
          </div>
          <div style={{ fontSize: 11, color: t.textMuted, fontFamily: MONO }}>
            interactive learning environment
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <ThemeToggle mode={mode} onToggle={onToggleTheme} theme={t} />
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            style={{
              padding: '6px 14px',
              fontSize: 12,
              fontFamily: MONO,
              background: view === tab.id ? t.tabActiveBg : 'transparent',
              color: view === tab.id ? t.text : t.textMuted,
              border: '1px solid',
              borderColor: view === tab.id ? t.tabActiveBorder : 'transparent',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
