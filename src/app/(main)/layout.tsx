"use client";

import type React from "react";
import { useState } from "react";

import Header from "@/shared/components/layouts/header";
import Sidebar from "@/shared/components/layouts/sidebar";
import { cn } from "@/shared/lib/utils";

const MainRootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 p-2 pt-0 md:p-4 md:pt-0">
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
        <div className="sticky top-0 z-20 mx-2 xl:ml-8 xl:mr-4 mb-4 pb-2 bg-gray-100">
          <div className="pt-4">
            <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />
          </div>

          {/* Gradient Fade Overlay */}
          <div className="absolute -bottom-4 left-0 right-0 h-4 bg-linear-to-b from-gray-100 to-transparent pointer-events-none" />
        </div>
        <main className="flex-1 overflow-auto px-2 xl:pl-8 xl:pr-4 flex flex-col gap-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainRootLayout;
