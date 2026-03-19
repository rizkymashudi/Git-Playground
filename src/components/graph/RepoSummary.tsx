'use client';

import type { Repository } from '@/lib/git-engine/types';
import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

interface RepoSummaryProps {
  repo: Repository;
  theme: Theme;
}

export default function RepoSummary({ repo, theme: t }: RepoSummaryProps) {
  return (
    <div
      style={{
        padding: '0 12px 12px',
        fontSize: 11,
        fontFamily: MONO,
        color: t.textMuted,
        lineHeight: 1.8,
      }}
    >
      <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 10, marginTop: 4 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ color: t.prompt }}>HEAD: {repo.HEAD}</span>
          <span>&middot;</span>
          <span>{Object.keys(repo.branches).length} branches</span>
          <span>&middot;</span>
          <span>{repo.commits.length} commits</span>
          {repo.stash.length > 0 && (
            <>
              <span>&middot;</span>
              <span style={{ color: t.warning }}>{repo.stash.length} stashed</span>
            </>
          )}
          {Object.keys(repo.tags).length > 0 && (
            <>
              <span>&middot;</span>
              <span style={{ color: t.tag }}>{Object.keys(repo.tags).length} tags</span>
            </>
          )}
        </div>
        {repo.staged.length > 0 && (
          <div style={{ marginTop: 6, color: t.success }}>Staged: {repo.staged.join(', ')}</div>
        )}
        {repo.workingDir.length > 0 && (
          <div style={{ marginTop: 4, color: t.error }}>
            Untracked: {repo.workingDir.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
