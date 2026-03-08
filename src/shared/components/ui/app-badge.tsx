"use client";

import { Badge } from "@/shared/components/base/badge";

export interface AppBadgeProps extends React.ComponentProps<typeof Badge> {}

export const AppBadge = ({ children, ...props }: AppBadgeProps) => {
  return <Badge {...props}>{children}</Badge>;
};
