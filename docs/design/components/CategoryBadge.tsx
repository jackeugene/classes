/*
 * CategoryBadge — colored pill label for course categories.
 *
 * Each built-in category maps to a distinct muted accent color.
 * Pass colorOverride to supply arbitrary hex values for custom categories.
 */

/** Tailwind class pairs for built-in categories.
 *  All strings are statically present so Tailwind's scanner detects them. */
const CATEGORY_CLASSES: Record<string, { bg: string; text: string }> = {
  design:     { bg: 'bg-cls-lavender', text: 'text-cls-lavender-text' },
  business:   { bg: 'bg-cls-amber',    text: 'text-cls-amber-text'    },
  technology: { bg: 'bg-cls-sky',      text: 'text-cls-sky-text'      },
  healthcare: { bg: 'bg-cls-sage',     text: 'text-cls-sage-text'     },
  wellness:   { bg: 'bg-cls-sage',     text: 'text-cls-sage-text'     },
  creative:   { bg: 'bg-cls-rose',     text: 'text-cls-rose-text'     },
};

/** Hex values for the same categories — use in JS contexts (charts, etc.) */
export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  design:     { bg: '#EDE0FF', text: '#5B21B6' },
  business:   { bg: '#FEF3C7', text: '#92400E' },
  technology: { bg: '#DBEAFE', text: '#1D4ED8' },
  healthcare: { bg: '#CCEFD8', text: '#166534' },
  wellness:   { bg: '#CCEFD8', text: '#166534' },
  creative:   { bg: '#FFE4E6', text: '#9F1239' },
  other:      { bg: '#F3F4F6', text: '#374151' },
};

type CategoryBadgeProps = {
  category: string;
  /** Override bg/text with raw CSS color values (e.g. hex strings) */
  colorOverride?: { bg: string; text: string };
  className?: string;
};

export function CategoryBadge({
  category,
  colorOverride,
  className = '',
}: CategoryBadgeProps) {
  const key = category.toLowerCase();
  const classes = CATEGORY_CLASSES[key];

  const base = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold leading-none tracking-wide';

  if (colorOverride) {
    return (
      <span
        className={[base, className].join(' ')}
        style={{ backgroundColor: colorOverride.bg, color: colorOverride.text }}
      >
        {category}
      </span>
    );
  }

  if (classes) {
    return (
      <span className={[base, classes.bg, classes.text, className].join(' ')}>
        {category}
      </span>
    );
  }

  /* Fallback for unknown categories */
  return (
    <span className={[base, 'bg-cls-stone text-cls-stone-text', className].join(' ')}>
      {category}
    </span>
  );
}
