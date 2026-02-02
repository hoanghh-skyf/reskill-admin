"use client";

import { Skeleton } from "@/components/ui/skeleton";

export interface AppSkeletonProps
  extends React.ComponentProps<typeof Skeleton> {}

export const AppSkeleton = ({ ...props }: AppSkeletonProps) => {
  return <Skeleton {...props} />;
};
