/**
 * Class Platform — Design Tokens (TypeScript)
 *
 * Mirrors tokens.css for use in JS/TS contexts:
 *   - Chart libraries, canvas rendering
 *   - Dynamic style props
 *   - Testing utilities
 *   - Storybook / design tooling
 */

export const colors = {
  /* Page / ambient */
  bg:              '#D9EEF2',
  bgDeep:          '#C4E4EA',

  /* Navigation */
  nav:             '#111111',

  /* Surfaces */
  surface:         '#FFFFFF',
  surfaceRaised:   '#F9FAFB',
  surfaceHover:    '#F3F4F6',

  /* Accents */
  lavender:        '#EDE0FF',
  lavenderMid:     '#D8BEFF',
  lavenderText:    '#5B21B6',

  sage:            '#CCEFD8',
  sageMid:         '#A7E3B8',
  sageText:        '#166534',

  amber:           '#FEF3C7',
  amberMid:        '#FDE68A',
  amberText:       '#92400E',

  sky:             '#DBEAFE',
  skyMid:          '#BFDBFE',
  skyText:         '#1D4ED8',

  rose:            '#FFE4E6',
  roseMid:         '#FECDD3',
  roseText:        '#9F1239',

  stone:           '#F3F4F6',
  stoneText:       '#374151',

  /* Text */
  textHeading:     '#111111',
  textBody:        '#374151',
  textSecondary:   '#6B7280',
  textMuted:       '#9CA3AF',
  textInverse:     '#FFFFFF',

  /* Borders */
  border:          '#E5E7EB',
  borderMid:       '#D1D5DB',

  /* Focus */
  focus:           '#6366F1',
} as const;

/** Category → background + foreground hex values */
export const categoryColors: Record<string, { bg: string; text: string }> = {
  design:      { bg: colors.lavender,  text: colors.lavenderText },
  business:    { bg: colors.amber,     text: colors.amberText },
  technology:  { bg: colors.sky,       text: colors.skyText },
  healthcare:  { bg: colors.sage,      text: colors.sageText },
  creative:    { bg: colors.rose,      text: colors.roseText },
  other:       { bg: colors.stone,     text: colors.stoneText },
};

export const shadows = {
  card: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
  md:   '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
  lg:   '0 8px 24px rgba(0,0,0,0.09), 0 4px 8px rgba(0,0,0,0.05)',
} as const;

export const radius = {
  sm:   '0.375rem',
  md:   '0.625rem',
  lg:   '0.875rem',
  xl:   '1.125rem',
  '2xl':'1.5rem',
  full: '9999px',
} as const;

export const animation = {
  durationFast: '100ms',
  durationBase: '180ms',
  durationSlow: '300ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const tokens = { colors, categoryColors, shadows, radius, animation } as const;
export type Tokens = typeof tokens;
