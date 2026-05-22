# Component Specifications

Copy any component from `docs/design/components/` into `app/components/` to use it. The tokens in `tokens.css` must be imported in `app/globals.css` first (see `index.md`).

---

## CategoryBadge

`docs/design/components/CategoryBadge.tsx`

A small pill label that visually identifies a course's category using muted, distinct accent colors.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `category` | `string` | required | Category name. Matched case-insensitively against built-in map. |
| `colorOverride` | `{ bg: string; text: string }` | `undefined` | Raw CSS color values (e.g. hex) for custom categories not in the built-in map. |
| `className` | `string` | `""` | Additional Tailwind classes. |

### Built-in categories and colors

| Category | Background | Text | Accent name |
|---|---|---|---|
| `Design` | `#EDE0FF` | `#5B21B6` | Lavender |
| `Business` | `#FEF3C7` | `#92400E` | Amber |
| `Technology` | `#DBEAFE` | `#1D4ED8` | Sky |
| `Healthcare` | `#CCEFD8` | `#166534` | Sage |
| `Creative` | `#FFE4E6` | `#9F1239` | Rose |
| Any other | `#F3F4F6` | `#374151` | Stone (neutral fallback) |

### Exported constants

```ts
import { CATEGORY_COLORS } from "@/components/CategoryBadge";

// Returns { bg: '#EDE0FF', text: '#5B21B6' }
const designColors = CATEGORY_COLORS['design'];
```

### Usage

```tsx
import { CategoryBadge } from "@/components/CategoryBadge";

// Built-in category
<CategoryBadge category="Technology" />

// Custom category with hex override
<CategoryBadge
  category="Leadership"
  colorOverride={{ bg: '#FFF7ED', text: '#9A3412' }}
/>
```

### Do / Don't

- **Do**: use the built-in categories where possible — consistency aids visual scanning.
- **Do**: keep category names short (1–2 words).
- **Don't**: use CategoryBadge for status indicators — use the StatusBadge inside CourseCard instead.

### Accessibility

- Renders as a `<span>` — purely informational, no interactive behavior.
- Color contrast meets WCAG AA on white backgrounds (see style-guide.md).

---

## CourseCard

`docs/design/components/CourseCard.tsx`

Displays a single course with its name, description, category, and optional status and link.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | required | Course name |
| `description` | `string` | required | Course description (truncated to 3 lines) |
| `category` | `string` | required | Passed to `CategoryBadge` |
| `status` | `"active" \| "upcoming" \| "completed"` | `undefined` | If present, shows a status badge in the card footer |
| `featured` | `boolean` | `false` | Renders with lavender background and tinted shadow — use for highlighted courses |
| `href` | `string` | `undefined` | Wraps the card in a Next.js `Link`. Adds hover lift animation. |
| `className` | `string` | `""` | Additional classes |

### Status badge styles

| Status | Background | Text | Icon |
|---|---|---|---|
| `active` | Sage light | Sage text | `●` |
| `completed` | Sage mid | Sage text | `✓` |
| `upcoming` | Stone | Secondary text | `○` |

### Usage

```tsx
import { CourseCard } from "@/components/CourseCard";

// Standard course card
<CourseCard
  name="Introduction to UX Design"
  description="Learn the foundations of user experience design, from research methods to prototyping."
  category="Design"
  status="active"
  href="/courses/ux-design"
/>

// Featured / highlighted course
<CourseCard
  name="Advanced Business Strategy"
  description="Develop and execute competitive strategies in complex business environments."
  category="Business"
  status="upcoming"
  featured
  href="/courses/business-strategy"
/>

// Without link (static display)
<CourseCard
  name="Healthcare Ethics"
  description="Examine ethical principles and their application in clinical practice."
  category="Healthcare"
  status="completed"
/>
```

### Do / Don't

- **Do**: use `featured` sparingly — one featured card per section maximum.
- **Do**: provide `href` for every course in a browsable catalog.
- **Don't**: put overly long descriptions — the component truncates at 3 lines; ideally keep descriptions under 150 characters.
- **Don't**: nest interactive elements inside when `href` is set — the whole card is already a link.

### Accessibility

- With `href`: renders as `<a>` via Next.js `Link` with a focus ring.
- Without `href`: renders as `<div>` (non-interactive).
- Description truncation uses CSS `line-clamp-3` — the full text remains in the DOM for screen readers.

---

## CourseGrid

`docs/design/components/CourseGrid.tsx`

Responsive grid layout for a collection of `CourseCard` components.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `courses` | `Course[]` | required | Array of course data objects |
| `title` | `string` | `undefined` | Optional section heading (renders as `<h2>`) |
| `emptyMessage` | `string` | `"No courses available yet."` | Message shown when `courses` is empty |
| `className` | `string` | `""` | Additional classes on the outer `<section>` |

### Course object shape

```ts
type Course = {
  name: string;
  description: string;
  category: string;
  status?: "active" | "upcoming" | "completed";
  featured?: boolean;
  href?: string;
};
```

### Grid behavior

| Breakpoint | Columns |
|---|---|
| Mobile (default) | 1 |
| Small (`sm: 640px+`) | 2 |
| Large (`lg: 1024px+`) | 3 |

### Usage

```tsx
import { CourseGrid } from "@/components/CourseGrid";

const courses = [
  {
    name: "Medical Terminology",
    description: "Learn basic medical language for effective communication.",
    category: "Healthcare",
    status: "completed" as const,
    href: "/courses/medical-terminology",
  },
  {
    name: "Pharmacology Basics",
    description: "Understand drug classifications, mechanisms, and patient safety.",
    category: "Healthcare",
    status: "active" as const,
    featured: true,
    href: "/courses/pharmacology",
  },
  {
    name: "Disease Pathophysiology",
    description: "Study the cellular and molecular basis of common diseases.",
    category: "Healthcare",
    status: "upcoming" as const,
  },
];

<CourseGrid
  title="All Courses"
  courses={courses}
  emptyMessage="No courses have been added yet."
/>
```

### Responsive notes

- On mobile, one card per row fills the full width — descriptions remain readable.
- The grid uses `gap-4` (16px) between cards.

---

## ClassCard

`docs/design/components/ClassCard.tsx`

Displays a single upcoming class session with a prominent date stamp, time, and location.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `courseName` | `string` | required | Name of the course being taught |
| `date` | `Date \| string` | required | Session date. String should be ISO format (`"2025-09-15"`). |
| `time` | `string` | required | Display string for session time (`"2:00 PM – 4:00 PM"`) |
| `location` | `string` | required | Room name, address, or `"Online"` |
| `type` | `"in-person" \| "online" \| "hybrid"` | `undefined` | Affects card background tint and right-side accent strip |
| `description` | `string` | `undefined` | Short session description (2-line clamp) |
| `className` | `string` | `""` | Additional classes |

### Type styles

| Type | Card background | Accent strip color |
|---|---|---|
| `in-person` | White (`bg-cls-surface`) | Sage (`#166534`) |
| `online` | Sky tint (`bg-cls-sky/30`) | Sky (`#1D4ED8`) |
| `hybrid` | Lavender tint (`bg-cls-lavender/30`) | Lavender (`#5B21B6`) |
| *(none)* | Inferred from `location` field | No strip |

### Location icon logic

- `type="online"` or `location="Online"` → globe icon
- `type="hybrid"` → hybrid icon
- All others → location pin icon

### Usage

```tsx
import { ClassCard } from "@/components/ClassCard";

// In-person class
<ClassCard
  courseName="Introduction to Design"
  date="2025-09-15"
  time="2:00 PM – 4:00 PM"
  location="Room 201, Building A"
  type="in-person"
/>

// Online class
<ClassCard
  courseName="Business Strategy Fundamentals"
  date={new Date("2025-09-16T14:00:00")}
  time="2:00 PM – 3:30 PM"
  location="Online"
  type="online"
  description="Live session via Zoom. Recording available afterward."
/>

// Hybrid class
<ClassCard
  courseName="Healthcare Ethics"
  date="2025-09-17"
  time="10:00 AM – 12:00 PM"
  location="Room 105 or Online"
  type="hybrid"
/>
```

### Date handling note

`date` accepts both `Date` objects and ISO strings. When passing from a Server Component parent, either works. When passing from a Client Component, **use ISO strings** (`"2025-09-15"`) to avoid serialization errors.

### Accessibility

- `<article>` element with `aria-label` combining the course name and date.
- Date stamp section has its own `aria-label`.
- Icons are `aria-hidden="true"`.

---

## ClassList

`docs/design/components/ClassList.tsx`

Groups a list of upcoming classes by date and renders them as a labeled vertical list.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `classes` | `ClassItem[]` | required | Array of class session data |
| `title` | `string` | `undefined` | Optional section heading (renders as `<h2>`) |
| `emptyMessage` | `string` | `"No upcoming classes scheduled."` | Shown when `classes` is empty |
| `className` | `string` | `""` | Additional classes on the outer `<section>` |

### ClassItem shape

```ts
type ClassItem = {
  courseName: string;
  date: Date | string;
  time: string;
  location: string;
  type?: "in-person" | "online" | "hybrid";
  description?: string;
};
```

### Grouping behavior

- Classes are sorted ascending by date.
- Groups are formed by calendar day (local time).
- Group labels: `"Today · September 15"`, `"Tomorrow · September 16"`, `"Wednesday, September 17"`, etc.
- Multiple classes on the same day appear under one group label with a divider.

### Usage

```tsx
import { ClassList } from "@/components/ClassList";

<ClassList
  title="Upcoming Classes"
  classes={[
    {
      courseName: "Medical Terminology",
      date: "2025-09-15",
      time: "9:00 AM – 11:00 AM",
      location: "Room 204",
      type: "in-person",
    },
    {
      courseName: "Anatomy and Physiology",
      date: "2025-09-15",
      time: "1:00 PM – 3:00 PM",
      location: "Online",
      type: "online",
    },
    {
      courseName: "Pharmacology Basics",
      date: "2025-09-17",
      time: "10:00 AM – 12:00 PM",
      location: "Room 101",
      type: "in-person",
    },
  ]}
  emptyMessage="No classes are currently scheduled. Check back soon."
/>
```

### Do / Don't

- **Do**: pass all classes for a date range (e.g. next 2 weeks) and let the component handle grouping.
- **Don't**: pre-sort the array — the component sorts internally.
- **Don't**: use ClassList for past/completed sessions — it's designed for upcoming display.

---

## SiteHeader

`docs/design/components/SiteHeader.tsx`

Dark top navigation bar. **Not** `"use client"` — fully server-rendered.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `siteName` | `string` | required | Site name / brand shown on the left |
| `navLinks` | `NavLink[]` | `[]` | Navigation links for the center nav. Omit for header-only. |
| `userName` | `string` | `undefined` | User's display name — shown on the right with initials avatar |
| `userEmail` | `string` | `undefined` | Shown below the user name on the right |
| `className` | `string` | `""` | Additional classes on `<header>` |

### NavLink shape

```ts
type NavLink = { label: string; href: string; active?: boolean };
```

### Usage

```tsx
import { SiteHeader } from "@/components/SiteHeader";

<SiteHeader
  siteName="Classes"
  navLinks={[
    { label: "Courses",  href: "/courses",  active: true },
    { label: "Schedule", href: "/schedule" },
    { label: "About",    href: "/about"    },
  ]}
  userName="Ellington Thom"
  userEmail="ellington@school.edu"
/>
```

### Responsive behavior

- Nav links are hidden on mobile (`hidden md:flex`). Add a mobile drawer/menu separately if needed.
- User name and email are hidden on extra-small screens (`hidden sm:flex`). The avatar always shows.

### Accessibility

- `<header>` landmark.
- `<nav aria-label="Main navigation">` wraps the link group.
- Active link: `aria-current="page"`.
- Avatar: `role="img"` with `aria-label="User: [name]"`.

---

## PageLayout

`docs/design/components/PageLayout.tsx`

Full-page wrapper providing the mint-blue ambient background and optional header. **Not** `"use client"`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | required | Page content |
| `header` | `HeaderConfig` | `undefined` | If provided, renders `SiteHeader` at top. Omit to skip the header. |
| `contentClassName` | `string` | `""` | Additional classes on the `<main>` element |
| `className` | `string` | `""` | Additional classes on the outer wrapper `<div>` |

### HeaderConfig shape

```ts
type HeaderConfig = {
  siteName: string;
  navLinks?: { label: string; href: string; active?: boolean }[];
  userName?: string;
  userEmail?: string;
};
```

### Content constraints

The `<main>` element is: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10` — centered, responsive padding.

### Usage

```tsx
import { PageLayout } from "@/components/PageLayout";
import { CourseGrid }  from "@/components/CourseGrid";
import { ClassList }   from "@/components/ClassList";

export default function HomePage() {
  return (
    <PageLayout
      header={{
        siteName: "Classes",
        navLinks: [
          { label: "Courses",  href: "/",         active: true },
          { label: "Schedule", href: "/schedule" },
        ],
        userName: "Ellington Thom",
        userEmail: "ellington@school.edu",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CourseGrid title="All Courses" courses={courses} />
        </div>
        <div>
          <ClassList title="Upcoming Classes" classes={upcomingClasses} />
        </div>
      </div>
    </PageLayout>
  );
}
```
