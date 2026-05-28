import { PageLayout } from "@/docs/design/components/PageLayout";
import { CourseGrid }  from "@/docs/design/components/CourseGrid";

const NAV_LINKS: { label: string; href: string; active?: boolean }[] = [];

const COURSES = [
  {
    name: "Healthy Cooking Demonstration",
    description:
      "For this course, we will teach the class how to prepare meals for breakfast, lunch, dinner, and even healthy desserts. We will focus on high-protein and high-fiber meals that can help reduce cholesterol, improve heart health, and overall well-being.",
    category: "Wellness",
    href: "/healthy-cooking.html",
  },
  {
    name: "Intro to Artificial Intelligence",
    description:
      "For this course, we will offer a friendly and engaging introduction to the world of artificial intelligence. We'll explore the exciting possibilities and practical applications of AI in a way that's easy to understand and relevant to your everyday life.",
    category: "Technology",
    href: "/intro-ai.html",
  },
  {
    name: "Tech Accessibility: Making Technology Work for You",
    description:
      "For this class, we will focus on the accessibility features built into modern phones, computers, tablets, and their operating systems, designed to make technology easier and more enjoyable to use. We'll explore features to help overcome potential barriers related to vision, hearing, dexterity, and cognitive abilities.",
    category: "Technology",
    href: "/accessibility-seniors.html",
  },
  {
    name: "Tech Tools: Choosing the Right Device",
    description:
      "For this class, we will help you navigate the world of personal technology and choose the device that best suits your needs and lifestyle. We'll compare and contrast smartphones, computers, and tablets, focusing on their strengths and weaknesses.",
    category: "Technology",
    href: "/choose-device.html",
  },
  {
    name: "Managing Stress and Anxiety Naturally",
    description:
      "Feeling overwhelmed, anxious, or down? There are natural ways to feel better. This course explores drug-free strategies for managing stress, anxiety, and depression — from mindfulness and movement to nutrition and meaningful connection. You'll walk away with practical tools and a renewed sense of hope and control over your own wellbeing.",
    category: "Wellness",
  },
  {
    name: "Using AI in Your Daily Life",
    description:
      "Take the mystery out of artificial intelligence. This course covers the essentials — its history, how it works, and how to use it safely — then dives into practical applications designed for everyday life. Whether you want to save time, learn something new, or simply keep up with a changing world, this class will give you the confidence and tools to do it.",
    category: "Technology",
  },
];

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
