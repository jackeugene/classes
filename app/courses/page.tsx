import { PageLayout } from "@/docs/design/components/PageLayout";
import { CourseGrid }  from "@/docs/design/components/CourseGrid";
import { COURSES } from "@/lib/courses";

const NAV_LINKS: { label: string; href: string; active?: boolean }[] = [];

export default function CoursesPage() {
  return (
    <PageLayout
      header={{
        siteName: "Home",
        navLinks: NAV_LINKS,
      }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cls-heading tracking-tight mb-2">
          Our Classes
        </h1>
        <p className="text-cls-secondary text-sm">
          {COURSES.length} courses across wellness and technology
        </p>
      </div>

      <CourseGrid courses={COURSES} />
    </PageLayout>
  );
}
