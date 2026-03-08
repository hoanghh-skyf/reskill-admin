"use client";

import { Menu } from "lucide-react";

import HeaderActions from "./header-actions";
import SearchInput from "./search-input";
import UserProfile from "./user-profile";
import AppButton from "../ui/app-button";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="flex h-16 xl:h-20 w-full items-center justify-between px-4 xl:pl-8 xl:pr-4 bg-white rounded-lg border border-gray-200">
      {/* Search Input & Mobile Menu */}
      <div className="flex items-center gap-4">
        <AppButton
          variant="ghost"
          size="icon-sm"
          onClick={onMenuToggle}
          className="xl:hidden"
        >
          <Menu className="size-5" />
        </AppButton>
        <SearchInput className="hidden sm:flex" />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 xl:gap-6">
        <HeaderActions />

        {/* User Profile */}
        <UserProfile
          name="Linda Adora"
          userRole="Admin"
          avatarUrl="https://i.pravatar.cc/150?u=linda"
        />
      </div>
    </header>
  );
};

export default Header;
