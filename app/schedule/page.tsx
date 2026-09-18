import { PageLayout } from "@/docs/design/components/PageLayout";
import { ClassList }  from "@/docs/design/components/ClassList";
import { getUpcomingClasses } from "@/lib/schedule";

export const dynamic = "force-dynamic";

const NAV_LINKS: { label: string; href: string; active?: boolean }[] = [];

export default function SchedulePage() {
  const upcomingClasses = getUpcomingClasses();

  return (
    <PageLayout
      header={{
        siteName: "Home",
        navLinks: NAV_LINKS,
      }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cls-heading tracking-tight mb-2">
          Upcoming Classes
        </h1>
        <p className="text-cls-secondary text-sm">
          {upcomingClasses.length} sessions scheduled
        </p>
      </div>

      <div className="max-w-xl">
        <ClassList
          classes={upcomingClasses}
          emptyMessage="No upcoming classes at this time. Check back soon."
        />
      </div>
    </PageLayout>
  );
}
