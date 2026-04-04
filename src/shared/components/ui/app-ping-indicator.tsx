import type { CSSProperties } from "react";

import { cn } from "@/shared/lib/utils";

const variantStyles = {
  destructive: {
    ping: "bg-destructive/75",
    dot: "bg-destructive",
  },
  primary: {
    ping: "bg-primary/75",
    dot: "bg-primary",
  },
  live: {
    ping: "bg-green-500/75",
    dot: "bg-green-500",
  },
} as const;

export type AppPingIndicatorVariant = keyof typeof variantStyles;

export interface AppPingIndicatorProps {
  /** Ping cycle length in milliseconds. */
  durationMs?: number;
  variant?: AppPingIndicatorVariant;
  /** When `false`, nothing is rendered. */
  show?: boolean;
  className?: string;
  size?: number;
}

export function AppPingIndicator({
  durationMs = 1000,
  variant = "destructive",
  show = true,
  className,
  size = 8,
}: AppPingIndicatorProps) {
  const { ping: pingClass, dot: dotClass } = variantStyles[variant];
  const pingStyle = {
    animationDuration: `${durationMs}ms`,
  } satisfies CSSProperties;

  if (!show) {
    return null;
  }

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-2.5 right-2.5 flex",
        className,
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <span
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          pingClass,
        )}
        style={pingStyle}
      />
      <span
        className={cn("relative inline-flex rounded-full", dotClass)}
        style={{
          width: size,
          height: size,
        }}
      />
    </span>
  );
}
