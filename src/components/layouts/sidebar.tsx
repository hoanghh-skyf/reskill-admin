"use client";

import {
  Bell,
  CalendarCheck,
  Calendar as CalendarIcon,
  ChevronRight,
  Circle,
  CircleDot,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
  children?: { name: string; href: string }[];
}

const Sidebar = ({ isCollapsed, onToggle, isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const menuItems: { label: string; items: MenuItem[] }[] = [
    {
      label: "MENU",
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard",
          active: pathname === "/dashboard",
        },
        { name: "Teachers", icon: Users, href: "/teachers" },
        { name: "Students", icon: GraduationCap, href: "/students" },
        { name: "Attendance", icon: CalendarCheck, href: "/attendance" },
        {
          name: "Finance",
          icon: Wallet,
          href: "/finance",
          children: [
            { name: "Revenue", href: "/finance/revenue" },
            { name: "Expenses", href: "/finance/expenses" },
            { name: "Reports", href: "/finance/reports" },
          ],
        },
        { name: "Notice", icon: Bell, href: "/notice" },
        { name: "Calendar", icon: CalendarIcon, href: "/calendar" },
        { name: "Library", icon: Library, href: "/library" },
        { name: "Message", icon: MessageSquare, href: "/message" },
      ],
    },
    {
      label: "OTHER",
      items: [
        { name: "Profile", icon: User, href: "/profile" },
        { name: "Setting", icon: Settings, href: "/settings" },
        { name: "Log out", icon: LogOut, href: "/logout" },
      ],
    },
  ];

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault();
      toggleExpand(item.name);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity xl:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed left-4 top-4 h-[calc(100vh-2rem)] bg-white p-4 pt-8 border transition-all duration-500 ease-in-out flex flex-col gap-4 z-50 rounded-2xl xl:translate-x-0",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-[110%] xl:translate-x-0",
        )}
      >
        {/* Mobile Close Button */}
        <Button
          onClick={onClose}
          size="icon-xs"
          type="button"
          className="absolute right-2 top-2 rounded-full bg-transparent hover:bg-transparent group xl:hidden"
        >
          <CircleDot className="size-5 stroke-gray-300" strokeWidth={1.5} />
        </Button>

        {/* Desktop Toggle Button */}
        <Button
          onClick={onToggle}
          size="icon-xs"
          type="button"
          className="absolute right-2 top-2 rounded-full bg-transparent hover:bg-transparent group hidden xl:block"
        >
          <CircleDot
            className="size-5 stroke-gray-300 group-hover:block hidden"
            strokeWidth={1.5}
          />
          <Circle
            className="size-5 stroke-gray-300 group-hover:hidden block"
            strokeWidth={1.5}
          />
        </Button>

        {/* Logo Container */}
        <div className="flex items-center h-12 px-2 shrink-0">
          {isCollapsed ? (
            <div className="mx-auto w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md transition-all duration-500 ease-in-out">
              L
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight transition-all duration-500 ease-in-out">
              LOGO
            </h1>
          )}
        </div>

        <nav className="flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {menuItems.map((section, index) => (
            <React.Fragment key={section.label}>
              {index > 0 && <Separator />}
              <div className="flex flex-col gap-2">
                {!isCollapsed && (
                  <span className="px-3 text-xs font-semibold text-gray-400 tracking-wider">
                    {section.label}
                  </span>
                )}
                <div className="flex flex-col gap-1">
                  {section.items.map((item) => {
                    const isExpanded = expandedItems.includes(item.name);
                    const isAnyChildActive = item.children?.some(
                      (child) => pathname === child.href,
                    );
                    const isActive = item.active || isAnyChildActive;

                    return (
                      <div key={item.name} className="flex flex-col gap-1">
                        <Link
                          href={item.children ? "#" : item.href}
                          onClick={(e) => handleItemClick(item, e)}
                          title={isCollapsed ? item.name : ""}
                          className={cn(
                            "flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 font-medium",
                            isCollapsed ? "justify-center" : "justify-between",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon
                              className={cn(
                                "w-5 h-5 shrink-0",
                                isActive ? "text-primary" : "text-gray-400",
                              )}
                              strokeWidth={1.5}
                            />
                            {!isCollapsed && (
                              <span className="text-sm whitespace-nowrap">
                                {item.name}
                              </span>
                            )}
                          </div>
                          {!isCollapsed && item.children && (
                            <ChevronRight
                              className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                isExpanded && "rotate-90",
                                isActive ? "text-primary" : "text-gray-400",
                              )}
                            />
                          )}
                        </Link>

                        {/* Submenu - Toggle via State */}
                        {!isCollapsed && item.children && (
                          <div
                            className={cn(
                              "grid transition-all duration-500 ease-in-out",
                              isExpanded
                                ? "grid-rows-[1fr] opacity-100 mt-1"
                                : "grid-rows-[0fr] opacity-0 mt-0",
                            )}
                          >
                            <div className="overflow-hidden">
                              <div className="ml-5 flex flex-col gap-1 relative border-l border-gray-100">
                                {item.children.map((child) => {
                                  const isChildActive = pathname === child.href;
                                  return (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      className={cn(
                                        "flex items-center justify-between pl-3 pr-4 py-2 rounded-lg text-sm transition-all duration-200 relative ml-3",
                                        isChildActive
                                          ? "text-primary font-medium bg-primary/5"
                                          : "text-gray-400 hover:text-gray-600 hover:bg-gray-50",
                                      )}
                                    >
                                      <span>{child.name}</span>
                                      <div
                                        className={cn(
                                          "absolute right-0 w-1 rounded-full transition-all duration-300",
                                          isChildActive
                                            ? "h-4 bg-primary"
                                            : "h-0 bg-transparent",
                                        )}
                                        style={{
                                          transform: "translateX(4px)",
                                        }}
                                      />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
