'use client';

import type { Commit } from '@/lib/git-engine/types';
import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";
const SANS = "'DM Sans', 'Segoe UI', sans-serif";

const BRANCH_COLORS = ['#4ade80', '#818cf8', '#f472b6', '#fb923c', '#22d3ee', '#facc15'];

interface BranchGraphProps {
  commits: Commit[];
  branches: Record<string, string>;
  HEAD: string;
  tags: Record<string, string>;
  theme: Theme;
}

export default function BranchGraph({ commits, branches, HEAD, tags, theme: t }: BranchGraphProps) {
  const branchNames = Object.keys(branches);
  const branchColor: Record<string, string> = {};
  branchNames.forEach((b, i) => {
    branchColor[b] = BRANCH_COLORS[i % BRANCH_COLORS.length];
  });

  const recent = commits.slice(-8);
  const w = 460;
  const h = Math.max(120, recent.length * 40 + 40);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="g" />
          <feMerge>
            <feMergeNode in="g" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {recent.map((c, i) => {
        const x = 50 + (branchNames.indexOf(c.branch) || 0) * 60;
        const y = h - 30 - i * 40;
        const parentCommit = recent.find((p) => p.hash === c.parent);
        const pIdx = parentCommit ? recent.indexOf(parentCommit) : -1;
        const isCurrent = branches[HEAD] === c.hash;
        const col = branchColor[c.branch] || '#888';
        const tagEntry = Object.entries(tags).find(([, v]) => v === c.hash);

        return (
          <g key={c.hash}>
            {pIdx >= 0 && (
              <line
                x1={x}
                y1={y}
                x2={50 + (branchNames.indexOf(recent[pIdx].branch) || 0) * 60}
                y2={h - 30 - pIdx * 40}
                stroke={col}
                strokeWidth="2"
                opacity="0.4"
              />
            )}
            {c.mergeParent &&
              (() => {
                const mp = recent.find((p) => p.hash === c.mergeParent);
                if (!mp) return null;
                const mi = recent.indexOf(mp);
                return (
                  <line
                    x1={x}
                    y1={y}
                    x2={50 + (branchNames.indexOf(mp.branch) || 0) * 60}
                    y2={h - 30 - mi * 40}
                    stroke={col}
                    strokeWidth="2"
                    opacity="0.3"
                    strokeDasharray="4"
                  />
                );
              })()}
            <circle
              cx={x}
              cy={y}
              r={isCurrent ? 8 : 6}
              fill={col}
              filter={isCurrent ? 'url(#glow)' : undefined}
              opacity={isCurrent ? 1 : 0.8}
            />
            {isCurrent && (
              <circle cx={x} cy={y} r={12} fill="none" stroke={col} strokeWidth="1.5" opacity="0.4" />
            )}
            <text x={x + 20} y={y + 4} fill={t.textMuted} fontSize="11" fontFamily={MONO}>
              {c.hash}
            </text>
            <text x={x + 80} y={y + 4} fill={t.text} fontSize="11" fontFamily={SANS}>
              {c.msg.length > 28 ? c.msg.slice(0, 28) + '\u2026' : c.msg}
            </text>
            {tagEntry && (
              <g>
                <rect
                  x={x + 80 + Math.min(c.msg.length, 28) * 6.5 + 8}
                  y={y - 9}
                  width={tagEntry[0].length * 7 + 12}
                  height={18}
                  rx="3"
                  fill="#facc15"
                  opacity="0.2"
                />
                <text
                  x={x + 80 + Math.min(c.msg.length, 28) * 6.5 + 14}
                  y={y + 4}
                  fill="#facc15"
                  fontSize="10"
                  fontFamily={MONO}
                >
                  {tagEntry[0]}
                </text>
              </g>
            )}
          </g>
        );
      })}
      {branchNames.map((b, i) => {
        const x = 50 + i * 60;
        return (
          <text
            key={b}
            x={x}
            y={14}
            textAnchor="middle"
            fill={branchColor[b]}
            fontSize="10"
            fontFamily={MONO}
            fontWeight={b === HEAD ? 700 : 400}
          >
            {b === HEAD ? `\u25CF ${b}` : b}
          </text>
        );
      })}
    </svg>
  );
}
