"use client";

import { Edit, Trash2 } from "lucide-react";
import type { TLesson } from "@/entities";
import { Button } from "@/shared/components/base/button";
import {
  AppTooltip,
  AppTooltipContent,
  AppTooltipProvider,
  AppTooltipTrigger,
} from "@/shared/components/ui/app-tooltip";

type LessonActionsProps = {
  lesson: TLesson;
};

export function LessonActions({ lesson: _ }: LessonActionsProps) {
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
