"use client";

import type { TModule } from "@/entities";
import AppInput from "@/shared/components/ui/app-input";
import {
  AppSelect,
  AppSelectContent,
  AppSelectItem,
  AppSelectTrigger,
  AppSelectValue,
} from "@/shared/components/ui/app-select";

interface LessonFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedModule: string;
  onModuleChange: (value: string) => void;
  modules: TModule[];
}

export function LessonFilters({
  searchTerm,
  onSearchChange,
  selectedModule,
  onModuleChange,
  modules,
}: LessonFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="flex gap-2 w-full sm:w-auto">
        <AppInput
          placeholder="Search lessons..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-[300px]"
        />
        <AppSelect value={selectedModule} onValueChange={onModuleChange}>
          <AppSelectTrigger className="w-[200px]">
            <AppSelectValue placeholder="Filter by Module" />
          </AppSelectTrigger>
          <AppSelectContent>
            <AppSelectItem value="all">All Modules</AppSelectItem>
            {modules.map((mod) => (
              <AppSelectItem key={mod.id} value={mod.id}>
                Scope {mod.scope}.{mod.scope_order}: {mod.title}
              </AppSelectItem>
            ))}
          </AppSelectContent>
        </AppSelect>
      </div>
    </div>
  );
}
