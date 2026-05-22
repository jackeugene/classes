import { CourseCard, type CourseVariant } from "./CourseCard";

const CATEGORY_VARIANTS: Record<string, CourseVariant> = {
  wellness:   "sage",
  technology: "sky",
  design:     "lavender",
  business:   "amber",
  healthcare: "sage",
  creative:   "rose",
};

type Course = {
  name: string;
  description: string;
  category: string;
  status?: "active" | "upcoming" | "completed";
  href?: string;
};

type CourseGridProps = {
  courses: Course[];
  title?: string;
  emptyMessage?: string;
  className?: string;
};

function EmptyState({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-8 text-center">
      <div
        className="w-12 h-12 rounded-full bg-cls-stone flex items-center justify-center mb-4"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-cls-muted"
        >
          <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      </div>
      <p className="text-sm font-medium text-cls-secondary">{message}</p>
    </div>
  );
}

export function CourseGrid({
  courses,
  title,
  emptyMessage = 'No courses available yet.',
  className = '',
}: CourseGridProps) {
  return (
    <section className={['w-full', className].join(' ')}>
      {title && (
        <h2 className="text-xl font-bold text-cls-heading mb-5 tracking-tight">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          courses.map((course, i) => (
            <CourseCard
              key={`${course.name}-${i}`}
              name={course.name}
              description={course.description}
              category={course.category}
              status={course.status}
              variant={CATEGORY_VARIANTS[course.category.toLowerCase()] ?? "lavender"}
              href={course.href}
            />
          ))
        )}
      </div>
    </section>
  );
}
