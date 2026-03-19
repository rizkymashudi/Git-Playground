'use client';

import type { Repository } from '@/lib/git-engine/types';
import type { Theme } from '@/lib/theme';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

interface FooterProps {
  repo: Repository;
  theme: Theme;
}

export default function Footer({ repo, theme: t }: FooterProps) {
  return (
    <div
      style={{
        padding: '8px 20px',
        borderTop: `1px solid ${t.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 11,
        fontFamily: MONO,
        color: t.textDim,
        flexShrink: 0,
      }}
    >
      <span>
        &#8593;&#8595; history &middot; enter to run &middot; type &apos;git help&apos; for commands
      </span>
      <span>
        {repo.commits.length} commits &middot; {Object.keys(repo.branches).length} branches
      </span>
    </div>
  );
}
