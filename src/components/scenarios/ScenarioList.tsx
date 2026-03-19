'use client';

import { useState } from 'react';
import type { Category, Scenario, Difficulty } from '@/types/scenario';
import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";
const SANS = "'DM Sans', 'Segoe UI', sans-serif";

function diffKey(d: Difficulty): string {
  return d === 'Beginner'
    ? 'beginner'
    : d === 'Intermediate'
      ? 'intermediate'
      : d === 'Advanced'
        ? 'advanced'
        : 'expert';
}

interface ScenarioListProps {
  categories: Category[];
  onStartScenario: (scenario: Scenario) => void;
  theme: Theme;
}

export default function ScenarioList({ categories, onStartScenario, theme: t }: ScenarioListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.03em' }}>
          Learn Git by Doing
        </h2>
        <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 28 }}>
          Real-world scenarios from actual industry workflows. Complete each step in the terminal.
        </p>
        {categories.map((cat) => (
          <div key={cat.id} style={{ marginBottom: 32 }}>
            <button
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '12px 0',
                background: 'none',
                border: 'none',
                color: t.text,
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 600,
                fontFamily: SANS,
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              <span style={{ color: cat.color, fontSize: 18 }}>{cat.icon}</span>
              {cat.title}
              <span
                style={{ color: t.textMuted, fontSize: 12, fontFamily: MONO, marginLeft: 'auto' }}
              >
                {cat.scenarios.length} scenarios {activeCategory === cat.id ? '\u25BE' : '\u25B8'}
              </span>
            </button>
            {(activeCategory === cat.id || activeCategory === null) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 12,
                  marginTop: 12,
                }}
              >
                {cat.scenarios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onStartScenario(s)}
                    style={{
                      textAlign: 'left',
                      padding: 16,
                      background: t.surface,
                      border: `1px solid ${t.border}`,
                      borderRadius: 10,
                      cursor: 'pointer',
                      color: t.text,
                      transition: 'all .2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cat.color;
                      e.currentTarget.style.background = t.surfaceHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = t.border;
                      e.currentTarget.style.background = t.surface;
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{s.title}</span>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: MONO,
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: t.diffBg[diffKey(s.difficulty)],
                          color: t.diffText[diffKey(s.difficulty)],
                        }}
                      >
                        {s.difficulty}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: t.textSecondary,
                        lineHeight: 1.5,
                        marginBottom: 8,
                      }}
                    >
                      {s.description}
                    </div>
                    <div style={{ fontSize: 10, color: t.textMuted, fontFamily: MONO }}>
                      {s.industry} &middot; {s.steps.length} steps
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
