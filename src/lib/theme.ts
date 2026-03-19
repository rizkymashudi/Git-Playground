export interface Theme {
  bg: string;
  bgGrad: string;
  surface: string;
  surfaceHover: string;
  panel: string;
  border: string;
  borderHover: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textDim: string;
  prompt: string;
  error: string;
  success: string;
  accent: string;
  warning: string;
  tag: string;
  hintBg: string;
  hintBorder: string;
  diffBg: Record<string, string>;
  diffText: Record<string, string>;
  tabActiveBg: string;
  tabActiveBorder: string;
  logoGrad: string;
  logoText: string;
}

export const themes: Record<'dark' | 'light', Theme> = {
  dark: {
    bg: '#0a0e17',
    bgGrad: 'linear-gradient(180deg, #0f1524 0%, #0a0e17 100%)',
    surface: '#111827',
    surfaceHover: '#1a2234',
    panel: '#0f172a',
    border: '#1e293b',
    borderHover: '#334155',
    text: '#e2e8f0',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    textDim: '#475569',
    prompt: '#4ade80',
    error: '#f87171',
    success: '#4ade80',
    accent: '#818cf8',
    warning: '#fb923c',
    tag: '#facc15',
    hintBg: '#1a1205',
    hintBorder: '#422006',
    diffBg: {
      beginner: '#065f4620',
      intermediate: '#1e40af20',
      advanced: '#7c3aed20',
      expert: '#dc262620',
    },
    diffText: {
      beginner: '#4ade80',
      intermediate: '#818cf8',
      advanced: '#f472b6',
      expert: '#fb923c',
    },
    tabActiveBg: '#1e293b',
    tabActiveBorder: '#334155',
    logoGrad: 'linear-gradient(135deg, #4ade80, #818cf8)',
    logoText: '#0a0e17',
  },
  light: {
    bg: '#f8fafc',
    bgGrad: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
    surface: '#ffffff',
    surfaceHover: '#f1f5f9',
    panel: '#f1f5f9',
    border: '#e2e8f0',
    borderHover: '#cbd5e1',
    text: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#64748b',
    textDim: '#94a3b8',
    prompt: '#16a34a',
    error: '#dc2626',
    success: '#16a34a',
    accent: '#6366f1',
    warning: '#ea580c',
    tag: '#a16207',
    hintBg: '#fff7ed',
    hintBorder: '#fed7aa',
    diffBg: {
      beginner: '#dcfce7',
      intermediate: '#dbeafe',
      advanced: '#f3e8ff',
      expert: '#fee2e2',
    },
    diffText: {
      beginner: '#15803d',
      intermediate: '#4338ca',
      advanced: '#a21caf',
      expert: '#c2410c',
    },
    tabActiveBg: '#e2e8f0',
    tabActiveBorder: '#cbd5e1',
    logoGrad: 'linear-gradient(135deg, #16a34a, #6366f1)',
    logoText: '#ffffff',
  },
};

export type ThemeMode = 'dark' | 'light';
