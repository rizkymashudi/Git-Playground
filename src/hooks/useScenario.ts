import { useState, useCallback } from 'react';
import type { Scenario } from '@/types/scenario';
import type { Repository } from '@/lib/git-engine/types';
import type { TerminalEntry } from '@/types/terminal';
import { CATEGORIES } from '@/data/scenarios';

export function useScenario() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const currentScenario = activeScenario
    ? (CATEGORIES.flatMap((c) => c.scenarios).find((s) => s.id === activeScenario) ?? null)
    : null;

  const currentStep = currentScenario?.steps[stepIndex] ?? null;

  const startScenario = useCallback((scenario: Scenario): TerminalEntry[] => {
    setActiveScenario(scenario.id);
    setStepIndex(0);
    setCompletedSteps([]);
    setShowHint(false);
    return [
      {
        type: 'system',
        text: `\u2501\u2501\u2501 ${scenario.title} \u2501\u2501\u2501\n${scenario.description}\nIndustry: ${scenario.industry} | Difficulty: ${scenario.difficulty}\n`,
      },
      { type: 'system', text: `Step 1: ${scenario.steps[0].instruction}\n` },
    ];
  }, []);

  const checkStep = useCallback(
    (repo: Repository): TerminalEntry[] => {
      if (!currentScenario || !currentStep) return [];

      if (!currentStep.check(repo)) return [];

      const newCompleted = [...completedSteps, stepIndex];
      setCompletedSteps(newCompleted);

      if (stepIndex + 1 < currentScenario.steps.length) {
        setStepIndex(stepIndex + 1);
        setShowHint(false);
        return [{ type: 'success', text: `\u2713 Step ${stepIndex + 1} complete!` }];
      }

      setActiveScenario(null);
      setStepIndex(0);
      setCompletedSteps([]);
      return [
        { type: 'success', text: `\nScenario "${currentScenario.title}" complete! Well done!` },
      ];
    },
    [currentScenario, currentStep, stepIndex, completedSteps],
  );

  return {
    activeScenario,
    currentScenario,
    currentStep,
    stepIndex,
    completedSteps,
    showHint,
    setShowHint,
    startScenario,
    checkStep,
  };
}
