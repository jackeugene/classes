import Link from "next/link";
import { SiteHeader } from "@/docs/design/components/SiteHeader";

const NAV_LINKS = [
  { label: "Schedule", href: "/schedule" },
];

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function BookGroupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type SelectionCardProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  meta: string;
  cta: string;
  variant: "lavender" | "amber" | "sky";
  external?: boolean;
};

function SelectionCard({ href, icon, title, meta, cta, variant, external }: SelectionCardProps) {
  const styles = {
    lavender: {
      card:        "bg-cls-lavender border-cls-lavender-mid hover:bg-[#E4D8FF]",
      iconWrapper: "bg-cls-lavender-mid/60",
      iconColor:   "text-cls-lavender-text",
      meta:        "text-cls-lavender-text/70",
      title:       "text-cls-lavender-text",
      description: "text-cls-lavender-text/75",
      cta:         "text-cls-lavender-text font-semibold",
      divider:     "bg-cls-lavender-mid/50",
    },
    amber: {
      card:        "bg-cls-amber border-cls-amber-mid hover:bg-[#FEF0B0]",
      iconWrapper: "bg-cls-amber-mid/60",
      iconColor:   "text-cls-amber-text",
      meta:        "text-cls-amber-text/70",
      title:       "text-cls-amber-text",
      description: "text-cls-amber-text/75",
      cta:         "text-cls-amber-text font-semibold",
      divider:     "bg-cls-amber-mid/60",
    },
    sky: {
      card:        "bg-cls-sky border-cls-sky-mid hover:bg-[#C7E9FA]",
      iconWrapper: "bg-cls-sky-mid/60",
      iconColor:   "text-cls-sky-text",
      meta:        "text-cls-sky-text/70",
      title:       "text-cls-sky-text",
      description: "text-cls-sky-text/75",
      cta:         "text-cls-sky-text font-semibold",
      divider:     "bg-cls-sky-mid/60",
    },
  };

  const s = styles[variant];

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={[
        "group flex flex-col gap-5 p-7 rounded-2xl border",
        "transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cls-focus focus-visible:ring-offset-2",
        s.card,
      ].join(" ")}
    >
      {/* Icon + meta */}
      <div className="flex items-start justify-between gap-4">
        <div className={["w-12 h-12 rounded-xl flex items-center justify-center shrink-0", s.iconWrapper, s.iconColor].join(" ")}>
          {icon}
        </div>
        <span className={["text-xs font-semibold tracking-wide pt-1", s.meta].join(" ")}>
          {meta}
        </span>
      </div>

      {/* Title */}
      <h2 className={["text-2xl font-bold tracking-tight", s.title].join(" ")}>
        {title}
      </h2>

      {/* CTA */}
      <div className={["h-px", s.divider].join(" ")} aria-hidden="true" />
      <div className={["flex items-center gap-2 text-sm", s.cta].join(" ")}>
        {cta}
        <span className="transition-transform duration-150 group-hover:translate-x-0.5">
          <ArrowRightIcon />
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-cls-surface-raised">
      <SiteHeader siteName="Home" navLinks={NAV_LINKS} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 lg:py-20">
        {/* Heading */}
        <div className="text-center mb-12 max-w-lg">
          <h1 className="text-4xl font-bold text-cls-heading tracking-tight mb-3">
            Class Hub
          </h1>
          <p className="text-base text-cls-secondary leading-relaxed">
            Your one-stop hub for class materials, schedules, and other important information.
          </p>
        </div>

        {/* Selection cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl">
          <SelectionCard
            href="/courses"
            icon={<BookIcon />}
            title="Our Classes"
            meta="6 courses available"
            cta="Browse courses"
            variant="lavender"
          />
          <SelectionCard
            href="/schedule"
            icon={<CalendarIcon />}
            title="Upcoming Classes"
            meta="5 sessions scheduled"
            cta="View schedule"
            variant="amber"
          />
          <SelectionCard
            href="http://booksneverdie.com"
            icon={<BookGroupIcon />}
            title="Book Discussion Groups"
            meta="Community reading"
            cta="Visit site"
            variant="sky"
            external
          />
        </div>
      </main>
    </div>
  );
}
