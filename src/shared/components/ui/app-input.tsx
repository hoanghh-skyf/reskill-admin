import { type ComponentProps, forwardRef, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Input } from "../base/input";
import {
  AppField,
  AppFieldContent,
  AppFieldDescription,
  AppFieldError,
  AppFieldLabel,
} from "./app-field";

interface AppInputProps extends ComponentProps<typeof Input> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string | { message?: string };
  fieldProps?: Omit<ComponentProps<typeof AppField>, "children">;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ label, description, error, fieldProps, ...props }, ref) => {
    const input = (
      <Input
        {...props}
        ref={ref}
        className={cn(
          props.className,
          "focus-visible:ring-0 rounded-sm disabled:cursor-not-allowed disabled:pointer-events-none disabled:",
        )}
        aria-invalid={!!error || props["aria-invalid"]}
      />
    );

    const errorObj = typeof error === "string" ? { message: error } : error;

    return (
      <AppField
        {...fieldProps}
        data-invalid={!!error}
        className={cn(fieldProps?.className)}
      >
        {label && <AppFieldLabel htmlFor={props.id}>{label}</AppFieldLabel>}
        <AppFieldContent
          className={cn("gap-1", props.disabled && "cursor-not-allowed")}
        >
          {input}
          {description && (
            <AppFieldDescription>{description}</AppFieldDescription>
          )}
          {error && <AppFieldError errors={[errorObj]} />}
        </AppFieldContent>
      </AppField>
    );
  },
);
AppInput.displayName = "AppInput";

export default AppInput;
