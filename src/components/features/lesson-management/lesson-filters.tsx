"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Module } from "@/types";

interface LessonFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedModule: string;
  onModuleChange: (value: string) => void;
  modules: Module[];
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
        <Input
          placeholder="Search lessons..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-[300px]"
        />
        <Select value={selectedModule} onValueChange={onModuleChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            {modules.map((mod) => (
              <SelectItem key={mod.id} value={mod.id}>
                Scope {mod.scope}.{mod.scope_order}: {mod.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
