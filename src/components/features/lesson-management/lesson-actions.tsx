"use client";

import { Edit, Trash2 } from "lucide-react";

import {
  AppTooltip,
  AppTooltipContent,
  AppTooltipProvider,
  AppTooltipTrigger,
} from "@/components/shared/app-tooltip";
import { Button } from "@/components/ui/button";

import type { Lesson } from "@/types";

interface LessonActionsProps {
  lesson: Lesson;
}

export function LessonActions({ lesson }: LessonActionsProps) {
  return (
    <AppTooltipProvider>
      <div className="flex items-center justify-end gap-2">
        <AppTooltip>
          <AppTooltipTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <Edit className="size-4 text-muted-foreground hover:text-primary" />
            </Button>
          </AppTooltipTrigger>
          <AppTooltipContent>
            <p>Edit Lesson</p>
          </AppTooltipContent>
        </AppTooltip>

        <AppTooltip>
          <AppTooltipTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </AppTooltipTrigger>
          <AppTooltipContent>
            <p>Delete Lesson</p>
          </AppTooltipContent>
        </AppTooltip>
      </div>
    </AppTooltipProvider>
  );
}
