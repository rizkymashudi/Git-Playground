'use client';

import WorkflowDiagram from './WorkflowDiagram';
import type { WorkflowVisual } from '@/types/workflow';
import type { Scenario } from '@/types/scenario';
import type { Theme, ThemeMode } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

interface WorkflowCardProps {
  wf: WorkflowVisual;
  scenario?: Scenario;
  onTryIt?: (scenario: Scenario) => void;
  theme: Theme;
  mode: ThemeMode;
}

export default function WorkflowCard({ wf, scenario, onTryIt, theme: t, mode }: WorkflowCardProps) {
  return (
    <div
      style={{
        marginBottom: 28,
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'border-color .2s',
      }}
    >
      <div
        style={{
          padding: '16px 20px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: wf.color,
                boxShadow: `0 0 8px ${wf.color}40`,
              }}
            />
            <span style={{ fontSize: 17, fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>
              {wf.name}
            </span>
            <span style={{ fontSize: 11, color: t.textMuted, fontFamily: MONO }}>{wf.subtitle}</span>
          </div>
          <div style={{ fontSize: 12, color: t.textSecondary, marginLeft: 20 }}>
            <span style={{ color: t.textMuted }}>Best for: </span>
            {wf.bestFor}
          </div>
        </div>
        {scenario && onTryIt && (
          <button
            onClick={() => onTryIt(scenario)}
            style={{
              padding: '6px 16px',
              fontSize: 11,
              fontFamily: MONO,
              background: wf.color + '18',
              border: `1px solid ${wf.color}40`,
              borderRadius: 6,
              cursor: 'pointer',
              color: wf.color,
              fontWeight: 600,
              transition: 'all .2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = wf.color + '30';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = wf.color + '18';
            }}
          >
            &#9656; Try it
          </button>
        )}
      </div>

      <div
        style={{
          padding: '0 12px',
          background: mode === 'dark' ? '#080c14' : '#f8fafc',
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <WorkflowDiagram wf={wf} theme={t} />
      </div>

      <div style={{ padding: '12px 20px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 10, fontFamily: MONO, color: t.success, fontWeight: 600, marginBottom: 6 }}>
            ADVANTAGES
          </div>
          {wf.pros.map((p, i) => (
            <div key={i} style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.7 }}>
              <span style={{ color: t.success, marginRight: 6 }}>+</span>
              {p}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 10, fontFamily: MONO, color: t.error, fontWeight: 600, marginBottom: 6 }}>
            TRADE-OFFS
          </div>
          {wf.cons.map((c, i) => (
            <div key={i} style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.7 }}>
              <span style={{ color: t.error, marginRight: 6 }}>&ndash;</span>
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
