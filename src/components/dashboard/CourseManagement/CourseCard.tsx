"use client";

import { Cpu, Eye, Pencil, Trash2 } from "lucide-react";

import { AppBadge } from "@/components/shared/app-badge";
import AppButton from "@/components/shared/app-button";
import { AppCard, AppCardContent } from "@/components/shared/app-card";
import {
  AppTooltip,
  AppTooltipContent,
  AppTooltipProvider,
  AppTooltipTrigger,
} from "@/components/shared/app-tooltip";

export interface Course {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  modules: number;
  lessons: number;
  aiTools: string;
  gradient: string;
}

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <AppCard className="group flex flex-row overflow-hidden shadow-none p-4 rounded-lg border border-gray-200">
      {/* Thumbnail (Left) */}
      <div className={`w-48 shrink-0 ${course.gradient} relative rounded-md`}>
        {/* Optional: Add an icon or overlay here if needed */}
      </div>

      {/* Content (Middle) */}
      <AppCardContent className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            {/* Category */}
            <div>
              <AppBadge
                variant="secondary"
                className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                  course.category === "Design"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    : "bg-green-100 text-green-800 hover:bg-green-100"
                }`}
              >
                {course.category}
              </AppBadge>
            </div>

            {/* Title */}
            <h3
              className="line-clamp-1 text-lg font-bold text-gray-900 mt-1"
              title={course.title}
            >
              {course.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {course.description}
        </p>

        {/* Stats & Price (Bottom of Content) */}
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{course.modules} Modules</span>
              <span>•</span>
              <span>{course.lessons} Lessons</span>
            </div>
            {course.aiTools && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Cpu className="h-3 w-3" />
                <span className="truncate max-w-[200px]" title={course.aiTools}>
                  {course.aiTools}
                </span>
              </div>
            )}
          </div>

          <span className="text-sm font-semibold text-orange-600">
            {course.price}
          </span>
        </div>
      </AppCardContent>

      {/* Actions (Right) */}
      <div className="border-l border-gray-100 p-2 flex flex-col items-center justify-between">
        <ActionButtons />
      </div>
    </AppCard>
  );
}

function ActionButtons() {
  const actions = [
    {
      icon: Eye,
      label: "View Details",
      color: "text-gray-600 hover:text-gray-900 hover:bg-gray-200",
    },
    {
      icon: Pencil,
      label: "Edit Course",
      color: "text-blue-600 hover:text-blue-700 hover:bg-blue-100",
    },
    {
      icon: Trash2,
      label: "Delete",
      color: "text-red-600 hover:text-red-700 hover:bg-red-100",
    },
  ];

  return (
    <AppTooltipProvider>
      {actions.map((action) => (
        <AppTooltip key={action.label}>
          <AppTooltipTrigger asChild>
            <AppButton
              variant="ghost"
              size="icon"
              className={`size-10 rounded-md transition-colors ${action.color}`}
            >
              <action.icon className="size-5" />
            </AppButton>
          </AppTooltipTrigger>
          <AppTooltipContent side="left">
            <p>{action.label}</p>
          </AppTooltipContent>
        </AppTooltip>
      ))}
    </AppTooltipProvider>
  );
}
