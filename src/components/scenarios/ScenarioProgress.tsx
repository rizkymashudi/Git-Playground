'use client';

import type { Scenario } from '@/types/scenario';
import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

interface ScenarioProgressProps {
  scenario: Scenario;
  stepIndex: number;
  completedSteps: number[];
  theme: Theme;
}

export default function ScenarioProgress({
  scenario,
  stepIndex,
  completedSteps,
  theme: t,
}: ScenarioProgressProps) {
  return (
    <div
      style={{
        padding: '10px 16px',
        background: t.surface,
        borderBottom: `1px solid ${t.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 600, color: t.text, whiteSpace: 'nowrap' }}>
        {scenario.title}
      </span>
      <div style={{ flex: 1, display: 'flex', gap: 4, alignItems: 'center' }}>
        {scenario.steps.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: completedSteps.includes(i)
                ? t.success
                : i === stepIndex
                  ? t.accent
                  : t.border,
              transition: 'background .3s',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 11, fontFamily: MONO, color: t.textMuted }}>
        {completedSteps.length}/{scenario.steps.length}
      </span>
    </div>
  );
}
