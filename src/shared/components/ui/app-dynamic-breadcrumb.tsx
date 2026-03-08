"use client";

import { usePathname } from "next/navigation";

import AppBreadcrumb, { type AppBreadcrumbPath } from "./app-breadcrumb";

const routeConfig: Record<string, string> = {
  dashboard: "Dashboard",
  teachers: "Teachers",
  students: "Students",
  attendance: "Attendance",
  finance: "Finance",
  revenue: "Revenue",
  expenses: "Expenses",
  reports: "Reports",
  notice: "Notice",
  calendar: "Calendar",
  library: "Library",
  message: "Message",
  profile: "Profile",
  settings: "Settings",
};

const AppDynamicBreadcrumb = () => {
  const pathname = usePathname();

  const paths: AppBreadcrumbPath[] = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((segment, index, array) => {
      const href = `/${array.slice(0, index + 1).join("/")}`;
      const label = routeConfig[segment.toLowerCase()] || segment;

      return {
        label,
        href,
      };
    });

  if (paths.length === 0) {
    return (
      <AppBreadcrumb
        paths={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
        ]}
      />
    );
  }

  return <AppBreadcrumb paths={paths} />;
};

export default AppDynamicBreadcrumb;
