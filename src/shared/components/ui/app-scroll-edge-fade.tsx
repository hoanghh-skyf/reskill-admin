import { cn } from "@/shared/lib/utils";

export type ScrollEdgeFadeEdge = "top" | "bottom" | "left" | "right";

export interface AppScrollEdgeFadeProps {
  edge?: ScrollEdgeFadeEdge;
  className?: string;
}

const edgeClasses: Record<ScrollEdgeFadeEdge, string> = {
  bottom:
    "pointer-events-none absolute -bottom-4 right-0 left-0 h-4 bg-linear-to-b from-muted to-transparent",
  top: "pointer-events-none absolute -top-4 right-0 left-0 h-4 bg-linear-to-t from-muted to-transparent",
  left: "pointer-events-none absolute -left-4 top-0 bottom-0 w-4 bg-linear-to-r from-muted to-transparent",
  right:
    "pointer-events-none absolute -right-4 top-0 bottom-0 w-4 bg-linear-to-l from-muted to-transparent",
};

export function AppScrollEdgeFade({
  edge = "bottom",
  className,
}: AppScrollEdgeFadeProps) {
  return <div className={cn(edgeClasses[edge], className)} aria-hidden />;
}
