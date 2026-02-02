"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FileText, HelpCircle, PlayCircle, Video } from "lucide-react";
import { useMemo, useState } from "react";

import { AppDataTable } from "@/components/shared/app-data-table";
import { Button } from "@/components/ui/button";

import type { Course, Lesson, Module } from "@/types";

import { LessonActions } from "./lesson-actions";
import { LessonFilters } from "./lesson-filters";

// --- Mock Data ---
const MOCK_COURSES: Course[] = [
  { id: "c1", title: "React JS Fundamentals", slug: "react-js-fundamentals" },
  {
    id: "c2",
    title: "Advanced React Patterns",
    slug: "advanced-react-patterns",
  },
];

const MOCK_MODULES: Module[] = [
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
    course: MOCK_COURSES[0],
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
    course: MOCK_COURSES[0],
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
    course: MOCK_COURSES[1],
  },
];

const MOCK_LESSONS: Lesson[] = [
  {
    id: "l1",
    module_id: "m1",
    module: MOCK_MODULES[0],
    title: "What is React?",
    slug: "what-is-react",
    order: 1,
    lesson_type: "VIDEO",
    duration: "05:30",
    content_url: "https://example.com/video1",
    is_completed: true,
  },
  {
    id: "l2",
    module_id: "m1",
    module: MOCK_MODULES[0],
    title: "Setting up the Environment",
    slug: "setup-env",
    order: 2,
    lesson_type: "TEXT",
    duration: "10 min",
    content_url: "https://example.com/doc1",
    is_completed: true,
  },
  {
    id: "l3",
    module_id: "m1",
    module: MOCK_MODULES[0],
    title: "React Quiz",
    slug: "react-quiz",
    order: 3,
    lesson_type: "QUIZ",
    duration: "15 min",
    content_url: "",
    is_completed: true,
  },
  {
    id: "l4",
    module_id: "m2",
    module: MOCK_MODULES[1],
    title: "useState Hook",
    slug: "usestate-hook",
    order: 1,
    lesson_type: "VIDEO",
    duration: "12:45",
    content_url: "https://example.com/video2",
    is_completed: false,
  },
  {
    id: "l5",
    module_id: "m2",
    module: MOCK_MODULES[1],
    title: "useEffect Hook",
    slug: "useeffect-hook",
    order: 2,
    lesson_type: "VIDEO",
    duration: "14:20",
    content_url: "https://example.com/video3",
    is_completed: false,
  },
  {
    id: "l6",
    module_id: "m3",
    module: MOCK_MODULES[2],
    title: "Custom Hooks",
    slug: "custom-hooks",
    order: 1,
    lesson_type: "PROJECT",
    duration: "1 hour",
    content_url: "",
    is_completed: false,
  },
  {
    id: "l7",
    module_id: "m2",
    module: MOCK_MODULES[1],
    title: "useContext Hook",
    slug: "usecontext-hook",
    order: 3,
    lesson_type: "VIDEO",
    duration: "11:15",
    content_url: "https://example.com/video4",
    is_completed: false,
  },
  {
    id: "l8",
    module_id: "m2",
    module: MOCK_MODULES[1],
    title: "useReducer Hook",
    slug: "usereducer-hook",
    order: 4,
    lesson_type: "VIDEO",
    duration: "13:45",
    content_url: "https://example.com/video5",
    is_completed: false,
  },
];

const LessonTypeIcon = ({ type }: { type: Lesson["lesson_type"] }) => {
  switch (type) {
    case "VIDEO":
      return <Video className="w-4 h-4 text-blue-500" />;
    case "TEXT":
      return <FileText className="w-4 h-4 text-gray-500" />;
    case "QUIZ":
      return <HelpCircle className="w-4 h-4 text-orange-500" />;
    case "PROJECT":
      return <PlayCircle className="w-4 h-4 text-purple-500" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export default function LessonManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Filter Data
  const filteredData = useMemo(() => {
    return MOCK_LESSONS.filter((lesson) => {
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesModule =
        selectedModule === "all" || lesson.module_id === selectedModule;
      return matchesSearch && matchesModule;
    });
  }, [searchTerm, selectedModule]);

  // Paginate Data (Simulating server-side or local slice)
  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, pagination]);

  const pageCount = Math.ceil(filteredData.length / pagination.pageSize);

  // Columns
  const columns = useMemo<ColumnDef<Lesson>[]>(
    () => [
      {
        accessorKey: "index",
        header: "#",
        cell: (info) =>
          pagination.pageIndex * pagination.pageSize + info.row.index + 1,
        size: 50,
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="font-medium">{info.row.original.title}</span>
            <span className="text-xs text-muted-foreground max-w-[200px] truncate">
              /{info.row.original.slug}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "module.course.title",
        header: "Course",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {info.row.original.module.course?.title || "N/A"}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "module",
        header: "Module",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {info.row.original.module.title}
            </span>
            <span className="text-xs text-muted-foreground">
              Scope {info.row.original.module.scope}.
              {info.row.original.module.scope_order}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "lesson_type",
        header: "Type",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <LessonTypeIcon type={info.row.original.lesson_type} />
            <span className="capitalize text-sm">
              {info.row.original.lesson_type.toLowerCase()}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "duration",
        header: "Duration",
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: (info) => <LessonActions lesson={info.row.original} />,
      },
    ],
    [pagination],
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lessons</h2>
          <p className="text-muted-foreground">
            Manage your course lessons, track progress and content.
          </p>
        </div>
        <Button>Add Lesson</Button>
      </div>

      <LessonFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedModule={selectedModule}
        onModuleChange={setSelectedModule}
        modules={MOCK_MODULES}
      />

      <AppDataTable
        table={table}
        columns={columns}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination}
      />

      <div className="text-xs text-muted-foreground mt-2">
        Total {filteredData.length} lessons
      </div>
    </div>
  );
}
