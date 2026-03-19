'use client';

import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

const COMPARISON_DATA = [
  { n: 'GitFlow', cx: 'High', ci: 'Low', ts: 'Large', rc: 'Scheduled' },
  { n: 'GitHub Flow', cx: 'Low', ci: 'High', ts: 'Any', rc: 'Continuous' },
  { n: 'GitLab Flow', cx: 'Medium', ci: 'High', ts: 'Medium+', rc: 'Staged' },
  { n: 'Trunk-Based', cx: 'Low', ci: 'Very High', ts: 'Any', rc: 'Continuous' },
  { n: 'Ship/Show/Ask', cx: 'Low', ci: 'High', ts: 'Small\u2013Med', rc: 'Continuous' },
  { n: 'Feature Flag', cx: 'Medium', ci: 'Very High', ts: 'Any', rc: 'Decoupled' },
  { n: 'Stacked PRs', cx: 'High', ci: 'High', ts: 'Large', rc: 'Incremental' },
  { n: 'Forking', cx: 'Medium', ci: 'Medium', ts: 'Open Source', rc: 'Varies' },
  { n: 'Release Branch', cx: 'Medium', ci: 'Medium', ts: 'Medium+', rc: 'Versioned' },
  { n: 'Env Branching', cx: 'Medium', ci: 'High', ts: 'Enterprise', rc: 'Staged' },
  { n: 'Hotfix-Only', cx: 'Low', ci: 'High', ts: 'Any', rc: 'Emergency' },
  { n: 'Monorepo', cx: 'High', ci: 'High', ts: 'Large', rc: 'Continuous' },
];

interface ComparisonTableProps {
  theme: Theme;
}

export default function ComparisonTable({ theme: t }: ComparisonTableProps) {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 28,
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${t.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Quick Comparison</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: MONO }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}` }}>
              {['Workflow', 'Complexity', 'CI/CD Fit', 'Team Size', 'Release Cadence'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    color: t.textMuted,
                    fontWeight: 600,
                    fontSize: 10,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((row, i) => (
              <tr
                key={row.n}
                style={{
                  borderBottom: `1px solid ${t.border}`,
                  background: i % 2 === 0 ? 'transparent' : t.panel,
                }}
              >
                <td style={{ padding: '8px 14px', color: t.text, fontWeight: 600 }}>{row.n}</td>
                <td
                  style={{
                    padding: '8px 14px',
                    color: row.cx === 'Low' ? t.success : row.cx === 'High' ? t.warning : t.textSecondary,
                  }}
                >
                  {row.cx}
                </td>
                <td
                  style={{
                    padding: '8px 14px',
                    color: row.ci.includes('High') ? t.success : row.ci === 'Low' ? t.error : t.textSecondary,
                  }}
                >
                  {row.ci}
                </td>
                <td style={{ padding: '8px 14px', color: t.textSecondary }}>{row.ts}</td>
                <td style={{ padding: '8px 14px', color: t.textSecondary }}>{row.rc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
