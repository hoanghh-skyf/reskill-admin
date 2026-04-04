"use client";

import type React from "react";
import { useState } from "react";

import Footer from "@/shared/components/layouts/footer";
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
        <div className="sticky top-0 z-20 ml-1 xl:ml-4 pb-2 bg-gray-100">
          <div className="pt-4">
            <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>
        <main className="flex-1 pl-1 xl:pl-4 flex flex-col gap-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainRootLayout;
