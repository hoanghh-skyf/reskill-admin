"use client";

import React from "react";

import { AppPagination } from "@/components/shared/app-pagination";
import type { Course } from "./CourseCard";
import { CourseGrid } from "./CourseGrid";
import { FilterBar } from "./FilterBar";

// Sample Data
const SAMPLE_COURSES: Course[] = [
  {
    id: "1",
    title: "Fundamentals of UI Design",
    category: "Design",
    price: "1,200,000 VND",
    description:
      "A comprehensive guide to designing user interfaces with modern principles. Learn about color theory, typography, spacing.",
    modules: 12,
    lessons: 45,
    aiTools: "ChatGPT, Midjourney",
    gradient: "bg-gradient-to-r from-orange-400 to-pink-500",
  },
  {
    id: "2",
    title: "Advanced Data Science with Python",
    category: "Data Science",
    price: "2,500,000 VND",
    description:
      "Master data analysis, visualization, and machine learning using Python libraries like Pandas, NumPy, and Scikit-Learn.",
    modules: 18,
    lessons: 82,
    aiTools: "Copilot, GPT-4",
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-800",
  },
  {
    id: "3",
    title: "Fullstack Next.js 14 Masterclass",
    category: "Development",
    price: "3,000,000 VND",
    description:
      "Build scalable web applications with the latest Next.js features, Server Actions, and Tailwind CSS.",
    modules: 24,
    lessons: 120,
    aiTools: "V0, Cursor",
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-700",
  },
  {
    id: "4",
    title: "Fullstack Nest.js 14 Masterclass",
    category: "Development",
    price: "3,000,000 VND",
    description:
      "Build scalable web applications with the latest Nest.js features, Server Actions, and Tailwind CSS.",
    modules: 24,
    lessons: 120,
    aiTools: "V0, Cursor",
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-700",
  },
  {
    id: "5",
    title: "Fullstack Nest.js 14 Masterclass",
    category: "Development",
    price: "3,000,000 VND",
    description:
      "Build scalable web applications with the latest Nest.js features, Server Actions, and Tailwind CSS.",
    modules: 24,
    lessons: 120,
    aiTools: "V0, Cursor",
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-700",
  },
  {
    id: "6",
    title: "Fullstack Nest.js 14 Masterclass",
    category: "Development",
    price: "3,000,000 VND",
    description:
      "Build scalable web applications with the latest Nest.js features, Server Actions, and Tailwind CSS.",
    modules: 24,
    lessons: 120,
    aiTools: "V0, Cursor",
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-700",
  },
];

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
