"use client";

import { Bell, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon-lg"
        className="rounded-full border-gray-100 text-gray-500 hover:bg-gray-50 bg-white"
      >
        <MessageSquare className="size-[18px]" />
      </Button>
      <Button
        variant="outline"
        size="icon-lg"
        className="relative rounded-full border-gray-100 text-gray-500 hover:bg-gray-50 bg-white"
      >
        <Bell className="size-[18px]" />
        <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      </Button>
    </div>
  );
};

export default HeaderActions;
