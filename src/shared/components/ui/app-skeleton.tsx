"use client";

import { Skeleton } from "@/shared/components/base/skeleton";

export interface AppSkeletonProps
  extends React.ComponentProps<typeof Skeleton> {}

export const AppSkeleton = ({ ...props }: AppSkeletonProps) => {
  return <Skeleton {...props} />;
};
