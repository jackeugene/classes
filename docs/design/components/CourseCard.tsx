import Link from "next/link";
import { CategoryBadge } from "./CategoryBadge";

type CourseStatus = "active" | "upcoming" | "completed";
export type CourseVariant = "lavender" | "amber" | "sky" | "sage" | "rose";

type CourseCardProps = {
  name: string;
  description: string;
  category: string;
  status?: CourseStatus;
  variant?: CourseVariant;
  /** Wraps the entire card in a link */
  href?: string;
  className?: string;
};

/* ── Variant styles ────────────────────────────────────────────── */
const CARD_VARIANTS: Record<CourseVariant, {
  card: string;
  heading: string;
  body: string;
  divider: string;
  shadow: string;
}> = {
  lavender: {
    card:    "bg-cls-lavender border border-cls-lavender-mid",
    heading: "text-cls-lavender-text",
    body:    "text-cls-lavender-text/75",
    divider: "border-cls-lavender-mid/60",
    shadow:  "hover:shadow-[0_8px_24px_rgba(91,33,182,0.14)]",
  },
  amber: {
    card:    "bg-cls-amber border border-cls-amber-mid",
    heading: "text-cls-amber-text",
    body:    "text-cls-amber-text/75",
    divider: "border-cls-amber-mid/60",
    shadow:  "hover:shadow-[0_8px_24px_rgba(146,64,14,0.14)]",
  },
  sky: {
    card:    "bg-cls-sky border border-cls-sky-mid",
    heading: "text-cls-sky-text",
    body:    "text-cls-sky-text/75",
    divider: "border-cls-sky-mid/60",
    shadow:  "hover:shadow-[0_8px_24px_rgba(29,78,216,0.14)]",
  },
  sage: {
    card:    "bg-cls-sage border border-cls-sage-mid",
    heading: "text-cls-sage-text",
    body:    "text-cls-sage-text/75",
    divider: "border-cls-sage-mid/60",
    shadow:  "hover:shadow-[0_8px_24px_rgba(22,101,52,0.14)]",
  },
  rose: {
    card:    "bg-cls-rose border border-cls-rose-mid",
    heading: "text-cls-rose-text",
    body:    "text-cls-rose-text/75",
    divider: "border-cls-rose-mid/60",
    shadow:  "hover:shadow-[0_8px_24px_rgba(159,18,57,0.14)]",
  },
};

/* ── Status badge ──────────────────────────────────────────────── */
const STATUS_STYLES: Record<CourseStatus, string> = {
  active:    "bg-cls-sage text-cls-sage-text",
  completed: "bg-cls-sage-mid text-cls-sage-text",
  upcoming:  "bg-cls-stone text-cls-secondary border border-cls-border",
};

const STATUS_LABELS: Record<CourseStatus, string> = {
  active:    "Active",
  completed: "Completed",
  upcoming:  "Upcoming",
};

const STATUS_ICONS: Record<CourseStatus, string> = {
  active:    "●",
  completed: "✓",
  upcoming:  "○",
};

function StatusBadge({ status }: { status: CourseStatus }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "text-xs font-semibold leading-none",
        STATUS_STYLES[status],
      ].join(" ")}
    >
      <span className="text-[8px]" aria-hidden="true">{STATUS_ICONS[status]}</span>
      {STATUS_LABELS[status]}
    </span>
  );
}

/* ── Card ──────────────────────────────────────────────────────── */
export function CourseCard({
  name,
  description,
  category,
  status,
  variant = "lavender",
  href,
  className = "",
}: CourseCardProps) {
  const v = CARD_VARIANTS[variant];

  const cardBase = [
    "flex flex-col p-5 rounded-[18px]",
    "transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
    v.card,
    href ? `hover:-translate-y-0.5 cursor-pointer ${v.shadow}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <div className="mb-3">
        <CategoryBadge category={category} />
      </div>

      <h3 className={["text-lg font-bold leading-snug mb-2", v.heading].join(" ")}>
        {name}
      </h3>

      <p className={["text-sm leading-relaxed line-clamp-3 flex-1", v.body].join(" ")}>
        {description}
      </p>

      {status && (
        <div className={["mt-4 pt-3 border-t", v.divider].join(" ")}>
          <StatusBadge status={status} />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={[
          cardBase,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cls-focus focus-visible:ring-offset-2",
        ].join(" ")}
      >
        {inner}
      </Link>
    );
  }

  return <div className={cardBase}>{inner}</div>;
}
