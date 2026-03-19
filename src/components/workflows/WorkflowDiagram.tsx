'use client';

import type { WorkflowVisual } from '@/types/workflow';
import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

interface WorkflowDiagramProps {
  wf: WorkflowVisual;
  theme: Theme;
}

export default function WorkflowDiagram({ wf, theme: t }: WorkflowDiagramProps) {
  const W = 700;
  const ROW_H = 44;
  const PAD_TOP = 32;
  const PAD_LEFT = 120;
  const PAD_RIGHT = 20;
  const H = PAD_TOP + wf.branches.length * ROW_H + 20;
  const xStep = (W - PAD_LEFT - PAD_RIGHT) / 10;

  const cx = (commitIdx: number) => PAD_LEFT + commitIdx * xStep;
  const cy = (branchIdx: number) => PAD_TOP + branchIdx * ROW_H;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
      {wf.branches.map((b, bi) => (
        <g key={b.name}>
          <line
            x1={cx(b.commits[0])}
            y1={cy(bi)}
            x2={cx(b.commits[b.commits.length - 1])}
            y2={cy(bi)}
            stroke={b.color}
            strokeWidth="2.5"
            opacity="0.35"
            strokeLinecap="round"
          />
          <text
            x={12}
            y={cy(bi) + 4}
            fill={b.color}
            fontSize="10"
            fontFamily={MONO}
            fontWeight="600"
          >
            {b.name}
          </text>
          {b.commits.map((ci) => (
            <circle
              key={`${b.name}-${ci}`}
              cx={cx(ci)}
              cy={cy(bi)}
              r={5}
              fill={b.color}
              opacity="0.9"
            />
          ))}
          {b.from && (
            <path
              d={`M ${cx(b.from.at)} ${cy(b.from.branch)} Q ${cx(b.from.at) + xStep * 0.3} ${cy(b.from.branch) + (cy(bi) - cy(b.from.branch)) * 0.5} ${cx(b.commits[0])} ${cy(bi)}`}
              fill="none"
              stroke={b.color}
              strokeWidth="1.5"
              opacity="0.5"
              strokeDasharray="4 3"
            />
          )}
          {b.to && (
            <path
              d={`M ${cx(b.commits[b.commits.length - 1])} ${cy(bi)} Q ${cx(b.to.at) - xStep * 0.3} ${cy(bi) + (cy(b.to.branch) - cy(bi)) * 0.5} ${cx(b.to.at)} ${cy(b.to.branch)}`}
              fill="none"
              stroke={b.color}
              strokeWidth="1.5"
              opacity="0.5"
            />
          )}
          {b.to && (
            <circle
              cx={cx(b.to.at)}
              cy={cy(b.to.branch)}
              r={7}
              fill="none"
              stroke={b.color}
              strokeWidth="1.5"
              opacity="0.5"
            />
          )}
        </g>
      ))}
      <text x={W - 40} y={H - 6} fill={t.textDim} fontSize="9" fontFamily={MONO}>
        time &rarr;
      </text>
    </svg>
  );
}
