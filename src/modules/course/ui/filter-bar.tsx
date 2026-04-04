"use client";

import { Filter, Plus, Search } from "lucide-react";
import AppButton from "@/shared/components/ui/app-button";
import AppInput from "@/shared/components/ui/app-input";
import {
  AppPopover,
  AppPopoverContent,
  AppPopoverTrigger,
} from "@/shared/components/ui/app-popover";
import {
  AppSelect,
  AppSelectContent,
  AppSelectItem,
  AppSelectTrigger,
  AppSelectValue,
} from "@/shared/components/ui/app-select";

export function FilterBar() {
  return (
    <div className="flex flex-col gap-4 px-6 bg-white py-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-200">
      {/* Left: Search & Filter */}
      <div className="flex flex-1 gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <AppInput
            placeholder="Search by course name..."
            className="pl-9 rounded-full border-gray-300 focus-visible:ring-orange-500 focus-visible:border-orange-500"
          />
        </div>

        <AppPopover>
          <AppPopoverTrigger asChild>
            <AppButton
              variant="outline"
              className="gap-2 border-gray-300 text-gray-700 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </AppButton>
          </AppPopoverTrigger>
          <AppPopoverContent className="w-80 p-4" align="start">
            <div className="space-y-4">
              <h4 className="font-medium leading-none">Filter Courses</h4>
              <p className="text-sm text-gray-500">
                Advanced filters placeholder (Price range, Status, etc.)
              </p>
              {/* Add real filters here later */}
            </div>
          </AppPopoverContent>
        </AppPopover>
      </div>

      {/* Right: Sort */}
      <div className="flex items-center gap-3">
        <AppSelect defaultValue="newest">
          <AppSelectTrigger className="w-[160px] border-gray-300 focus:ring-orange-500">
            <AppSelectValue placeholder="Sort by" />
          </AppSelectTrigger>
          <AppSelectContent>
            <AppSelectItem value="newest">Newest</AppSelectItem>
            <AppSelectItem value="oldest">Oldest</AppSelectItem>
            <AppSelectItem value="price-desc">Price: High to Low</AppSelectItem>
            <AppSelectItem value="price-asc">Price: Low to High</AppSelectItem>
          </AppSelectContent>
        </AppSelect>
        <AppButton type="button" variant="default">
          <Plus className="h-4 w-4" />
          <span>Create Course</span>
        </AppButton>
      </div>
    </div>
  );
}
