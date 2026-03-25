"use client";

import type { ComponentProps, PropsWithChildren } from "react";

import { Button } from "@/shared/components/base/button";
import { AppSpinner } from "@/shared/components/ui/app-spinner";
import { cn } from "@/shared/lib/utils/index";

type AppButtonProps = PropsWithChildren<
  ComponentProps<typeof Button> & {
    loading?: boolean;
    isLoading?: boolean;
    loadingIconPosition?: "start" | "end";
  }
>;

const AppButton = ({
  loading,
  isLoading,
  disabled,
  className,
  children,
  loadingIconPosition = "start",
  ...props
}: AppButtonProps) => {
  const isBusy = loading ?? isLoading ?? false;

  return (
    <Button
      {...props}
      disabled={disabled ?? isBusy}
      aria-busy={isBusy}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {isBusy ? (
        <span className="relative inline-flex items-center gap-2">
          <span className="invisible">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <AppSpinner
              data-icon={
                loadingIconPosition === "start" ? "inline-start" : "inline-end"
              }
            />
          </span>
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default AppButton;
