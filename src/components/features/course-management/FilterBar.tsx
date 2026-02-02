"use client";

import { Filter, Search } from "lucide-react";

import AppButton from "@/components/shared/app-button";
import AppInput from "@/components/shared/app-input";
import {
  AppPopover,
  AppPopoverContent,
  AppPopoverTrigger,
} from "@/components/shared/app-popover";
import {
  AppSelect,
  AppSelectContent,
  AppSelectItem,
  AppSelectTrigger,
  AppSelectValue,
} from "@/components/shared/app-select";

export function FilterBar() {
  return (
    <div className="flex flex-col gap-4 px-6 bg-white py-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-200">
      {/* Left: Search & Filter */}
      <div className="flex flex-1 gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <AppInput
            placeholder="Tìm kiếm theo tên khóa học..."
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
            <AppSelectValue placeholder="Sắp xếp" />
          </AppSelectTrigger>
          <AppSelectContent>
            <AppSelectItem value="newest">Mới nhất</AppSelectItem>
            <AppSelectItem value="oldest">Cũ nhất</AppSelectItem>
            <AppSelectItem value="price-desc">Giá cao đến thấp</AppSelectItem>
            <AppSelectItem value="price-asc">Giá thấp đến cao</AppSelectItem>
          </AppSelectContent>
        </AppSelect>
      </div>
    </div>
  );
}
