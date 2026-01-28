"use client";

import type React from "react";
import { useState } from "react";

import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";

import { cn } from "@/lib/utils";

const MainRootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 p-2 md:p-4">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-500 ease-in-out",
          isCollapsed ? "xl:ml-20" : "xl:ml-64",
        )}
      >
        <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-auto px-2 xl:pl-8 xl:pr-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainRootLayout;
