'use client';

import type { Step } from '@/types/scenario';
import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

interface HintBarProps {
  step: Step;
  stepIndex: number;
  showHint: boolean;
  onToggleHint: () => void;
  theme: Theme;
}

export default function HintBar({
  step,
  stepIndex,
  showHint,
  onToggleHint,
  theme: t,
}: HintBarProps) {
  return (
    <>
      <div
        style={{
          padding: '10px 16px',
          background: t.panel,
          borderBottom: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div>
          <span style={{ fontSize: 11, color: t.accent, fontFamily: MONO }}>
            STEP {stepIndex + 1} &rarr;{' '}
          </span>
          <span style={{ fontSize: 13, color: t.text }}>{step.instruction}</span>
        </div>
        <button
          onClick={onToggleHint}
          style={{
            padding: '4px 10px',
            fontSize: 11,
            fontFamily: MONO,
            background: showHint ? t.tabActiveBg : 'transparent',
            border: `1px solid ${t.borderHover}`,
            borderRadius: 4,
            color: t.warning,
            cursor: 'pointer',
          }}
        >
          {showHint ? 'Hide' : 'Hint'}
        </button>
      </div>
      {showHint && (
        <div
          style={{
            padding: '8px 16px',
            background: t.hintBg,
            borderBottom: `1px solid ${t.hintBorder}`,
            fontSize: 12,
            fontFamily: MONO,
            color: t.warning,
            flexShrink: 0,
          }}
        >
          {step.hint}
        </div>
      )}
    </>
  );
}
