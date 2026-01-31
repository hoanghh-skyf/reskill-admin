import Link from "next/link";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export interface AppBreadcrumbPath {
  label: string;
  href?: string;
}

interface AppBreadcrumbProps {
  paths: AppBreadcrumbPath[];
}

const AppBreadcrumb = ({ paths }: AppBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;

          return (
            <React.Fragment key={`${path.label}-${index}`}>
              <BreadcrumbItem>
                {isLast || !path.href ? (
                  <BreadcrumbPage className="capitalize font-medium tracking-wide cursor-pointer">
                    {path.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={path.href}>{path.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
