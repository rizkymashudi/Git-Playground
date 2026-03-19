'use client';

import { useState, useCallback, useRef } from 'react';
import { themes } from '@/lib/theme';
import type { ThemeMode } from '@/lib/theme';
import type { Scenario } from '@/types/scenario';
import { useGitTerminal } from '@/hooks/useGitTerminal';
import { useScenario } from '@/hooks/useScenario';
import { CATEGORIES } from '@/data/scenarios';
import { WORKFLOW_VISUALS } from '@/data/workflows';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Terminal from '@/components/terminal/Terminal';
import ScenarioList from '@/components/scenarios/ScenarioList';
import ScenarioProgress from '@/components/scenarios/ScenarioProgress';
import HintBar from '@/components/scenarios/HintBar';
import BranchGraph from '@/components/graph/BranchGraph';
import RepoSummary from '@/components/graph/RepoSummary';
import WorkflowCard from '@/components/workflows/WorkflowCard';
import ComparisonTable from '@/components/workflows/ComparisonTable';
import CheatSheet from '@/components/reference/CheatSheet';

const MONO = "'IBM Plex Mono', 'Fira Code', monospace";

const SCENARIO_MAP: Record<string, string> = {
  gitflow: 'gitflow-full',
  'github-flow': 'github-flow',
  'gitlab-flow': 'gitlab-flow',
  'trunk-based': 'trunk-based-flow',
  forking: 'forking-flow',
  'release-branching': 'release-branch-flow',
  'env-branching': 'env-branch-flow',
  'ship-show-ask': 'ship-show-ask-flow',
  'feature-flag': 'feature-flag-flow',
  'stacked-prs': 'stacked-pr-flow',
  'hotfix-only': 'hotfix-only-flow',
  monorepo: 'monorepo-flow',
};

type ViewId = 'scenarios' | 'terminal' | 'workflows' | 'reference';

export default function GitPlayground() {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [view, setView] = useState<ViewId>('terminal');
  const [showGraph, setShowGraph] = useState(true);
  const t = themes[mode];
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    repo,
    history,
    setHistory,
    input,
    setInput,
    runCommand,
    resetTerminal,
    handleHistoryUp,
    handleHistoryDown,
  } = useGitTerminal();

  const {
    currentScenario,
    currentStep,
    stepIndex,
    completedSteps,
    showHint,
    setShowHint,
    startScenario,
    checkStep,
  } = useScenario();

  const handleStartScenario = useCallback(
    (scenario: Scenario) => {
      const entries = startScenario(scenario);
      resetTerminal(entries);
      setView('terminal');
      setTimeout(() => inputRef.current?.focus(), 100);
    },
    [startScenario, resetTerminal],
  );

  const handleSubmit = useCallback(
    (raw: string) => {
      const result = runCommand(raw);
      if (result) {
        const scenarioEntries = checkStep(result.repo);
        if (scenarioEntries.length > 0) {
          setHistory([...result.history, ...scenarioEntries]);
        }
      }
    },
    [runCommand, checkStep, setHistory],
  );

  const handleViewChange = useCallback(
    (v: ViewId) => {
      setView(v);
      if (v === 'terminal') setTimeout(() => inputRef.current?.focus(), 50);
    },
    [],
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: t.bg,
        color: t.text,
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        transition: 'background .3s, color .3s',
      }}
    >
      <Header
        view={view}
        onViewChange={handleViewChange}
        mode={mode}
        onToggleTheme={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        theme={t}
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {view === 'scenarios' && (
          <ScenarioList
            categories={CATEGORIES}
            onStartScenario={handleStartScenario}
            theme={t}
          />
        )}

        {view === 'terminal' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {currentScenario && (
              <ScenarioProgress
                scenario={currentScenario}
                stepIndex={stepIndex}
                completedSteps={completedSteps}
                theme={t}
              />
            )}

            {currentStep && (
              <HintBar
                step={currentStep}
                stepIndex={stepIndex}
                showHint={showHint}
                onToggleHint={() => setShowHint(!showHint)}
                theme={t}
              />
            )}

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Terminal
                  history={history}
                  input={input}
                  onInputChange={setInput}
                  onSubmit={handleSubmit}
                  onHistoryUp={handleHistoryUp}
                  onHistoryDown={handleHistoryDown}
                  theme={t}
                  mode={mode}
                />
              </div>

              {showGraph && (
                <div
                  style={{
                    width: 480,
                    borderLeft: `1px solid ${t.border}`,
                    overflow: 'auto',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    background: mode === 'light' ? '#f8fafc' : 'transparent',
                  }}
                >
                  <div
                    style={{
                      padding: '8px 12px',
                      borderBottom: `1px solid ${t.border}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 11, fontFamily: MONO, color: t.textMuted }}>
                      BRANCH GRAPH
                    </span>
                    <button
                      onClick={() => setShowGraph(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: t.textMuted,
                        cursor: 'pointer',
                        fontSize: 14,
                      }}
                    >
                      &#10005;
                    </button>
                  </div>
                  <div style={{ padding: 12 }}>
                    <BranchGraph
                      commits={repo.commits}
                      branches={repo.branches}
                      HEAD={repo.HEAD}
                      tags={repo.tags}
                      theme={t}
                    />
                  </div>
                  <RepoSummary repo={repo} theme={t} />
                </div>
              )}
            </div>

            {!showGraph && (
              <button
                onClick={() => setShowGraph(true)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 120,
                  padding: '6px 10px',
                  fontSize: 11,
                  fontFamily: MONO,
                  background: t.tabActiveBg,
                  border: `1px solid ${t.tabActiveBorder}`,
                  borderRadius: 6,
                  color: t.textSecondary,
                  cursor: 'pointer',
                }}
              >
                Show Graph
              </button>
            )}
          </div>
        )}

        {view === 'workflows' && (
          <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <h2
                style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.03em' }}
              >
                Git Workflows Visualized
              </h2>
              <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 28 }}>
                Interactive branch diagrams for every major workflow used in industry. Click
                &quot;Try it&quot; to practice in the terminal.
              </p>
              {WORKFLOW_VISUALS.map((wf) => {
                const scenarioId = SCENARIO_MAP[wf.id];
                const scenario = scenarioId
                  ? CATEGORIES.flatMap((c) => c.scenarios).find((s) => s.id === scenarioId)
                  : undefined;
                return (
                  <WorkflowCard
                    key={wf.id}
                    wf={wf}
                    scenario={scenario}
                    onTryIt={handleStartScenario}
                    theme={t}
                    mode={mode}
                  />
                );
              })}
              <ComparisonTable theme={t} />
            </div>
          </div>
        )}

        {view === 'reference' && (
          <CheatSheet onNavigateToWorkflows={() => setView('workflows')} theme={t} />
        )}
      </div>

      <Footer repo={repo} theme={t} />
    </div>
  );
}
