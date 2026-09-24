export type ClassType = "in-person" | "online" | "hybrid";

export type ScheduledClass = {
  courseName: string;
  /** ISO calendar date (YYYY-MM-DD), interpreted as a plain calendar date, not an instant */
  date: string;
  time: string;
  location: string;
  locationUrl?: string;
  type?: ClassType;
};

export const ALL_CLASSES: ScheduledClass[] = [
  {
    courseName: "Texercise",
    date: "2026-09-08",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Texercise",
    date: "2026-09-10",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Book Club",
    date: "2026-09-10",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Texercise",
    date: "2026-09-11",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Introduction to AI",
    date: "2026-09-17",
    time: "10:00 AM – 11:30 AM",
    location: "Morningside at Menger Springs",
    locationUrl: "https://mmliving.org/boerne/menger-springs/",
    type: "in-person",
  },
  {
    courseName: "Texercise",
    date: "2026-09-21",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Texercise",
    date: "2026-10-12",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Texercise",
    date: "2026-10-19",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Texercise",
    date: "2026-10-26",
    time: "9:00 AM – 10:00 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Managing Stress and Anxiety Naturally",
    date: "2026-10-23",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Book Club",
    date: "2026-11-12",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Book Club",
    date: "2026-12-10",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Using AI in Your Daily Life",
    date: "2026-12-16",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Demystifying Fitness Trackers: Choosing and Using One at Any Age",
    date: "2027-01-12",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Book Club",
    date: "2027-01-21",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Book Club",
    date: "2027-02-25",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Healthy Cooking",
    date: "2027-03-19",
    time: "10:00 AM – 12:00 PM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Book Club",
    date: "2027-03-25",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Using AI in Your Daily Life",
    date: "2027-04-07",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
  {
    courseName: "Book Club",
    date: "2027-04-15",
    time: "10:00 AM – 11:30 AM",
    location: "Oasis at The Meadows",
    locationUrl: "https://san-antonio.oasisnet.org",
    type: "in-person",
  },
];

/** Today's calendar date (YYYY-MM-DD) in Central Time, the timezone all session times are quoted in. */
function getTodayCentral(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
}

/** Classes scheduled today (Central Time) or later, sorted chronologically. */
export function getUpcomingClasses(classes: ScheduledClass[] = ALL_CLASSES): ScheduledClass[] {
  const today = getTodayCentral();
  return classes
    .filter((c) => c.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
