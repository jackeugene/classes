# Class Platform — Style Guide

> **Design Direction: Calm Academic**
>
> Refined, spacious, and trustworthy — like a well-designed university portal.
> Color is used sparingly: soft accents carry meaning, not decoration.
> Inspired by the reference design's dark-nav + mint-ambient + white-surface composition.

---

## Color Palette

### Foundation

| Token | Hex | Class | Purpose |
|---|---|---|---|
| `--cls-bg` | `#D9EEF2` | `bg-cls-bg` | **Page ambient background** — the mint-blue wash behind all content |
| `--cls-bg-deep` | `#C4E4EA` | `bg-cls-bg-deep` | Slightly richer variant for sidebars, secondary panels |
| `--cls-nav` | `#111111` | `bg-cls-nav` | **Navigation bar** — near-black creates strong chrome separation |
| `--cls-surface` | `#FFFFFF` | `bg-cls-surface` | **Card / content surface** — pure white cards on the ambient background |
| `--cls-surface-raised` | `#F9FAFB` | `bg-cls-surface-raised` | Slightly elevated, for nested cards or table rows |
| `--cls-surface-hover` | `#F3F4F6` | `bg-cls-surface-hover` | Hover state background |

### Accent Colors

Each accent color has three tones: light (background), mid (emphasis), and text (legible on the light background).

| Accent | Light | Mid | Text | Use case |
|---|---|---|---|---|
| **Lavender** | `#EDE0FF` | `#D8BEFF` | `#5B21B6` | Featured courses, Design category |
| **Sage** | `#CCEFD8` | `#A7E3B8` | `#166534` | Active / Completed status, Healthcare category |
| **Amber** | `#FEF3C7` | `#FDE68A` | `#92400E` | Upcoming status, Business category |
| **Sky** | `#DBEAFE` | `#BFDBFE` | `#1D4ED8` | Online class type, Technology category |
| **Rose** | `#FFE4E6` | `#FECDD3` | `#9F1239` | Creative category |
| **Stone** | `#F3F4F6` | — | `#374151` | Neutral fallback, Other category |

**Rule**: Never use an accent's mid or text color as a background for large areas. Mid tones are for badges, progress fills, and decorative accents only.

### Text Colors

| Token | Hex | Class | Usage |
|---|---|---|---|
| `--cls-text-heading` | `#111111` | `text-cls-heading` | Page titles, card names — the same as `--cls-nav` |
| `--cls-text-body` | `#374151` | `text-cls-body` | Paragraphs, descriptions |
| `--cls-text-secondary` | `#6B7280` | `text-cls-secondary` | Labels, metadata, subheadings |
| `--cls-text-muted` | `#9CA3AF` | `text-cls-muted` | Placeholders, captions, disabled text |
| `--cls-text-inverse` | `#FFFFFF` | `text-cls-inverse` | Text on dark (`--cls-nav`) backgrounds |

### Borders

| Token | Hex | Class | Usage |
|---|---|---|---|
| `--cls-border` | `#E5E7EB` | `border-cls-border` | Default card and input borders |
| `--cls-border-mid` | `#D1D5DB` | `border-cls-border-mid` | Stronger dividers, empty state dashed borders |

### Contrast Ratios (WCAG)

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| `#111111` on `#FFFFFF` | Card surface | 19.7:1 | AAA |
| `#374151` on `#FFFFFF` | Card surface | 10.7:1 | AAA |
| `#6B7280` on `#FFFFFF` | Card surface | 5.9:1 | AA |
| `#FFFFFF` on `#111111` | Nav bar | 19.7:1 | AAA |
| `#5B21B6` on `#EDE0FF` | Lavender badge | 7.1:1 | AAA |
| `#166534` on `#CCEFD8` | Sage badge | 5.2:1 | AA |
| `#92400E` on `#FEF3C7` | Amber badge | 5.8:1 | AA |
| `#1D4ED8` on `#DBEAFE` | Sky badge | 5.5:1 | AA |

---

## Typography

**Font family:** Geist Sans for all UI text. Geist Mono for any code or numeric data displays.

Both are pre-loaded in `app/layout.tsx` via `next/font/google` and available as `var(--font-geist-sans)` and `var(--font-geist-mono)`.

### Type Scale

| Name | Size | Weight | Line-height | Tailwind | Usage |
|---|---|---|---|---|---|
| Display | 2.25rem (36px) | 800 | 1.1 | `text-4xl font-extrabold` | Page hero stats |
| H1 | 1.875rem (30px) | 700 | 1.15 | `text-3xl font-bold` | Page titles |
| H2 | 1.5rem (24px) | 700 | 1.2 | `text-2xl font-bold` | Section headings |
| H3 | 1.25rem (20px) | 600 | 1.25 | `text-xl font-semibold` | Card titles |
| H4 | 1.125rem (18px) | 600 | 1.3 | `text-lg font-semibold` | Sub-section labels |
| Body | 1rem (16px) | 400 | 1.6 | `text-base` | Default body text |
| Body SM | 0.875rem (14px) | 400 | 1.5 | `text-sm` | Card descriptions, secondary text |
| Label | 0.75rem (12px) | 600 | 1.4 | `text-xs font-semibold` | Badges, nav items, metadata |
| Micro | 0.625rem (10px) | 700 | 1.3 | `text-[10px] font-bold` | Date stamp abbrevs, tiny labels |

### Rules

- **Tracking**: Section headings use `tracking-tight` (negative letter-spacing). Date stamp day abbrevs and group headers use `tracking-widest uppercase` for distinction.
- **Line-clamping**: Course descriptions use `line-clamp-3` to maintain visual consistency in the grid. ClassCard course name uses `truncate`.
- **Font weight**: The system uses weights 400 / 600 / 700 / 800. Never use 300 (too light at small sizes on colored backgrounds).

---

## Spacing

Based on Tailwind's 4px grid. All spatial decisions should land on multiples of 4px.

| Value | px | Key uses |
|---|---|---|
| `gap-1.5` / `p-1.5` | 6px | Icon-to-label gaps, badge inner padding |
| `gap-2` / `p-2` | 8px | Tight spacing within dense components |
| `gap-2.5` / `p-2.5` | 10px | ClassCard inner content gaps |
| `gap-3` / `p-3` | 12px | List item gaps, small card padding |
| `gap-4` / `p-4` | 16px | Card grid gaps, standard card padding |
| `gap-5` / `p-5` | 20px | Card content padding |
| `gap-6` / `p-6` | 24px | Date group separation in ClassList |
| `px-6` | 24px | Header / main padding |
| `py-8` / `py-10` | 32–40px | Page-level vertical rhythm |

---

## Border Radius

This system uses restrained rounding — enough to feel modern and friendly, not toy-like.

| Value | px | Usage |
|---|---|---|
| `rounded-sm` / `rounded` | 4–6px | Focus rings, small inline elements |
| `rounded-lg` | 8px | Small buttons, tooltip containers |
| `rounded-[10px]` | 10px | Input fields |
| `rounded-[14px]` | 14px | **ClassCard** |
| `rounded-[18px]` | 18px | **CourseCard** |
| `rounded-2xl` | 24px | Featured CourseCard |
| `rounded-full` | 9999px | **All badges and pills** (CategoryBadge, StatusBadge, nav links) |

---

## Shadows

Shadows are subtle — they communicate depth without visual noise.

| Name | Value | Usage |
|---|---|---|
| `shadow-card` | `0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)` | Default card elevation |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)` | Hovered/focused cards, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.09), 0 4px 8px rgba(0,0,0,0.05)` | Elevated modals, popovers |
| Lavender shadow | `0 4px 20px rgba(91,33,182,0.12)` | Featured course card only |

**Rule**: Match shadow color to card color. A lavender card gets a lavender-tinted shadow; white cards get the neutral gray shadow.

---

## Iconography

- **Style**: 16×16 or 24×24 viewport, outline stroke, `strokeWidth="1.5"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- **Color**: Always `currentColor` — inherit from parent text color.
- **Size**: `w-3.5 h-3.5` (14px) for inline metadata icons (clock, location pin in ClassCard). `w-5 h-5` (20px) for standalone icons.
- **Accessibility**: Decorative icons get `aria-hidden="true"`. Icons that are the sole label for an action need `aria-label` on the parent element.
- **No emoji in structural UI** — emojis are fine in content (course names, descriptions), not in chrome (headers, navigation, badges).

---

## Motion

### Principles

The design uses **utilitarian motion** — transitions confirm that something changed; they never perform for the sake of it.

| Pattern | Duration | Easing | Where |
|---|---|---|---|
| Color/opacity shifts | 100ms | ease | Nav links, button hover states |
| Card hover lift | 180ms | ease | `CourseCard` with `href` |
| All others | 180ms | `cubic-bezier(0.4, 0, 0.2, 1)` | General |

**`prefers-reduced-motion`**: Wrap non-essential transitions in `motion-safe:` Tailwind variants. Functional transitions (e.g. focus rings) should always apply.

---

## Accessibility

- **Landmarks**: `<header>` for SiteHeader, `<main>` for PageLayout content area, `<nav aria-label="Main navigation">` inside the header, `<section>` for CourseGrid and ClassList.
- **Headings**: CourseGrid and ClassList titles are `<h2>`. CourseCard names are `<h3>`. Course/class headings must not skip levels.
- **Focus management**: All interactive elements use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cls-focus focus-visible:ring-offset-2`. The ring color `#6366F1` (indigo) has good contrast on both white and the ambient mint background.
- **`aria-current="page"`**: Applied to the active nav link in SiteHeader.
- **`aria-label`**: ClassCard has an `aria-label` combining the course name and date for screen reader context.
- **Keyboard navigation**: All interactive elements (nav links, card links) are reachable via Tab. No interactive elements are `div` or `span` — they use `<a>` (via Next.js `Link`) or `<button>`.
