import { PageLayout } from "@/docs/design/components/PageLayout";
import { ClassList }  from "@/docs/design/components/ClassList";

const NAV_LINKS = [
  { label: "Schedule", href: "/schedule", active: true },
];

const UPCOMING_CLASSES = [
  {
    courseName: "Texercise",
    date: "2026-06-19",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person" as const,
  },
  {
    courseName: "Texercise",
    date: "2026-06-22",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person" as const,
  },
  {
    courseName: "Healthy Cooking Demonstration",
    date: "2026-08-14",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person" as const,
  },
  {
    courseName: "Introduction to AI",
    date: "2026-09-17",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person" as const,
  },
  {
    courseName: "Healthy Cooking",
    date: "2026-10-02",
    time: "10:00 AM – 12:00 PM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person" as const,
  },
  {
    courseName: "Managing Stress and Anxiety Naturally",
    date: "2026-10-23",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person" as const,
  },
  {
    courseName: "Using AI in Your Daily Life",
    date: "2026-12-16",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person" as const,
  },
];

export default function SchedulePage() {
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
          {UPCOMING_CLASSES.length} sessions scheduled · All held at Oasis at The Meadows
        </p>
      </div>

      <div className="max-w-xl">
        <ClassList
          classes={UPCOMING_CLASSES}
          emptyMessage="No upcoming classes at this time. Check back soon."
        />
      </div>
    </PageLayout>
  );
}
