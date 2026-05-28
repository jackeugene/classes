import type { ReactNode } from "react";

type ClassType = "in-person" | "online" | "hybrid";

type ClassCardProps = {
  courseName: string;
  /** Date object or ISO date string (e.g. "2025-09-15") */
  date: Date | string;
  /** Opaque display string for session time (e.g. "2:00 PM – 4:00 PM"). Never parse as a Date — rendered verbatim in Central Time. */
  time: string;
  /** Room name, address, or "Online" */
  location: string;
  /** Optional URL for the location — renders location as a link when provided */
  locationUrl?: string;
  type?: ClassType;
  /** Optional short session description */
  description?: string;
  className?: string;
};

/* ── Date helpers ─────────────────────────────────────────────── */
const DAY_ABBREVS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTH_ABBREVS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const;

function parseDate(date: Date | string): { dayAbbrev: string; dayNum: number; monthAbbrev: string } {
  const d = date instanceof Date ? date : new Date(date);
  return {
    dayAbbrev:  DAY_ABBREVS[d.getDay()],
    dayNum:     d.getDate(),
    monthAbbrev: MONTH_ABBREVS[d.getMonth()],
  };
}

/* ── Icon components ──────────────────────────────────────────── */
function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" />
      <circle cx="8" cy="6" r="1.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M1.5 8h13M8 1.5a10 10 0 0 1 2.5 6.5A10 10 0 0 1 8 14.5a10 10 0 0 1-2.5-6.5A10 10 0 0 1 8 1.5Z" />
    </svg>
  );
}

function HybridIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path d="M1 4h6M1 8h14M1 12h6" />
      <circle cx="13" cy="4" r="2" />
      <circle cx="9" cy="12" r="2" />
    </svg>
  );
}

/* ── Card background and left-border per type ─────────────────── */
const TYPE_STYLES: Record<ClassType, { card: string; accent: string; icon: ReactNode; label: string }> = {
  'online':    { card: 'bg-cls-sky/30',     accent: 'bg-cls-sky-text',      icon: <GlobeIcon />,    label: 'Online'    },
  'in-person': { card: 'bg-cls-surface',    accent: 'bg-cls-sage-text',     icon: <LocationPinIcon />, label: 'In Person' },
  'hybrid':    { card: 'bg-cls-lavender/30', accent: 'bg-cls-lavender-text', icon: <HybridIcon />,   label: 'Hybrid'    },
};

function getLocationIcon(type?: ClassType, location?: string) {
  if (type === 'online' || location?.toLowerCase() === 'online') return <GlobeIcon />;
  if (type === 'hybrid') return <HybridIcon />;
  return <LocationPinIcon />;
}

/* ── ClassCard ────────────────────────────────────────────────── */
export function ClassCard({
  courseName,
  date,
  time,
  location,
  locationUrl,
  type,
  description,
  className = '',
}: ClassCardProps) {
  const { dayAbbrev, dayNum, monthAbbrev } = parseDate(date);
  const typeStyle = type ? TYPE_STYLES[type] : TYPE_STYLES['in-person'];
  const locationIcon = getLocationIcon(type, location);

  const isOnline = type === 'online' || location.toLowerCase() === 'online';
  const cardBg = type ? typeStyle.card : (isOnline ? 'bg-cls-sky/30' : 'bg-cls-surface');

  return (
    <article
      className={[
        'flex items-stretch rounded-[14px] overflow-hidden',
        'border border-cls-border',
        'shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]',
        cardBg,
        className,
      ].join(' ')}
      aria-label={`${courseName} on ${dayAbbrev} ${monthAbbrev} ${dayNum}`}
    >
      {/* ── Date stamp ── */}
      <div
        className="flex flex-col items-center justify-center px-4 py-4 shrink-0 border-r border-cls-sage-mid min-w-[64px] bg-cls-sage"
        aria-label={`${dayAbbrev}, ${monthAbbrev} ${dayNum}`}
      >
        <span className="text-[10px] font-bold tracking-widest uppercase text-cls-sage-text leading-none mb-1">
          {dayAbbrev}
        </span>
        <span className="text-2xl font-black tracking-wider uppercase text-cls-sage-text leading-none">
          {monthAbbrev}
        </span>
        <span className="text-sm font-bold text-cls-sage-text leading-none mt-1">
          {dayNum}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col justify-center px-4 py-4 flex-1 min-w-0 gap-1.5">
        {/* Course name */}
        <h3 className="text-sm font-bold text-cls-heading leading-snug truncate">
          {courseName}
        </h3>

        {/* Time */}
        <div className="flex items-center gap-1.5 text-cls-secondary">
          <ClockIcon />
          <span className="text-xs font-medium">{time} CT</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-cls-secondary">
          {locationIcon}
          {locationUrl ? (
            <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium truncate underline underline-offset-2 hover:text-cls-heading transition-colors">
              {location}
            </a>
          ) : (
            <span className="text-xs font-medium truncate">{location}</span>
          )}
        </div>

        {/* Optional description */}
        {description && (
          <p className="text-xs text-cls-muted leading-relaxed mt-0.5 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* ── Type accent strip ── */}
      {type && (
        <div
          className={['w-1 shrink-0 self-stretch rounded-r-[14px]', typeStyle.accent].join(' ')}
          aria-hidden="true"
        />
      )}
    </article>
  );
}
