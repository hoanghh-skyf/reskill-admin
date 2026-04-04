"use client";

import React from "react";
import { AppPagination } from "@/shared/components/ui/app-pagination";
import { AppScrollEdgeFade } from "@/shared/components/ui/app-scroll-edge-fade";
import { SAMPLE_COURSES } from "../mocks";
import { CourseGrid } from "./course-grid";
import { FilterBar } from "./filter-bar";

export default function CourseManagement() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  // Calculate pages
  const totalPages = Math.ceil(SAMPLE_COURSES.length / itemsPerPage);

  // Get current items
  const currentCourses = SAMPLE_COURSES.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full space-y-4">
      <div className="sticky top-[104px] z-10 bg-gray-100 py-2">
        <FilterBar />
        <AppScrollEdgeFade className="from-gray-100" />
      </div>
      <div className="mb-14">
        <CourseGrid courses={currentCourses} isLoading={false} />
      </div>

      <div className="pt-2 sticky bottom-[65px] bg-gray-100 z-10">
        <AppScrollEdgeFade edge="top" className="from-gray-100" />
        <AppPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
