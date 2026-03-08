"use client";

import type { TCourse } from "@/entities";
import { AppSkeleton } from "@/shared/components/ui/app-skeleton";
import { CourseCard } from "../components/course-card";
import { EmptyState } from "../components/empty-state";

type CourseGridProps = {
  courses: TCourse[];
  isLoading?: boolean;
};

export function CourseGrid({ courses, isLoading }: CourseGridProps) {
  if (isLoading) {
    return (
      <div className="">
        {Array.from({ length: 6 }).map(() => (
          // TODO: Fix key
          <CourseSkeleton key={Math.random()} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4 mb-0">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function CourseSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <AppSkeleton className="h-32 w-full rounded-lg bg-gray-100" />
      <div className="space-y-2">
        <AppSkeleton className="h-4 w-20 rounded bg-gray-100" />
        <AppSkeleton className="h-6 w-3/4 rounded bg-gray-100" />
        <AppSkeleton className="h-4 w-1/2 rounded bg-gray-100" />
      </div>
    </div>
  );
}
