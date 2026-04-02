"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FileText, HelpCircle, PlayCircle, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { ELessonType, type TLesson } from "@/entities/lesson";
import { MOCK_MODULES } from "@/modules/module/mocks";
import AppButton from "@/shared/components/ui/app-button";
import { AppDataTable } from "@/shared/components/ui/app-data-table";
import { LessonActions } from "../components/lesson-actions";
import { MOCK_LESSONS } from "../mocks";
import { LessonFilters } from "./lesson-filters";

const LessonTypeIcon = ({ type }: { type: ELessonType }) => {
  switch (type) {
    case ELessonType.VIDEO:
      return <Video className="w-4 h-4 text-blue-500" />;
    case ELessonType.TEXT:
      return <FileText className="w-4 h-4 text-gray-500" />;
    case ELessonType.QUIZ:
      return <HelpCircle className="w-4 h-4 text-orange-500" />;
    case ELessonType.PROJECT:
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
  const columns = useMemo<ColumnDef<TLesson>[]>(
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
              {info.row.original.module.course || "N/A"}
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
        <AppButton>Add Lesson</AppButton>
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
