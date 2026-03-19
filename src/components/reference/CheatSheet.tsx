'use client';

import { CHEAT_SHEET } from '@/data/cheatsheet';
import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

interface CheatSheetProps {
  onNavigateToWorkflows: () => void;
  theme: Theme;
}

export default function CheatSheet({ onNavigateToWorkflows, theme: t }: CheatSheetProps) {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.03em' }}>
          Git Quick Reference
        </h2>
        <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 24 }}>
          Click any command to copy it to your clipboard.
        </p>
        {CHEAT_SHEET.map((section) => (
          <div key={section.cat} style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 12,
                fontFamily: MONO,
                color: t.accent,
                fontWeight: 600,
                marginBottom: 8,
                paddingBottom: 6,
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              {section.cat.toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.cmds.map(([cmd, desc]) => (
                <button
                  key={cmd}
                  onClick={() => navigator.clipboard?.writeText(cmd)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: t.surface,
                    border: '1px solid transparent',
                    borderRadius: 6,
                    cursor: 'pointer',
                    color: t.text,
                    fontFamily: MONO,
                    fontSize: 12,
                    transition: 'all .15s',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = t.borderHover;
                    e.currentTarget.style.background = t.surfaceHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.background = t.surface;
                  }}
                >
                  <span style={{ color: t.prompt }}>{cmd}</span>
                  <span style={{ color: t.textMuted, fontSize: 11 }}>{desc}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: 32,
            padding: 16,
            background: t.surface,
            borderRadius: 8,
            border: `1px solid ${t.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Industry Workflows</div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>
              Visual branch diagrams for GitFlow, GitHub Flow, Trunk-Based, and more.
            </div>
          </div>
          <button
            onClick={onNavigateToWorkflows}
            style={{
              padding: '6px 16px',
              fontSize: 11,
              fontFamily: MONO,
              background: t.accent + '18',
              border: `1px solid ${t.accent}40`,
              borderRadius: 6,
              cursor: 'pointer',
              color: t.accent,
              fontWeight: 600,
            }}
          >
            &#x2B22; View Workflows
          </button>
        </div>
      </div>
    </div>
  );
}
