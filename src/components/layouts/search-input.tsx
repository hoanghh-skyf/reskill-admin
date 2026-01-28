"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  placeholder = "Search",
  className = "",
}: SearchInputProps) => {
  return (
    <div className={cn("relative w-full max-w-xs md:w-96", className)}>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="h-11 w-full rounded-full bg-white pl-11 pr-4 text-sm outline-none border border-gray-300 focus:border-gray-500 transition-all duration-200"
      />
    </div>
  );
};

export default SearchInput;
