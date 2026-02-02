"use client";

import { Badge } from "@/components/ui/badge";

export interface AppBadgeProps extends React.ComponentProps<typeof Badge> {}

export const AppBadge = ({ children, ...props }: AppBadgeProps) => {
  return <Badge {...props}>{children}</Badge>;
};
