import { ClassCard } from "./ClassCard";

type ClassType = "in-person" | "online" | "hybrid";

type ClassItem = {
  courseName: string;
  date: Date | string;
  time: string;
  location: string;
  locationUrl?: string;
  type?: ClassType;
  description?: string;
};

type ClassListProps = {
  classes: ClassItem[];
  title?: string;
  emptyMessage?: string;
  className?: string;
};

/* ── Date grouping ────────────────────────────────────────────── */
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] as const;
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'] as const;

type Group = { sortKey: string; label: string; items: ClassItem[] };

function groupByDate(classes: ClassItem[]): Group[] {
  const map = new Map<string, Group>();

  for (const item of classes) {
    const d = item.date instanceof Date ? item.date : new Date(item.date);
    /* YYYY-MM-DD sort key using local date components */
    const sortKey = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0'),
    ].join('-');

    if (!map.has(sortKey)) {
      const today    = new Date();
      const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
      const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth()    === b.getMonth()    &&
        a.getDate()     === b.getDate();

      let label: string;
      if (isSameDay(d, today))    label = `Today · ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
      else if (isSameDay(d, tomorrow)) label = `Tomorrow · ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
      else label = `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;

      map.set(sortKey, { sortKey, label, items: [] });
    }
    map.get(sortKey)!.items.push(item);
  }

  return Array.from(map.values()).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

/* ── Empty state ─────────────────────────────────────────────── */
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center rounded-[14px] border border-dashed border-cls-border-mid">
      <div className="w-10 h-10 rounded-full bg-cls-stone flex items-center justify-center mb-3" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-cls-muted">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </div>
      <p className="text-sm font-medium text-cls-secondary">{message}</p>
    </div>
  );
}

/* ── ClassList ───────────────────────────────────────────────── */
export function ClassList({
  classes,
  title,
  emptyMessage = 'No upcoming classes scheduled.',
  className = '',
}: ClassListProps) {
  const groups = groupByDate(classes);

  return (
    <section className={['w-full', className].join(' ')}>
      {title && (
        <h2 className="text-xl font-bold text-cls-heading mb-5 tracking-tight">
          {title}
        </h2>
      )}

      {classes.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.sortKey}>
              {/* Date group heading */}
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xs font-bold text-cls-secondary tracking-widest uppercase whitespace-nowrap">
                  {group.label}
                </h3>
                <div className="flex-1 h-px bg-cls-border" aria-hidden="true" />
              </div>

              {/* Cards within this date */}
              <div className="flex flex-col gap-2.5">
                {group.items.map((item, i) => (
                  <ClassCard
                    key={`${item.courseName}-${i}`}
                    courseName={item.courseName}
                    date={item.date}
                    time={item.time}
                    location={item.location}
                    locationUrl={item.locationUrl}
                    type={item.type}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
