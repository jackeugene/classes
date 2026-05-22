# Class Platform — Design System

> A calm, professional design language for an instructor-led teaching platform.
> Built for **Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4**.

---

## What's in this system

```
docs/design/
├── index.md                 ← you are here
├── tokens.css               ← CSS custom properties + Tailwind v4 @theme inline registration
├── tokens.ts                ← TypeScript token values for JS contexts
├── style-guide.md           ← Colors, typography, spacing, shadows, motion, accessibility
├── component-specs.md       ← Full props API, usage examples, do/don't for all components
└── components/
    ├── CategoryBadge.tsx    ← Colored pill for course categories
    ├── CourseCard.tsx       ← Single course display (name, description, category, status)
    ├── CourseGrid.tsx       ← Responsive 3-col grid of CourseCards
    ├── ClassCard.tsx        ← Single upcoming class (name, date, time, location)
    ├── ClassList.tsx        ← Date-grouped vertical list of ClassCards
    ├── SiteHeader.tsx       ← Dark top navigation bar
    └── PageLayout.tsx       ← Full-page layout with ambient background + header
```

---

## Setup

### 1. Import tokens into globals.css

Open `app/globals.css` and add the import **on the line after** `@import "tailwindcss"`:

```css
/* app/globals.css */
@import "tailwindcss";
@import "../docs/design/tokens.css";   /* ← add this line */

:root {
  --background: var(--cls-bg);         /* optional: wire up page bg */
  --foreground: var(--cls-text-heading);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--cls-bg);
  color: var(--cls-text-heading);
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
}
```

### 2. Copy components into your app

```bash
# Copy the components you need
cp docs/design/components/CategoryBadge.tsx  app/components/CategoryBadge.tsx
cp docs/design/components/CourseCard.tsx     app/components/CourseCard.tsx
cp docs/design/components/CourseGrid.tsx     app/components/CourseGrid.tsx
cp docs/design/components/ClassCard.tsx      app/components/ClassCard.tsx
cp docs/design/components/ClassList.tsx      app/components/ClassList.tsx
cp docs/design/components/SiteHeader.tsx     app/components/SiteHeader.tsx
cp docs/design/components/PageLayout.tsx     app/components/PageLayout.tsx
```

> **Dependencies between components:**
> - `CourseGrid` imports `CourseCard`
> - `CourseCard` imports `CategoryBadge`
> - `ClassList` imports `ClassCard`
> - `PageLayout` imports `SiteHeader`
>
> Copy all files in the chain when using a higher-level component.

---

## Quick Start — A complete page

```tsx
// app/page.tsx
import { PageLayout }  from "@/components/PageLayout";
import { CourseGrid }  from "@/components/CourseGrid";
import { ClassList }   from "@/components/ClassList";

const courses = [
  {
    name: "Medical Terminology",
    description: "Learn basic medical language for effective clinical communication with patients and colleagues.",
    category: "Healthcare",
    status: "completed" as const,
    href: "/courses/medical-terminology",
  },
  {
    name: "Pharmacology Basics",
    description: "Understand drug classifications, mechanisms of action, and patient safety protocols.",
    category: "Healthcare",
    status: "active" as const,
    featured: true,
    href: "/courses/pharmacology",
  },
  {
    name: "Anatomy and Physiology",
    description: "Understand the structure and function of the human body from cells to organ systems.",
    category: "Healthcare",
    status: "upcoming" as const,
    href: "/courses/anatomy",
  },
  {
    name: "Brand Strategy",
    description: "Develop compelling brand identities and positioning for competitive markets.",
    category: "Business",
    status: "upcoming" as const,
  },
  {
    name: "UI Design Principles",
    description: "Master the visual design fundamentals that underpin effective digital interfaces.",
    category: "Design",
    status: "active" as const,
    href: "/courses/ui-design",
  },
  {
    name: "Web Development Fundamentals",
    description: "Build modern websites using HTML, CSS, and JavaScript from the ground up.",
    category: "Technology",
    status: "upcoming" as const,
  },
];

const upcomingClasses = [
  {
    courseName: "Medical Terminology",
    date: "2025-09-15",
    time: "9:00 AM – 11:00 AM",
    location: "Room 204, Medical Building",
    type: "in-person" as const,
  },
  {
    courseName: "Pharmacology Basics",
    date: "2025-09-15",
    time: "1:00 PM – 3:00 PM",
    location: "Online",
    type: "online" as const,
    description: "Live session via Zoom. Recording available within 24 hours.",
  },
  {
    courseName: "Anatomy and Physiology",
    date: "2025-09-17",
    time: "10:00 AM – 12:00 PM",
    location: "Room 101 or Online",
    type: "hybrid" as const,
  },
];

export default function HomePage() {
  return (
    <PageLayout
      header={{
        siteName: "Classes",
        navLinks: [
          { label: "Courses",  href: "/",         active: true },
          { label: "Schedule", href: "/schedule" },
          { label: "About",    href: "/about"    },
        ],
        userName: "Ellington Thom",
        userEmail: "ellington@school.edu",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course catalog — takes 2 of 3 columns on large screens */}
        <div className="lg:col-span-2">
          <CourseGrid
            title="Our Courses"
            courses={courses}
          />
        </div>

        {/* Upcoming classes — sidebar on large screens */}
        <div>
          <ClassList
            title="Upcoming Classes"
            classes={upcomingClasses}
            emptyMessage="No upcoming classes at this time. Check back soon."
          />
        </div>
      </div>
    </PageLayout>
  );
}
```

---

## Token Reference

After importing `tokens.css`, every `--cls-*` variable is available in your CSS, and every `bg-cls-*` / `text-cls-*` / `border-cls-*` class is available in Tailwind.

### Most-used tokens

| CSS Variable | Tailwind Class | Hex | Purpose |
|---|---|---|---|
| `--cls-bg` | `bg-cls-bg` | `#D9EEF2` | Page ambient background |
| `--cls-nav` | `bg-cls-nav` | `#111111` | Navigation bar |
| `--cls-surface` | `bg-cls-surface` | `#FFFFFF` | Card / panel surface |
| `--cls-lavender` | `bg-cls-lavender` | `#EDE0FF` | Featured course, Design category |
| `--cls-sage` | `bg-cls-sage` | `#CCEFD8` | Active/completed, Healthcare |
| `--cls-amber` | `bg-cls-amber` | `#FEF3C7` | Upcoming, Business |
| `--cls-sky` | `bg-cls-sky` | `#DBEAFE` | Online, Technology |
| `--cls-rose` | `bg-cls-rose` | `#FFE4E6` | Creative category |
| `--cls-text-heading` | `text-cls-heading` | `#111111` | Headings, course names |
| `--cls-text-secondary` | `text-cls-secondary` | `#6B7280` | Descriptions, metadata |
| `--cls-text-muted` | `text-cls-muted` | `#9CA3AF` | Placeholders, captions |
| `--cls-border` | `border-cls-border` | `#E5E7EB` | Card and input borders |

---

## Design Principles

### 1. Color carries meaning, not decoration
Each accent color is tied to a specific semantic: sage = active/complete, amber = upcoming, sky = online, lavender = featured/design. Don't reuse an accent for a different purpose.

### 2. The nav is the horizon line
The dark `#111111` header creates a strong visual anchor. Content floats below it on the mint-blue ambient. Never make a content area as dark as the nav.

### 3. Cards are white islands
Content cards are always `bg-cls-surface` (`#FFFFFF`) on the `#D9EEF2` ambient — the contrast ratio between them makes content feel organized without needing dividers.

### 4. Date is the primary scan target in ClassCard
The date stamp on the left is the first thing an instructor scans. Keep it uncluttered — only day abbreviation, date number, and month. Never put the year in the stamp.

### 5. Typography does the hierarchical work
The system uses font-weight and size to create hierarchy. Don't reach for color to differentiate text levels — use `text-cls-heading` → `text-cls-body` → `text-cls-secondary` → `text-cls-muted` instead.

---

## Extending the System

### Adding a new category color

1. Add to `:root` in `tokens.css`:
   ```css
   --cls-cat-leadership: #FFF7ED;
   --cls-cat-leadership-text: #9A3412;
   ```
2. Register in `@theme inline`:
   ```css
   --color-cls-cat-leadership: var(--cls-cat-leadership);
   ```
3. Add to `CATEGORY_CLASSES` in `CategoryBadge.tsx`:
   ```ts
   leadership: { bg: 'bg-cls-cat-leadership', text: 'text-[#9A3412]' },
   ```
4. Add to `CATEGORY_COLORS` in `CategoryBadge.tsx` and `categoryColors` in `tokens.ts`.

### Adding a new page

```tsx
// app/schedule/page.tsx
import { PageLayout } from "@/components/PageLayout";
import { ClassList }  from "@/components/ClassList";

export default function SchedulePage() {
  return (
    <PageLayout
      header={{
        siteName: "Classes",
        navLinks: [
          { label: "Courses",  href: "/" },
          { label: "Schedule", href: "/schedule", active: true },
        ],
        userName: "Ellington Thom",
      }}
    >
      <ClassList title="Full Schedule" classes={allClasses} />
    </PageLayout>
  );
}
```
