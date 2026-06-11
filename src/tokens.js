// ─── Vektor Studio · Refined High-Contrast Tokens ──────────────────────────

export const colors = {
  // Canvas (Absolute Matte Black)
  base:      '#000000',
  surface:   '#08080a',
  elevated:  '#0f0f12',
  overlay:   '#141417',

  // Borders (Stark High-Contrast Translucency)
  border:      'rgba(255, 255, 255, 0.15)',
  borderHover: 'rgba(255, 255, 255, 0.4)',

  // Stark Typography (White Dominant)
  primary:   '#ffffff',
  secondary: '#f4f4f5',
  muted:     '#a1a1aa', // Clean zinc gray for readable text hierarchy
  dim:       '#52525b',

  // Accent (Pure White Signal & Subtle Backlight)
  accent:    '#ffffff',
  accentDim: 'rgba(255, 255, 255, 0.08)',
  accentGlow:'rgba(255, 255, 255, 0.12)',

  // Status
  success:   '#ffffff',
  warning:   '#f4f4f5',
  danger:    '#e4e4e7',
};

export const typography = {
  display: "'Space Grotesk', 'Inter', system-ui, sans-serif",
  mono:    "'JetBrains Mono', 'Fira Code', 'Menlo', monospace",
  body:    "'Inter', system-ui, -apple-system, sans-serif",
};

export const glass = {
  blur: 'blur(24px) saturate(180%)',
  panel: 'rgba(255, 255, 255, 0.03)',
  panelHover: 'rgba(255, 255, 255, 0.06)',
};

export const transitions = {
  fast:   'all 180ms cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: 'all 380ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow:   'all 680ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export const radii = {
  none:  '0px',
  sm:    '4px',
  md:    '8px',
  lg:    '12px',
  full:  '9999px',
};