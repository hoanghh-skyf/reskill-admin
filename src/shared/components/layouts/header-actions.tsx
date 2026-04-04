"use client";

import { Bell, MessageSquare } from "lucide-react";
import AppButton from "../ui/app-button";
import { AppPingIndicator } from "../ui/app-ping-indicator";

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-3">
      <AppButton
        variant="outline"
        size="icon-lg"
        className="rounded-full border-gray-100 text-gray-500 hover:bg-gray-50 bg-white"
      >
        <MessageSquare className="size-[18px]" />
      </AppButton>
      <AppButton
        variant="outline"
        size="icon-lg"
        className="rounded-full border-gray-100 text-gray-500 hover:bg-gray-50 bg-white relative"
      >
        <Bell className="size-[18px]" />
        <AppPingIndicator variant="destructive" />
      </AppButton>
    </div>
  );
};

export default HeaderActions;
