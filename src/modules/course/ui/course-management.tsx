"use client";

import React from "react";
import { AppPagination } from "@/shared/components/ui/app-pagination";
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
      <FilterBar />
      <CourseGrid courses={currentCourses} isLoading={false} />

      <div className="pt-4 mb-1">
        <AppPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
