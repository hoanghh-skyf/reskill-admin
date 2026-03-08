import type { TModule } from "@/entities";

export const MOCK_MODULES: TModule[] = [
  {
    id: "m1",
    title: "Introduction to React",
    slug: "intro-react",
    scope: 1,
    scope_order: 1,
    order: 1,
    is_locked: false,
    is_completed: true,
    course_id: "c1",
  },
  {
    id: "m2",
    title: "State Management",
    slug: "state-management",
    scope: 1,
    scope_order: 2,
    order: 2,
    is_locked: false,
    is_completed: false,
    course_id: "c1",
  },
  {
    id: "m3",
    title: "Advanced Hooks",
    slug: "advanced-hooks",
    scope: 2,
    scope_order: 1,
    order: 3,
    is_locked: true,
    is_completed: false,
    course_id: "c2",
  },
];
